import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify';
import {useRecoilState} from 'recoil'
import {debounce} from 'lodash';
import {currentTrackIdState,currentPlayingState} from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo';
import { PauseIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon } from '@heroicons/react/solid';
import { FastForwardIcon, ReplyIcon, VolumeUpIcon} from '@heroicons/react/outline';

function Player() {
    const spotifyApi = useSpotify();
    const {data:session,status}=useSession();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(currentPlayingState);
     const [volume,setVolume]=useState(50);
     const songInfo=useSongInfo()
 
 const fetchcurrentSong=()=>{
    if(!songInfo){
         spotifyApi.getMyCurrentPlayingTrack().then((data)=>{
            setCurrentTrackId(data.body?.item?.id)
         })
         spotifyApi.getMyCurrentPlaybackState().then((data)=>{
            setIsPlaying(data.body?.is_playing)
         })
    }
 }

  const handlePlayPause=()=>{
    spotifyApi.getMyCurrentPlaybackState().then((data)=>{
          if(data.body.is_playing){
            spotifyApi.pause()
                setIsPlaying(false)
          }else{
            spotifyApi.play();
            setIsPlaying(true)
          }
    })
  }

      useEffect(()=>{
             fetchcurrentSong();
             setVolume(50)
      },[spotifyApi,session,currentTrackIdState])


      useEffect(()=>{
               if(volume>0 && volume<100){
               debounceAdjustVolune(volume)
               }
      },[volume])

       const debounceAdjustVolune=useCallback(
           debounce((volume)=>{
                spotifyApi.setVolume(volume).catch((err)=>{})
           },500),
           []
       )

       
  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white 
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        <div className='flex items-center space-x-4'>
            <img  className='hidden md:inline h-10 w-10'
            src={songInfo?.album?.images?.[0]?.url}  alt=""/>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
   {/**center */}
    <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button'/>
        <RewindIcon className='button'
        onClick={()=>spotifyApi.skipToPrevious()}
        />
        {
            isPlaying?<PauseIcon 
            onClick={handlePlayPause}
            className='button h-10 w-10'/>:<PlayIcon
             onClick={handlePlayPause}
            className='button h-10 w-10'/>
        }
        <FastForwardIcon  className="button" onClick={()=>spotifyApi.skipToNext()}/>
        <ReplyIcon className='button'/>
    </div>
      {/*right */}
     <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
         <input className="w-14 lg:w-28" type="range"
          onChange={(e)=>setVolume(Number(e.target.value))}
         value={volume} min={0} max={100}/>
        <VolumeUpIcon onClick={()=>{volume<100 && setVolume(volume+10)}} className='button'/>
     </div>
    </div>
  )
}

export default Player