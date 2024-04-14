import Sidebar from "../sidebar"

interface layoutProps {
    children: JSX.Element
}

export default function layout ({children}: layoutProps){
    return <div className="w-full h-full min-h-[100vh]">
            <Sidebar />
            <Header/>
        </div>
}