'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const login = () => {
    alert(`Email ${email}  Password  ${password}`);
    window.location.href = '/dashboard';
  };

  return (
    <main className="flex  bg-gradient-to-b ">
      <div className="border-solid border-2 w-[50%] h-full min-h-[100vh] flex flex-col justify-center items-center gap-6">
        <img src="./STATUSMANAGER.png" alt="" className="h-[65%] w-[65%]" />

        <Input
          label={'Email'}
          value={email}
          Icon={<MdEmail />}
          onChange={(e) => setEmail(e.target.value)}
          width={'w-[45%]'}
          type={'email'}
        />

        <Input
          label={'Senha'}
          value={password}
          Icon={<FaLock />}
          onChange={(e) => setPassword(e.target.value)}
          width={'w-[45%]'}
          type={'password'}
        />

        <Button color="gradientGreen" width={`w-[45%]`} onClick={() => login()} text="Entrar" />
      </div>
      <img src="./background.jpg" alt="" className="w-[50%]" />
    </main>
  );
}
