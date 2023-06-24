import KeywordSelection from './components/KeywordSelection';
import {useState} from "react";

// Set as a known global so ESLint doesn't complain about 'chrome' not being defined
/* global chrome */

function App() {
  const [responseFromContent, setResponseFromContent] = useState('');
  const [keywords, setKeywords] = useState({});

  function sendKeywords() {
    const selectedKeywords = []
    for (let key in keywords){
      if (keywords[key] === true){
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
        setResponseFromContent(response);
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
      <KeywordSelection keywords={keywords} setKeywords={setKeywords}/>
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
