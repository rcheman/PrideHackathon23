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
    keyWords[key] = { count: 0, links: [] };
  }
  for (const node of nodes) {
    if (node.nodeValue) {
      const text = node.nodeValue.split(" ");
      for (let word of text) {
        word = word.toLowerCase();
        if (keyWords[word]) {
          keyWords[word].count += 1;
          keyWords[word]["links"].push(keyWordToUrl(node));
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

  console.log('[content.js]. Message received', message, sender);
  console.log(searchKeyWords(message.data));

  // Currently only responds with the keywords it was sent
  if (
    sender.id === chrome.runtime.id &&
    message.message === "search keywords") {
    // TODO: Do something with the keywords
    response(`keyword search data that was found  ${searchKeyWords(message.data)}`)
  }


}
// Listens for any messages sent on the chrome runtime
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
