var x = 0,
    interval,
    video = document.getElementsByTagName("video")[0];

VIDEO_MODIFIED = true;
VIDEO_ROTATE_SCALING = 1.0;

var modifyVideo = function () {
    if (VIDEO_MODIFIED) {
        x++;

        video.style.transform = "rotate(" + ((x * VIDEO_ROTATE_SCALING) % 360) + "deg)";
    } else {
        clearInterval(interval);
    }
};

interval = setInterval(modifyVideo, 1);