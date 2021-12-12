import ReactPlayer from 'react-player'

const Video = () => {
    return (
        <div className="video-container">
            <ReactPlayer url='https://www.youtube.com/watch?v=xyiuBEBv0_0&t=6543s&ab_channel=CodewithAniaKub%C3%B3w'
                controls={false} playing={true} width={'100%'} height={'100%'} />
        </div>
    )
}

export default Video
