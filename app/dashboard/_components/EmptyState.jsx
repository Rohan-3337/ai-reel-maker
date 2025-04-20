"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 py-24 flex  gap-3 flex-col items-center mt-10 border-2 border-dashed'>
        <h2>
            Start create a new Short Video
        </h2>
        <Link href={"/dashboard/create-new"}>
        <Button>
            Create a new Short video
        </Button>
        </Link>
    </div>
  )
}

export default EmptyState