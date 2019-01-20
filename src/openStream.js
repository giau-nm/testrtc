import playVideo from './playVideo'
import Peer from "simple-peer"
import $ from "jquery"

function openStream() {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then(stream => {
            // console.log(stream)
            playVideo(stream, 'localStream')

            const p = new Peer({initiator: window.location.hash === '#1', trickle: false, stream})

            p.on('signal', token => {
                $('#txtMySignal').val(JSON.stringify(token))
            })

            p.on('stream', friendStream => {
                playVideo(friendStream, 'friendStream')
            })

            p.on('data', data => {
                console.log(data)
            })

            $('#btnConnect').click(() => {
                const friendSignal = JSON.parse($('#txtFriendSignal').val())
                p.signal(friendSignal)
            })
        })
        .catch(err => console.log(err))
}

export  default openStream