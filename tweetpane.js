$(document).ready(function() {
  if ($('li.home.active').length > 0) {
    $('.tweetpane').remove();
    var $frame = $('<iframe>');
    $frame.addClass('tweetpane');
    $frame.attr('src', "https://twitter.com/i/notifications?tweetpane=1");

    $('.dashboard-right').prepend($frame);
  }
});
