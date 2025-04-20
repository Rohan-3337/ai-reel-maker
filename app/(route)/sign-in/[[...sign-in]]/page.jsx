import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return(
    <div className=''>
        
        <div className="flex justify-center items-center h-screen">
            <SignIn/>
        </div>
    </div>
  )
}