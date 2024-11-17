chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startVideoLoop') {
        const video = document.querySelector('video');
        if (!video) {
            console.log("Video not found");
            return;
        }

        const repeatInterval = message.interval;
        let currentStartTime = video.currentTime;
        const repeatCountMax = message.repeatCount;
        let repeatCount = 0;

      
        let currentHandler = function () {
            let diff = Math.abs(video.currentTime - currentStartTime);

            if (diff >= repeatInterval + 0.1 && diff <= repeatInterval + 0.5) {
                repeatCount++;
                if (repeatCount < repeatCountMax) {
                    video.currentTime = currentStartTime;
                } else {
                    currentStartTime += repeatInterval;
                    repeatCount = 0;
                }
            } else if (diff > repeatInterval + 0.5) {
                currentStartTime = video.currentTime;
            }
        };

       
        if (video._currentHandler) {
            video.removeEventListener('timeupdate', video._currentHandler);
        }


        video.addEventListener('timeupdate', currentHandler);
        video._currentHandler = currentHandler; 
    }
});
