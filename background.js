chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "gif") {
    fetch(`https://giphy.com/services/oembed?url=${msg.url}`)
      .then(res => res.json())
      .then(data => {
        sendResponse({ gif: data.url });
      })
      .catch(() => sendResponse(null));

    return true;
  }
});