// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // stick our user data array into a userList
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function showUserInfo(event) {

    // present link from firing
    event.preventDefault();

    // retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Using .map to apply a function to each object in our userListData aray. This will spit out a brand new array
    // containing only whatever the function name returns. That function (anonymus callback) strictly return
    // the username.  If the original array contained two complete user objects, the the array returned by use
    // of .map would only contain usernames. Then when we have that array of usernames, we are chaining indexOf
    // in combination with the username of choice, to get the array index of that username. 
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Use that index number stored as arrayposition to go back to our original user data array and 
    // start pulling data.
    var thisUserObject = userListData[arrayPosition];

    // using the thisUserObject variable, populate info box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

}