import { signIn, useSession } from "next-auth/react"
import spotifyApi from "../lib/spotify";
import { useEffect } from "react";


function useSpotify() {
    const {data:session,status}=useSession();

    useEffect(()=>{
        //if there is a failure in the refresh direct the user to the login page
         if(session){
            if(session.error=="RefreshAccessTokenError"){
                 signIn()
            }
            spotifyApi.setAccessToken(session.user.accessToken)
         }
    },[session])
  return spotifyApi;
}

export default useSpotify;