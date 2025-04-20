import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import Image from 'next/image'
import React from 'react'

const Loader = ({isLoading}) => {
  return (
    <AlertDialog open={isLoading}>
        <AlertDialogContent className={"bg-white "}
        >

            <div className='bg-white flex flex-col items-center my-10 justify-center'>
                <Image src={"/loading.gif"} width={100} height={100}/>
                <h2 className="bg-white">Generate Your video please wait...</h2>
            </div>
        </AlertDialogContent>

    </AlertDialog>
  )
}

export default Loader