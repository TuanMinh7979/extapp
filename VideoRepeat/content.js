chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startVideoLoop') {
        const video = document.querySelector('video');
        if (!video) {
            console.error("Video element not found");
            sendResponse({ success: false, error: "Video element not found" });
            return;
        }

        // Validate inputs
        const repeatInterval = parseInt(message.interval, 10);
        const repeatCountMax = parseInt(message.repeatCount, 10);

        if (isNaN(repeatInterval) || repeatInterval <= 0 || isNaN(repeatCountMax) || repeatCountMax <= 0) {
            console.error("Invalid interval or repeatCount");
            sendResponse({ success: false, error: "Invalid interval or repeatCount" });
            return;
        }

        let currentStartTime = video.currentTime;
        let repeatCount = 0;

        const currentHandler = function () {
            const diff = Math.abs(video.currentTime - currentStartTime);

            if (diff >= repeatInterval && diff <= repeatInterval + 0.5) {
                repeatCount++;
                if (repeatCount < repeatCountMax) {
                    video.currentTime = currentStartTime; // Reset to start of the interval
                } else {
                    currentStartTime += repeatInterval; // Move to next interval
                    repeatCount = 0;
                }
            } else if (diff > repeatInterval + 0.5) {
                currentStartTime = video.currentTime; // Sync to the new start point
                repeatCount = 0; // Reset repeat count
            }
        };

        // Remove existing handler if present
        if (video._currentHandler) {
            video.removeEventListener('timeupdate', video._currentHandler);
        }

        // Attach the new handler
        video.addEventListener('timeupdate', currentHandler);
        video._currentHandler = currentHandler;

        sendResponse({ success: true });
    }




    if (message.action === 'stopVideoLoop') {
        const video = document.querySelector('video');
        if (!video) {
            console.error("Video element not found");
            sendResponse({ success: false, error: "Video element not found" });
            return;
        }

        // Remove existing handler if present
        if (video._currentHandler) {
            video.removeEventListener('timeupdate', video._currentHandler);
        }
        sendResponse({ success: true });
    }
});
