import KeywordList from './KeywordList';
import { useState, useEffect } from 'react';
import EditKeywords from "./EditKeywords";
import {commonKeywords} from "../keywords";

export default function KeywordSelection() {
  // keywords are stored as the word and its active status. ie {"lgbtq": true, "diversity": false}
  const [keywords, setKeywords] = useState({});
  const [newKeyword, setNewKeyword] = useState('');
  const [editing, setEditing] = useState(false);

  // On initial load, grab the common keywords and establish them in state as active
  useEffect(() => {
    const initialKeywords = {};
    commonKeywords.forEach((word) => initialKeywords[word] = true)
    setKeywords(initialKeywords)
  },[]);

  function addKeyword(e) {
    e.preventDefault();
    setKeywords({ ...keywords, [newKeyword]: true });
    e.target.reset();
  }

  return (
    <div>
      <KeywordList key="KeywordList" keywords={keywords} setKeywords={setKeywords} />
      <form onSubmit={addKeyword}>
        <input
          type='text'
          id='newKeyword'
          name='newKeyword'
          onChange={(e) => setNewKeyword(e.target.value)}
        />
        <button className="btn btn-light" type='submit'>Add Keyword</button>
      </form>
        <button className="btn btn-light" onClick={() =>setEditing(!editing)}>Edit Keywords</button>
        {editing && <EditKeywords keywords={keywords} setKeywords={setKeywords}/>}
    </div>
  );
}
