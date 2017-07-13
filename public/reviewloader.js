var payload = '<div class="wees-popup-container" style="position: fixed; bottom: 0; z-index:9999999999999999; background-color: #7b7b7b; padding: 5px 10px 0 5px;"><img src="https://weespring.com/media/weeSpring-logo-transparent-1.png"/></div>';
var username = $('#weespringUsername').text();
$('body').prepend(payload);
$('body').on('click', function (evt) {
    var valid = false;
    var formData = $(evt.target).closest('form').serializeArray();
    if (formData.length > 1) {
        var title = formData.filter(function (input) {
            return input.name.toLowerCase() == 'title';
        });
        var reviewText = formData.filter(function (input) {
            return input.name.toLowerCase() == 'reviewtext';
        });
        var rating = formData.filter(function (input) {
            return input.name.toLowerCase() == 'rating';
        });
        if(rating[0] && title[0] && reviewText[0]) {
            if(rating[0].value*1 > 0 && title[0].value.length > 0 && reviewText[0].value.length > 0) {
                valid = true;
            }
        }
    }
    if(valid) {
        alert('Thanks ' + username + ', we were successfully able to automatically submit your review to weeSpring. Please proceed with submitting your review.');
        var review = {
            site: window.location.origin,
            user: username,
            rating: rating[0].value,
            reviewTitle: title[0].value,
            reviewText: reviewText[0].value,
            fullData: formData
        };
        saveReview(review);
    }else{
        console.log(formData);
        alert('Sorry! We were unable to automatically submit your review to weeSpring. Please take a screenshot of your review and submit it manually.');
    }
    $('body').unbind('click');
    $('.wees-popup-container').remove();
    console.log('detached');
});

function saveReview(postData) {
    var firebase = window.firebase;
    var config = {
        apiKey: "AIzaSyCm-jezKQ3KgreJuUUQIHQwqwwPRhnxwDM",
        authDomain: "tacothursdaysandbox-38281.firebaseapp.com",
        databaseURL: "https://tacothursdaysandbox-38281.firebaseio.com",
        projectId: "tacothursdaysandbox-38281",
        storageBucket: "tacothursdaysandbox-38281.appspot.com",
        messagingSenderId: "105198308397"
    };
    firebase.initializeApp(config);
    var newReviewKey = firebase.database().ref().child('reviews').push().key;
    var updates = {};
    updates['/posts/' + newReviewKey] = postData;
    updates['/user-posts/' + postData.user + '/' + newReviewKey] = postData;

    return firebase.database().ref().update(updates);
}