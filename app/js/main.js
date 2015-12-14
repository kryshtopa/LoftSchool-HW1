var myModule = (function () {

  // Инициализирует модуль
  var initIn = function () {
    _setUpListners();
  };

  // // Добавляем плейсхолдеры в IE8
  $('input, textarea').placeholder();

  // Прослушивает события
  var _setUpListners = function () {
    $('.work-new').on('click', _showPopup); // включаем всплывающее окно на странице "Мои Работы"
    $('.popup').on('submit', _addWork);git  // добавляем проект на странице "Мои Работы"
    $('.sprite-cross-small-red').on('click', _hideAl); // закрываем окно ошибки на странице "Мои Работы"
    // $('.authorization-box').on('submit', _login); // отправляем данные со страницы авторизации
    // $('.contact-page').on('submit', _contactForm); // отправляем данные со страницы обратной связи
    // $('.work-new').on('click', function () { // включаем плейсхолдеры в IE8 для попапа страницы "Мои Работы"
    //   $('input, textarea').placeholder();
    // });
  };

  // Работает с модальным окном
  var _showPopup = function (event) {
    event.preventDefault();

    $('.popup-work').bPopup({ // большой попап
      amsl: 0
    });

  };

  // Cоздает тултипы слева
  var tooltip = {
    position: {
      my: 'center right',
      at: 'center left'
    },
    show: {
      event: false,
		  ready: true
	  },
    hide: {
      event: 'keypress'
    },
    text: false,
    style: {
      classes: 'myCustomClass',
      def: false
    }
  };

  // Cоздает тултипы справа
  var tooltipRight = {
    position: {
      my: 'center left',
      at: 'center right'
    },
  	show: {
      event: false,
		  ready: true
	  },
    hide: {
      event: 'keypress'
    },
    text: false,
    style: {
      classes: 'myCustomClass',
      def: false
    }
  };

  // Универсальная функция
  // 1. Собирает данные
  // 2. Проверяет форму
  // 3. Делает запрос на сервер и возвращает ответ
  var _ajaxForm = function (form, url) {

    // if(!valid) return false;

    data = form.serialize();

    var result = $.ajax ({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    })
    .fail(function(ans) {
      console.log('Проблемы с PHP');
      form.find('.error-mes').text('На сервере произошла ошибка').show();
    });

    return result;
  };

  // Страница "Мои Работы"
  var _addWork = function (event) { // отправляем данные из формы
    event.preventDefault();

    // $(document).ready(function() { // меняем стандартную кнопку загрузки картинки
    //    $('.custom-file-input').on('change', function() {
    //       realVal = $(this).val();
    //       lastIndex = realVal.lastIndexOf('\\') + 1;
    //       if(lastIndex !== -1) {
    //          realVal = realVal.substr(lastIndex);
    //          $(this).prev('.mask').find('.fileInputText').val(realVal);
    //       }
    //    });
    // });

    var form = $(this),
        url = 'add_project.php',
        answerFromServer = _ajaxForm(form, url);

console.log(data);

    // answerFromServer.done(function(ans) {
    //   if(ans.status === 'OK'){
    //     $('.popup-work-small').bPopup({ // маленький попап на прохождение валидации
    //       amsl: 0
    //     });
    //     $('.popup-work').bPopup().close(); // основной попап закрывается
    //   } else {
    //     form.find('.popup-alert-error').show(); // показываем блок ошибки заполнения формы
    //     form.find('.work-add').css({ // меняем цвет кнопки при ошибке заполнения
    //       "background-color" : "#f2f0ef",
    //       "background"       : "-moz-linear-gradient( 90deg, rgb(233,230,228) 0%, rgb(251,249,249) 94%, rgb(255,255,255) 100%)",
    //       "border"           : "1px solid #d2d2d2",
    //       "box-shadow"       : "0px 2px 1px 0px rgba(9, 9, 9, 0.1), inset 0px -2px 3px 0px rgba(41, 41, 41, 0.1)"
    //     }).css({
    //       "background"       : "-webkit-linear-gradient( 90deg, rgb(233,230,228) 0%, rgb(251,249,249) 94%, rgb(255,255,255) 100%)",
    //     }).css({
    //       "background"       : "-ms-linear-gradient( 90deg, rgb(233,230,228) 0%, rgb(251,249,249) 94%, rgb(255,255,255) 100%)",
    //     });
    //   }
    //
    //   // Вызываем тултипы
    //   var err = function(){
    //     if (ans.status1 === 'ErrorName'){
    //         $('#project-name').qtip(tooltip); // показываем тултип
    //         $('#project-name').css("box-shadow", "0 0 2px 1px #e0ad9a"); // обводка полей ввода при ошибке
    //         $('#project-name').keyup(function(){ // убираем обводку при вводе текста
    //           $(this).css("box-shadow", "none");
    //         });
    //       } else {
    //         $('#project-name').qtip('destroy', true); // выключаем тултип при наличии текста в поле
    //       };
    //   }();
    //   var err2 = function(){
    //     if (ans.status2 === 'ErrorUrl'){
    //         $('#project-url').qtip(tooltip);
    //         $('#project-url').css("box-shadow", "0 0 2px 1px #e0ad9a");
    //         $('#project-url').keyup(function(){
    //           $(this).css("box-shadow", "none");
    //         });
    //       } else {
    //         $('#project-url').qtip('destroy', true);
    //       }
    //   }();
    //   var err3 = function(){
    //     if (ans.status3 === 'ErrorMessage'){
    //         $('#project-message').qtip(tooltip);
    //         $('#project-message').css("box-shadow", "0 0 2px 1px #e0ad9a");
    //         $('#project-message').keyup(function(){
    //           $(this).css("box-shadow", "none");
    //         });
    //       } else {
    //         $('#project-message').qtip('destroy', true);
    //       }
    //   }();
    //
    //   var err4 = function(){
    //     if (ans.status0 === 'ErrorImg'){
    //       $('#project-img').qtip(tooltip);
    //       $('#project-img').css("box-shadow", "0 0 2px 1px #e0ad9a");
    //       $('#project-img').keyup(function(){
    //         $(this).css("box-shadow", "none");
    //       });
    //     } else {
    //       $('#project-img').qtip('destroy', true);
    //     }
    //   }();
    //
    // })
  };

  // Cтраница авторизации
  var _login = function (event) { // отправляем данные из формы
    event.preventDefault();

    // var form = $(this),
    //     url = 'login.php',
    //     answerFromServer = _ajaxForm(form, url);
    //
    //     answerFromServer.done(function(ans) {
    //
    //     // Вызываем тултипы
    //     var err4 = function(){
    //       if (ans.status1 === 'ErrorLogin'){
    //           $('#mail').qtip(tooltipRight); // показываем тултип
    //           $('#mail').css("box-shadow", "0 0 2px 1px #e0ad9a");
    //           $('#mail').keyup(function(){
    //             $(this).css("box-shadow", "none");
    //           });
    //         } else {
    //           $('#mail').qtip('destroy', true); // выключаем тултип при наличии текста в поле
    //         };
    //     }();
    //     var err5 = function(){
    //       if (ans.status2 === 'ErrorPassword'){
    //           $('#key').qtip(tooltipRight);
    //           $('#key').css("box-shadow", "0 0 2px 1px #e0ad9a");
    //           $('#key').keyup(function(){
    //             $(this).css("box-shadow", "none");
    //           });
    //         } else {
    //           $('#key').qtip('destroy', true);
    //         }
    //     }();
    //
    // })
  };

  // Форма обратной связи
  var _contactForm = function (event) { // отправляем данные из формы
    event.preventDefault();

    var form = $(this),
        url = 'contact-form.php',
        answerFromServerContacts = _ajaxForm(form, url);

      // answerFromServerContacts.done(function(ans) {
      //
      // // Вызываем тултипы
      // var err6 = function(){
      //   if (ans.status1 === 'ErrorName'){
      //       $('#contact-name').qtip(tooltip); // показываем тултип
      //       $('#contact-name').css("box-shadow", "0 0 2px 1px #e0ad9a");
      //       $('#contact-name').keyup(function(){
      //         $(this).css("box-shadow", "none");
      //       });
      //     } else {
      //       $('#contact-name').qtip('destroy', true); // выключаем тултип при наличии текста в поле
      //     };
      // }();
      // var err7 = function(){
      //   if (ans.status2 === 'ErrorEmail'){
      //       $('#contact-mail').qtip(tooltipRight);
      //       $('#contact-mail').css("box-shadow", "0 0 2px 1px #e0ad9a");
      //       $('#contact-mail').keyup(function(){
      //         $(this).css("box-shadow", "none");
      //       });
      //     } else {
      //       $('#contact-mail').qtip('destroy', true);
      //     }
      // }();
      // var err8 = function(){
      //   if (ans.status3 === 'ErrorText'){
      //       $('#contact-message').qtip(tooltip);
      //       $('#contact-message').css("box-shadow", "0 0 2px 1px #e0ad9a");
      //       $('#contact-message').keyup(function(){
      //         $(this).css("box-shadow", "none");
      //       });
      //     } else {
      //       $('#contact-message').qtip('destroy', true);
      //     }
      // }();
      //
      // // Очищаем поля по кнопке "Очистить"
      // $('.contact-page-clear').on('click', function(){
      //     $(this).closest('form').find("input[type=text], textarea").val("");
      //     $('#contact-mail').qtip('destroy', true);
      //     $('#contact-message').qtip('destroy', true);
      //     $('#contact-name').qtip('destroy', true);
      //     $('#contact-mail').css("box-shadow", "none");
      //     $('#contact-message').css("box-shadow", "none");
      //     $('#contact-name').css("box-shadow", "none");
      //   }
      // );

      // })
  };

  // Закрывает окно ошибки
  var _hideAl = function (event) {
    event.preventDefault();

    $('.popup-alert-error').hide();
  };

  // Возвращает объект
  return {
    init : initIn
  };

})();

myModule.init();
