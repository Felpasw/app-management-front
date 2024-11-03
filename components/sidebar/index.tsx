'use client';

import { AiOutlineIdcard } from 'react-icons/ai';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

export default function sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      route: '/dashboard',
      text: 'PCs disponíveis',
      icon: <HiOutlineComputerDesktop />,
    },
    {
      route: '/usersManagement',
      text: 'Gerenciar usuários',
      icon: <AiOutlineIdcard />,
    },
  ];

  return (
    <div className="flex flex-col h-full p-3 w-[16%] bg-black justify-between min-h-[100vh]">
      <div className="space-y-3">
        <img src="./STATUSMANAGERBRANCO.png" alt="" className="h-full w-full" />

        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {navItems.map((item) => {
              return (
                <li className="rounded-sm">
                  <a
                    rel="noopener noreferrer"
                    href={item.route}
                    className={`flex items-center p-2  
								${pathname === item.route ? 'text-[#42ADA5]' : 'text-white'} 
								text-xl 
								hover:scale-110 
								hover:opacity-75 
								transition-transform 
								duration-300 
								ease-in-out 
								cursor-pointer`}
                  >
                    <span className="flex gap-2 items-center">
                      {item.icon} {item.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="p-2 mt-12 space-x-4 justify-self-end">
        
        <p className="text-white text-sm">
          Status Manager <b>by felpasw</b>
        </p>
      </div>
    </div>
  );
}
