var Rss = {

    getFeeds: function (srcUrl, ele) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                console.log("Getting Rss feeds...");
                localStorage.setItem(srcUrl, this.responseText);
                ele.innerHTML = this.responseText;
            }
        };

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function () {

        var eles = document.querySelectorAll(".rssShow");

        for (var i = 0; i < eles.length; i++) {

            var srcAttrVal = eles[i].getAttribute("source");
            var srcUrl = rssSources[srcAttrVal.split('.')[1]];

            var lsItem = localStorage.getItem(srcUrl);

            var minutesNow = new Date().getMinutes();

            if (lsItem !== null) {

                eles[i].innerHTML = lsItem;

            } else {

                Rss.getFeeds(srcUrl, eles[i]);
            }

            if (minutesNow === (30 || 0)) {

                Rss.getFeeds(srcUrl, eles[i]);
            }
        }

    },

    reload: function (trgt) {
        var rlTarget = rssSources[trgt.split('.')[1]];
        localStorage.removeItem(rlTarget);
        Rss.load();
    }
}