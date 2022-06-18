import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Songs({order,track}) {
    const spotify=useSpotify();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(currentPlayingState);

    const Playsong=()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-500 rounded-lg cursor-pointer">
        <div className="flex items-center space-x-4">
            <p>{order+1}</p>
            <img src={track.track.album.images[0].url} alt=""/>
            <div>
                <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
                <p className="w-40">{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Songs