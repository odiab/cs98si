var validateField = function(fieldElem, infoMessage, validateFn) {
  if (fieldElem.is(':last-child')) {
    fieldElem.parent().append("<span></span>");
  }
  var formStatus = fieldElem.next();
  var inputValue = fieldElem.val();

  if (fieldElem.is(':focus')) {
    formStatus.text(infoMessage);
    formStatus.removeClass();
    formStatus.addClass("info");
    return;
  }

  if (!inputValue) {
    formStatus.text("");
    formStatus.removeClass();
  } else if (validateFn(fieldElem.val())) {
    formStatus.text("OK");
    formStatus.removeClass();
    formStatus.addClass("ok");
  } else {
    formStatus.text("Error");
    formStatus.removeClass();
    formStatus.addClass("error");
  }
};

$(document).ready(function() {
  var createFormHandler = function(field, text, method) {
    return function() {
      validateField(field, text, method);
    }
  }

  var userHandler = createFormHandler(
    $('#username'),
    "Alphanumeric characters only.",
    function(input) {
      usernameRegex = /^[a-z0-9]+$/i;
      return input.match(usernameRegex);
    }
  );

  var passwordHandler = createFormHandler(
    $('#password'),
    "Must be 8 characters or more.",
    function(input) {
      return input.length >= 8;
    }
  );

  var emailHandler = createFormHandler(
    $('#email'),
    "Must have '@' character in it.",
    function(input) {
      return input.indexOf('@') !== -1;
    }
  );

  $('#username').focus(userHandler);
  $('#password').focus(passwordHandler);
  $('#email').focus(emailHandler);
  $('#username').blur(userHandler);
  $('#password').blur(passwordHandler);
  $('#email').blur(emailHandler);
});
