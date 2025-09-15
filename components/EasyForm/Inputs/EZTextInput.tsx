import { useContext, useMemo } from "react";
import { UIInputProps } from "../EZFormTypes";
import { EZInput } from "./EZInput";
import useForceUpdate from "../useForceUpdate";
import { ConditionalWrapper } from "./EZComponents";
import cls from "../Util/cls";
import { EZFormContext } from "../Form/EZFormProvider";
import FindInput from "../Util/FindInput";

// Class for plain text inputs derived from the base EZInput class.
// This class contains every possible field associated with an <input> of type text.
export class EZTextInput extends EZInput{
  constructor(id: string){
    super(id, "text")
    this.value = ""
    this.baseClassName += ' ez-text-input'
  }
}

// UI react component for the text input
export function UITextInput(uiInputProps: UIInputProps<EZTextInput>){
  const formContext = useContext(EZFormContext)
  const input = FindInput({formId: uiInputProps.formId, input: uiInputProps.input, inputId: uiInputProps.inputId})

  const forceUpdate = useForceUpdate()
  const finalProps = input.createFinalProps(uiInputProps)
  useMemo(() =>{ /* on next js if the path changes this the input will start refferring to an outdated forceUpdate, quick solution could be to take out of useMemo*/
    if (input.forceUpdate == null) 
      input.forceUpdate = forceUpdate
  }, [input])
  return <>
    <ConditionalWrapper wrap={finalProps.useContainer} containerElement={<div className={cls('ez-container', finalProps.containerClass)}/>}>
      {finalProps.showLabel && <label htmlFor={finalProps.elementId}>{finalProps.label}</label>}
      <input {...finalProps.props}/>
    </ConditionalWrapper>
  </>
}