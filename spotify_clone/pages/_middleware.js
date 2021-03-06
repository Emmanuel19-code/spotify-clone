import {getToken} from 'next-auth/jwt'
import {  NextResponse } from 'next/server'


export async function middleware(req){
  //token will exist if user is logged in
  const token=await getToken({req,secret:process.env.JWT_SECRET});

   const {pathname}=req.nextUrl;
   console.log(pathname)
   if(pathname.includes('/api/auth') || token){
    return NextResponse.next();
   }
       if(!token && pathname!=='/login'){
         console.log("not connected")
       }
}