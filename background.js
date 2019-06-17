chrome.contextMenus.create({
  title: "Get Page Title...",
  id: "getPageTitle",
  contexts: ["all"]
});

chrome.contextMenus.create({
  title: "Title only",
  parentId: "getPageTitle",
  contexts: ["all"],
  onclick: function () {
    chrome.tabs.getSelected(null, function(tab) {
      saveClipboard(tab.title);
    });
  }
});

chrome.contextMenus.create({
  title: "Title with HTML link",
  parentId: "getPageTitle",
  contexts: ["all"],
  onclick: function () {
    chrome.tabs.getSelected(null, function(tab) {
      saveClipboard('<a href="' + tab.url + '" target="_blank">' + tab.title + '</a>');
    });
  }
});

chrome.contextMenus.create({
  title: "Title with Markdown link",
  parentId: "getPageTitle",
  contexts: ["all"],
  onclick: function () {
    chrome.tabs.getSelected(null, function(tab) {
      saveClipboard('[' + tab.title + ']' + '(' + tab.url + ')');
    });
  }
});

let saveClipboard = (str) => {
  let textArea = document.createElement("textarea");
  document.body.appendChild(textArea);

  textArea.value = str;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
};
