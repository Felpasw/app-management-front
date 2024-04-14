interface buttonProps  {
    text: string,
    onClick?: () => void

}


export default function Button ({text, onClick}: buttonProps){
    return <button type="button" 
    onClick={onClick}
    className="w-[50%] 
    text-white 
    bg-gradient-to-r from-black via-black to-blue-900 
    hover:bg-gradient-to-bl 
    focus:ring-4 
    focus:outline-none 
    focus:ring-blue-300 
    dark:focus:ring-blue-800 shadow-lg 
    shadow-blue-500/50 dark:shadow-lg 
    dark:shadow-blue-800/80 font-medium 
    rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
    
    ">{text}
    </button>
}