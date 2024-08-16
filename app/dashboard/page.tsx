'use client';

import { IoMdCloseCircleOutline } from 'react-icons/io';
import Layout from '@/components/layout';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { get } from '@/crud';

export default function dashboard() {
  const [isActive, setIsActive] = useState<boolean[]>([] as boolean[]);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState<boolean[]>([] as boolean[]);
  const [computers, setComputers] = useState<computers[]>([]);
  const [performedTests, setPerformedTests] = useState<tests[]>([]);
  const [computerInfo, setComputerInfo] = useState<computers>({} as computers);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    get('/computer').then((response) => {
      setComputers(response);
    });
  }, []);

  const handleChange = async (index: number, setState: Dispatch<SetStateAction<boolean[]>>, state: boolean[]) => {
    const prevArray = [...state];
    prevArray[index] = !prevArray[index];
    setState(prevArray);
  };

  const icons = {
    USB: <FaUsb />,
    Ping: <FaTowerBroadcast />,
    Ethernet: <MdCable />,
    CPUStress: <BsCpuFill />,
  };

  const getMethods = {
    computer: async (SN: string) => {
      const response = await get('/computer', { SN });
      setComputerInfo(response[0]);
    },

    test: async (SN: string) => {
      const response = await get('/test', { SN });
      setPerformedTests(response);
    },
  };

  const tests = ['USB', 'Ping', 'Ethernet', 'CPUStress'];

  const toggle = async () => setIsOpen(!isOpen);

  return (
    <>
      <Modal toggle={toggle} isOpen={isOpen}>
        <div className="w-full">
          <div className="w-full h-full flex justify-center flex-col items-center">
            <FaComputer className="w-[30%] h-[30%]  border p-6" />
            <b className="text-3xl my-3">{computerInfo.model}</b>
            <p className="my-3 text-sm">SN: {computerInfo.SN}</p>
            <hr />
          </div>
          <h1>Status</h1>
          <hr className="mb-4" />
          <div className="grid grid-cols-2 gap-4 my-5">
            {tests.map((item) => (
              <>
                <b className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    {icons[item]}
                    {item}
                  </div>
                  <div>
                    <FaRepeat />
                  </div>
                </b>
              </>
            ))}
          </div>
          <h1 className="mt-5">Últimos testes realizados</h1>
          <hr />
          <div className="max-h-[500px] overflow-y-hidden ">
            {performedTests.map((item) => {
              return (
                <>
                  <div className="flex justify-between my-5">
                    <div className="flex items-center gap-2 text-lg">
                      {icons[item.type]}
                      <b>{item.type}</b>
                    </div>
                    {item.success ? (
                      <div className="flex text-green-400 items-center gap-2 justify-center">
                        <b className="flex items-center gap-2">
                          {item.madeAt} <FaRegCircleCheck />
                        </b>
                      </div>
                    ) : (
                      <div className="flex text-red-400 items-center gap-2 justify-center">
                        <b className="flex items-center gap-2">
                          {item.madeAt}

                          <IoMdCloseCircleOutline />
                        </b>
                      </div>
                    )}
                  </div>
                  <hr />
                </>
              );
            })}
          </div>

          <hr />

          <div className="flex">
            <Button color="gradientGreen" text={'Concluir'} width={'w-[50%]'} />
            <Button color="outlinedWhite" text={'Cancelar'} width={'w-[50%]'} />
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
                    {element.IP} <br />
                    {element.model}
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
                        onClick={async () => {
                          for (const key in getMethods) {
                            await getMethods[key](element.SN);
                          }
                          toggle();
                        }}
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
