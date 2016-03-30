// jshint -W033
// jshint -W119

$('head').append('<link rel="stylesheet" type="text/css" href="./style.css" />')

var url = 'https://api.github.com/orgs/BarlowProgramming/members';
$.get(url, function(users) {
  displayUsers(users)
});

var $container = $('#container')
var $userList = $('#users-list')

function displayUsers(users) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    // console.log(user.name);
    var $userLi = $(
      `<a class="user-container animate" href="${user.html_url}">
        <img class="user-picture" src="${user.avatar_url}" alt="${user.login}'s profile picture"/>
        <div class="user-info">
          <span class="user-link" href="${user.html_url}">${user.login}</span>
        </div>
      </a>`
    )
    $userList.append($userLi)
  }
  $("a.user-container").hover(
    function() {
      var current = $(this).addClass("big");
	  var row = Math.floor(current.index() / 3);
	  var userContainers = $("a.user-container:not(.big)");
	  userContainers.eq(row*3).addClass("small");
	  userContainers.eq(row*3+1).addClass("small");
    }, function() {
      $("a.user-container").removeClass("small").removeClass("big");
    }	
  );
}

