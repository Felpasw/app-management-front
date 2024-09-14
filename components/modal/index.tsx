import { IoMdClose } from 'react-icons/io';

interface modalProps {
  toggle: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ toggle, isOpen, children }: modalProps) {
  return (
    <>
      {isOpen ? (
        <div className="bg-black/30 backdrop-blur-sm h-full w-full z-[300] fixed top-0 left-0  flex justify-center items-center">
          <div className=" p-6 bg-white border border-gray-200 rounded-lg relative w-[35%]">
            <IoMdClose className="absolute top-0 right-0 text-3xl cursor-pointer" onClick={() => toggle()} />
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
