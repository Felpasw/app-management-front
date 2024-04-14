
'use client';

import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Home() {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const login = () => {
    alert(`Email ${email}  Password  ${password}`)
    window.location.href = '/dashboard'
  }
  

  return (
    <main className="flex  bg-gradient-to-b ">
          <img src="./logo.png" alt="" className="w-[50%] h-full min-h-[100vh" />
        <div className="border-solid border-2 w-[50%] h-full min-h-[100vh] flex flex-col justify-center items-center gap-6"> 
          <h1 className="text-3xl mb-12">STATUS MANAGER MASTER</h1> 
    
      <Input 
          label={"Email"} 
          value={email}
          Icon={<MdEmail />} 
          onChange={ (e) => setEmail(e.target.value) } 
          width={"w-[50%]"} 
          type={"email"} />

       
        <Input 
          label={"Senha"} 
          value={password}
          Icon={<FaLock />} 
          onChange={ (e) => setPassword(e.target.value) } 
          width={"w-[50%]"} 
          type={"password"} />


        <Button onClick={() => login()} text="Entrar"/>

     
     
     
      </div>

    </main>
  );
}
