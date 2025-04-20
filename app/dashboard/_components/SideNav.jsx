import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideNav = () => {
    const menuOptions = [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard",
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: "Create New",
            path: "/dashboard/create-new",
            icon: FileVideo
        },
      
    ]
    return (
        <div className='w-64 h-screen shadow-md p-5'>
            <div className=' grid gap-3'>
                {menuOptions.map((item, index) => (
                    <Link href={item.path} key={index} >
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-200 hover:rounded-md cursor-pointer">
                        <item.icon className="w-5 h-5" />
                        <h2>{item.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav;
