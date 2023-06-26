import KeywordSelection from './components/KeywordSelection';
import { useState } from "react";
import KeywordsFound from './components/KeywordsFound';

// Set as a known global so ESLint doesn't complain about 'chrome' not being defined
/* global chrome */

function App() {
  const [responseFromContent, setResponseFromContent] = useState('');
  const [keywords, setKeywords] = useState({});
  const [linkSent, setLinkSent] = useState('');

  function sendKeywords() {
    const selectedKeywords = []
    for (let key in keywords) {
      if (keywords[key] === true) {
        selectedKeywords.push(key)
      }
    }
    sendMessage("search keywords", selectedKeywords)
  }

  function sendMessage(message, data) {
    const msg = {
      message,
      data
    }

    const queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const currentTabId = tabs[0].id;
      chrome.tabs.sendMessage(currentTabId, msg, (response) => {
        if (response) {
          const responstObj = JSON.parse(response);
          setResponseFromContent(KeywordsFound(responstObj, sendLink));
        } else {
          setResponseFromContent(response);
        }
      });
    });
  }

  function sendLink(event) {
    event.preventDefault();
    sendMessageLink("redirect to link", event.target.value)
  }

  function sendMessageLink(message, data) {
    const msg = {
      message,
      data
    }

    const queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const currentTabId = tabs[0].id;
      chrome.tabs.sendMessage(currentTabId, msg, (response) => {
        setLinkSent("link has been sent");
      });
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Quickly find diversity and inclusion information</h1>
      </header>
      <p>Response from content:</p>
      <p>{responseFromContent}</p>
      <p>{linkSent}</p>
      <KeywordSelection keywords={keywords} setKeywords={setKeywords} />
      <button onClick={sendKeywords} className="btn btn-success" >Search for Keywords</button>
      <p>Credits:</p>
      <a
        href='https://www.flaticon.com/free-icons/rainbow'
        title='rainbow icons'
      >
        Rainbow icon created by Freepik - Flaticon
      </a>
    </div>
  );
}

export default App;
