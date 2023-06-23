import {useState} from "react";

export default function EditKeywords({ keywords, setKeywords }) {
    const [deleted, setDeleted] = useState([]);

    function deleteKeyword(e) {
      const keywordClone = structuredClone(keywords);
      delete keywordClone[e.target.value]
      setDeleted([...deleted, e.target.value])
      setKeywords(keywordClone)
    }

    // Undo the most recently deleted keyword
    function undoDelete() {
      // Checks for length, so we don't undo when there is nothing
      if (deleted.length > 0) {
        const deletedClone = [...deleted]
        const undo = deletedClone.pop()
        setKeywords({...keywords, [undo]: true})
        setDeleted(deletedClone);
      }
    }


  return (
    <div>
      <ul className="EditList">
        {Object.keys(keywords).map((word) => {
          return (
            <li key={word + "delete"}>
              <button className="btn btn-danger" onClick={deleteKeyword} value={word}>Delete</button>
              {word}
            </li>
          );
        })}
      </ul>
      <button className="btn btn-warning" onClick={undoDelete}>Undo Delete</button>
    </div>
  );
}
