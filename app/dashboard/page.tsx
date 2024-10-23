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
import Spinner from '@/components/spinner';
import { get, insert, remove } from '@/crud';
import Input from '@/components/input';
import { ToastContainer, toast } from 'react-toastify';
import MyDoughnutChart from '@/components/graph';

interface isPendingTests {
  USB: boolean;
  Ping: boolean;
  Ethernet: boolean;
  CPUStress: boolean;
}

export default function dashboard() {
  const [isActive, setIsActive] = useState<boolean[]>([] as boolean[]);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState<boolean[]>([] as boolean[]);
  const [computers, setComputers] = useState<computers[]>([]);
  const [performedTests, setPerformedTests] = useState<tests[]>([]);
  const [computerInfo, setComputerInfo] = useState<computers>({} as computers);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenNewPC, setIsOpenNewPC] = useState<boolean>(false);
  const [newPcParams, setNewPCParams] = useState({
    SN: '',
    model: '',
  });

  const [isPending, setIsPending] = useState<isPendingTests>({
    USB: false,
    Ping: false,
    Ethernet: false,
    CPUStress: false,
  });

  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{ label: 'CARAIO', data: [100] }],
  };

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
    queue: async (SN: string) => {
      const response: queue[] = await get('/queue', { SN, status: 1 });

      response.forEach((item) => {
        setIsPending({ ...isPending, [item.method]: true });
      });
    },
  };

  const tests = ['USB', 'Ping', 'Ethernet', 'CPUStress'];

  const toggle = async () => setIsOpen(!isOpen);

  const requestTest = async (item: string) => {
    await insert(`/queue`, {
      status: 1,
      SN: computerInfo.SN,
      method: item,
    });
    getMethods.queue(computerInfo.SN);
  };

  const sendNewPC = async () => {
    const response = await insert('/computer', newPcParams);
    toast.success('Sucesso ao adicionar PC!');
    get('/computer').then((response) => {
      setComputers(response);
    });
  };

  const removePC = async () => {
    await remove('/computer', computerInfo._id);

    toast.success('Sucesso ao remover PC!');

    get('/computer').then((response) => {
      setComputers(response);
    });
    toggle();
  };

  return (
    <>
      <ToastContainer />
      <Modal toggle={toggle} isOpen={isOpen}>
        <div className="w-full">
          <div className="w-full h-full flex justify-center flex-col items-center">
            <FaComputer className={`w-[30%] h-[30%]   p-6 text-[#42ADA5]`} />
            <b className="text-5xl my-3 text-[#42ADA5]">{computerInfo.model}</b>
            <b className="my-3 text-sm">
              SN: {computerInfo.SN} -{' '}
              <b className="text-red-400 cursor-pointer" onClick={removePC}>
                {' '}
                Remover{' '}
              </b>{' '}
            </b>
            <hr />
          </div>
          <h1>Dashboard</h1>
          <hr className="mb-4" />
          <MyDoughnutChart />
          <h1>Status</h1>
          <hr className="mb-4" />
          <div className="grid grid-cols-2 gap-4 my-5">
            {tests.map((item) => (
              <>
                <b className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    {icons[item as keyof typeof icons]}
                    {item}
                  </div>
                  {isPending[item as keyof typeof isPending] ? (
                    <Spinner />
                  ) : (
                    <FaRepeat className="cursor-pointer text-[#42ADA5]" onClick={() => requestTest(item)} />
                  )}
                </b>
              </>
            ))}
          </div>
          <h1 className="mt-5">Últimos testes realizados</h1>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll ">
            {performedTests.map((item: tests) => {
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
            {performedTests.length === 0 && (
              <h1 className="my-5 w-full flex items-center justify-center text-[#42ADA5]"> Nenhum teste realizado</h1>
            )}
          </div>
          <hr />
          <div className="flex">
            <Button color="gradientGreen" text={'Concluir'} width={'w-[50%]'} />
            <Button color="outlinedWhite" text={'Cancelar'} width={'w-[50%]'} onClick={toggle} />
          </div>
        </div>
      </Modal>

      <Modal toggle={() => setIsOpenNewPC(!isOpenNewPC)} isOpen={isOpenNewPC}>
        <div className="w-full h-full p-12">
          <h1 className="w-full text-3xl flex justify-center">Novo computador </h1>
          <div className="mt-5 flex items-center w-full justify-center flex-col gap-6">
            <Input
              label={'Número de série'}
              value={newPcParams.SN}
              onChange={(e) => setNewPCParams({ ...newPcParams, SN: e.target.value })}
              width={'w-[80%]'}
              type={'text'}
            />

            <Input
              label={'Modelo'}
              value={newPcParams.model}
              onChange={(e) => setNewPCParams({ ...newPcParams, model: e.target.value })}
              width={'w-[80%]'}
              type={'text'}
            />
            <Button
              text={'Enviar'}
              width={'h-[40px] w-[80%]'}
              color={'gradientGreen'}
              onClick={() => sendNewPC()}
            ></Button>
          </div>
        </div>
      </Modal>

      <Layout>
        <div className="flex w-full">
          <div className="mx-5 w-full">
            <div className="w-full flex justify-between items-center">
              <h1 className="mt-16 text-4xl my-6 ">Computadores disponíveis</h1>
              <Button
                text={'Novo computador'}
                width={'h-[50px] my-6'}
                color={'gradientGreen'}
                onClick={() => setIsOpenNewPC(!isOpenNewPC)}
              ></Button>
            </div>
            <div className="grid grid-cols-5 gap-3 w-full">
              {computers.map((element, index) => (
                <div key={index} className="rounded items-center relative w-full">
                  <div
                    onClick={() => handleChange(index, setIsActive, isActive)}
                    className="flex flex-col w-full shadow-lg  items-center p-4 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer"
                  >
                    <FaComputer className="h-[25%] w-[25%] text-[#42ADA5]" />
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
                          setIsPending({
                            USB: false,
                            Ping: false,
                            Ethernet: false,
                            CPUStress: false,
                          });
                          for (const key in getMethods) {
                            const method = getMethods[key as keyof typeof getMethods]; // Garante que 'key' é uma chave válida
                            await method(element.SN); // Chama o método corretamente
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
