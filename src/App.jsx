import KeywordSelection from './components/KeywordSelection';
import KeywordsFound from './components/KeywordsFound';
import BackgroundPicker from "./components/BackgroundPicker";
import { useState } from "react";

// Set as a known global so ESLint doesn't complain about 'chrome' not being defined
/* global chrome */

function App() {
  const [responseFromContent, setResponseFromContent] = useState('');
  const [keywords, setKeywords] = useState({});
  const [linkSent, setLinkSent] = useState('');
  const [editing, setEditing] = useState(false)

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
          const responseObj = JSON.parse(response);
          setResponseFromContent(responseObj);
        }
      });
    });
  }

  function sendLink(event) {
    event.preventDefault();
    sendMessage("redirect to link", event.target.value)
    setLinkSent("link has been sent");
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Quickly find diversity and inclusion information</h1>
      </header>
      <KeywordSelection keywords={keywords} setKeywords={setKeywords} />
      <button onClick={sendKeywords} className="btn btn-success" >Search for Keywords</button>
      <KeywordsFound response={responseFromContent} sendLink={sendLink} />
      <p>Credits:</p> <a
        href='https://www.flaticon.com/free-icons/rainbow'
        title='rainbow icons'
      >
        Rainbow icon created by Freepik - Flaticon
      </a>
      <button className="btn btn-light btn-sm" onClick={() =>setEditing(!editing)}>Edit Background</button>
      {editing && <BackgroundPicker />}
    </div>
  );
}

export default App;
