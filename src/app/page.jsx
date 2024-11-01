'use client'
import React, { useEffect, useState } from 'react'
import {useUser} from '@/context/user.js'
import { Building, GraduationCap, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
function page() {
  
  const [m,setm] = useState('Login boy')
  const { token, auth, updateToken } = useUser()
  const router = useRouter();


  useEffect(()=>{
      
      if(auth === true){
             router.push('/user')
      }
      else if(auth === false){
            router.push('/login')
      }

  },[auth])

  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="text-center">
      <div className="relative inline-block animate-pulse">
        <GraduationCap className="w-20 h-20 mx-auto text-primary transition-transform duration-1000 ease-in-out animate-scale" />
      </div>
      <div className="mt-8">
        <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary/70" />
      </div>
    </div>
  </div>
  )
}

export default page

