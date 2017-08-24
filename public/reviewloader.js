var payload = '<div class="wees-popup-container" style="position: fixed; bottom: 0; z-index:9999999999999999; background-color: #7b7b7b; padding: 5px 10px 0 5px;"><img src="https://weespring.com/media/weeSpring-logo-transparent-1.png"/></div>';
var username = jQuery('#weespringUsername').text();

if(!jQuery){
    jQuery.noConflict();
}

jQuery('body').prepend(payload);

var selectors = [];

//BuyBuyBaby, BedBathBeyond
selectors['#BVSubmissionContainer'] = {
    stars: "[name='rating']",
    title: "[name='title']",
    body: "[name='reviewtext']",
    submit: "#BVButton -> Submit"
};

//Walgreens
selectors["#bv-mboxzone-lightbox"] = {
    stars: ".bv-rating-input:checked",
    title: "#bv-text-field-title",
    body: "#bv-textarea-field-reviewtext",
    submit: "bv-submission-button-submit"
};

//Albeebaby
selectors[".pdReviewForm"] = {
    stars: "#pdSetRating",
    title: "[name='reviewTitle']",
    body: "[name='reviewBody']",
    submit: ".submit"
};

//Mbeans
selectors["#ItemPreviewReviewPopup"] = {
    stars: ".ItemReviewRating",
    title: ".ItemReviewTitle",
    body: ".ItemReviewContent",
    submit: "#IPRPBSubmitReview"
};

//Walmart
selectors[".js-submit-review-container"] = {
    stars: "#review-rating",
    title: "#review-title",
    body: "#review-body",
    submit: ".js-submit-review"
};

//Target
selectors[".js-reviews-reviewForm"] = {
    stars: "[name='overall--rating']",
    title: "#reviewTitleInput2",
    body: "#reviewTextArea2",
    submit: ".js-reviews-submitReview"
};

//Nordstrom
selectors["#ReviewSubmission"] = {
    stars: "star active",
    title: "[name='title']",
    body: "[name='reviewtext']",
    submit: ".review-submission-buttons button"
};


for (var key in selectors) {
    if(jQuery(key).length){
        var section = selectors[key];
        var stars = jQuery(section.stars).val();
        var title = jQuery(section.title).val();
        var body = jQuery(section.body).val();
        console.log(stars,title,body);
    }
}

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
};