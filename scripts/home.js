const Home = {

    registerEventListeners: function () {

        document.querySelector("#searchInput").addEventListener('keydown', function (e) {

            if (e.keyCode === 13 && this.value !== "") {

                const serviceCall = 'http://www.google.com/search?q=' + this.value;
                chrome.tabs.update({ url: serviceCall });
            }
        });

        document.addEventListener('RssNotification', (e) => {

            const rssNotificationsContainer = document.querySelector('#rss-notifications-container');

            if (rssNotificationsContainer) {

                const rssNotifier = document.createElement('DIV');

                rssNotifier.innerHTML = document.querySelector('#rss-notifier-template').innerHTML;

                const rssNotification = rssNotifier.querySelector('.rssNotification');
                const rssNotificationCloseBtn = rssNotifier.querySelector('.alert-close-btn');

                rssNotification.innerHTML = e.detail;
                rssNotificationCloseBtn.addEventListener('click', (e) => {
                    e.target.parentNode.style.display = 'none';
                });

                rssNotificationsContainer.appendChild(rssNotifier);

                setTimeout(() => {
                    rssNotificationsContainer.removeChild(rssNotifier);
                }, 8000);

            }
        });

    },

    initUserName: function (userName) {
        
        document.getElementById("userGreeting").innerHTML = "Hello, " + userName + "!";
    },

    initNavitems: function () {

        const navBar = document.querySelector("#navBar");

        if (navBar && typeof (shortcuts) == 'object') {

            for (let shortcut in shortcuts) {

                const navItem = document.querySelector('#navItemTemp').content.cloneNode(true);
                const link = navItem.querySelector('a');
                link.innerHTML = shortcut;
                link.addEventListener('click', () => {

                    chrome.tabs.update({ url: shortcuts[shortcut] });
                });

                navBar.appendChild(navItem);
            };
        }
    }
}