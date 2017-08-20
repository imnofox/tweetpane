$(document).ready(function() {
  if ($('li.home.active').length > 0) {
    addFrameWhenReady();
  }

  if (document.URL.indexOf("?tweetpane=1") > 0) {
    // Set links to open on new tab jsut before clicking them
    $('#stream-items-id').on('mousedown', 'a', function(event) {
      event.stopImmediatePropagation();
      $(this).attr('target', '_blank');
    });

    $('#stream-items-id').on('click', '.stream-item .tweet, .QuoteTweet-innerContainer', function(event) {
      if ($(event.target).is('button')) return; // If it's a button, we should let it do it's thing
      event.stopImmediatePropagation();

      // Find the URl, then open it in a new tab
      var url = $(this).attr('href') || $(this).attr('data-permalink-path');
      var newTab = window.open(url, '_blank');
      newTab.location;
    });

    $('html').addClass('tweetpane-addon');
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === "class") {
        if ($(mutation.target).hasClass('active')) {
          addFrameWhenReady();
        }
      }
    });
  });
  observer.observe($('#global-nav-home')[0], {
      attributes: true
  });
});

function addFrameWhenReady() {
  if ($('.dashboard-right').length > 0) {
    if ($('.tweetpane').length < 1) {
      var $frame = $('<iframe>');
      $frame.addClass('tweetpane');
      $frame.attr('src', "https://twitter.com/i/notifications?tweetpane=1");

      $('.dashboard-right').prepend($frame);
      console.log("Placed frame.");
      return;
    }
  }
  else {
    setTimeout(function() {
        addFrameWhenReady();
    }, 500);
  }
}
