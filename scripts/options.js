function restore_options() {
  chrome.storage.sync.get("rssPrefs", function (items) {
    if (!chrome.runtime.error) {
      document.querySelector("#rssSourcesInput").value = JSON.parse(items.rssPrefs);
    }
  });
  // chrome.storage.sync.get("shortcutsPrefs", function (items) {
  //   if (!chrome.runtime.error) {
  //     document.querySelector("#shortcutsInput").value = JSON.parse(items.shortcutsPrefs);
  //   }
  // });
}

function save_options() {
  var rssPrefs = document.querySelector("#rssSourcesInput").value;
  var shortcutsPrefs = document.querySelector("#shortcutsInput").value;
  if (rssPrefs && shortcutsPrefs) {
    chrome.storage.sync.set({ "rssPrefs": JSON.stringify(rssPrefs) }, function () {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
    // chrome.storage.sync.set({ "shortcutsPrefs": JSON.stringify(shortcutsPrefs) }, function () {
    //   if (chrome.runtime.error) {
    //     console.log("Runtime error.");
    //   }
    // });
    showStatus("Preferences successfully saved.")
  } else {
    showStatus("Please write your preferences.");
  }
}

function showStatus(message) {
  var statusContainer = document.querySelector("#notifications-container > div");
  statusContainer.innerHTML = message;
  setTimeout(() => {
    statusContainer.innerHTML = "";
  }, 5000);

}

w3.displayObject("rssSourcesContainer", rssSources);
window.addEventListener('keydown', e => {
    if(e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
    }
});
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#saveBtn').addEventListener('click', save_options);