import Player from "@vimeo/player";

function format(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

const vimeo = {
    init: () => {
        try {
            let videoLength;

            let options = {
                background: true,
                controls: false,
            };

            const iframe = document.querySelector("iframe");
            const player = new Player(iframe, options);

            player.play();

            player.on("chapterchange", function (chapter) {
                $(".chapter").removeClass("active-chapter");
                $(".chapter[value=" + chapter.startTime + "]").addClass(
                    "active-chapter"
                );
            });

            player.on("playing", function () {
                $(".js-play").hide();
                $(".js-pause").show();
                player.getDuration().then(function (duration) {
                    videoLength = duration;
                });

                setInterval(function () {
                    player.getCurrentTime().then(function (time) {
                        var percentage = (100 / videoLength) * time;
                        $(".project__timer").html(
                            format(time) + " / " + format(videoLength)
                        );
                        $(".project__progressbar").css("width", percentage + "%");
                    });
                }, 100);
            });

            $(".js-play").hide();
            $(".js-sound").hide();

            $(".js-play").click(function () {
                player.play();
                $(".js-play").hide();
                $(".js-pause").show();
            });

            $(".js-pause").click(function () {
                player.pause();
                $(".js-play").show();
                $(".js-pause").hide();
            });
            
            $('.switch input').change(function () {
                if ($(this).is(':checked') == true) {
                    player.pause();
                }
            })

            $(".js-mute").click(function () {
                player.setMuted(true);
                $(".js-mute").hide();
                $(".js-sound").show();
            });

            $(".js-sound").click(function () {
                player.setMuted(false);
                $(".js-mute").show();
                $(".js-sound").hide();
            });

            player.on("pause", function () {
                $(".js-play").show();
                $(".js-pause").hide();
            });

        } catch { }
    },
};

export default vimeo;


