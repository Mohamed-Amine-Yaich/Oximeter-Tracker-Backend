'use strict';

var validEamilRgx = /^(?!.*\.{2})[a-zA-Z0-9\p{L}.!#$%&'*+\/=?^_`{|}~-]{1,64}.*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/i;

exports.validate = function (email) {
  if (!email) return false;
  // first defence layer
  if (!validEamilRgx.test(email)) return false;
  // second defence layer
  var emailParts = email.split('@');
  if (emailParts.length !== 2) return false
  // third defence layer
  if (!_validEmailNameLength(emailParts[0]) || !_validDomainNameLength(emailParts[1])) return false;
  return true;
};


exports.validateAll = function (emails) {

  if (!emails.length) return [];
  let validationResult = {
    valid: [],
    invalid: []
  };
  emails.forEach(email => {
    if (!email) return;
    // first defence layer
    if (!validEamilRgx.test(email)) {
      validationResult.invalid.push(email)
      return;
    }
    // second defence layer
    var emailParts = email.split('@');
    if (emailParts.length !== 2) {
      validationResult.invalid.push(email)
      return;
    }
    // third defence layer
    if (!_validEmailNameLength(emailParts[0]) || !_validDomainNameLength(emailParts[1])) {
      validationResult.invalid.push(email)
      return;
    }

    validationResult.valid.push(email)
    return;
  });
  return validationResult;
};

function _validEmailNameLength(namePart) {
  if (namePart.length > 64) {
    return false
  };

  // username start/ending with invalid chars or consecutive invalid chars
  if (/^[\(\.!#$%&'*+\-\/=?\^_`{|\)]/.test(namePart)) return false;
  if (/[\(\.!#$%&'*+\-\/=?\^_`{|\)]$/.test(namePart)) return false;
  if (/[(\\)\.\+,:;<>@\[\]]{2}/.test(namePart)) return false;

  return true;
}

function _validDomainNameLength(domainNamePart) {
  if (domainNamePart.length > 255) return false
  var domainParts = domainNamePart.split('.');
  if (domainParts.some(function (part) {
    return part.length > 63;
  })) return false;

  return true;
}