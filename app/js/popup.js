var myModule = (function () {

  var initIn = function () {
    _setUpListners();
  };

  var _setUpListners = function () {
    $('.work-new').on('click', _showPopup); // включаем всплывающее окно
    $('.work-add').on('click', _addWork); // добавляем проект
  };

  var _showPopup = function (event) {
    event.preventDefault();

    $('.popup-work').bPopup({
      //поведение всплывающего окна

    });
  };

  var _addWork = function () {
    var form = $(this);
    console.log(form);
    $.ajax ({

    });

    return false; // или function(event) -> event.preventDefault();
  }

  return {
    init : initIn
  };

})();

myModule.init();
