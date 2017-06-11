var main = function() {
  $('.apartments').click(function() {
    $('.apartments-madlib').fadeIn(300);
  });
  $('.roommates').click(function() {
    $('.apartments-madlib').fadeIn(300);
  });
  $('.both').click(function() {
    $('.both-madlib').addClass('active');
  });
}

$(document).ready(main);
