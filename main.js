$(function () {
    $('.result').hide();
    const $submitButton = $('#submit');
    const $searchInput = $('#search');
    const $resultStatus = $('.status');
    $submitButton.on('click', function (e) {
        $resultStatus.html('Loading results.....');
        const searchTerm = $searchInput.val();
        const searchQuery = 'https://google.co.in/search?q=' + searchTerm;
        getPage(searchQuery, function (err, data) {
            if (err) {
                $resultStatus.html('An error occured');
                console.log(err);
            }
            else {
                console.log('cb runs');
                const $data = $($.parseHTML(data));
                const $divSrg = $($($data.children().find('div.srg')));
                $divSrg.each(function() {
                    const $headingA = $(this).find('div.g > div > div.rc > h3.r');
                    console.log($($headingA.html()).html());
                    // console.log($(this).find('div.g').find('div').find('div.rc').find('h3.r').html());
                });
                $resultStatus.html('Results loaded');
            }
        });
    });
});

function getPage(link, cb) {
    $.ajax({
        'url': 'https://cors-anywhere.herokuapp.com/' + link,
        'method': 'GET',
        'success': function (data) {
            console.log('returned something');
            console.log(data);
            cb(null, data.replace(/<img[^>]*>/g, ""));
        },
        'error': function (err) {
            console.log(err);
            cb(err, null);
        }
    });
}
