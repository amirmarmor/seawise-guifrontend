import React, {useState} from "react"
function Frame(props) {
  const [overlay, setOverlay] = useState()
  // const stream = 8000 + (props.id * 10) + props.channel
  const src = `http://localhost:8080/stream/${props.current.sn}`

  function handleClick(){
    window.open(src, '_blank').focus()
  }

  const frameStyle={
    width: "100%",
    height: "500px",
  }

  const overlayStyle = {
    display: overlay ? "block" : "none",
    position: "absolute",
    width: "10%",
    height: "50px",
    top: "0",
    left: "0",
    background: "rgba(255,255,255,0.5)"
  }

  const wrapperStyle = {
    display: "inline-block",
    position: "relative",
    width: "49.9%",
  }

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={()=>setOverlay(true)}
      onMouseLeave={()=>setOverlay(false)}
      onClick={()=>handleClick()}
    >
      <iframe title={`device-${props.current.sn}`} src={src} style={frameStyle}/>
      <div style={overlayStyle}>Full Screen</div>
    </div>
  )
}

export default Frame