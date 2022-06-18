import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi from '../../../lib/spotify'
import {LOGIN_URL} from '../../../lib/spotify'
 const refreshAccessToken=async(token)=>{
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const {body:refreshedToken}=await spotifyApi.refreshAccessToken();
    console.log("RefreshToken is",refreshedToken);

    return{
      ...token,
      accessToken:refreshedToken.access_token,
      accessTokenExpires: Date.now+refreshedToken.expires_in *1000,
       //=one hour
       refreshToken:refreshedToken.refresh_token??token.refreshToken
    }
    
  } catch (error) {
     console.log(error);
     return{
      ...token,
      error:"RefreshAccessTokenError",
     };
  }
 }


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PLUBIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages:{
    signIn:'/login'
  },
  callbacks:{
    async jwt({token,account,user}){
           if(account && user){
             return{
              ...token,
              accessToken:account.access_token,
              refrshToken:account.refresh_token,
              username:account.providerAccountId,
              accessTokenExpires:account.expires_at*1000
             }
           }
               //this loads when the access token has not expired
           if(Date.now()<token.accessTokenExpires){
            console.log("EXISTING TOKEN IS VALID")
                  return token
           }

           //loads when the acees token has expired
            console.log("ACESS TOKEN HAS EXPIRED,REFRESHING")
            return await refreshAccessToken(token);
    },
    session({session,token}){
      session.user.accessToken=token.accessToken;
      session.user.refreshToken=token.refreshToken;
      session.user.username=token.username;

      return session;
    },
  },
});