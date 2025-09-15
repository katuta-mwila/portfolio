import { EZInput } from "../Inputs/EZInput";

export function AddLengthCheck(input: EZInput<string, string>, minlength: number, maxlength: number){
  input.addValidationCheck('client', () =>{
    const text = input.getValueFormatted() as string
    if (text.length < minlength || text.length > maxlength){
      return `${input.props.name} must be between ${minlength} and ${maxlength} characters`
    }
  })
}