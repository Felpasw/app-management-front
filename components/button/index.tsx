const buttonColors = {
  gradientGreen: `bg-gradient-to-r 
    from-[#42ADA5] 
    via-[#266D69] 
    focus:ring-4 
    focus:outline-none 
    focus:ring-[#42ADA5] 
    dark:focus:ring-[#266D69]
    shadow-lg
    hover:scale-105
    shadow-[#42ADA5]/50
    dark:shadow-lg 
    dark:shadow-[#266D69]/80 
    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
    transition-transform
    duration-200
    text-white
`,
  outlinedWhite: 'border rounded ',
};

interface buttonProps {
  text: string;
  onClick?: () => void;
  width: string;
  color: keyof typeof buttonColors;
}

export default function Button({ text, onClick, width, color }: buttonProps) {
  return (
    <button type="button" onClick={onClick} className={`${width} ${buttonColors[color]}`}>
      {text}
    </button>
  );
}
