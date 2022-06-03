const { promisify } = require("util");
var createError = require("http-errors");
const User = require("./../model/userModel");
var JWT = require("jsonwebtoken");

const signToken = payload =>
  (token = JWT.sign({ payload }, process.env.JWT_SECTET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  }));

const createToeknAndsendResponse = (payload, res, user) => {
  const token = signToken(payload);

  res.cookie("access_token", token, {
    maxAge: 3600, // expires after 1 hr
    httpOnly: true, // cannot be modified using XSS or JS
    secure: process.env.PRODUCTION_MODE === "development" ? false : true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
};

exports.signup = async (req, res, next) => {
  //data of user from resquest

  const user = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    matricule: req.body.matricule,
    role: req.body.role,
    device: req.body.device,
    doctor: req.body.doctor,
  });
  //create a jwt  and send via responde then via cookies
  //paload , secret key , option(expiresIn,algorithm )
  //paload change to id
  if (!user) next(createError("there is an error please resign in"));

  const paload = user._id;
  createToeknAndsendResponse(paload, res, user);
};

//give authentication (assign token)
exports.login = async (req, res, next) => {
  //recuper les donnner de l'utisateur

  if (!req.body.email || !req.body.password)
    next(createError("please ser your email and password", 401));

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    next(
      createError("please verify your email no user with this email @", 401)
    );

  //if user does not exist throw error
  //check user and password
  const passIstrue = await user.verifyPassword(
    req.body.password,
    user.password
  );
  console.log(passIstrue);
  if (!passIstrue) {
    next(createError(" your password is wrong please reset password", 404));
  }
  //***
  //if (!user) return new Error("invalid email or password");
  const payload = user._id;
  console.log(payload);
  //response with  jwt for login

  createToeknAndsendResponse(payload, res, user);
};
//give authorization (verif token)

exports.protected = async (req, res, next) => {
  //token
  console.log(req.headers);

  //test if there is a token in authorization in headers

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    next(createError("you dont have authorization in headers"));

  console.log(req.headers.authorization.split(" ")[0]);

  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    next(
      createError("you are not authorized you dont have the access token", 401)
    );
  //test if this is a valid token (jwt.verify)

  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECTET);
  console.log(decoded);

  //test if the current user still exist in db
  const id = decoded.payload;
  const currentUser = await User.findById(id);
  if (!currentUser) next(createError("your account is removed from db"));

  console.log(currentUser);
  //test if the pasword have changed after he get the token

  //****/==> ??
  /* if (!currentUser.verifyTokenTime(decoded.iat, currentUser.passwordChangedAt))
    next(createError("your token is not valid you have changed your password"));
*/
  req.user = currentUser;
  console.log("you are authorized you can acced on route based on your role");

  next();
};

exports.restrictTo =
  ([...tab]) =>
  async (req, res, next) => {
    console.log([...tab]);
    console.log("req.user :" + req.user);
    if (![...tab].includes(req.user.role))
      next(createError("your not allowed to perform this action"));
    next();
  };

exports.updatePassword = async (req, res, next) => {
  console.log(" updatepassword handler");
};
