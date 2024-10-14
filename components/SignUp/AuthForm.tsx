'use client';

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {z} from "zod" /*This is a reminder that all form events must be client side */
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import SignUpFormTemplate from "./SignUpFormTemplate";
import {Loader2} from 'lucide-react';
import { authFormSchema } from '@/lib/utils';
import { signIn, signUp } from '@/lib/actions/user.actions';
import {useRouter} from 'next/navigation'

const AuthForm = ({type}: {type : string}) =>
{
    //Form Definiton
    const formSchema = authFormSchema(type);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        })

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    /*Sets initial loading state to false. If any action could cause a load, switch the bool val. */
    const [showAlert, setShowAlert] = useState(false);

    // Submission handler
    const onSubmit = async (values: z.infer<typeof formSchema>) =>
    {
        setIsLoading(true);
        try
        {
            if(type === 'sign-up')
            {
                const userNames = {
                    email: values.email,
                    password: values.password,
                    username: values.username
                }

                const newUserResponse = await signUp(userNames);
                setUser(newUserResponse);
            }
            if(type === 'sign-in')
            {
                const currUserResponse = await signIn({
                    email: values.email,
                    password: values.password
                });
                setUser(currUserResponse);

                if(currUserResponse)
                {
                    router.push('/');
                }

            }
        }
        catch(error)//you are able to catch a user already exists error to alert the screen.
        {
            setShowAlert(true);
        }
        finally
        {
            console.log(values)
            setIsLoading(false);
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <div>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Danddy Logo"
                    />

                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        Youngin
                    </h1>
                </div>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link your account!'
                            : type === 'sign-in'
                                ? "Sign In"
                                : "Sign Up"
                        }
                    </h1>
                </div>
            </header>

            {user ? (
                <div className='flex flex-col gap-4'>
                    <h1>Ummm User hii???</h1>
                </div>
            ):(
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type === 'sign-up' &&
                                (
                                    <div className='flex flex-col gap-3'>
                                        {/*Username/Email */}
                                        <SignUpFormTemplate
                                            form={form}
                                            name="username"
                                            label="Username"
                                            placeholder="Enter your username"
                                        />

                                        {/*Password */}
                                        <SignUpFormTemplate
                                            form={form}
                                            name='password'
                                            label='Password'
                                            placeholder='Enter your password'
                                            type='password'
                                        />

                                        {/*Password Confirm*/}
                                        <SignUpFormTemplate
                                            form={form}
                                            name='confirmPass'
                                            label='Confirm Password'
                                            placeholder=''
                                            type='password'
                                        />
                                    </div>
                                )}

                            {type === 'sign-in' &&
                                (
                                    <div className='flex flex-col gap-3'>
                                        {/*Username/Email */}
                                        <SignUpFormTemplate
                                            form={form}
                                            name="email"
                                            label="Email"
                                            placeholder="Enter your email"
                                        />
                                        {/*Password */}
                                        <SignUpFormTemplate
                                            form={form}
                                            name='password'
                                            label='Password'
                                            placeholder='Enter your password'
                                            type='password'
                                        />
                                    </div>
                                )}

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {isLoading ?
                                        (
                                            <div className='mt-6'>
                                                <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            </div>
                                        ):(
                                            type !== 'sign-in' ? 'Sign Up' : 'Sign In'
                                        )}
                                </Button>
                            </div>

                        </form>

                        <footer className='flex justify-center gap-1 mt-3'>
                            <p className='text-14 font-normal text-gray-600'>
                                {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}

                                <Link href={type === 'sign-in' ? '/sign_up' : '/sign_in'} className='form-link flex justify-center'>
                                    {type === 'sign-in' ? "Sign Up!" : "Sign In!"}
                                </Link>
                            </p>
                        </footer>
                    </Form>
                </div>
            )}
        </section>

    )
}

export default AuthForm