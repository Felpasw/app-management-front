interface buttonProps  {
    text: string,
    onClick?: () => void
    width: string

}


export default function Button ({text, onClick, width}: buttonProps){
    return <button type="button" 
    onClick={onClick}
    className={`${width} text-white 
    bg-gradient-to-r 
    from-[#42ADA5] 
    via-[#266D69] 
    to-[#EAFDFD] hover:bg-gradient-to-bl 
    focus:ring-4 
    focus:outline-none 
    focus:ring-[#42ADA5] 
    dark:focus:ring-[#266D69]
    shadow-lg
    shadow-[#42ADA5]/50
    dark:shadow-lg 
    dark:shadow-[#266D69]/80 
    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
    hover:scale-105
    transition-transform
    duration-200
    
    `}>{text}
    </button>
}