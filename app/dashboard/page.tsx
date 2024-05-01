import Layout from "@/components/layout";
import { FaComputer } from "react-icons/fa6";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { MdOutlineOnlinePrediction } from "react-icons/md";



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
    }
]


export default function dashboard() {
    return(

    <Layout >
        <div className="flex justify-between">

        <div className="mx-5">
        <h1 className="mt-16 text-4xl my-6 ">Computadores disponíveis</h1>
        <div className="flex gap-3 ">
        {computers.map((element)=>{
            return (
            <div className="rounded items-center  justify-center p-4 flex flex-col w-[25%] shadow-lg hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer">
            <FaComputer className="h-[50%] w-[50%]"/>
                
                <div className="flex flex-col w-full">
                {element.ip} <br />
                {element.name}
                {element.online ? 
                   (<div className="flex items-center gap-2">
                        <HiOutlineStatusOffline className="text-red-500"/> offline
                    </div>) : 
                    (<div className="flex items-center gap-2">
                        <MdOutlineOnlinePrediction  className="text-green-400"/> online
                    </div>)
                }
             
                
                </div>
                
            </div>)
        })}

        </div>
        </div>
        </div>

    </Layout>
    ) 
}