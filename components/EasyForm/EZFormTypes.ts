import { TextareaHTMLAttributes } from "react"
import EZForm from "./Form/EZForm"
import { EZInput } from "./Inputs/EZInput"

export type InputAttributes = React.InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement> // The default input attributes

export type InputSource<T extends EZInputBase> = {
  input?: T,
  inputId?: string, // Allow a combo of input and formId to be used to fetch an input
  formId?: string
}

export type UIInputProps<T extends EZInputBase> = {
  [P in keyof T]?: T[P];
} & InputSource<T>

export type FinalProps = {
  [key: string]: any,
  props: InputAttributes
}

export type EZInputBase = EZInput<any, any>

export type EZFormBuilder = (form: EZForm) => void

export interface addInputOptions{
  inputSource?: 'input' | 'form',
  groupName?: string
}

export type ValidationCheck = () => string | undefined | void