import { useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/outline";
import {shuffle} from 'lodash'
import { useEffect,useState } from "react";
import { useRecoilState } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";



const styles={
    wrapper:`flex-grow h-screen overflow-y-scroll scrollbar-hide`,
    Image:`w-10 h-10 rounded-full`,
    content:`flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 
    cursor-pointer rounded-full p-1 pr-2 text-white`,
    
}


const colors=[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]


function Center() {
    const {data:session}=useSession();
    const spotifyApi=useSpotify()
    const [color,setColor]=useState(null);
     const [playlistId,setPlaylistId]=useRecoilState( playlistIdState);
     const [playlist,setPlaylist]=useRecoilState(playlistState)

    useEffect(()=>{
        setColor(shuffle(colors).pop());
    },[playlistId])


     useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            setPlaylist(data.body);
        }).catch ((err)=>console.log("something is wrong",err))
    },[spotifyApi,playlistId])

  return (
    <div className={styles.wrapper}>
            <header className="absolute top-5 right-8">
                <div className={styles.content}>
                    {/*"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk4CENgVbt8WLeQtM8CWR6ws6GAygCiq-Vzw&usqp=CAU"*/}
                     <img  className={styles.Image} 
                 src={session?.user?.image} alt=""/>
                    {/* session?.user?.name */}
                    <h4>{session?.user?.name}</h4>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}>
                    <img 
                     className="h-44 shadow-2xl w-44 "
                    src={playlist?.image?.[0]?.url}/> 
                    <div>
                        <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h2>
                    </div>
            </section>
             <div>
                <Song/>
             </div>
    </div>
  )
}

export default Center