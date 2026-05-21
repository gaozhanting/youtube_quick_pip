(function() {
    'use strict';
    if (document.getElementById('v35-global-cube')) return;

    // 核心噴射邏輯（純粹原生畫中畫）
    async function firePip() {
        const video = document.querySelector('video');
        if (!video) return;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('V35 PIP 噴射失敗:', error);
        }
    }

    // 1. 鍛造懸浮方塊（保留滑鼠點擊做為備用防線）
    const cube = document.createElement('div');
    cube.id = 'v35-global-cube';
    cube.innerHTML = 'PIP';
    cube.style.cssText = `
        position: fixed; bottom: 20px; left: 20px; width: 45px; height: 45px;
        background-color: #ff4500; color: white; font-family: sans-serif;
        font-size: 13px; font-weight: bold; text-align: center; line-height: 45px;
        border-radius: 8px; cursor: pointer; z-index: 999999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5); opacity: 0.5; transition: opacity 0.2s;
    `;
    cube.addEventListener('click', firePip);
    document.body.appendChild(cube);

    // 2. 監聽來自瀏覽器內核快捷鍵的最高權限密碼
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "trigger-pip") {
            firePip();
        }
    });
})();