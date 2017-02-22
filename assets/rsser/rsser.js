var Rss = {

    init: function () {
        var feedListContainer = document.querySelector('#rss-feeds-container');

        for (feed_src in rssSources) {

            var feedTemp = document.querySelector('#rss-feeds-template').content.cloneNode(true);
            feedTemp.querySelector('.rssChannelTitle').innerHTML = feed_src;
            feedTemp.querySelector('.rssReloader').setAttribute('source', 'rssSources.' + feed_src);
            feedTemp.querySelector('.rssShow').setAttribute('source', 'rssSources.' + feed_src);
            feedListContainer.appendChild(feedTemp);
        };

        var rssReloaders = document.querySelectorAll('.rssReloader'), i;

        for (i = 0; i < rssReloaders.length; ++i) {
            rssReloaders[i].addEventListener('click', function (e) {
                Rss.reload(e.target.getAttribute("source"));
            });
        }

        Rss.load();
    },

    getFeeds: function (srcUrl, ele) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                console.info("Got Feeds.");
                Rss.update(srcUrl, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", function () {
            var msg = "Feeds fetching failed!";

            console.warn(msg);
            ele.innerHTML =
                '<center><p style="font-size:20px; color:red">'
                + msg
                + '</p></center>';
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();

    },

    load: function () {

        var eles = document.querySelectorAll(".rssShow");

        for (var i = 0; i < eles.length; i++) {

            var srcAttrVal = eles[i].getAttribute("source");
            var srcUrl = rssSources[srcAttrVal.split('.')[1]];

            var lsItem = localStorage.getItem(srcUrl);

            var minutesNow = (new Date()).getMinutes() || 60;

            var lastUpateAtMins = parseInt(localStorage.getItem("lastUpdateAt")) || 0;

            var timeLeft = minutesNow - lastUpateAtMins;

            if (lsItem !== null) {

                eles[i].innerHTML = lsItem;

            } else {

                Rss.getFeeds(srcUrl, eles[i]);
            }

            if (timeLeft >= 10 || timeLeft <= 0) {

                Rss.getFeeds(srcUrl, eles[i]);
            }
        }

    },

    reload: function (trgt) {

        var rlTarget = rssSources[trgt.split('.')[1]];
        localStorage.removeItem(rlTarget);
        console.log("Reloaded");
        Rss.load();
    },

    update: function (srcUrl, feed, ele) {

        var rssFeed = Rss.makeHTML(feed);
        localStorage.setItem(srcUrl, rssFeed);
        localStorage.setItem("lastUpdateAt",(new Date()).getMinutes());
        ele.innerHTML = rssFeed;

    },

    makeHTML: function (xml) {

        function parseXMLtoJSON(xmlRaw) {

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlRaw, "text/xml");

            if (xmlDoc.querySelector("parsererror") === null) {

                var x2js = new X2JS();
                var jsonObj = x2js.xml2json(xmlDoc);
                return jsonObj;

            } else {
                console.log(xmlDoc);
                return null;
            }
        }

        var feedObj, feedChannel, feedTitle, feedItems, HTMLDoc;

        feedObj = parseXMLtoJSON(xml);

        if (feedObj !== null && feedObj.rss) {

            feedChannel = feedObj.rss.channel;

            feedTitle = '<h3 class="feed-title">' + '<a href="' + feedChannel.link + '">'
                + feedChannel.title
                + '</a>' + '</h3>';

            feedItems = "";

            for (var i = 0; i < feedChannel.item.length; i++) {

                feedItems += ('<h4 class="feed-item-title">'
                    + '<a href="' + feedChannel.item[i].link + '">'
                    + feedChannel.item[i].title + '</a></h4>');

                feedItems += '<span class="feed-item-date">' + dater.format(feedChannel.item[i].pubDate) + '</span>';

                feedItems += '<p class="feed-item-desc">' + feedChannel.item[i].description + '</p>';

            }

            HTMLDoc = feedTitle + feedItems;
        } else if (feedObj.RDF){
            console.log("This is RDF");

        } 
        else {

            var msg = "The provided URL does not contain a feed!";

            console.log("%c" + msg, "color:red;");

            HTMLDoc = '<center><p style="font-size:20px; color:red">'
                + msg
                + '</p></center>';
        }

        return HTMLDoc;
    }
}