const Rss = {

    init: function(options) {

        if (typeof (options) == 'object') {

            if (!options.notify === undefined) {

                Rss.isShowNotification = options.notify;
            }

            if (!options.logConsole === undefined) {

                Rss.islogConsole = options.logConsole;
            }
        }

        const feedListContainer = document.querySelector('.rss-channels-container');

        if (typeof w3 == 'object' && feedListContainer) {

            Rss.makeFeedContainer(feedListContainer)
                .then(Rss.registerEventListeners())
                .then(Rss.load());

        };
    },

    makeFeedContainer: function(feedListContainer) {

        return new Promise((resolve, reject) => {

            w3.displayObject("rss-channels-container", rssSources);

            resolve();
        });
    },

    registerEventListeners: function() {

        return new Promise((resolve, reject) => {

            window.addEventListener('online', () => {

                Rss.showNotification("The App is online.");
                Rss.load();
            });

            window.addEventListener('offline', () => {

                Rss.showNotification("The App is offline.");
            });

            const rssReloaders = document.querySelectorAll('.rss-channel-reload-btn');

            for (let i = 0; i < rssReloaders.length; ++i) {

                rssReloaders[i].addEventListener('click', (e) => {

                    Rss.reload(e.target.getAttribute("source"));
                });
            }

            resolve();
        });
    },

    getFeeds: function(srcUrlTitle, srcUrl, ele) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                Rss.showNotification("Got Feeds for " + srcUrlTitle);
                Rss.update(srcUrl, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", () => {

            const msg = "Feeds fetching failed!";

            Rss.logConsole(msg, "error");
            ele.innerHTML = Rss.formatAsError(msg);
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function() {

        const eles = document.querySelectorAll(".rss-feed");

        for (let i = 0; i < eles.length; i++) {

            const srcAttrVal = eles[i].getAttribute("source");
            const srcUrlIndex = srcAttrVal.split('.')[1];
            const srcUrlTitle = rssSources.rssSources[srcUrlIndex].feedTitle;
            const srcUrl = rssSources.rssSources[srcUrlIndex].feedUrl;

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
                Rss.logConsole(msg, "error");
                status = msg;
            }
        }
        Rss.showNotification(status);

    },

    reload: function(trgt) {

        if (navigator.onLine) {

            const srcUrlIndex = trgt.split('.')[1];
            const srcUrlTitle = rssSources.rssSources[srcUrlIndex].feedTitle;
            localStorage.removeItem(srcUrlTitle);
            Rss.showNotification("Reloading feed: " + srcUrlTitle);
            Rss.load();
        } else {

            return Rss.showNotification("Failed to reload feed. The App is Offline.");
        }
    },

    update: function(srcUrl, feed, ele) {

        const rssFeed = Rss.makeHTML(feed);

        localStorage.setItem(srcUrl, rssFeed);
        localStorage.setItem("lastUpdateAt", (new Date()).getMinutes());

        ele.innerHTML = rssFeed;
    },

    makeHTML: function(xml) {

        function parseXMLtoJSON(xmlRaw) {

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlRaw, "text/xml");

            if (xmlDoc.querySelector("parsererror") === null) {

                const x2js = new X2JS();
                const jsonObj = x2js.xml2json(xmlDoc);
                return jsonObj;

            } else {

                Rss.logConsole(xmlDoc);
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

            Rss.logConsole("This is RDF");

        }
        else {

            var msg = "The provided URL does not contain a feed!";
            Rss.showNotification(msg);
            HTMLDoc = Rss.formatAsError(msg);
        }

        return HTMLDoc;
    },

    isShowNotification: true,

    showNotification: function(message) {

        if (Rss.isShowNotification) {

            const rssNotifier = document.querySelector('.rss-notifications-container');

            if (rssNotifier) {

                const event = new CustomEvent('RssNotification', { 'detail': message });
                document.dispatchEvent(event);
            } else {

                Rss.logConsole(message, "info");
            }
        }
    },

    islogConsole: false,

    logConsole: function(message, type) {

        if (Rss.islogConsole) {

            if (!type) {

                console.log(message);
            } else if (type === "error") {

                console.log("%c" + message, "color:red;");
            } else if (type === "info") {

                console.log("%c" + message, "color:blue;");
            }
        }
    },

    formatAsError: function(message) {

        return '<center><p style="font-size:20px; color:red">' + message + '</p></center>';
    }
}