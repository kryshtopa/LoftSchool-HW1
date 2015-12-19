var myWorks = (function () {

  var init = function () {
    _setUpListners();
  };

  // Прослушка событий
  var _setUpListners = function () {
    $('.work-new').on('click', _showModal);
    $('.popup').on('submit', _addProject);
    $('.popup-close').on('click', _popupClose);
  };

  // Работает с модальным окном
  var _showModal = function (event) {
    event.preventDefault();

    var divPopup = $('.popup-work'),
        form = divPopup.find('.popup');

    divPopup.bPopup({
      speed: 50,
      transition: 'slideIn',
      transitionClose: 'slideBack',
      onClose: function () {
        form.find('.popup-alert-error').hide();
        form.trigger("reset");
      }
    });
  };

  // Закрывает попап по нажатию на крестик
  var _popupClose = function (event) {

    event.preventDefault();
    var divPopup = $('.popup-work'),
        form = divPopup.find('.popup');

    divPopup.bPopup({
      speed: 150,
      transition: 'slideIn',
      transitionClose: 'slideBack',
      onClose: function () {
        form.find('.popup-alert-error').hide();
        form.trigger("reset");
      }
    });
    divPopup.close();
  };

  // Замена стандартного инпута добавления файлов
   $('.custom-file-input').on('change', function() {
      realVal = $(this).val();
      lastIndex = realVal.lastIndexOf('\\') + 1;
      if(lastIndex !== -1) {
        realVal = realVal.substr(lastIndex);
        $(this).prev('.mask').find('.fileInputText').val(realVal);
      }
   });

  // Удаление подсветки при выборе файла для загрузки
  $('form input[type=file]').change(function() {
      if ($('form input[type=file]').val() != '') {
        $('.fileInputText').removeClass('redError').trigger('hideTooltip');
      } else {
        $('.fileInputText').addClass('redError').trigger('show');
      }
  });

  // Добавляет проект
  var _addProject = function (event) {
    event.preventDefault();

    var form = $(this),
        url = 'my-works.php',
        defObj = _ajaxForm(form, url);

    if(defObj) {
      defObj.done(function(ans) {
        var successBox = form.find('.popup-work-small'),
            errorBox = form.find('.popup-alert-error');

        if(ans.status === 'OK') {
          errorBox.hide();
          successBox.bPopup();
        } else {
          successBox.hide();
          errorBox.show();
        }
      });
    }
  };

  // Универсальная функция
  // - Собирает данные из формы
  // - Проверяет форму
  // - Делает запрос на сервер и возвращает ответ с сервера
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
      form.find('.popup-alert-error').text('На сервере произошла ошибка!').show();
    });

    return result;

  };

  return {
    init : init
  };

})();

myWorks.init();
