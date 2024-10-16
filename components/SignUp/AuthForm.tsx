'use client'

import React, { useState, FormEvent } from 'react';
import { User } from './User';
import InputField from './InputField';
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {authFormSchema} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
import {Loader2} from "lucide-react";

export default function AuthForm({type} : {type : string}) {

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    first_joined: new Date().toISOString(),
    last_login: new Date().toISOString(),
    characters: [''],
    campaigns: []
  });

  //Form Definiton
  const formSchema = authFormSchema(type);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>(
      {
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          username: ""
        },
      })

  // Submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) =>
  {
    setIsLoading(true);
    setAuthError("");

    //Authenticate user here
    const response = true;

    setIsLoading(false);
    if(response)
    {
      router.push("/");
    }
    else
    {
      setAuthError("Error logging in, try again later.")
    }
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleCharactersChange = (value: string) => {
    setUserData({
      ...userData,
      characters: value.split(',').map(char => char.trim())
    });
  };

  const validateUserData = (user: User) => {
    return user.username && user.email && user.password;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateUserData(userData)) {
      onSubmit(userData);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <section className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
          <header className="flex flex-col items-center gap-6 mb-6">
            <h1 className="font-semibold text-gray-900">
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-sm text-gray-600">
              {type === 'sign-in' ? "Enter your credentials to continue." : "Fill in your details to create an account."}
            </p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
              />
              <InputField
                  form={form}
                  name="username"
                  label="Username"
                  placeholder="Choose a username"
              />
              <InputField
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
              />
              <InputField
                  form={form}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
              />

              <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md" disabled={isLoading}>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="animate-spin" size={20} />
                    </div>
                ) : (
                    type === 'sign-in' ? 'Sign In' : 'Sign Up'
                )}
              </Button>
            </form>
          </Form>

          <footer className='flex justify-center gap-1 mt-3'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}

              <Link href={type === 'sign-in' ? '/signup' : '/signin'} className='form-link flex justify-center'>
                {type === 'sign-in' ? "Sign Up!" : "Sign In!"}
              </Link>
            </p>
          </footer>
        </section>
      </div>
  );
}