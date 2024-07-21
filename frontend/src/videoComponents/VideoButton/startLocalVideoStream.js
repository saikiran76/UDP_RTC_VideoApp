// this function's job is to update all peerConnections (addTracks) and update redux callStatus
import updateCallStatus from "../../redux/actions/updateCallStatus";

const startLocalVideoStream = (streams, dispatch) =>{
    console.log("Sanity Check")

    const localStream = streams.localStream;
    for(const s in streams){ // s is the key
        if(s !== 'localStream'){
            // we dont addTracks to the localStream
            const curStream = streams[s];
            // addTracks to all peerConnections
            localStream.stream.getVideoTracks().forEach(t => {
                curStream.peerConnection.addTrack(t, streams.localStream.stream);
                
            });

            // update redux callStatus
            dispatch(updateCallStatus('video', "enabled"))

        }
        // const curStream = streams[s];
        // // addTracks to all peerConnections
        // localStream.stream.getVideoTracks().forEach(t=>{
        //     curStream.peerConnection.addTrack(t, curStream.stream)
        // })

        // //update callStatus
        // dispatch(updateCallStatus('video', 'enabled'));


    }



}

export default startLocalVideoStream;