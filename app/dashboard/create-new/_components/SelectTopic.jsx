"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
  
export const SelectTopic = ({onUserSelect}) => {
    const option = ["Custom Prompt", "Random Ai Story ","Scary Story","Historical Fact","Motivational","Fun Facts"];
    const [selectedOption,setSelectedOption] =useState();
  return (
    <div className=' flex flex-col gap-5'>
        <h2 className="font-bold text-2xl">Content</h2>
        <p className="text-gray-500 text-lg"> What is the topic of your video</p>
    <Select onValueChange={(value)=>{
        setSelectedOption(value);
        value!="Custom Prompt"&&onUserSelect("topic",value);
        } }>
  <SelectTrigger className="w-full mt-2 p-6 text-lg ">
    <SelectValue placeholder="Content Type" />
  </SelectTrigger>
  <SelectContent>
    {option.map((item) =>(

    <SelectItem value={item} key={item}>{item}</SelectItem>
    ))}
   
  </SelectContent>
</Select>
{selectedOption ==="Custom Prompt" && (
    <Textarea placeholder="Write a Prompt ..."
    onChange={(e)=>onUserSelect("topic",e.target.value)}/>
)}
    </div>
  )
}
