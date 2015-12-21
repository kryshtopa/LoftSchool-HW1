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
  var _createQtip = function (formField, position, hide) {
    var hide = hide;

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
    formField.qtip({
      content: {
        text: function() {
          return $(this).attr('qtip-content');
        }
      },
      show: {
        event: 'show'
      },
      hide: {
        event: hide
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
          hide = 'keydown hideTooltip',
          pos = formField.attr('qtip-position');


      // Проверка заполнения полей
      if(!val.length) {
        _createQtip(formField, pos, hide);
        formField.addClass('redError');
        valid = false;
      }
    });

    // Проверка правильности заполнения поля с Email
    if($('#email')[0]) {
      $('#email', function () {
        var ele = $('#email'),
            patt = /^.+@.+[.].{2,}$/i,
            hide = 'keydown hideTooltip',
            pos = ele.attr('qtip-position');

        if(!patt.test(ele.val())) {
          _createQtip(ele, pos, hide);
          ele.addClass('redError');
          valid = false;
        }
      })
    }

    // Проверка правильности заполнения поля с URL
    if($('#popup-url')[0]) {
      $('#popup-url', function () {
        var elem = $('#popup-url'),
            patt = /^(ftp|http|https):\/\/[^ "]+$/,
            hide = 'keydown hideTooltip',
            pos = elem.attr('qtip-position');

        if(!patt.test(elem.val())) {
          _createQtip(elem, pos, hide);
          elem.addClass('redError');
          valid = false;
        }
      })
    }

    // Проверка правильности заполнения поля с image
    if($('#upload-img')[0]) {
      $('#upload-img', function () {
        var elem = $('#upload-img'),
            patt = /\.(jpe?g|png|gif|bmp)$/,
            hide = 'keydown hideTooltip',
            pos = elem.attr('qtip-position');

        if(!patt.test(elem.val())) {
          _createQtip(elem, pos, hide);
          elem.addClass('redError');
          valid = false;
        }
      })
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
        } else {

        }
      })
    }

    // Проверка правильности заполнения поля с password
    if($('#password')[0]) {
      $('#password', function () {
        var elem = $('#password'),
            patt = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
            hide = 'keydown hideTooltip',
            pos = elem.attr('qtip-position');

        if(!patt.test(elem.val())) {
          _createQtip(elem, pos, hide);
          elem.addClass('redError');
          valid = false;
        }
      })
    }

    return valid;

  };

  return {
    init: init,
    validationForm: validationForm
  };

})();

validation.init();
