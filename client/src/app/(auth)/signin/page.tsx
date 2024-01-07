'use client';

import { ServerErrors } from '@/common/types/server-errors';
import AuthForm from '@/components/auth/AuthForm';
import { SigninRequest } from '@/fetch/auth/SigninReq';
import paths from '@/paths';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FaHouseChimney } from 'react-icons/fa6';

export default function SignIn() {
  const [errors, setErrors] = useState<ServerErrors>([]);

  async function formAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { errors } = await SigninRequest(email, password);
    if (errors?.length) {
      setErrors(errors);
      return;
    }

    redirect(paths.home());
  }

  return (
    <section className="bg-slate-100 min-h-screen flex items-start justify-center">
      <div className="p-5 hidden w-0 lg:inline lg:w-1/2 h-screen">
        <div className="relative h-full">
          <Image
            src="/assets/img/auth/signup1.jpg"
            fill
            alt="Sign In Photo"
            className="rounded-2xl"
          />
          <div className="absolute w-full h-full rounded-2xl bg-slate-950 opacity-80"></div>
          <div className="absolute inset-0 rounded-2-xl font-bold text-2xl text-white p-5">
            <Image
              src="/assets/img/logo/logo-text-transparent.png"
              width={120}
              height={35}
              alt="Logo"
            />
          </div>
          <blockquote className="absolute bottom-5 text-lg italic font-semibold text-white px-10 pb-2">
            <p className="text-justify">
              &ldquo;In three words I can sum up everything I’ve learned about
              life: it goes on.&ldquo;
            </p>
            <div className="mt-5 text-base font-semibold text-slate-400">
              - Josh Grazioso
            </div>
          </blockquote>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-screen p-5 flex flex-col justify-start items-center">
        <div className="w-full flex flex-row justify-end items-start self-start">
          <Link href="/signup">
            <Button color="default" size="sm" radius="sm">
              Sign up
            </Button>
          </Link>
          <Link href="/" className="ml-2">
            <Button isIconOnly color="default" size="sm" radius="sm">
              <FaHouseChimney />
            </Button>
          </Link>
        </div>
        <div className="h-full flex flex-col justify-center items-center max-w-72 sm:max-w-80">
          <h1 className="font-semibold tracking-tight text-2xl">
            Sign in to your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Fill in the form below to sign in to your account
          </p>
          <AuthForm action={formAction} formType="Sign-in" errors={errors} />
        </div>
      </div>
    </section>
  );
}
