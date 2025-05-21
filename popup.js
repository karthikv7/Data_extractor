// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add click event to the extract button
  document.getElementById('extractBtn').addEventListener('click', async () => {
    try {
      // Get the active tab
      let tabs = await browser.tabs.query({ active: true, currentWindow: true });
      let tab = tabs[0];
      
      // Execute content script in the active tab
      browser.tabs.executeScript(tab.id, {
        code: `
          (function() {
            const data = document.querySelector('h1')?.innerText || "No <h1> found";
            browser.runtime.sendMessage({ data });
            return data;
          })();
        `
      }).then(results => {
        // Display the results in the popup
        document.getElementById('result').textContent = 'Extracted: ' + results[0];
      }).catch(error => {
        console.error("Error executing script:", error);
        document.getElementById('result').textContent = 'Error: ' + error.message;
      });
    } catch (error) {
      console.error("Error:", error);
      document.getElementById('result').textContent = 'Error: ' + error.message;
    }
  });
  
  // Show any previously stored data
  browser.storage.local.get('extractedData', (result) => {
    if (result.extractedData) {
      document.getElementById('result').textContent = 
        'Last extracted: ' + result.extractedData;
    }
  });
});
