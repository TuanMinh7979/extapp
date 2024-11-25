

document.addEventListener("DOMContentLoaded", function () {

  chrome.storage.local.get(['interval'], function (result) {
    let intervalElement = document.getElementById('interval')
    if (result.interval && intervalElement) {
      intervalElement.value = result.interval
    }

  });
  chrome.storage.local.get(['repeatCount'], function (result) {
    let repeatCntElement = document.getElementById('repeatCount')
    if (result.repeatCount && repeatCntElement) {
      repeatCntElement.value = result.repeatCount
    }

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


  document.getElementById('stop').onclick = function () {
    // Gửi tham số tới content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'stopVideoLoop'
      });
    });
  };
});
