var main = function() {
  $('.next-form').click(function() {
    var currentForm = $('.active-form');
    var nextForm = currentForm.next();

    currentForm.fadeOut(600).removeClass('active-form');
    nextForm.fadeIn(600).addClass('active-form');
  });
};

$(document).ready(main);
