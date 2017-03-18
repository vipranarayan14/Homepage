function restore_options() {
  chrome.storage.sync.get("rssPrefs", function (items) {
    if (!chrome.runtime.error) {
      document.querySelector("#rssSourcesInput").value = items.rssPrefs;
    }
  });
  chrome.storage.sync.get("shortcutsPrefs", function (items) {
    if (!chrome.runtime.error) {
      document.querySelector("#shortcutsInput").value = items.shortcutsPrefs;
    }
  });
}

function save_options() {
  var rssPrefs = document.querySelector("#rssSourcesInput").value;
  var shortcutsPrefs = document.querySelector("#shortcutsInput").value;
  if (rssPrefs && shortcutsPrefs) {
    chrome.storage.sync.set({ "rssPrefs": JSON.stringify(rssPrefs)}, function () {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
    chrome.storage.sync.set({ "shortcutsPrefs": JSON.stringify(shortcutsPrefs) }, function () {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
    showStatus("preferences successfully saved.")
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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);