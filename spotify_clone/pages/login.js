import {getProviders,signIn} from 'next-auth/react'



function Login({providers}) {

  
   
  return (
    <div className='flex flex-col bg-black items-center justify-center h-screen w-full'>
        <img  className="w-52 mb-5" src='https://i.imgur.com/fPuEa9V.png' alt=""/>
         <div>
             {
               Object.values(providers).map((provider)=>{
                return(
                  <div key={provider.name}>
                     <button
                      onClick={()=>signIn(provider.id,{callbackUrl:'/'})}
                     className='bg-[#18D860] text-white p-5 rounded-lg'>
                        Login with {provider.name}
                     </button>
                    </div>
                )
               })
             }
         </div>
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()
 
  return{
    props:{
      providers
    }
  };
}
