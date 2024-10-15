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

    //Authenticate user here
    const response = true;

    setIsLoading(false);
    if(response)
    {
      router.push("/");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <section className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-gray-600 text-sm">
              {type === 'sign-in'
                  ? 'Enter your credentials to continue.'
                  : 'Fill in your details to create an account.'}
            </p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === 'sign-up' && (
                  <>
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
                  </>
              )}
              {type === 'sign-in' && (
                  <>
                    <InputField
                        form={form}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <InputField
                        form={form}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />
                  </>
              )}

              <Button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin" size={20} />
                    </div>
                ) : (
                    type === 'sign-in' ? 'Sign In' : 'Sign Up'
                )}
              </Button>
            </form>
          </Form>

          <footer className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {type === 'sign-in'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              <Link
                  href={type === 'sign-in' ? '/signup' : '/signin'}
                  className="text-blue-600 hover:underline ml-1"
              >
                {type === 'sign-in' ? 'Sign Up!' : 'Sign In!'}
              </Link>
            </p>
          </footer>
        </section>
      </div>
  );
}