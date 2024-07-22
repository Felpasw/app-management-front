interface modalProps {
  toggle: () => void;
  isOpen: boolean;
  child: JSX.Element;
}

export default function Modal({ toggle, isOpen, child }: modalProps) {
  return isOpen && <div className="absolute h-full w-full blur-sm ">{child}</div>;
}
