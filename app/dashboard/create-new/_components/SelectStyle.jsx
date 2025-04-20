import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name:"Realistic",
            image:"/real.jpg"
        },
        {
            name:"Cartoon",
            image:"/cartoon.jpg"
        },
        {
            name:"Comic",
            image:"/comic.jpg"
        }
    ]
    const [selectedOption,setSelectedOption] = useState();
  return (
    <div className=' mt-7'>
        <h2 className="font-bold text-2xl">
            Style
        </h2>
        <p className="text-gray-500">Select your Video Style</p>
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {styleOptions.map((styleOption)=>(
                    <div key={styleOption.name} className={` relative hover:scale-105 transition-all cursor-pointer ${selectedOption===styleOption.name&&"border-2 border-black rounded-lg"}`}>
                        <Image src={styleOption.image} alt={styleOption.name} width={100} height={100}
                        className='h-48 object-cover rounded-lg w-full'
                        onClick={()=>{setSelectedOption(styleOption.name); onUserSelect("imageStyle",styleOption.name)}}/>
                        <h2 className=' absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{styleOption.name}</h2>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default SelectStyle