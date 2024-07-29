import { IoMdClose } from 'react-icons/io';

interface modalProps {
  toggle: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ toggle, isOpen, children }: modalProps) {
  return (
    <>
      <div className="bg-black/30 backdrop-blur-sm h-full w-full z-[300] fixed top-0 left-0 flex items-center justify-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg relative w-full">
          <IoMdClose className="absolute top-0 right-0 w-[15%] h-[15%]" />
          {children}
        </div>
      </div>
    </>
  );
}
