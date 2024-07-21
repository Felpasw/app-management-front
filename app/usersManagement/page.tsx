'use client';

import Layout from "@/components/layout";
import { Dispatch, SetStateAction, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaUserCircle, FaUserMinus, FaUserEdit } from "react-icons/fa";


const computers = [
    {
        ip: '192.168.0.1',
        name: 'DESKTOP12345',
        online: false,    
        
    },
    {
        ip: '192.168.0.2',
        name: 'DESKTOP23789',
        online: true,    
    },
    {
        ip: '192.168.0.3',
        name: 'DESKTOP12345',
        online: false,    
    },
    {
        ip: '192.168.0.4',
        name: 'DESKTOP237289',
        online: true,    
    },
    {
        ip: '192.168.0.5',
        name: 'DESKTOP2327289',
        online: false,    
    },
    {
        ip: '192.168.0.6',
        name: 'DESKTOP132789',
        online: false,    
    },
    {
        ip: '192.168.0.7',
        name: 'DESKTOP122345',
        online: false,    
        
    },
    {
        ip: '192.168.0.8',
        name: 'DESKTOP122345',
        online: false,    
        
    },
    {
        ip: '192.168.0.9',
        name: 'DESKTOP123425',
        online: false,    
        
    },
    {
        ip: '192.168.0.10',
        name: 'DESKTOP123425',
        online: false,    
        
    },
    {
        ip: '192.168.0.11',
        name: 'DESKTOP123425',
        online: false,    
    },
]


export default function usersManagement() {
    const [isActive, setIsActive] = useState<boolean[]>([] as boolean[]);
    const [isActiveSubmenu, setIsActiveSubmenu] = useState<boolean[]>([] as boolean[]);
    

    const handleChange = (index: number, setState:  Dispatch<SetStateAction<boolean[]>>, state: boolean[]) => {
        const prevArray = [...state]
        prevArray[index] = !prevArray[index]
        setState(prevArray);
    }

    return(
    <Layout >
        <div className="flex w-full">

        <div className="mx-5 w-full">
        <h1 className="mt-16 text-4xl my-6 ">Gerenciamento de usuários</h1>
        <div className="grid grid-cols-5 gap-3 w-full">
  {computers.map((element, index) => (
        <div key={index} className="rounded items-center relative w-full">
        <div 
            onClick={() => handleChange(index, setIsActive, isActive)} 
            className="flex flex-col w-full shadow-lg  items-center p-4 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer"
        >
            <FaUserCircle className="h-[25%] w-[25%]" />
            {element.ip} <br />
            {element.name}
        </div>
            {isActive[index] && 
            <div className="absolute w-full h-fit p-6 gap-3 shadow-lg z-50 bg-white mt-3 rounded flex flex-col">
                <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                    <CgDetailsMore/> Ver detalhes
                </div>
                <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                    <FaUserEdit/> Editar
                </div>
                <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                    <FaUserMinus/> Remover 
                </div>
                
             



            </div>
        }
    </div>
  ))}
</div>

        </div>
        </div>

    </Layout>
    ) 
}