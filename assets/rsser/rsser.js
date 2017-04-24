const Rss = {

    init: function(options) {

        Rss.checkDependenciesMeet(options)
            .then(Rss.configureOptions)
            .then(Rss.makeFeedContainer)
            .then(Rss.registerEventListeners)
            .then(Rss.load)
            .catch(new Error());
    },

    checkDependenciesMeet: function(options) {

        const feedListContainer = document.querySelector('.rss-channels-container');

        return new Promise((resolve, reject) => {

            if (feedListContainer && typeof w3 == 'object') {
                resolve(options);
            } else {
                reject("Dependencies not met!");
            }
        });
    },

    configureOptions: function(options) {

        return new Promise((resolve, reject) => {
            if (options) {
                Rss.config = Object.assign(Rss.config, options);
            }
            if (Rss.config.rssSources()) {
                resolve();
            } else {

                const msg = "Rsser is not configured yet. Please use Options to add Rss Channels";
                document.querySelector('.rss-channels-container').style.display = 'none';
                Rss.showNotification(msg);
                reject(msg);
            }
        });
    },

    makeFeedContainer: function() {

        return new Promise((resolve, reject) => {

            w3.displayObject("rss-channels-container", Rss.config.rssSources());
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
                    //Todo: change this
                    Rss.reload(e.target.parentNode.parentNode.parentNode);
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
                Rss.update(srcUrlTitle, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", () => {

            const msg = "Feeds fetching failed!";

            Rss.logConsole(msg, "error");
            ele.querySelector('.rss-feed').innerHTML = Rss.formatAsError(msg);
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function() {

        const eles = document.querySelectorAll(".rss-channel-container");

        for (let i = 0; i < eles.length; i++) {

            const srcUrlIndex = eles[i].getAttribute('display-object-index');
            const srcUrlTitle = Rss.config.rssSources().rssSources[srcUrlIndex].feedTitle;
            const srcUrl = Rss.config.rssSources().rssSources[srcUrlIndex].feedUrl;

            const lsItem = Rss.config.rssSources().rssSources[srcUrlIndex].feedData;

            const UnixTime_Now = Date.now();
            const UnixTime_lastUpateAt = parseInt(localStorage.getItem("lastUpdateAt")) || 0;
            const timeLeft = UnixTime_Now - UnixTime_lastUpateAt;

            var status = "Hi";

            if (lsItem !== null) {

                eles[i].querySelector('.rss-feed').innerHTML = lsItem;
                status = "Loaded feeds from Local Storage.";

            } else {

                Rss.getFeeds(srcUrlTitle, srcUrl, eles[i]);
                status = "Downloading feeds.";
            }

            if ((timeLeft < 0 || timeLeft > 60000) && navigator.onLine) {

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

    reload: function(ele) {

        if (navigator.onLine) {

            const srcUrlIndex = ele.getAttribute('display-object-index');
            const srcUrlTitle = Rss.config.rssSources().rssSources[srcUrlIndex].feedTitle;
            let rssSourcesCopy = Rss.config.rssSources();

            rssSourcesCopy.rssSources[srcUrlIndex].feedData = null;
            localStorage.setItem('feedSources', JSON.stringify(rssSourcesCopy));
            Rss.showNotification("Reloading feed: " + srcUrlTitle);
            Rss.load();

        } else {

            return Rss.showNotification("Failed to reload feed. The App is Offline.");
        }
    },

    reloadAll: function() {

        const eles = document.querySelectorAll(".rss-channel-container");

        for (var i = 0; i < eles.length; i++) {
            Rss.reload(eles[i]);
        };
    },

    update: function(srcUrl, feed, ele) {

        const rssFeed = Rss.makeHTML(feed);
        const feedSourcesCopy = JSON.parse(localStorage.feedSources);
        const feedIndex = ele.getAttribute('display-object-index')
        feedSourcesCopy.rssSources[feedIndex].feedData = rssFeed;
        localStorage.feedSources = JSON.stringify(feedSourcesCopy);
        localStorage.setItem("lastUpdateAt", Date.now());

        ele.querySelector('.rss-feed').innerHTML = rssFeed;
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

    config: {
        isShowNotification: true,
        islogConsole: false,
        rssSources: () => JSON.parse(localStorage.getItem('feedSources'))
    },

    showNotification: function(message) {

        if (Rss.config.isShowNotification) {

            const rssNotifier = document.querySelector('.rss-notifications-container');

            if (rssNotifier) {

                const event = new CustomEvent('RssNotification', { 'detail': message });
                document.dispatchEvent(event);
            } else {

                Rss.logConsole(message, "info");
            }
        }
    },

    logConsole: function(message, type) {

        if (Rss.config.islogConsole) {

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