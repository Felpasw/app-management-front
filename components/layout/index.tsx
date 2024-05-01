import Header from "../header"
import Sidebar from "../sidebar"



export default function layout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <div className="w-full h-full min-h-[100vh] relative">
            <Header/>
            <div className="flex  ">
                <Sidebar />
                <div className="w-full h-full">
                {children}

                </div>
            </div>

        </div>
}