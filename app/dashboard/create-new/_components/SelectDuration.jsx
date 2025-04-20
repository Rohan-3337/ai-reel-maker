"use client"
import React,{useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export const SelectDuration = ({onUserSelect}) => {
    const [selectedOption,setSelectedOption] =useState();
    const options =["30 seconds","45 seconds","60 seconds"]
  return (
<div className='mt-7'>
        <h2 className="font-bold text-2xl">Duration</h2>
        <p className="text-gray-500 text-lg"> Select the Duration of your video</p>
    <Select onValueChange={(value)=>{
        setSelectedOption(value);
        onUserSelect("duration",value);
        } }>
  <SelectTrigger className="w-full mt-2 p-6 text-lg ">
    <SelectValue placeholder="Select Duration" />
  </SelectTrigger>
  <SelectContent>
    {options.map((item,idx) =>(

    <SelectItem value={item} key={idx}>{item}</SelectItem>
    ))}
   
  </SelectContent>
</Select>

    </div>
  )
}
