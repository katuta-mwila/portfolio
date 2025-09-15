import { useMemo } from "react";
import { UIInputProps } from "../EZFormTypes";
import useForceUpdate from "../useForceUpdate";
import cls from "../Util/cls";
import FindInput from "../Util/FindInput";
import { DropdownOption, DropdownOptions } from "./Dropdown/DropdownTypes";
import PickOneDropdown from "./Dropdown/PickOneDropdown";
import { ConditionalWrapper } from "./EZComponents";
import { EZInput } from "./EZInput";

export class EZDropdownInput<K=string> extends EZInput<number, number>{ // k = type to use for the key
  options: DropdownOptions<K> = [] // List of options to appear in dropdown
  defaultButtonText: string | undefined = undefined // default text to appear on dropdown button if no option is not 
  
  constructor(id: string){
    super(id, 'dropdown')
  }

  getSelectedOption(){
    return this.value == null ? undefined : this.options[this.value]
  }

  getSelectedKey(){
    return this.getSelectedOption()?.key
  }

  getSelectedValue(){
    return this.getSelectedOption()?.value
  }

  spreadClassProps(uiProps: UIInputProps<EZDropdownInput<K>>){
    return {
      ...super.spreadClassProps(uiProps),
      options: uiProps.options || this.options,
      defaultButtonText: uiProps.defaultButtonText || this.defaultButtonText
    }
  }
}

export function UIDropdownInput<K>(uiInputProps: UIInputProps<EZDropdownInput<K>>){
  const forceUpdate = useForceUpdate()
  const input = FindInput({formId: uiInputProps.formId, input: uiInputProps.input, inputId: uiInputProps.inputId})
  const finalProps = input.createFinalProps(uiInputProps)

  useMemo(() =>{
    if (input.forceUpdate == null)
      input.forceUpdate = forceUpdate
  }, [input])

  return <ConditionalWrapper wrap={finalProps.useContainer} containerElement={<div className={cls('ez-container', finalProps.containerClass)}/>}>
    {finalProps.showLabel && <label htmlFor={finalProps.elementId}>{finalProps.label}</label>}
    <PickOneDropdown<K> id={finalProps.elementId} className={finalProps.props.className} options={finalProps.options || []}
      selectedOption={finalProps.props.value as number | undefined} defaultButtonText={finalProps.defaultButtonText} optionClick={(o, i: number) => input.updateValue(i)}
      angleIcon={undefined} tabIndex={0}/>
  </ConditionalWrapper>
}