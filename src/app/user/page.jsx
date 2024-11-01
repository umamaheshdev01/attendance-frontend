'use client'
import React, { useEffect } from 'react'
import { useUser } from '@/context/user'
import { useRouter } from 'next/navigation'
import Main from '@/components/main'

function page() {

    const { token, auth, updateToken ,user } = useUser()
    const nav = useRouter()
    
    

  return (
    <div>
      <Main main='Component' name='main'>
     

     
      </Main>
    </div>
  )
}

export default page;
