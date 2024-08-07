import React from 'react'

const ActionCaretButton = ({defaultValue, changeHandler, deviceList, type}) => {

  let dropDownEl;

  if(type==="video"){
    dropDownEl = deviceList.map(vd=><option key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)
  } else if(type === "audio") {
    const audioInputEl = [];
    const audioOutputEl = [];
    deviceList.forEach((d, i) => {
      if(d.kind === "audioinput"){
        audioInputEl.push(<option key={d.deviceId} value={d.deviceId}>{d.label}</option>)
      }else if(d.kind === "audiooutput"){
        audioOutputEl.push(<option key={d.deviceId} value={d.deviceId}>{d.label}</option>)

      }
      
    });

    audioInputEl.unshift(<optgroup label="Input Devices"/>)
    audioOutputEl.unshift(<optgroup label="Output Devices"/>)
    dropDownEl = audioInputEl.concat(audioOutputEl)
    
  }

  return (
    <div>
        return(
            <div className="caret-dropdown" style={{top:"-25px"}}>
                <select defaultValue={defaultValue} onChange={changeHandler}>
                    {deviceList.map(vd=><option key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)}
                    <option></option>
                </select>
            </div>
        )
      
    </div>
  )
}

export default ActionCaretButton
