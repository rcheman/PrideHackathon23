function BackgroundPicker() {

  const flagColors = {
    pride: "linear-gradient(90deg, rgba(115,41,130,1) 9%, rgba(36,64,142,1) 25%, rgba(0,128,38,1) 41%, rgba(255,237,0,1) 60%, rgba(255,140,0,1) 74%, rgba(228,3,3,1) 89%)",
    lesbian: "linear-gradient(90deg, rgba(213,45,0,1) 10%, rgba(239,118,39,1) 21%, rgba(255,154,86,1) 35%, rgba(255,255,255,1) 51%, rgba(209,98,164,1) 66%, rgba(181,86,144,1) 78%, rgba(163,2,98,1) 90%)",
    gay: "linear-gradient(90deg, rgba(7,141,112,1) 10%, rgba(38,206,170,1) 21%, rgba(152,232,193,1) 35%, rgba(255,255,255,1) 51%, rgba(123,173,226,1) 66%, rgba(80,73,204,1) 78%, rgba(61,26,120,1) 90%)",
    bi: "linear-gradient(90deg, rgba(214,2,112,1) 25%, rgba(155,79,150,1) 50%, rgba(0,56,168,1) 75%)",
    trans: "linear-gradient(90deg, rgba(91,206,250,1) 12%, rgba(245,169,184,1) 28%, rgba(255,255,255,1) 50%, rgba(245,169,184,1) 72%, rgba(91,206,250,1) 88%)"
  }

  function setBackground(theme) {
    document.body.style.background = flagColors[theme]
  }

  return (
    <div id="backgroundPicker">
      <p>Pick a background color theme</p>
      <button className="btn btn-light" onClick={() => setBackground("pride")}>Pride</button>
      <button className="btn btn-light" onClick={() => setBackground("lesbian")}>Lesbian</button>
      <button className="btn btn-light" onClick={() => setBackground("gay")}>Gay</button>
      <button className="btn btn-light" onClick={() => setBackground("bi")}>Bi</button>
      <button className="btn btn-light" onClick={() => setBackground("trans")}>Trans</button>
    </div>
  )
}

export default BackgroundPicker