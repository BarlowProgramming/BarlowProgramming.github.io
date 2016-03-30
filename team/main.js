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
    var $userLi = $(
      `<a id="user-${user.login}" class="user-container animate" href="${user.html_url}">
         <div class="user-main-container">
	       <img class="user-picture" src="${user.avatar_url}" alt="${user.login}'s profile picture"/>
           <div class="user-info">
             <span class="user-link" href="${user.html_url}">${user.login}</span>
           </div>
		 </div>
		 <div class="user-details-container">
		   <span class="user-link"></span>	
		 </div>
       </a>`
    );
    $userList.append($userLi)
  }
  $.getJSON("userDetails.json", function(userDetails) {
    for(var i = 0; i < userDetails.length; i++) {
      if($("#user-" + userDetails[i].username).length == 1) {
	    var userContainer = $("#user-" + userDetails[i].username);
  	    userContainer.find(".user-link:last").text(userDetails[i].name);
	    userContainer.find(".user-details-container").append(userDetails[i].details || "<div style='text-align:center'>No details</div>");
	  }
    }
  });
  $("a.user-container").hover(
    function() {
      var current = $(this).addClass("big");
	  var row = Math.floor(current.index() / 3);
	  var userContainers = $("a.user-container:not(.big)");
	  userContainers.eq(row*3).addClass("small");
	  userContainers.eq(row*3+1).addClass("small");
	  current.children().addClass("active");
    }, function() {
      $("a.user-container:not(big)").removeClass("small");
	  $(this).removeClass("big");
	  $(this).children().removeClass("active");
    }	
  );
}

