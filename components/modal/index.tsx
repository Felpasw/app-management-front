import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

interface modalProps {
  toggle: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ toggle, isOpen, children }: modalProps) {
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setRender(true); 
      setTimeout(() => setVisible(true), 100); 
    } else {
      setVisible(false); 
      setTimeout(() => setRender(false), 300); 
    }
  }, [isOpen]);

  return (
    <>
      {render && (
        <div className="bg-black/30 backdrop-blur-sm h-full w-full z-[300] fixed top-0 left-0 flex justify-center items-center transition-opacity duration-300 ease-out">
          <div
            className={`p-6 bg-white border border-gray-200 rounded-lg relative w-[35%] transform transition-transform duration-300 ease-out ${
              visible ? 'scale-100' : 'scale-0'
            }`}
          >
            <IoMdClose className="absolute top-0 right-0 text-3xl cursor-pointer" onClick={toggle} />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
