import { useContext } from "react";
import { EZInputBase, InputSource } from "../EZFormTypes";
import { EZFormContext } from "../Form/EZFormProvider";

export default function FindInput<T extends EZInputBase>(inputSource: InputSource<T>){
  const formContext = useContext(EZFormContext)
  let input: T | undefined = undefined
  if (inputSource.input)
    input = inputSource.input
  else if (formContext && inputSource.formId && inputSource.inputId){
    const form = formContext.getForm(inputSource.formId)
    input = form?.getInput(inputSource.inputId)
  } else{
    throw Error("If no input is provided then a valid formId and inputId MUST be provided.")
  }

  if (input == null)
    throw new Error(`EZForm: could not find input`)

  return input
}