const Rss = {

    init: function () {

        const feedListContainer = document.querySelector('#rss-feeds-container');

        if (feedListContainer) {

            Rss.makeFeedContainer(feedListContainer)
                .then(Rss.registerEventListeners())
                .then(Rss.load());

        };
    },

    makeFeedContainer: function (feedListContainer) {

        return new Promise(function (resolve, reject) {

            for (let feed_src in rssSources) {

                const feedTemp = document.querySelector('#rss-feeds-template').content.cloneNode(true);
                const rssChannelTitle = feedTemp.querySelector('.rssChannelTitle');
                const rssReloader = feedTemp.querySelector('.rssReloader');
                const rssShow = feedTemp.querySelector('.rssShow');

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

            resolve();
        });
    },

    registerEventListeners: function () {

        return new Promise(function (resolve, reject) {

            const rssReloaders = document.querySelectorAll('.rssReloader');

            for (let i = 0; i < rssReloaders.length; ++i) {

                rssReloaders[i].addEventListener('click', function (e) {

                    Rss.reload(e.target.getAttribute("source"));
                });
            }

            resolve();
        });
    },

    getFeeds: function (srcUrlTitle, srcUrl, ele) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                Rss.showNotification("Got Feeds for " + srcUrlTitle);
                Rss.update(srcUrl, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", function () {

            const msg = "Feeds fetching failed!";

            Rss.logError(msg);
            ele.innerHTML = Rss.formatAsError(msg);
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function () {

        const eles = document.querySelectorAll(".rssShow");

        for (let i = 0; i < eles.length; i++) {

            const srcAttrVal = eles[i].getAttribute("source");
            const srcUrlTitle = srcAttrVal.split('.')[1]
            const srcUrl = rssSources[srcUrlTitle];

            const lsItem = localStorage.getItem(srcUrl);

            const minutesNow = (new Date()).getMinutes() || 60;
            const lastUpateAtMins = parseInt(localStorage.getItem("lastUpdateAt")) || 0;
            const timeLeft = minutesNow - lastUpateAtMins;

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
                const msg = "Failed to download feeds. The App is Offline.";
                Rss.logError(msg);
                status = msg;
            }
        }
        Rss.showNotification(status);

    },

    reload: function (trgt) {

        if (navigator.onLine) {

            const trgtName = trgt.split('.')[1];
            const rlTarget = rssSources[trgtName];
            localStorage.removeItem(rlTarget);
            Rss.showNotification("Reloading feed: " + trgtName);
            Rss.load();
        } else {

            return Rss.showNotification("Failed to reload feed. The App is Offline.");            
        }
    },

    update: function (srcUrl, feed, ele) {

        const rssFeed = Rss.makeHTML(feed);
        localStorage.setItem(srcUrl, rssFeed);
        localStorage.setItem("lastUpdateAt", (new Date()).getMinutes());
        ele.innerHTML = rssFeed;
    },

    makeHTML: function (xml) {

        function parseXMLtoJSON(xmlRaw) {

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlRaw, "text/xml");

            if (xmlDoc.querySelector("parsererror") === null) {

                const x2js = new X2JS();
                const jsonObj = x2js.xml2json(xmlDoc);
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

            for (let i in feedChannel.item) {

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
        const rssNotifier = document.querySelector('#rss-notifications-container');
        if (rssNotifier) {
            const event = new CustomEvent('RssNotification', { 'detail': message });
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