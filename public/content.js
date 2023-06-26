/* global chrome */

function getAllNodes() {
  const root = document.documentElement;
  const queue = [root];
  const collectionOfNodes = [];
  while (queue.length !== 0) {
    const currentNode = queue.pop();
    collectionOfNodes.push(currentNode);
    for (const child of currentNode.childNodes) {
      queue.push(child);
    }
  }
  return collectionOfNodes;
}

function searchKeyWords(keywordArray) {
  const nodes = getAllNodes();
  const keyWords = {};
  for (const key of keywordArray) {
    keyWords[key] = { count: 0, links: [], textContent: [] };
  }
  for (const node of nodes) {
    if (node.nodeValue) {
      const text = node.nodeValue.split(" ");
      for (let word of text) {
        word = word.toLowerCase();
        if (keyWords[word]) {
          keyWords[word].count += 1;
          keyWords[word]["links"].push(keyWordToUrl(node));
          keyWords[word].textContent.push(node.nodeValue);
          break;
        }
      }
    }
  }
  return keyWords;
}
function keyWordToUrl(node) {
  const baseUrl = node.baseURI;
  const textFragment = "#:~:text=";
  return baseUrl + textFragment + node.nodeValue;
}
const messagesFromReactAppListener = (message, sender, response) => {
  if (
    sender.id === chrome.runtime.id &&
    message.message === "search keywords") {

    const keywordsObj = searchKeyWords(message.data);
    for (const word in keywordsObj) {
      if (keywordsObj[word].count === 0)
        delete keywordsObj[word];
    }
    for (const word in keywordsObj) {
      let minStrLength = 10;
      for (let i = 0; i < keywordsObj[word].textContent.length; ++i) {
        const textContents = keywordsObj[word].textContent;
        if (textContents[i].length < minStrLength) {
          minStrLength = textContents[i].length;
        }
      }
      for (let i = 0; i < keywordsObj[word].textContent.length; ++i) {
        const textContents = keywordsObj[word].textContent;
        textContents[i] = textContents[i].slice(0, minStrLength);
      }
    }
    response(JSON.stringify(keywordsObj))
  } else if (
    sender.id === chrome.runtime.id &&
    message.message === "redirect to link") {
    window.location.assign(message.data);
  }

}
// Listens for any messages sent on the chrome runtime
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)

