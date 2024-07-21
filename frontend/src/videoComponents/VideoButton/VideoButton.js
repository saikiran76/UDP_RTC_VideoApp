import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import startLocalVideoStream from "./startLocalVideoStream";
import updateCallStatus from "../../redux/actions/updateCallStatus";
import { getDevices } from "./getDevices";
import addStream from "../../redux/actions/addStream";
import ActionCaretButton from "../ActionCaretButton";


const VideoButton = ({smallFeedEl}) =>{
    const callStatus = useSelector(state => state.callStatus)
    const streams = useSelector(state=>state.streams);
    const [pendingUpdate, setPendingUpdate] = useState(false)
    const dispatch = useDispatch()
    const [caretOpen, setCaretOpen] = useState(false)
    const [videoDeviceList, setDeviceList] = useState([])

    const DropDown = () =>{
        return(
            <div className="caret-dropdown" style={{top:"-25px"}}>
                <select defaultValue={callStatus.videoDevice} onChange={changeVideoDevice}>
                    {videoDeviceList.map(vd=><option key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)}
                    <option></option>
                </select>
            </div>
        )
    }

    useEffect(()=>{
        const getDevicesAsync = async() =>{

        
            if(caretOpen){
                // we need to check for video devices
                const devices = await getDevices();
                console.log(devices.videoDevices)
                setDeviceList(devices.videoDevices)
            }
        }

        getDevicesAsync()
    }, [caretOpen])

    const changeVideoDevice = async(e) =>{
        // the user changed the desired video device
        // 1) we need to get the device
        const deviceId = e.target.value
        // 2) need to getUserMedia() (permission)
        const newConstraints =  {
            audio: callStatus.audioDevice === "default" ? true : {deviceId: {exact: callStatus.audioDevice}},
            video: {deviceId: {exact: deviceId}}
        } 
        // 3) update Redux state with that VideoDevice
        const stream = await navigator.mediaDevices(newConstraints)

        dispatch(updateCallStatus('videoDevice', deviceId))
        dispatch(updateCallStatus('video', 'enabled'))

        // update the localstream   
        smallFeedEl.current.srcObject  = stream;
        dispatch(addStream('localStream', stream))

        // add tracks
        const tracks = stream.getVideoTracks();

        // if we stop old tracks, add new tracks means negotiation


    }

    const startStopVideo = ()=>{
        console.log("sanitt check")
        // check if video is enabled, if so disabled
        if(callStatus.video === "enabled"){
            dispatch(updateCallStatus('video', 'disabled'))

            const tracks = streams.localStream.stream.getVideoTracks()
            tracks.forEach(t => t.enabled = false);

        } else if(callStatus.video === "disabled"){
            dispatch(updateCallStatus('video', 'enabled'))

            const tracks = streams.localStream.stream.getVideoTracks()
            tracks.forEach(t => t.enabled = true);

        } else if(callStatus.haveMedia){
            smallFeedEl.current.srcObject = streams.localStream.stream

            // startLocalVideoStream(streams, dispatch)


        }
        // second, check if video is disabled, if so enabled
        // thirdly, check to see if we have media, if so, start the stream
        // it is possible we dont have the media, then start the stream
        if(callStatus.haveMedia){
            // we have media show the feed  
            smallFeedEl.current.srcObject = streams.localStream.stream
            // add tracks to existing peer connection
            startLocalVideoStream(streams, dispatch);
        } else {
            setPendingUpdate(true)
        }
        // lastly, if possible, we dont have the media, wait for the media, then start the stream
    }

    useEffect(()=>{
        if(pendingUpdate && callStatus.haveMedia){
            console.log('Pending update succeeded')
        }
        // run if pendingUpdate changes to true
        setPendingUpdate(false)
        smallFeedEl.current.srcObject = streams.localStream.stream // update the local stream
        startLocalVideoStream(streams, dispatch);
    }, [pendingUpdate, callStatus.haveMedia])

    return(
        <div className="button-wrapper video-button d-inline-block">
            <i className="fa fa-caret-up choose-video" onClick={()=>setCaretOpen(!caretOpen)}></i>
            <div className="button camera" onClick={startStopVideo}>
                <i className="fa fa-video"></i>
                <div className="btn-text">{callStatus.video === "display" ? "Stop" : "Start"} Video</div>
            </div>
            {caretOpen ? <ActionCaretButton defaultValue={callStatus.videoDevice} changeHandler={changeVideoDevice} deviceList={videoDeviceList} type="video" />  : <></>}
        </div>
    )
}

export default VideoButton;