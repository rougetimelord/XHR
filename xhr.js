document.addEventListener("DOMContentLoaded", function () { addClickers() });
var addClickers = function () {
    var linkArray = document.getElementsByTagName('a');
    if (!!history.pushState && linkArray.length != 0) {
        console.log('Detection passed ', linkArray.length, ' link(s)');
        for (var i = 0; i <= linkArray.length - 1; i += 1) {
            var link = linkArray[i]
            attachListen(link);
        }
    }
    else {
        error(linkArray.length);
    }
}
var attachListen = function (a) {
    a.addEventListener("click", function (e) {
        e.preventDefault();
        swap(a.href);
        console.log('Blocked ', a.href, ' from loading');
        history.pushState(null, null, a.href);
    }, false);
}
var error = function (a) {
    if (!history.pushState)
        console.log('History API is not supported')
    if (a === 0)
        console.log('There are no links')
}
var swap = function (res) {
    var req = new XMLHttpRequest();
    console.log(res);
    req.open("GET", res.toString(), false);
    req.send();
    if (req.status == 200) {
        document.body.innerHTML = req.responseText;
        addClickers();
        console.log('Success');
    }
    console.log('Failed with status ', req.status);
}
