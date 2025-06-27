'use server'
import { z } from "zod";
import { date } from "zod/v4";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession } from "@/app/features/session";
import { redirect } from "next/navigation";

export default async function CreateUser(state: any,formData: FormData) {
    const names = formData.get("names") as string;
    const email = formData.get('email') as string;
    const password = formData.get("password") as string;
    const dateT = formData.get("dateT") as string;

    const date = new Date(dateT);
    const SignupFormSchema = z.object({
        names: z
          .string()
          .min(2, { message: 'Name must be at least 2 characters long.' })
          .trim(),
        email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
        password: z
          .string()
          .min(8, { message: 'Be at least 8 characters long' })
          .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
          .regex(/[0-9]/, { message: 'Contain at least one number.' })
          .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
          })
          .trim(),
        date: z.date()
      });
    
      const validate = SignupFormSchema.safeParse({
        names, email, password, date
      })

      if (! validate.success) {
        const formFieldErrors = validate.error.flatten().fieldErrors;
        return {
            success: "",
              errors: {
                email: formFieldErrors?.email,
                password: formFieldErrors?.password,
                names: formFieldErrors?.names,
                date: formFieldErrors?.date
            }
        }
      } else {
        //Insert
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await prisma.user.create({
            data: {
                names,
                email,
                password: hashedPassword,
                dateT: date
            }
        });

        const user = data
 
        if (!user) {
            return {
                success: "",
                errors: {
                  email: '',
                  password: 'An error occured',
                  names: '',
                  date: '',
              }  
            }
        }
        await createSession(user.id)
        // 5. Redirect user
        redirect('/expenses')
        return {
            success: "Successfully inserted",
            errors: {
              email: '',
              password: '',
              names: '',
              date: '',
          }  
        }
      }
}

export async function Login(state: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get("password") as string;
  const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  });

  const validate = SignupFormSchema.safeParse({
    email, password
  })

  if (! validate.success) {
    const formFieldErrors = validate.error.flatten().fieldErrors;
    return {
      success: "",
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      }
    }
  } else {
    const data = await prisma.user.findUnique({
      where: {email: email}
    })

    const user = data;
    
    if (!user) {
      return {
        success: "",
        errors: {
          email: 'Wrong email adress, sign up to create an account',
          password: '',
        }  
      }
    } else {
      let checkPassword = await bcrypt.compare(password, user.password)
      if (checkPassword) {
        await createSession(user.id)
        redirect('/expenses')
      } else {
        return {
          success: "",
          errors: {
            email: '',
            password: 'Wrong password, verify well you password',
          }  
        }
      }
    }
  }

}

