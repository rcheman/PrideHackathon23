export default function KeywordsFound(response, sendLink) {

  function keywordLinks(links, textContent) {
    const linksToList = [];
    for (let i = 0; i < links.length; ++i) {
      linksToList.push(<option value={links[i]}>{textContent[i]}</option>);
    }
    return linksToList;
  }

  return <ul>{Object.keys(response).map((word) => {
    return (
      //      <li>
      //        {word}
      //        <ul>
      //          {keywordLinks(response[word].links)}
      //        </ul>
      //      </li>
      <label>
        {word}
        <select onChange={sendLink} >
          {keywordLinks(response[word].links, response[word].textContent)}

        </select>
      </label>
    );
  })
  }</ul>;
}
