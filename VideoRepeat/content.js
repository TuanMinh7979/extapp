chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startVideoLoop') {
        const video = document.querySelector('video');
        if (!video) {
            console.log("Không tìm thấy video trên trang.");
            return;
        }

        const repeatInterval = message.interval;
        let currentStartTime = video.currentTime;
        const repeatCountMax = message.repeatCount;
        let repeatCount = 0;

        // Biến lưu trữ hàm xử lý hiện tại
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

        // Loại bỏ hàm xử lý cũ nếu tồn tại
        if (video._currentHandler) {
            video.removeEventListener('timeupdate', video._currentHandler);
        }

        // Thêm hàm xử lý mới và lưu tham chiếu để có thể xóa sau này
        video.addEventListener('timeupdate', currentHandler);
        video._currentHandler = currentHandler; // Lưu trữ hàm xử lý trong thuộc tính `_currentHandler` của video
    }
});
