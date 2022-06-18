import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon
} from '@heroicons/react/outline';
import {useSession} from 'next-auth/react';
import { useEffect,useState} from 'react';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';



  const styles={
        wrapper:`flex items-center space-x-2`,
        container:`text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-width-[15rem]
         border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:inline-flex pb-36`,
        content:`space-y-4 `,
        playlist:`cursor-pointer hover:text-white`
    }
   
function Sidebar() {
   const spotifyApi=useSpotify();
   const {data:session,status}=useSession();
   const [playlist,setPlaylist]=useState([]);
    const [playlistId,setPlaylistId]=useRecoilState( playlistIdState);
    

   useEffect(()=>{
          if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylist(data.body.items);
            })
          }
   },[session,spotifyApi])
  return (
    <div className={styles.container}>
         <div className={styles.content}>
            <button className={styles.wrapper}>
               <HomeIcon className='h-5 w-5'/>
               <p>Home</p>
            </button>
             <button className={styles.wrapper}>
               <SearchIcon className='h-5 w-5'/>
               <p>Search</p>
            </button>
             <button className={styles.wrapper}>
               <LibraryIcon className='h-5 w-5'/>
               <p>Your library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
             <button className={styles.wrapper}>
               <PlusCircleIcon className='h-5 w-5'/>
               <p>Create Playlist</p>
            </button>
             <button className={styles.wrapper}>
               <HeartIcon className='h-5 w-5'/>
               <p>Your liked songs</p>
            </button>
             <button className={styles.wrapper}>
               <RssIcon className='h-5 w-5'/>
               <p>Your episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
            {/*playlist*/}
            {
              playlist.map((playlist)=>{
                return(
                  <p className={styles.playlist} key={playlist.id}>
                   {playlist.name}
                  </p>
                )
              })
            }
         </div>
    </div>
  )
}

export default Sidebar;