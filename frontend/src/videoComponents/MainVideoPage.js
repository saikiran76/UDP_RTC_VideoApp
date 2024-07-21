import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import './videoComponent.css'
import CallInfo from "./CallInfo"
import ChatWindow from "./ChatWindow"
import ActionButtons from "./ActionButton"
import addStream from "../redux/actions/addStream"
import { useDispatch } from "react-redux"
import createPeerConnection from "../utils/createPeerConnection"
import socket from "../utils/socketConnection"
import updateCallStatus from "../redux/actions/updateCallStatus"

    const MainVideoPage = () =>{
        const [searchParams, setSearchParams] = useSearchParams()
        const [appointmentInfo, setAppointmentInfo] = useState({})
        const dispatch = useDispatch()
        const smallFeedElement = useRef(null) // react reference to DOM element in react way
        const largeFeedElement = useRef(null);

        useEffect(()=>{
            // fetch user media
            const fetchMedia = async() =>{
                const constraints = {
                    video: true, // must have one constraint
                    audio: false
                }
                try{
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    dispatch(updateCallStatus('haveMedia', true)) // update our callStatus reducer to know that we have the media
                    dispatch(addStream('localStream', stream))
                    const {peerConection, remoteStream} = await createPeerConnection();
                    // We dont know who we are talking to yet
                    dispatch(addStream('remote1', remoteStream, peerConection));
                    // we have a peerConnection... let's make an offer!

                    // Except, its not time yet
                    // SDP - information about its feed, we have NO tracks

                    // socket.emit...



                    

                } catch(err){
                    console.log(err)

                }
            }

            fetchMedia()
        }, [])

        useEffect(()=>{
            // GRAB THE TOKEN VAR OUT OF THE QUERY STRING
            const token = searchParams.get('token')
            console.log(token)

            const fetchDecodedToken = async()=>{
                const res = await axios.post("https://localhost:5000/validate-link", {token})
                console.log(res.data)
                setAppointmentInfo(res.data)
            }

            fetchDecodedToken() 
        }, [])

    return(
        <div className="main-video-page">
            <div className="video-chat-wrapper">
                <video id="large-feed" ref={largeFeedElement} autoPlay controls playsInline></video>
                <video id="own-feed" ref={smallFeedElement} autoPlay controls playsInline></video>
                {appointmentInfo.professionalsName ? <CallInfo apptInfo={appointmentInfo}/> :<></> }
                <ChatWindow/>
                <ActionButtons smallFeedlEl={smallFeedElement}/>
            </div>
        </div>
    )
}

export default MainVideoPage