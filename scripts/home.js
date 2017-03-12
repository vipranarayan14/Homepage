function startHome() {

  const userName = localStorage.getItem('userName');

  if (!userName || userName === "null") {

    const name = prompt("Please Enter your name:", "");

    localStorage.setItem('userName', name);

    startHome();

  } else {

    userName = localStorage.getItem('userName');

    document.getElementById("userGreeting").innerHTML = "Hello, " + userName + "!";

    const linkA = document.querySelector("#linkApps");
    const linkE = document.querySelector("#linkExts");

    function updateOnlineStatus() {
      Rss.showNotification("The App is online");
    }

    function updateOfflineStatus() {
      Rss.showNotification("The App is offline");
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOfflineStatus);

    document.querySelector("#searchInput").addEventListener('keydown', function (e) {

      if (e.keyCode === 13 && this.value !== "") {
        searchGoogle(this.value);
      }
    });

    linkA.addEventListener('click', function () {

      chrome.tabs.update({ url: "chrome://apps" });
    });

    linkE.addEventListener('click', function () {

      chrome.tabs.update({ url: "chrome://extensions" });
    });

    function searchGoogle(searchQuery) {
      
      var serviceCall = 'http://www.google.com/search?q=' + searchQuery;
      chrome.tabs.update({ url: serviceCall });
    }

    document.addEventListener('RssNotification', function (e) {

      var rssNotificationsContainer = document.querySelector('#rss-notifications-container');

      if (rssNotificationsContainer) {

        var rssNotifierTemp = document.querySelector('#rss-notifier-template').content.cloneNode(true);
        var rssNotification = rssNotifierTemp.querySelector('.rssNotification');
        var rssNotificationCloseBtn = rssNotifierTemp.querySelector('.alert-close-btn');

        rssNotification.innerHTML = e.detail;
        rssNotificationCloseBtn.addEventListener('click', function (e) {
          e.target.parentNode.style.display = 'none';
        });
      }
      rssNotificationsContainer.appendChild(rssNotifierTemp);

    });

    Rss.init();

    console.log("Hello!!");
  }

}
startHome();