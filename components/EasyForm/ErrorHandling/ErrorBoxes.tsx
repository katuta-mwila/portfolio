import { useContext } from "react"
import { EZInputBase, InputSource } from "../EZFormTypes"
import { EZInput } from "../Inputs/EZInput"
import FindInput from "../Util/FindInput"
import { EZFormContext } from "../Form/EZFormProvider"

export function ErrorList({errors}: {errors?: Array<string>}){
  return <>{errors && errors.length > 0 && <div className="ez-error-list">
    {errors.map(err =>{
      return <p key={err}>{err}</p>
    })}
  </div>}</> 
}

export function InputErrorList<T extends EZInputBase>(inputSource: InputSource<T>){
  const input = FindInput(inputSource)
  return <ErrorList errors={input.errorHandler.getAllErrors()}></ErrorList>
}

export function FormErrorList({formId}: {formId: string}){
  const formContext = useContext(EZFormContext)
  const form = formContext?.getForm(formId)
  if (!form) throw new Error("EZForm: Could not find form of id " + formId)
  return <ErrorList errors={form.errorHandler.getAllErrors()}></ErrorList>
}

export function AllFormErrorsList({formId}: {formId: string}){
  const formContext = useContext(EZFormContext)
  const form = formContext?.getForm(formId)
  if (!form) throw new Error("EZForm: Could not find form of id " + formId)
    return <ErrorList errors={form.getAllErrors()}></ErrorList>
}