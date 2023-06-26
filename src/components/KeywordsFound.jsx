export default function KeywordsFound({response, sendLink}) {

  function keywordLinks(links, textContent) {
    const linksToList = [];
    for (let i = 0; i < links.length; ++i) {
      linksToList.push(<li><button onClick={sendLink} className="dropdown-item" value={links[i]}>{textContent[i]}</button></li>);
    }
    return linksToList;
  }

  const results = []
  for (let key in response) {
    results.push (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {key}
          <span className="badge bg-primary rounded-pill">{response[key].count}</span>
        </button>
        <ul className="dropdown-menu">
          {keywordLinks(response[key].links, response[key].textContent)}
        </ul>
      </div>
    )
  }
  return <div className="ResultList">{results}</div>
}
