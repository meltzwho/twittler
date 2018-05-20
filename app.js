$(document).ready(function() {
  //populate tweets
  var visitor = '[self]';
  var filtered = false;
  var $feed = $('.feed');

  var populate = function(source) {
    $feed.html('');

    var index = source.length - 1;
    while (index >= 0) {
      var tweet = source[index];
      var $tweet = $('<div></div><br>');
      $tweet.html('@' + '<a class="user" data-user="' + tweet.user + '">' + tweet.user + '</a>' + ': ' + tweet.message + '<br><span>' + tweet.created_at + '</span>');
      $tweet.appendTo($feed);
      index -= 1;
    }

    //allow user filtering
    $('.user').click(function() {
      filtered = true;
      var user = $(this).data("user");
      var source = streams.users[user];
      populate(source);
    });
  };

  populate(streams.home);

  $feed.on('newTweet', function() {
    var user = $('.user').first().data("user");
    var source = filtered ? streams.users[user] : streams.home;
    populate(source);
  });

  $('textarea').focusin(function() {
    $(this).val('');
  });

  $('textarea').focusout(function() {
    setTimeout(() => $(this).val('...your tweet here'), 500);
  });

  $('#home').click(() => {
    filtered = false;
    populate(streams.home);
  });

  $('#self').click(() => {
    if (streams.users[visitor] !== undefined) {
      filtered = true;
      populate(streams.users[visitor])
    }
  });

  $('#writeTweet').click(() => {
    if ($('textarea').val() !== '')
      writeTweet($('textarea').val(), visitor);
  });
});