var validation = (function () {

  var init = function () {
    _setUpListners();
  };

  // Прослушка событий
  var _setUpListners = function () {
    $('form').on('keydown', '.redError', _removeError);
    $('form').on('reset', _clearForm);
  };

  // Убирает красную обводку
  var _removeError = function () {
    $(this).removeClass('redError');
  };

  // Очищает поля формы
  var _clearForm = function (form) {
    var form = $(this);
    form
      .find('input, textarea')
      .trigger('hideTooltip');
    form
      .find('.redError')
      .removeClass('redError');
    form
      .find('.popup-alert-error')
      .text('На сервере произошла ошибка!')
      .hide();
  };

  // Создает тултип
  var _createQtip = function (formField, position, tipText) {

    // Позиция тултипа
    if (position === 'right') {
      position = {
        my: 'left center',
        at: 'right center',
        effect: false
      }
    } else {
      position = {
        my: 'right center',
        at: 'left center',
        effect: false,
        adjust: {
          method: 'shift none'
        }
      }
    }

    // Инициализация тултипа

var tipText = tipText;

    formField.qtip({
      content: {
        text: tipText
      },
      show: {
        event: 'show'
      },
      hide: {
        event: 'keydown hideTooltip'
      },
      position: position,
      style: {
        classes: 'myCustomClass qtip-red',
        tip: {
          height: 5,
          width: 8
        }
      }
    }).trigger('show');
  };

  // Проверка полей формы
  var validationForm = function (form) {

    var formFields = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'), // кроме кнопки изображения на странице "Мои Работы"
        valid = true;

    // Просмотр всех элементов формы
    $.each(formFields, function (index, val) {
      var formField = $(val),
          val = formField.val(),
          pos = formField.attr('qtip-position'),
          tipText = function() {
            return $(this).attr('qtip-content');
          };

      // Проверка заполнения полей
      if(!val.length) {
        _createQtip(formField, pos, tipText);
        formField.addClass('redError');
        valid = false;
      } else {
        var fieldValidation = function (formFieldID, patt, tipText) {
          var ele = formFieldID,
              tipText = tipText,
              patt = patt,
              pos = ele.attr('qtip-position');

          if(!patt.test(ele.val())) {
            _createQtip(ele, pos, tipText);
            ele.addClass('redError');
            valid = false;
          }
        };

        // Проверка правильности заполнения поля с Email
        if($('#email')[0]){
          return fieldValidation ($('#email'), /^.+@.+[.].{2,}$/i, 'вы ошиблись при вводе email');
        }

        // Проверка правильности заполнения поля с URL
        if($('#popup-url')[0]){
          return fieldValidation ($('#popup-url'), /^(ftp|http|https):\/\/[^ "]+$/, 'введите полный адрес');
        }

        // Проверка правильности заполнения поля с password
        if($('#password')[0]){
          return fieldValidation ($('#password'), /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'вы ошиблись при вводе пароля');
        }

        // Проверка правильности заполнения поля с recaptcha
        if($('.g-recaptcha')[0]) {
          $('.g-recaptcha', function () {
            var v = grecaptcha.getResponse(),
                elem = $('.g-recaptcha'),
                hide = 'mouseleave',
                pos = 'right';

            if(v.length == 0) {
              _createQtip(elem, pos, hide);
              valid = false;
            }
          })
        }

      }
    });

    return valid;

  };

  return {
    init: init,
    validationForm: validationForm
  };

})();

validation.init();
