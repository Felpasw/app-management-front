'use client';

import Layout from '@/components/layout';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { FaUserCircle, FaUserMinus, FaUserEdit } from 'react-icons/fa';
import { get } from '@/crud';

export default function usersManagement() {
  const [isActive, setIsActive] = useState<boolean[]>([] as boolean[]);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState<boolean[]>([] as boolean[]);
  const [users, setUsers] = useState([] as user[]);

  useEffect(() => {
    get('user').then((response) => {
      setUsers(response);
    });
  }, []);

  const handleChange = (index: number, setState: Dispatch<SetStateAction<boolean[]>>, state: boolean[]) => {
    const prevArray = [...state];
    prevArray[index] = !prevArray[index];
    setState(prevArray);
  };

  return (
    <Layout>
      <div className="flex w-full">
        <div className="mx-5 w-full">
          <h1 className="mt-16 text-4xl my-6 ">Gerenciamento de usuários</h1>
          <div className="grid grid-cols-5 gap-3 w-full">
            {users?.map((element: user, index) => (
              <div key={index} className="rounded items-center relative w-full">
                <div
                  onClick={() => handleChange(index, setIsActive, isActive)}
                  className="flex flex-col w-full shadow-lg  items-center p-4 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer"
                >
                  <FaUserCircle className="h-[25%] w-[25%]" />
                  {element.username} <br />
                </div>
                {isActive[index] && (
                  <div className="absolute w-full h-fit p-6 gap-3 shadow-lg z-50 bg-white mt-3 rounded flex flex-col">
                    <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                      <CgDetailsMore /> Ver detalhes
                    </div>
                    <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                      <FaUserEdit /> Editar
                    </div>
                    <div className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center">
                      <FaUserMinus /> Remover
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
