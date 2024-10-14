import React, { useState, FormEvent } from 'react';
import { SignUpFormProps, User } from './User';
import InputField from './InputField';
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {authFormSchema} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Loader2} from "lucide-react";

export default function SignUpForm({type} : {type : string}) {

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
        },
      })

  // Submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) =>
  {
    setIsLoading(true);
    try
    {
      if(type === 'sign-up')
      {
        const newUserResponse = {
          email: values.email,
          password: values.password,
          username: values.username
        }

        //finish signup process here

        if(newUserResponse)
        {
          router.push('/');
        }
      }
      if(type === 'sign-in')
      {
        const currUserResponse = {
          email: values.email,
          password: values.password
        }

        //Finish signin process here

        if(currUserResponse)
        {
          router.push('/');
        }

      }
    }
    catch(error)//you are able to catch a user already exists error to alert the screen.
    {
      //setShowAlert(true);
    }
    finally
    {
      console.log(values)
      //setIsLoading(false);
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
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {type === 'sign-up' &&
                (
                    <div className='flex flex-col gap-3'>
                      {/*Username*/}
                      <InputField
                          form={form}
                          name="username"
                          label="Username"
                          placeholder="Enter your username"
                      />

                      {/*Email*/}
                      <InputField
                          form={form}
                          name={"email"}
                          label={"Email"}
                          placeholder={"Enter you email"}
                      />

                      {/*Password */}
                      <InputField
                          form={form}
                          name='password'
                          label='Password'
                          placeholder='Enter your password'
                          type='password'
                      />

                      {/*Password Confirm*/}
                      <InputField
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
                      {/*Email */}
                      <InputField
                          form={form}
                          name="email"
                          label="Email"
                          placeholder="Enter your email"
                      />
                      {/*Password */}
                      <InputField
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

              <Link href={type === 'sign-in' ? '/signup' : '/signin'} className='form-link flex justify-center'>
                {type === 'sign-in' ? "Sign Up!" : "Sign In!"}
              </Link>
            </p>
          </footer>
        </Form>
      </div>
  );
}