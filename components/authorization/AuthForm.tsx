'use client';

//@Author: Adam Long
//Date: 10/17/24
//Danddy - SCRUM-106_2

import React, {useState} from 'react';
import InputField from './InputField';
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {authFormSchema} from './User'


export default function AuthForm({type} : {type : string}) {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) =>
  {
    console.log("its submitting");
    //Authenticate user here
    setIsLoading(true);
    try
    {
      if(type === 'sign-up')
      {
        const newUserResponse = {
          email: values.email!,
          username: values.username!,
          password: values.password!,
          confirmPass: values.confirmPassword!
        };
        //do something with userResponse

        if(newUserResponse)
          router.push('./');
      }
      if(type === 'sign-in')
      {
        const currUserResponse = {
          email: values.email!,
          password: values.password!
        };
        //do something with userResponse

        if(currUserResponse)
          router.push('./');
      }
    }
    catch(error)//you are able to catch a user already exists error to alert the screen.
    {
      //show alert
    }
    finally
    {
      console.log(values)
      setIsLoading(false);
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <section className="auth-form w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <header className="flex flex-col gap-5 md:gap-8 text-center">
            <h1 className="form-heading">
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-gray-600 mt-2">
              {type === 'sign-in'
                  ? 'Enter your credentials to continue.'
                  : 'Fill in your details to create an account.'}
            </p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
              {type === 'sign-up' && (
                  <div className="flex flex-col gap-3">
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
                  </div>
              )}
              {type === 'sign-in' && (
                  <div className="flex flex-col gap-3">
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
                  </div>
              )}

              <div className='flex flex-col gap-4 mt-5'>
                <Button
                    type="submit"
                    className="form-btn"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <div className="mt-6">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                  ) : (
                      type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1 mt-4">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
              <br />
              <Link
                  href={type === 'sign-in' ? '/signup' : '/signin'}
                  className="form-link flex justify-center"
              >
                {type === 'sign-in' ? 'Sign Up!' : 'Sign In!'}
              </Link>
            </p>
          </footer>
        </section>
      </div>
  );
}