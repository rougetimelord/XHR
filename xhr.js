document.addEventListener("DOMContentLoaded", function () { addClickers() });
var addClickers = function () {
    var linkArray = document.getElementsByTagName('a');
    if (!!history.pushState && linkArray.length != 0) {
        console.log('Detection passed ', linkArray.length, ' link(s)');
        for (var i = 0; i < linkArray.length; i++) {
            attachListen(linkArray[i]);
        }
    }
    else {
        var eCode = (linkArray.length == 0) ? -1 : -2;
        error(eCode);
    }
}
var attachListen = function (a) {
    a.addEventListener("click", function (e) {
        e.preventDefault();
        swap(a.href);
        console.log('Blocked ', a.href, ' from default');
        history.pushState(null, null, a.href);
    }, false);
}
var error = function (a) {
    if (!history.pushState)
        throw('History API is not supported')
    if (a == -1)
        throw('There are no links')
    else if(a == 404)
        console.log('Resource not found');
    else if(a == 0)
        console.log('Empty response');
    else if(a == 400)
        console.log('Bad reequest')
    else if(a == 401 || a == 403)
        console.log('Forbidden/unauthorized');
    else if(a >= 300)
        console.log('Something went wrong with code ',a);
}
var swap = function (res) {
    var req = new XMLHttpRequest();
    req.open("GET", res, true);
    req.timeout = 4000;
    req.onload = function() {if (req.status == 200 || req.status == 304) {
            document.body.innerHTML = req.responseText;
            console.log('Successfully fetched ', res);
            addClickers();} else { error(req.status);}}
    req.send();
}
