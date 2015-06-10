function toggleVideo(e) {
    var i = document.getElementById("embed-container");
    var n = i.getElementsByTagName("iframe")[0].contentWindow;
    var func = "hide" == e ? "pauseVideo" : "playVideo";
    n.postMessage('{"event":"command","func":"' + func + '","args":""}', "*");
}


function final() {
    var i = $(".main-content"),
        a = $("header");
    
    $("video").length && $("video").mediaelementplayer({
        enableAutosize: !0
    });
    var t = $(".video-modal"),
        o = $("body"),
        r = function() {
            t.hasClass("is-visible") || (t.removeClass("hidden"), setTimeout(function() {
                t.addClass("is-visible")
            }, 0))
        },
        l = function() {
            t.hasClass("is-visible") && (t.removeClass("is-visible"), setTimeout(function() {
                t.addClass("hidden"), toggleVideo("hide")
            }, 0))
        };
    o.on("click", ".modal-open", function(e) {
        e.preventDefault(), r()
    }), o.on("click", ".modal-close", function(e) {
        e.preventDefault(), e.stopPropagation(), l()
    }), t.on("click", function(e) {
        $(e.target).is(t) && l()
    }), $(document).keyup(function(e) {
        "27" == e.which && l() //probably esc button, we believe this to be the case
    })
}

$(document).ready(function() {
    final()
});