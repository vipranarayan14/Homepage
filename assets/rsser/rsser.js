var Rss = {

    init: function () {

        var feedListContainer = document.querySelector('#rss-feeds-container');

        if (feedListContainer) {

            for (feed_src in rssSources) {

                var feedTemp = document.querySelector('#rss-feeds-template').content.cloneNode(true);
                var rssChannelTitle = feedTemp.querySelector('.rssChannelTitle');
                var rssReloader = feedTemp.querySelector('.rssReloader');
                var rssShow = feedTemp.querySelector('.rssShow');
                if (rssChannelTitle) {
                    rssChannelTitle.innerHTML = feed_src
                };
                if (rssReloader) {
                    rssReloader.setAttribute('source', 'rssSources.' + feed_src);
                }
                if (rssShow) {
                    rssShow.setAttribute('source', 'rssSources.' + feed_src);
                }
                feedListContainer.appendChild(feedTemp);
            };

            var rssReloaders = document.querySelectorAll('.rssReloader'), i;

            for (i = 0; i < rssReloaders.length; ++i) {
                rssReloaders[i].addEventListener('click', function (e) {
                    Rss.reload(e.target.getAttribute("source"));
                });
            }

            Rss.load();
        }
    },

    getFeeds: function (srcUrlTitle, srcUrl, ele) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                Rss.showNotification("Got Feeds for " + srcUrlTitle);
                Rss.update(srcUrl, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", function () {
            var msg = "Feeds fetching failed!";

            Rss.logError(msg);
            ele.innerHTML = Rss.formatAsError(msg);
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function () {

        var eles = document.querySelectorAll(".rssShow");

        for (var i = 0; i < eles.length; i++) {

            var srcAttrVal = eles[i].getAttribute("source");
            var srcUrlTitle = srcAttrVal.split('.')[1]
            var srcUrl = rssSources[srcUrlTitle];

            var lsItem = localStorage.getItem(srcUrl);

            var minutesNow = (new Date()).getMinutes() || 60;
            var lastUpateAtMins = parseInt(localStorage.getItem("lastUpdateAt")) || 0;
            var timeLeft = minutesNow - lastUpateAtMins;

            var status = "Hi";

            if (lsItem !== null) {

                eles[i].innerHTML = lsItem;
                status = "Loaded feeds from Local Storage.";

            } else {

                Rss.getFeeds(srcUrlTitle, srcUrl, eles[i]);
                status = "Downloading feeds.";
            }

            if ((timeLeft >= 10 || timeLeft < 0) && navigator.onLine) {

                Rss.getFeeds(srcUrlTitle, srcUrl, eles[i]);
                status = "Downloading feeds.";
            }
            else if (!navigator.onLine) {
                var msg = "Failed to Download feeds. The App is Offline.";
                Rss.logError(msg);
                status = msg;
            }
        }
        Rss.showNotification(status);

    },

    reload: function (trgt) {
        
        var trgtName = trgt.split('.')[1];
        var rlTarget = rssSources[trgtName];
        localStorage.removeItem(rlTarget);
        Rss.showNotification("Reloading feed: " + trgtName);
        Rss.load();
    },

    update: function (srcUrl, feed, ele) {

        var rssFeed = Rss.makeHTML(feed);
        localStorage.setItem(srcUrl, rssFeed);
        localStorage.setItem("lastUpdateAt", (new Date()).getMinutes());
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
        } else if (feedObj.RDF) {

            console.log("This is RDF");

        }
        else {

            var msg = "The provided URL does not contain a feed!";
            Rss.showNotification(msg);
            HTMLDoc = Rss.formatAsError(msg);
        }

        return HTMLDoc;
    },

    showNotification: function (message) {
        var rssNotifier = document.querySelector('#rss-notifications-container');
        if (rssNotifier) {
            var event = new CustomEvent('RssNotification', { 'detail': message });
            document.dispatchEvent(event);
        } else {
            console.log(message);
        }
    },

    logError: function (message) {

        console.log("%c" + message, "color:red;");
    },

    formatAsError: function (message) {

        return '<center><p style="font-size:20px; color:red">' + message + '</p></center>';
    }
}