var payload = '<div class="wees-popup-container" style="position: fixed; bottom: 0; z-index:9999999999999999; background-color: #7b7b7b; padding: 5px 10px 0 5px;"><img src="https://weespring.com/media/weeSpring-logo-transparent-1.png"/></div>';
var username = jQuery('#weespringUsername').text();

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

jQuery('body').prepend(payload);

var selectors = [];

//BuyBuyBaby, BedBathBeyond
selectors['.triggerBVsubmitReview'] = {
    stars: ".BVRRRatingOverall .BVRRRatingNumber:not(.visuallyhidden)",
    title: ".BVRRReviewTitle",
    body: ".BVRRReviewText",
    submit: "#BVButtonSubmitID"
};

//Walgreens
selectors[".bv-submission-button"] = {
    stars: ".bv-rating-input:checked",
    title: "#bv-text-field-title",
    body: "#bv-textarea-field-reviewtext",
    submit: ".bv-submit"
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
selectors[".js-reviews-showComposeReviewPanel"] = {
    stars: "input[name='overall--rating']:checked",
    title: "#reviewTitleInput1",
    body: "#reviewTextArea1",
    submit: ".js-reviews-submitReview"
};

//Nordstrom
selectors["#ReviewSubmission"] = {
    stars: ".star.active",
    title: "[name='title']",
    body: "[name='reviewtext']",
    submit: ".review-submission-buttons button"
};

var mainKey = null;
var sections = null;

for (var key in selectors) {
    if(jQuery(key).length){
        alert('Hooray! weeSpring is able to start tracking your review. Write away!');
        mainKey = key + '';
        sections = selectors[mainKey];
        jQuery('body').on('mousedown', selectors[mainKey]['submit'], function() {
            if (mainKey == "#ItemPreviewReviewPopup") {
                var stars = jQuery(mainKey).find(sections.stars).attr('class').replace('ItemReviewRating Rating', '') / 2;
                var title = jQuery(mainKey).find(sections.title).text();
                var body = jQuery(mainKey).find(sections.body).text();
            } else if (mainKey == ".triggerBVsubmitReview"){
                var stars = jQuery(sections.stars).text();
                var title = jQuery(sections.title).text();
                var body = jQuery(sections.body).text();
            } else {
                var stars = jQuery(sections.stars).val();
                var title = jQuery(sections.title).val();
                var body = jQuery(sections.body).val();
            }
            if (mainKey == "#ReviewSubmission") {
                var stars = jQuery(sections.stars).length;
            }
            var site = window.location.hostname;
            var page = window.location.href;
            saveReview({
               user: username,
               stars: stars,
               title: title,
               body: body,
               site: site,
               page: page
            });
            alert('Done! weeSpring successfully captured your review!');
        });
    }
}

if(!mainKey) {
    alert('Hmmm, something isn\'t working. Please make sure you\'re on the product page of what you want to review and let\'s try it again. Still not working? Email support@weespring.com.');
}

function saveReview(postData) {
    var newReviewKey = firebase.database().ref().child('reviews').push().key;
    var updates = {};
    updates['/posts/' + newReviewKey] = postData;
    updates['/user-posts/' + postData.user + '/' + newReviewKey] = postData;

    return firebase.database().ref().update(updates);
};

