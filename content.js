(function() {
    'use strict';
    if (document.getElementById('v35-global-cube')) return;

    // 1. 鍛造釘在網頁最頂層的極簡 V35 傳送塊
    const cube = document.createElement('div');
    cube.id = 'v35-global-cube';
    cube.innerHTML = 'PIP';
    cube.style.cssText = `
        position: fixed; bottom: 20px; left: 20px; width: 45px; height: 45px;
        background-color: #ff4500; color: white; font-family: sans-serif;
        font-size: 13px; font-weight: bold; text-align: center; line-height: 45px;
        border-radius: 8px; cursor: pointer; z-index: 999999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5); opacity: 0.8; transition: opacity 0.2s;
    `;

    cube.addEventListener('mouseenter', () => cube.style.opacity = '1');
    cube.addEventListener('mouseleave', () => cube.style.opacity = '0.8');

    // 2. 點擊瞬間，強行逼迫網頁視頻進入原生畫中畫
    cube.addEventListener('click', async () => {
        const video = document.querySelector('video');
        if (!video) return;

        try {
            // 如果已經在 PIP 狀態，點擊就誠實地退出歸位
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                // 否則，利用最高權限的人類手勢激活，強行噴射原生 PIP
                await video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('V35 PIP 噴射失敗:', error);
        }
    });

    document.body.appendChild(cube);
})();