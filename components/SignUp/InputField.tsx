import { ChangeEvent } from 'react';
import styles from './SignUp.module.css';
import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldPath, UseFormReturn } from 'react-hook-form';
import { authFormSchema } from '@/lib/utils';
import { z } from 'zod';


const formSchema = authFormSchema('sign-up');
interface InputFieldProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type?: string;
}

export default function InputField({form, name, label, placeholder, type=""}: InputFieldProps) {

  return (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
              <div className='form-item'>
                <FormLabel className='form-label'>
                  {label}
                </FormLabel>
                <div className='flex w-full flex-col'>
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

export default InputField

{/*
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
    />
*/}