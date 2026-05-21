chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-v35-pip") {
    // 找到當前亮著的 YouTube 標籤頁，把噴射暗號發過去
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, {action: "trigger-pip"});
    });
  }
});