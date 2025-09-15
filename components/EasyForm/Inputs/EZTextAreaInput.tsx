import { useContext, useMemo } from "react";
import { UIInputProps } from "../EZFormTypes";
import { EZInput } from "./EZInput";
import { EZFormContext } from "../Form/EZFormProvider";
import FindInput from "../Util/FindInput";
import useForceUpdate from "../useForceUpdate";
import { ConditionalWrapper } from "./EZComponents";
import clsx from "clsx";

export class EZTextAreaInput extends EZInput{
  constructor(id: string){
    super(id, "textarea")
    this.value = ""
    this.baseClassName += ' ez-textarea-input'
  }
}

export function UITextAreaInput(uiInputProps: UIInputProps<EZTextAreaInput>){
  const formContext = useContext(EZFormContext)
  const input = FindInput({formId: uiInputProps.formId, input: uiInputProps.input, inputId: uiInputProps.inputId})

  const forceUpdate = useForceUpdate()
  const finalProps = input.createFinalProps(uiInputProps)
  finalProps.l
  useMemo(() =>{
    if (input.forceUpdate == null)
      input.forceUpdate = forceUpdate
  }, [input])

  return <>
    <ConditionalWrapper wrap={finalProps.useContainer} containerElement={<div className={finalProps.containerClass}/>}>
      {finalProps.showLabel && <label htmlFor={finalProps.elementId}>{finalProps.label}</label>}
      <textarea {...finalProps.props as any}/>
    </ConditionalWrapper>
  </>
}