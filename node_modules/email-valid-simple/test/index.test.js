const emailValid = require('../index.js')

const invalidEmailList = [
  '', // empty string
  '@',
  'invalid',
  'in.valid',
  'in@valid',
  'two..dots@domain.com',
  'in@va@lid.com',
  'in..valid@.com',
  '@invalid.com',
  'double-dash-domain@domain.uk--foo',
  '@missing-local.org',
  ',:;()`|@domain.org',
  '<>@[]\\`|@domain.org',
  "{}~&'_*+-./=?^@invalid-starting-characters.com",
  '`a@invalid-starting-characters.com.uk',
  '.aa@more-invalid-starting-characters.com.com',
  'double..dot@domain.com',
  'double++plus@domain.com',
  'double;;colon@domain.com',
  '.local-starts-with-dot@domain.com',
  'local-ends-with-dot.@domain.com',
  'two..consecutive-dots@domain.com',
  'partially.\'quoted\'@domain.com',
  'the-username-is-invalid-if-it-is-longer-than-sixty-four-characters@domain.com',
  'missing-domain@.com',
  'domain-starts-with-dashsh@-domain.com',
  '-username-starts-with-dashsh@domain.com',
  'username with spaces@-domain.com',
  'domain-ends-with-dash@domain-.com',
  'username-ends-with-dash-@domain.com',
  'invalid-characters-in-domain@!\'#$%(),/;<>_[]`|.org',
  'missing-dot-before-domain-top-level@com',
  'missing-domain-top-level@domain.',
  'username',
  'ip-domain@127.0.0.1', // valid but unsupported by many email clients and this package
  'broken-ip@127.0.0.1.26', // valid but unsupported by many email clients and this package
  'ip-domain-and-port@127.0.0.1:25', // valid but unsupported by many email clients and this package
  'ip-domain-with-brackets@[127.0.0.1]', // valid but unsupported by many email clients and this package
  'trailing-dots@test.de.',
  'double-dot-in-domain@te..domain.com',
  'dot-first-in-domain@.test.com',
  'one-letter-top-level-domaing@ns.i',
  '.username-start-with-dot@domain.com',
  'username-end-with-dot.@domain.com',
  'double-at-sign@a@com',
  'length-tests-total-over-limit@parts-of-the-email-domain-must-not-be-more-than-63-characters-but-this-is.and-the-combined-total-should-not-be-more-than-255-characters-but-this-is.parts-of-the-email-domain-must-not-be-more-than-63-characters-but-this-is.and-the-combined-total-should-not-be-more-than-255-characters.but-this-is-way-way-more',
  'length-tests-domain-part-over-limit@parts-of-the-email-domain-must-not-be-more-than-63-characters.and-the-combined-total-should-not-be-more-than-255-characters.parts-of-the-email-domain-must-not-be-more-than-63-characters.and-the-combined-total-should-not-be-more-than-255-characters-but-this-is-way-way-more',
];

const validEmailList = [
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@standard-alphabetic.org',
  'abcdefghijklmnopqrstuvwxy12345678@standard-alpha-numeric.com',
  'spèciælchars@special-chars.com',
  'test+123@with-plus-sign.com',
  'test12ga3@host.com',
  'uśërnæmē-with-more-special-chars@host.com',
  'special-char-combo-{+^}@spcc.com',
  'digit-only-domain@123.com',
  'digit-only-domain-with-subdomain@sub.123.com',
  'a@one-char-name.com',
  'one-char-domain-dot-domain@a.example.com',
  'local@foo.new',
  'local@sub.domains.com',
  'using-backticks`in-username@test.com',
  'com@sil.c1m',
  't119037jskc_ihndkdoz@aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl',
  'one-char-domain@x.org',
  'local@domain-with-dash.com',
  'numeric-domain@123.com',
  'one-char-domain@p.org',
  'double-dash-in-domain@test--1.com',
  'other-domain@domain.uk.ac',
  'other-domain@domain.uni',
  "v\'alid-quote\'d@domain.com", // NOTE: legal but many email clients do not allow it
  'uncommon-domain@domain.moo',
  'country-code-domains@domain.co.uk',
  'country-code-domina@domain.it',
  'test-of-the-domain-length@aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrz1.org',
  'character-limit-of-63-chars-in-domain-parts@alskgklajgdkjsajgkdasjgkdajsgkdajsgkljkdjskgjkldakgjdsjlgjadkl.alskgklajgdkjsajgkdasjgkdajsgkdajsgkljkdjskgjkldakgjdsjlgjadkl.com',
  'es\'\\cape\'d@domain.com',
  'esc\'aped-\\\'quote\'s@domain.com',
  'ba\'ck\\slas\'h@domain.com',
  '01234567890@numeric-username.com',
];

describe('testing valid emails', function () {
  test('should return a positive result', function () {
    let index = -1;
    while (++index < validEmailList.length) {
      const res = emailValid.validate(validEmailList[index]);
      expect(res).toEqual(true);
    }
  });
});

describe('testing invalid emails', function () {
  test('should return a negative result', function () {
    let index = -1;
    while (++index < invalidEmailList.length) {
      const res = emailValid.validate(invalidEmailList[index]);
      expect(res).toEqual(false);
    }
  });
});

describe('testing validateAll emails', function () {
  test('should return an object consisting of all valid emails', function () {
    const res = emailValid.validateAll(validEmailList);
    expect(res.valid.length).toEqual(33);
    expect(res.invalid.length).toEqual(0);
  });

  test('should add two emails to the invalid array', function () {
    let newValidEmailList = validEmailList.map((x) => x);
    newValidEmailList.push('bad@email@.com');
    newValidEmailList.push('.bad@domain.com');
    const res = emailValid.validateAll(newValidEmailList);
    expect(res.valid.length).toEqual(33);
    expect(res.invalid.length).toEqual(2);
    expect(res.invalid).toEqual(['bad@email@.com', '.bad@domain.com']);
  });

  test('should return an object consisting of all invalid emails', function () {
    const res = emailValid.validateAll(invalidEmailList);
    expect(res.invalid.length).toEqual(46);
    expect(res.valid.length).toEqual(0);
  });

  test('should add two emails to the valid array', function () {
    let newInvalidEmailList = invalidEmailList.map((x) => x);
    newInvalidEmailList.push('this-is-a-good@email.com');
    newInvalidEmailList.push('thîs-is-älsö@email.com');
    const res = emailValid.validateAll(newInvalidEmailList);
    expect(res.invalid.length).toEqual(46);
    expect(res.valid.length).toEqual(2);
    expect(res.valid).toEqual(['this-is-a-good@email.com', 'thîs-is-älsö@email.com']);
  });
});