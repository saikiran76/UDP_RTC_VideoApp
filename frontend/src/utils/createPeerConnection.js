import peerConfiguration from "./stunServers"

const createPeerConnection = () =>{
    return new Promise(async(resolve, reject)=>{
        const peerConnection = await new RTCPeerConnection()
        //rtcPeer connection is the connection ti the peer
        // we may need more than this time
        // we pass it the config object, which is just stun servers
        // it will get us ICE candidates
        const remoteStream = new MediaStream();
        peerConnection.addEventListener('signalstatechange', (e)=>{
            console.log("Signaling State change")
            console.log(e)
        })
        peerConnection.addEventListener('icecandidates', e=>{
            console.log('Found ice candidates')
            if(e.candidate){
                // emit to socket server
            }

            resolve({
                peerConnection,
                remoteStream
            })
        })
    })

}

export default createPeerConnection