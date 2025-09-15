"use client"

import { AddLengthCheck } from "@/components/EasyForm/DefaultValidationChecks/ValidationChecks"
import EZForm, { useEZForm } from "@/components/EasyForm/Form/EZForm"
import { EZTextAreaInput } from "@/components/EasyForm/Inputs/EZTextAreaInput"
import { EZTextInput } from "@/components/EasyForm/Inputs/EZTextInput"
import formConfig from '../../../components/forms/formconfig.json'
import clsx from "clsx"
import { usePathname } from "next/navigation"

const cc = formConfig.contact

/* DEPENDS ON EZFORM */

export interface IContactFormProps{
  inputContainterClass?: string
  textInputClass?: string
  formId?: string
  endpoint: string
  callback?: (contactForm: {form: EZForm, firstName: EZTextInput, lastName: EZTextInput, email: EZTextInput, message: EZTextAreaInput}) => void
}

export function useContactForm(props: IContactFormProps){
  const pathname = usePathname()

  const form = useEZForm(props.formId || 'contact-form', f =>{
    const firstName = new EZTextInput('firstname')
    firstName.containerClass = props.inputContainterClass
    firstName.label = cc.firstname.label
    firstName.useContainer = false
    firstName.props = {
      spellCheck: false,
      className: props.textInputClass,
      name: "First Name",
    }

    AddLengthCheck(firstName, cc.firstname.minLength, cc.firstname.maxLength)

    const lastName = new EZTextInput('lastname')
    lastName.containerClass = props.inputContainterClass
    lastName.useContainer = false
    lastName.label = cc.lastname.label
    lastName.props = {
      spellCheck: false,
      className: props.textInputClass,
      name: 'Last Name'
    }
    AddLengthCheck(lastName, cc.lastname.minLength, cc.lastname.maxLength)

    const email = new EZTextInput('email')
    email.containerClass = props.inputContainterClass
    email.label = cc.email.label
    email.useContainer = false
    email.props = {
      spellCheck: false,
      className: props.textInputClass,
      name: 'Email'
    }
    email.addValidationCheck('client', () =>{
    if (email.getValueFormatted()!.search(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) == -1)
      return "Email is an invalid format"
    })

    const message = new EZTextAreaInput('message')
    message.containerClass = props.inputContainterClass
    message.useContainer = false
    message.label = cc.message.label
    message.props = {
      className: clsx('resize-none', props.textInputClass),
      style: {paddingTop: '10px', paddingBottom: '10px'},
      name: 'Message'
    }
    AddLengthCheck(message, cc.message.minLength, cc.message.maxLength)

    f.addInputs([firstName, lastName, email, message])

    if (props.callback)
      props.callback({form: f, firstName, lastName, email, message})
  }, [pathname])
  
  const firstName = form.getInput<EZTextInput>('firstname')!
  const lastName = form.getInput<EZTextInput>('lastname')!
  const email = form.getInput<EZTextInput>('email')!
  const message = form.getInput<EZTextAreaInput>('message')!

  const submit = async function(){
    
    const response = await form.submit(() =>{
      return fetch(props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: firstName.getValueFormatted(),
          lastname: lastName.getValueFormatted(),
          email: email.getValueFormatted(),
          message: message.getValueFormatted(),
        })
      })
    })
    if (!response) return
    

    if (!response.ok){
      form.absorbProblemDetails(await response.json())
    }
  
    form.forceUpdate()
   }

  return {form, firstName, lastName, email, message, submit}
}