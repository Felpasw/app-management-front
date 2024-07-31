'use client';

import Layout from '@/components/layout';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaComputer, FaRegCircleCheck, FaRepeat, FaUsb, FaTowerBroadcast } from 'react-icons/fa6';
import { HiOutlineStatusOffline } from 'react-icons/hi';
import { MdOutlineOnlinePrediction, MdCable } from 'react-icons/md';
import { BsCpuFill } from 'react-icons/bs';
import { CgDetailsMore } from 'react-icons/cg';
import { FaHeartbeat, FaFan, FaMouse } from 'react-icons/fa';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { GiCancel } from 'react-icons/gi';
import { ImConnection } from 'react-icons/im';
import Modal from '@/components/modal';
import Button from '@/components/button';

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
];

export default function dashboard() {
  const [isActive, setIsActive] = useState<boolean[]>([] as boolean[]);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState<boolean[]>([] as boolean[]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (index: number, setState: Dispatch<SetStateAction<boolean[]>>, state: boolean[]) => {
    const prevArray = [...state];
    prevArray[index] = !prevArray[index];
    setState(prevArray);
  };

  const tests = [
    {
      icon: <FaUsb />,
      text: 'USB',
    },

    {
      icon: <FaTowerBroadcast />,
      text: 'Ping',
    },
    {
      icon: <MdCable />,
      text: 'Ethernet',
    },
    {
      icon: <BsCpuFill />,
      text: 'CPUStress',
    },
  ];

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Modal toggle={toggle} isOpen={isOpen}>
        <div className="w-full">
          <div className="w-full h-full flex justify-center flex-col items-center">
            <FaComputer className="w-[30%] h-[30%]  border p-6" />
            <b className="text-3xl my-3">DESKTOP12345</b>
            <hr />
          </div>
          <h1>Status</h1>
          <hr className="mb-4" />
          <div className="grid grid-cols-2 gap-4 my-5">
            {tests.map((item) => (
              <b className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.text}
                </div>
                <div>
                  <FaRepeat />
                </div>
              </b>
            ))}
          </div>
          <h1 className="mt-5">Últimos testes realizados</h1>
          <hr />
          <div className="flex">
            <Button text={'Concluir'} width={'w-[50%]'} />
            <Button text={'Cancelar'} width={'w-[50%]'} />
          </div>
        </div>
      </Modal>

      <Layout>
        <div className="flex w-full">
          <div className="mx-5 w-full">
            <h1 className="mt-16 text-4xl my-6 ">Computadores disponíveis</h1>
            <div className="grid grid-cols-5 gap-3 w-full">
              {computers.map((element, index) => (
                <div key={index} className="rounded items-center relative w-full">
                  <div
                    onClick={() => handleChange(index, setIsActive, isActive)}
                    className="flex flex-col w-full shadow-lg  items-center p-4 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer"
                  >
                    <FaComputer className="h-[25%] w-[25%]" />
                    {element.ip} <br />
                    {element.name}
                    {!element.online ? (
                      <div className="flex items-center gap-2">
                        <HiOutlineStatusOffline className="text-red-500" /> offline
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MdOutlineOnlinePrediction className="text-green-400" /> online
                      </div>
                    )}
                  </div>
                  {isActive[index] && (
                    <div className="absolute w-full h-fit p-6 gap-3 shadow-lg z-50 bg-white mt-3 rounded flex flex-col">
                      <div
                        onClick={toggle}
                        className="flex hover:scale-110 gap-2 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center"
                      >
                        <CgDetailsMore /> Ver detalhes
                      </div>
                      <div
                        onClick={() => handleChange(index, setIsActiveSubmenu, isActiveSubmenu)}
                        className="flex hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer items-center justify-between gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <FaHeartbeat /> Status
                        </div>
                        {isActiveSubmenu[index] ? <IoChevronDown /> : <IoChevronUp />}
                      </div>
                      {isActiveSubmenu[index] && (
                        <div className="flex flex-col items-start">
                          <div className="flex w-full items-center gap-2">
                            <FaFan /> Fan <GiCancel className="text-red-500" />
                          </div>
                          <hr />

                          <div className="flex w-full items-center gap-2   ">
                            <FaMouse /> Mouse <FaRegCircleCheck className="text-green-400" />
                          </div>
                          <div className="flex w-full items-center gap-2   ">
                            <ImConnection /> Ping <FaRegCircleCheck className="text-green-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
