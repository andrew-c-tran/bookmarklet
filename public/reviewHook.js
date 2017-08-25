var selectors = [];

//BuyBuyBaby, BedBathBeyond
selectors['#BVSubmissionContainer'] = {
    stars: "input[name='rating']",
    title: "input[name='title']",
    body: "input[name='reviewtext']",
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
    title: "input[name='reviewTitle']",
    body: "input[name='reviewBody']",
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
    stars: "input[name='overall--rating']",
    title: "#reviewTitleInput2",
    body: "#reviewTextArea2",
    submit: ".js-reviews-submitReview"
};

//Nordstrom
selectors["#ReviewSubmission"] = {
    stars: "star active",
    title: "input[name='title']",
    body: "input[name='reviewtext']",
    submit: ".review-submission-buttons button"
};


for (var key in selectors) {
    console.log(key, selectors[key].stars);
}