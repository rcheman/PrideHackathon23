/* global chrome */

// Function called when a new message is received
const messagesFromReactAppListener = (message, sender, response) => {

  console.log('[content.js]. Message received', message, sender);

  // Currently only responds with the keywords it was sent
  if (
    sender.id === chrome.runtime.id &&
    message.message === "search keywords") {
    // TODO: Do something with the keywords
    response(`keyword search data that was found for ${message.data}`)
  }


}
// Listens for any messages sent on the chrome runtime
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
