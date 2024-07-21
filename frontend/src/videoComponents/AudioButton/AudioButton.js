import { useSelector, useState, useEffect } from "react-redux"
import ActionCaretButton from "../ActionCaretButton"
import { getDevices } from "../VideoButton/getDevices"

export const AudioButton = () =>{

    const callStatus = useSelector(state=>state.callStatus)
    const [caretOpen, setCaretOpen] = useState(false)
    const [audioDeviceList, setAudioDeviceList ] = useState([])

    let micText;
    if(callStatus.current === "idle"){
        micText = "Join Audio"
    }else if(callStatus.audio){
        micText = "Mute"
    }else{
        micText = "Unmute"
    }

    useEffect(()=>{
        const getDevicesAsync = async() =>{
            if(caretOpen){
                // we need to check for audeio devices
                const devices = await getDevices();
                console.log(devices.videoDevices)
                setAudioDeviceList(devices.audioOutputDevices.concat(devices.audioInputDevices))
            }
        }

        getDevicesAsync()
    }, [])

    const changeAudioDevice = () =>{

    }
    return(
        <div className="button-wrapper d-inline-block">
            <i className="fa fa-caret-up choose-audio"></i>
            <div className="button mic">
                <i className="fa fa-microphone"></i>
                <div className="btn-text">{micText}</div>
            </div>
            {caretOpen ? <ActionCaretButton defaultValue={callStatus.audioDevice} changeHandler={changeAudioDevice} deviceList={audioDeviceList} type="audio" />  : <></>}
        </div>
    )
}