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
    form.find('input, textarea').trigger('hideTooltip');
    form.find('.redError').removeClass('redError');
    form.find('.popup-alert-error').text('На сервере произошла ошибка!').hide();
  };

  // Создает тултип
  var _createQtip = function (element, position) {

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
    element.qtip({
      content: {
        text: function() {
          return $(this).attr('qtip-content');
        }
      },
      show: {
        event: 'show'
      },
      hide: {
        event: 'keydown hideTooltip',
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

    var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'), // кроме кнопки изображения на странице "Мои Работы"
        valid = true;

    // Просмотр всех элементов формы
    $.each(elements, function (index, val) {
      var element = $(val),
          val = element.val(),
          pos = element.attr('qtip-position');


      // Проверка правильности заполнения полей
      if(val.length === 0 || grecaptcha.getResponse() == '') {
        _createQtip(element, pos);
        element.addClass('redError');
        valid = false;
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
