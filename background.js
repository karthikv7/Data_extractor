browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  browser.storage.local.set({ extractedData: message.data }, () => {
    console.log('Data stored:', message.data);
  });
});
