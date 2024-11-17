
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('start').onclick = function () {
    const interval = parseInt(document.getElementById('interval').value, 10);
    const repeatCount = parseInt(document.getElementById('repeatCount').value, 10);


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
