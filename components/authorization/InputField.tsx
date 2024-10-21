//@Author: Adam Long
//Date: 10/17/24
//Danddy - SCRUM 106_2

import React from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

export default function InputField({name, label, placeholder, type=""}: InputFieldProps) {

    const form = useForm();

    return (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
              <div className='form-item mt-4'>
                <FormLabel className='form-label'>
                  {label}
                </FormLabel>
                <div className='flex max-w-md flex-col'>
                  <FormControl>
                    <Input
                        placeholder={placeholder}
                        className='input-class'
                        type={type}
                        {...field}
                    />
                  </FormControl>

                  <FormMessage className='form-message mt-2'></FormMessage>
                </div>
              </div>
          )}
      />
  )
}