"use client"

import { FormErrorList, InputErrorList } from "@/components/EasyForm/ErrorHandling/ErrorBoxes"
import EZCloak from "@/components/EasyForm/EZCloak"
import { EZInput } from "@/components/EasyForm/Inputs/EZInput"
import { UITextAreaInput } from "@/components/EasyForm/Inputs/EZTextAreaInput"
import { UITextInput } from "@/components/EasyForm/Inputs/EZTextInput"
import React from "react"
import { IContactFormProps, useContactForm } from "./usecontactform"

export default function ContactForm(){

  const formProps: IContactFormProps = {
    formId: "contact-form",
    inputContainterClass: "input-container-one",
    textInputClass: "text-input-one",
    endpoint: "api/contact",
    callback: ({message, firstName, lastName, email}) =>{
      message.props.rows = 3
      message.props.placeholder = "Up to 500 words"

      firstName.value = ""
      lastName.value = ""
      email.value = ""
      message.value = ""

      /*firstName.value = "John"
      lastName.value = "Smith"
      email.value = "john.smith@gmail.com"
      message.value = "Hello, I have an equiry about the..."*/
    }
  }

  const {form, firstName, lastName, email, message, submit} = useContactForm(formProps)

  return <EZCloak formId="contact-form" className="w-[min(100%,500px)] m-auto flex-vert gap-5">
    <h2>Contact Form</h2>    
    <div className="flex-vert gap-5">
      <ContactFormInput input={firstName} required/>
      <ContactFormInput input={lastName} required/>
      <ContactFormInput input={email} required/>
      <ContactFormInput input={message} uiElement={UITextAreaInput} required/>
      <FormErrorList formId={formProps.formId!}/>
      <button className="button-one rounded-md active:translate-y-0.5" onClick={submit}>Submit</button>
    </div>
  </EZCloak>
}

function ContactFormInput({input, required, uiElement = UITextInput}: {input: EZInput, required?: boolean, uiElement?: any}){
  return <div className="input-container-one">
    <label htmlFor={input.elementId}>{input.label}{required && <span className="text-error-red"> *</span>}</label>
    {React.createElement(uiElement, {input, showLabel: false})}
    <InputErrorList input={input}/>
  </div>
}