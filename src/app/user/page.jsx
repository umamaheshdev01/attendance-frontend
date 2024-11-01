'use client'
import React, { useEffect } from 'react'
import { useUser } from '@/context/user'
import { useRouter } from 'next/navigation'

function page() {

    const { token, auth, updateToken } = useUser()
    const nav = useRouter()
    
    

  return (
    <div>
      Logged in
      <button onClick={()=>updateToken(null)}>Log out</button>
    </div>
  )
}

export default page;
