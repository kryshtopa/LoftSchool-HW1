var authorization = (function () {

  var init = function () {
    _setUpListners();
  };

  var _setUpListners = function () {
    $('.authorization-box').on('submit', _submitForm);
  };

  var _submitForm = function (event) {
    event.preventDefault();

    var form = $(this),
        url = 'authorization.php',
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

authorization.init();
