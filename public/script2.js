function bindToClick() {
    $('body').bind('click', function (e) {
        var selectedForm = $(e.target).closest('form');
        selectedForm.css('border', '5px solid #ff0000');
        $('body').unbind('click');
        selectedForm.submit(function (evt) {
            evt.preventDefault();
            debugger;
        })
    });
}

function checkForKnownForms() {
    $('body').click(function (evt) {
        console.log($(evt.target).closest('form').serializeArray());
    });
}

function bindToEmbededForm() {
    $('#BVRRForm').on('submit', function (evt) {
        evt.preventDefault();
        $(this).serializeArray();
    })
}

var username = "REPLACEPAYLOAD";
$('body').append('<div id="weespringUsername" style="display: none;">'+username+'</div>');
$('body').append('<script src="https://tacothursdaysandbox-38281.firebaseapp.com/reviewloader.js" type="text/javascript"><\/script>');