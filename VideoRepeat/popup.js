

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(['interval'], function (result) {
    document.getElementById('interval').value = result.interval
  });
  chrome.storage.local.get(['repeatCount'], function (result) {
    document.getElementById('repeatCount').value = result.repeatCount
  });


  document.getElementById('start').onclick = function () {

    const interval = parseInt(document.getElementById('interval').value, 10);
    const repeatCount = parseInt(document.getElementById('repeatCount').value, 10);

    if (!interval || !repeatCount) return false;

    chrome.storage.local.set({ interval }, function () {

    });
    chrome.storage.local.set({ repeatCount }, function () {

    });

    // Gửi tham số tới content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'startVideoLoop',
        interval: interval,
        repeatCount: repeatCount
      });
    });
  };
});
