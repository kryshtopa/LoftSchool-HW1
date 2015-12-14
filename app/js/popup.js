// var myModule = (function () {
//
//   var initIn = function () {
//     _setUpListners();
//   };
//
//   var _setUpListners = function () {
//     $('.work-new').on('click', _showPopup); // включаем всплывающее окно
//     $('.work-add').on('click', _addWork); // добавляем проект
//   };
//
//   var _showPopup = function (event) {
//     event.preventDefault();
//
//     $('.popup-work').bPopup({
//       //поведение всплывающего окна
//
//     });
//   };
//
//   var _addWork = function (event) {
//     event.preventDefault();
//
//
//     var form = $(this),
//         url = 'add_project.php',
//         data =  form.serialize();
//
//     //запрос на сервер
//     $.ajax({
//       url: url,
//       type: 'POST',
//       dataType: 'json',
//       data: data,
//     })
//     .done(function(ans) {
//       form.find('.popup-alert-error').text();
//     })
//     .fail(function() {
//       console.log("error");
//     })
//     .always(function() {
//       console.log("complete");
//     });
//
//   }
//
//   return {
//     init : initIn
//   };
//
// })();
//
// myModule.init();
