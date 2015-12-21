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

    if(defObj) {
      defObj.done(function(ans) {
        var successBox = $('.popup-work-small'),
            errorBox = $('.popup-alert-error');

        if(ans.status === 'OK') {
          successBox.show().bPopup();
        } else {
          errorBox.show().bPopup();
        }
      });
    }
  };

  var _ajaxForm = function (form, url) {
    if(!validation.validationForm(form)) return false;

    data = form.serialize();

    var result = $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
    }).fail( function(ans) {
      console.log('Проблемы в PHP');
      $('.popup-error-small').bPopup();
      $('.popup-alert-error').show();
    });

    return result;

  };

  return {
    init : init
  };

})();

authorization.init();
