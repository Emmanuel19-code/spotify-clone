import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Songs from './Songs';


function Song() {
    const playlist=useRecoilValue(playlistState);
  return (
    <div className='text-white px-8 flex flex-col space-y-1'>
       {
         playlist?.tracks.items.map((track,i)=>{
            return(
                <Song
                key={track.track.id}
                track={track.track}
                order={i}
                />
            )
         })
       }
    </div>
  )
}

export default Song