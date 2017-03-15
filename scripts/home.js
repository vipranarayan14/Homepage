function startHome() {

  const userName = localStorage.getItem('userName');

  if (!userName || userName === "null") {

    const name = prompt("Please Enter your name:", "");

    localStorage.setItem('userName', name);

    startHome();

  } else {

    document.getElementById("userGreeting").innerHTML = "Hello, " + userName + "!";

    const linkA = document.querySelector("#linkApps");
    const linkE = document.querySelector("#linkExts");

    document.querySelector("#searchInput").addEventListener('keydown', function (e) {

      if (e.keyCode === 13 && this.value !== "") {
        searchGoogle(this.value);
      }
    });

    linkA.addEventListener('click', () => {

      chrome.tabs.update({ url: "chrome://apps" });
    });

    linkE.addEventListener('click', () => {

      chrome.tabs.update({ url: "chrome://extensions" });
    });

    function searchGoogle(searchQuery) {

      const serviceCall = 'http://www.google.com/search?q=' + searchQuery;
      chrome.tabs.update({ url: serviceCall });
    }

    document.addEventListener('RssNotification', (e) => {

      const rssNotificationsContainer = document.querySelector('#rss-notifications-container');

      if (rssNotificationsContainer) {

        const rssNotifier = document.createElement('DIV');

        rssNotifier.innerHTML = document.querySelector('#rss-notifier-template').innerHTML;

        const rssNotification = rssNotifier.querySelector('.rssNotification');
        const rssNotificationCloseBtn = rssNotifier.querySelector('.alert-close-btn');

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