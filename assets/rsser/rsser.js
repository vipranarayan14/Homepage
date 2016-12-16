var Rss = {

    getFeeds: function(srcUrl, ele) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                console.info("Got Feeds.");
                Rss.update(srcUrl, this.responseText, ele);
            }
            else {

                var failedMsg = "Feeds fetching failed!";

                console.warn(failedMsg);
                ele.innerHTML = '<center><p style="font-size:20px; color:red">' + failedMsg + '</p></center>';
            }
        }

        xhttp.open("GET", srcUrl, true);
        xhttp.send();

    },

    load: function() {

        var eles = document.querySelectorAll(".rssShow");

        for (var i = 0; i < eles.length; i++) {

            var srcAttrVal = eles[i].getAttribute("source");
            var srcUrl = rssSources[srcAttrVal.split('.')[1]];

            var lsItem = localStorage.getItem(srcUrl);

            var minutesNow = new Date().getMinutes();

            Number.prototype.between = function(a, b, inclusive = true) {
                var min = Math.min(a, b),
                    max = Math.max(a, b);

                return inclusive ? this >= min && this <= max : this > min && this < max;
            }

            if (lsItem !== null) {

                eles[i].innerHTML = lsItem;

            } else {

                Rss.getFeeds(srcUrl, eles[i]);
            }

            if (minutesNow.between(0, 5) || minutesNow.between(30, 35)) {

                Rss.getFeeds(srcUrl, eles[i]);
            }
        }

    },

    reload: function(trgt) {

        var rlTarget = rssSources[trgt.split('.')[1]];
        localStorage.removeItem(rlTarget);
        Rss.load();
    },

    update: function(srcUrl, feed, ele) {

        var rssFeed = Rss.makeHTML(feed);
        localStorage.setItem(srcUrl, rssFeed);
        ele.innerHTML = rssFeed;

    },

    makeHTML: function(xml) {

        function parseXMLtoJSON(xmlRaw) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlRaw, "text/xml");

            if (xmlDoc.querySelector("parsererror") === null) {

                var x2js = new X2JS();
                var jsonObj = x2js.xml2json(xmlDoc);
                return jsonObj;

            } else {
                console.log("%cThe provided URL does not contain a feed!", "color:red;");
                console.log(xmlDoc.querySelector("parsererror"));
                return null;
            }
        }

        var feedObj, feedChannel, feedTitle, feedItems, HTMLDoc;

        feedObj = parseXMLtoJSON(xml);

        if (feedObj !== null) {

            feedChannel = feedObj.rss.channel;

            feedTitle = '<h3 class="feed-title">' + '<a href="' + feedChannel.link + '">'
                + feedChannel.title
                + '</a>' + '</h3>';

            feedItems = "";

            for (var i = 0; i < feedChannel.item.length; i++) {
                feedItems += ('<h4 class="feed-item-title">' + '<a href="' + feedChannel.item[i].link + '">'
                    + feedChannel.item[i].title + '</a></h4>');
                feedItems += '<p class="feed-item-desc">' + feedChannel.item[i].description + '</p>';
            }

            HTMLDoc = feedTitle + feedItems;

            return HTMLDoc;
        }
    }
}