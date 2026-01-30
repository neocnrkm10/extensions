const GIF_PATTERN = /\(\{gif:(https?:\/\/[^\}]+)\}\)/i;

function processComments() {
  const comments = document.querySelectorAll("#content-text");

  comments.forEach(comment => {
    if (comment.dataset.gifDone) return;

    const text = comment.innerText;
    const match = text.match(GIF_PATTERN);
    if (!match) return;

    comment.dataset.gifDone = "true";
    const gifUrl = match[1];

    chrome.runtime.sendMessage(
      { type: "gif", url: gifUrl },
      response => {
        if (!response) return;

        const img = document.createElement("img");
        img.src = response.gif;
        img.style.maxWidth = "250px";
        img.style.display = "block";
        img.style.marginTop = "6px";
        img.style.borderRadius = "8px";

        comment.appendChild(img);
      }
    );
  });
}

// YouTube loads comments dynamically
const observer = new MutationObserver(processComments);
observer.observe(document.body, {
  childList: true,
  subtree: true
});