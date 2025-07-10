let adBlockerEnabled = false;

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.type === 'TOGGLE_ADBLOCK') {
    adBlockerEnabled = req.enabled;
    res({ status: 'ok' });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  details => adBlockerEnabled && /ad|doubleclick|googlesyndication|track|pop/i.test(details.url)
    ? { cancel: true }
    : {},
  { urls: ["<all_urls>"] },
  ["blocking"]
);
