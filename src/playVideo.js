function playVideo(stream, idVideo) {
    console.log(stream)
    const video = document.getElementById(idVideo)
    video.srcObject = stream
    video.onloadedmetadata = function() {
        video.play()
    }
}

export default playVideo