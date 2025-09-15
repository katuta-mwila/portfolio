import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from 'zod'
import formConfig from '../../../components/forms/formconfig.json'
import { stringRange, ProblemDetails, toProblemDetails } from "@/util/errorHandling"

const resendConfig = {
  apiKey: "",
  sendFrom: "noreply@woodmanweb.co.nz",
  toEmail: ""
}

const cc = formConfig.contact // "cc" is short for contactConfig

const ContactRequest = z.object({
  firstname: stringRange(cc.firstname.label, cc.firstname.minLength, cc.firstname.maxLength),
  lastname: stringRange(cc.lastname.label, cc.lastname.minLength, cc.lastname.maxLength),
  email: z.email("Email format is invalid"),
  message: stringRange(cc.message.label, cc.message.minLength, cc.message.maxLength),
}).strict()
// use .refine() or .superRefine() for validation across the entire object

type IContactRequest = z.infer<typeof ContactRequest>

export async function POST(request: Request){
  try{
    const data: IContactRequest = await request.json()
    const parseResult = ContactRequest.safeParse(data)
    if (!parseResult.success){
      const problemDetails: ProblemDetails = toProblemDetails(parseResult)
      return NextResponse.json(problemDetails, {status: 400})
    }

    const resend = new Resend(resendConfig.apiKey)
    const result = await resend.emails.send(
    {
      from: resendConfig.sendFrom,
      to: resendConfig.toEmail,
      replyTo: data.email,
      subject: `[Website] ${data.firstname} ${data.lastname} has made contact`,
      html: `<p>${data.message}</p>`,
    })

    if (result.error){
      throw new Error("error")
    }

    return NextResponse.json("Email send successful")
  } catch (err){
    const response: ProblemDetails = {
      message: "One or more errors has occurred",
      globalErrors: ["An unexpected error has occurred"],
      errors: {}
    }
    return NextResponse.json(response, {status: 500})
  }
  
}


/*
  Steps to change First name + last name to fullname (one input)

  1. set label of first name in formconfig.json to "Full Name".
  2. Update resend.emails.send() in this file accordingly
  3. in contactform.tsx remove the lastname input component.
  4. in contactform.tsx set the value of lastname to a valid dummy value
  5. Treat firstname as Full Name
  Done.

*/