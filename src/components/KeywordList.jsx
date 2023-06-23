export default function KeywordList({ keywords, setKeywords }) {

  function toggleKeyword(e) {
    const word = e.target.value;
    setKeywords({ ...keywords, [word]: !keywords[word] });
  }

  const allButtons = Object.keys(keywords).map((word) => {
    return (
      <button key={word}
        className={
          keywords[word] === true
            ? "btn btn-primary"
            : "btn btn-secondary"
        }
        onClick={toggleKeyword}
        value={word}
      >
        {word}
      </button>
    );
  });
  return <div>{allButtons}</div>;
}
