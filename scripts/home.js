const Home = {

    registerEventListeners: function () {

        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
            }
        });

        document.querySelector('.search-input input[type="search"]').addEventListener('keydown', function (e) {

            if (e.keyCode === 13 && this.value !== "") {

                const serviceCall = 'http://www.google.com/search?q=' + this.value;
                chrome.tabs.update({ url: serviceCall });
            }
        });

        const eles = document.querySelectorAll('.nav-bar .nav-item a');

        for (let i = 0; i < eles.length; ++i) {

            eles[i].addEventListener('click', (e) => {

                chrome.tabs.update({ url: e.target.getAttribute('shortcut-url') });
            });
        }

        document.querySelector(".refresh-btn").addEventListener('click', function () {

            Rss.reloadAll();
        });

        document.querySelector(".options-btn").addEventListener('click', function () {

            document.querySelector('.options-modal-container').style.display = 'block';
        });

        document.addEventListener('RssNotification', (e) => {

            const rssNotificationsContainer = document.querySelector('.rss-notifications-container');

            if (rssNotificationsContainer) {

                const rssNotifier = document.createElement('DIV');

                rssNotifier.innerHTML = document.querySelector('#rss-notification-template').innerHTML;

                const rssNotification = rssNotifier.querySelector('.rss-notification-content');
                const rssNotificationCloseBtn = rssNotifier.querySelector('.rss-notification-close-btn');

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

        document.querySelector(".user-greeting h1").innerHTML = "Hello, " + userName + "!";
    },

    initNavitems: function () {

        const navBar = document.querySelector(".nav-bar");

        if (navBar && typeof (shortcuts) == 'object') {

            w3.displayObject("nav-bar", shortcuts);

        }
    }
}