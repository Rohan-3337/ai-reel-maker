"use client"

import { isnewUser } from '@/lib/utils';
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

const Provider = ({children}) => {
    const {user}  = useUser();
    console.log(user)
    
    useEffect(()=>{
        user&&isnewUser(user)
    },[user])
    
  return (
    <div>{children}</div>
  )
}

export default Provider