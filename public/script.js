function init(uid) {

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
        updates['/user-posts/' + uid + '/' + newReviewKey] = postData;

        return firebase.database().ref().update(updates);
    }

    function getReview(inputs) {
        var formValues = {};
        inputs.each(function() {
            if(this.type == 'radio') {
                if($(this).is(':checked')){
                    formValues["'" + this.name + "'"] = this.value;
                }
            } else {
                formValues["'" + this.name + "'"] = this.value;
            }
        });
        return formValues;
    }

    function atCheckReviewSubmitted() {
        if($('.bv-submission-thankyou').is(':visible')){
            atUpdateToolbar('review-posted', true);
        } else {
            setTimeout(atCheckReviewSubmitted, 500);
        }
    }

    function atListenForLightbox(){
        if($('#bv-mboxzone-lightbox').is(':visible') || $('#BVSubmissionContainer').is(':visible')){
            atUpdateToolbar('form-loaded', true);
            atBindFormSubmit(saveReview);
        } else {
            setTimeout(atListenForLightbox, 500);
        }
    }

    function atBindFormSubmit(callback) {
        $('[name="bv-submit-button"]').click(function(){
            if($('#BVSubmissionContainer').is(':visible')){
                callback(getReview($('#BVSubmissionContainer input, #BVSubmissionContainer textarea')));
            } else if ($('#bv-mboxzone-lightbox').is(':visible') ) {
                callback(getReview($('#bv-mboxzone-lightbox input, #bv-mboxzone-lightbox textarea')));
            }
        });
        setTimeout(atCheckReviewSubmitted, 500);
    }

    function atUpdateToolbar(segment, state) {
        if(!state){
            $('.'+segment).removeClass('pass').addClass('fail');
        } else {
            $('.'+segment).removeClass('fail').addClass('pass');
        }
    }
    $('body').prepend('<style>.at-review-toolbar{position: fixed; z-index: 999999999; text-align: center; bottom: 0; border-bottom: 1px solid #8b8b8b; width: 100%;}.column{width: 33%; display: inline-block;}.column-content{text-align: center;}.borders{border-left: 1px solid #8b8b8b; border-right: 1px solid #8b8b8b;}.status{color: #ffffff; font-family: "Arial Black"; font-size: 16px;}.fail{background-color: #C70000;}.pass{background-color: #00C700;}</style><div class="at-review-toolbar"> <div class="column"> <div class="column-content found-button status fail"> <div>Found Review Button on Page</div></div></div><div class="column"> <div class="column-content borders form-loaded status fail"> <div>Review Form Loaded</div></div></div><div class="column"> <div class="column-content review-posted status fail"> <div>Review Successfully Posted</div></div></div></div>');
    setTimeout(atListenForLightbox, 500);
}

function bootstrap() {
    if(typeof jQuery=='undefined') {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
        headTag.appendChild(jqTag);
    }
    if(typeof firebase=='undefined') {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = 'https://www.gstatic.com/firebasejs/4.1.3/firebase.js';
        headTag.appendChild(jqTag);
    }
    setTimeout(init('Andrew2'), 3000);
}

bootstrap();