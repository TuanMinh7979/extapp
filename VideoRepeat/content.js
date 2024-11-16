chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startVideoLoop') {
        const video = document.querySelector('video');
        if (!video) {
            console.log("Không tìm thấy video trên trang.");
            return;
        }
        const repeatInterval = message.interval;
        let currentStartTime = video.currentTime; // Thời gian bắt đầu của mỗi đoạn
        const repeatCountMax = message.repeatCount;
        let repeatCount = 0; // Biến đếm số lần lặp lại trong mỗi đoạn

        function loopVideo() {
            // Lắng nghe sự kiện timeupdate để theo dõi thời gian
            video.addEventListener('timeupdate', function () {
                // Nếu video đã phát đủ 20 giây (hoặc đã lặp đủ 3 lần)
                let diff = Math.abs(video.currentTime - currentStartTime)
                console.log(diff, "1")
                if (diff >= repeatInterval + 0.1 && diff <= repeatInterval + 0.5) {
                    repeatCount++;
                    if (repeatCount < repeatCountMax) {
                        // Lặp lại video từ vị trí hiện tại (bắt đầu từ currentStartTime)
                        video.currentTime = currentStartTime;
                    } else {
                        // Nếu đã lặp đủ 3 lần, tiếp tục với đoạn tiếp theo
                        currentStartTime += repeatInterval; // Tiến đến đoạn tiếp theo (20s -> 40s -> 60s -> ...)
                        repeatCount = 0;
                    }
                } else if (diff > repeatInterval + 0.5) {
                    currentStartTime = video.currentTime;
                }
            });
        }

        loopVideo(); // Bắt đầu vòng lặp
    }
});
