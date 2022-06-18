import {atom} from 'recoil';




export const currentTrackIdState=atom({
    key:'currentTrackIdState',
    default:null
})



export const currentPlayingState=atom({
    key:'currentPlayingState',
    default:false
})