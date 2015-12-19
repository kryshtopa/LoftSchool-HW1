var contact = (function () {

  var init = function () {
    _setUpListners();
  };

  var _setUpListners = function () {
    $('.contact-page').on('submit', _submitForm);
  };

  var _submitForm = function (event) {
    event.preventDefault();

    var form = $(this),
        url = 'contact.php',
        defObj = _ajaxForm(form, url);

    // работаем с ответом от сервера

  };

  var _ajaxForm = function (form, url) {
    if(!validation.validationForm(form)) return false;
  };

  return {
    init : init
  };

})();

contact.init();
