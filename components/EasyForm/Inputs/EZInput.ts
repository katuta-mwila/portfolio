// Base EasyForm Input class
// all inputs are to be derived from this class

import { ChangeEvent, useMemo, useState } from "react"
import EZForm from "../Form/EZForm"
import EZErrorHandler from "../ErrorHandling/SimpleErrorHandler"
import { FinalProps, InputAttributes, UIInputProps, ValidationCheck } from "../EZFormTypes"
import cls from "../Util/cls"

export class EZInput<V=string, F=V>{ // V = type of value, F = type of value after formatting
  readonly id: string // virtual id used to identify/retrieve the class representation of the input within the form
  readonly type: string
  baseClassName: string = "ez-input" // classname that the input will have by default. the className field of props will be included alongside this class.

  label: string | undefined = undefined // The label that will appear above the input. undefined for no label.
  showLabel: boolean = true
  groups: Set<string> = new Set() // allows you to assign the input to one for more groups so you can perform bulk operations on a set of inputs within a form. e.g delete all inputs in a group
  ezForm: EZForm | undefined = undefined // Parent form. undefined if input does not belong to a form.

  // For elementId and value it is important to note that these values will be used instead of the 'id' or 'value' field inside an inputs props object.
  elementId: string // this is the literal html id of the input that appears on the web page. Can be retrieved using document.getElementById() unlike the id field.
  value: V | undefined // the raw value of the input

  useContainer: boolean = true // Set to true do wrap a div around the input and it's label
  containerClass: string | undefined // className of container if it is present

  allowChanges = true // true if changes to this input are allowed

  forceUpdate: (() => void) | undefined = undefined// function used to force update the ui when changes are made, defaults to updating just the input's ui component itself but can be set to update another component such as a parent component.
  forceUpdateSource: 'input' | 'form' = 'input' // Which forceupdate function should be used to update the ui. 'input' for the input component and 'form' to update from where the form is first created.
  
  errorHandler: EZErrorHandler // Error handling for errors related to THIS input.

  removeErrorsOnInput = true // Set to true if all the inputs errors are to be removed when a user makes an input.

  props: InputAttributes = {} // All properties that can possibly go inside an <input/> element

  beforeChangeValue: (current: V | undefined, newValue: V | undefined) => (V | undefined) = (current, newValue) => newValue
  
  afterChangeValue: (current: V | undefined) => void =  (current) => {}
  
  constructor(id: string, type: string){
    this.id = id
    this.type = type
    this.elementId = "ezinput_" + this.id

    this.errorHandler = new EZErrorHandler()
    this.errorHandler.addGroup("server")
    this.errorHandler.addGroup("client")
  }

  updateValue(newValue: V){
    if (!this.canChangeValue()) return
    this.value = this.beforeChangeValue(this.value, newValue)
    if (this.removeErrorsOnInput)
      this.errorHandler.clearAllGroups()
    this.afterChangeValue(this.value)
    this.refresh()
  }

  refresh(){
    if (this.forceUpdate == null) return
    if (this.forceUpdateSource == 'input')
      this.forceUpdate()
    else if (this.ezForm != null)
      this.ezForm.refresh()
    else
      throw new Error("EZForm: forceUpdateSource is set to 'form' yet input is not attatched to any form")
  }

  getValueFormatted(): F | undefined{ // This functions is used if the raw value needs to undergo formatting. Such as a text input having unnecessary whitespace removed.
    return this.value as F
  }

  canChangeValue(){
    return this.allowChanges && !(this.ezForm != null && this.ezForm.status != "ready")
  }

  addValidationCheck(groupName: string, validationCheck: ValidationCheck){
    this.errorHandler.addValidationCheck(groupName, validationCheck)
  }

  getType(){
    return this.type
  }

  spreadClassProps(uiProps: UIInputProps<EZInput<V, F>>){ // create object containing relevent props related to this class. Makes sure the props passed into the parameter take priority
    return {
      label: uiProps.label || this.label,
      useContainer: uiProps.useContainer || this.useContainer,
      containerClass: uiProps.containerClass || this.containerClass,
      elementId: uiProps.elementId || this.elementId,
      showLabel: uiProps.showLabel,
      props: {} as InputAttributes
    } as FinalProps
  }

  spreadDefaultProps(uiProps: UIInputProps<EZInput<V, F>>){ // Creates the final props object that will be passed into inputs.
    return {
      ...this.props,
      ...uiProps.props,
      type: this.getType(),
      value: uiProps.value || this.value,
      id: uiProps.elementId || this.elementId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => this.updateValue(e.target.value as V)
    } as InputAttributes
  }

  createFinalProps(uiProps: UIInputProps<EZInput<V, F>>){ // This object will determine which values the UI component uses to set itself up
    const finalProps = this.spreadClassProps(uiProps)
    finalProps.props = this.spreadDefaultProps(uiProps)

    const hasErrors = this.errorHandler.hasAnyErrors()

    finalProps.props.className = cls(finalProps.props.className, this.baseClassName, hasErrors && 'ez-error')
    finalProps.containerClass = cls(finalProps.containerClass, 'ez-container', hasErrors && 'ez-error')
    return finalProps
  }
}

export function useEZInput<T extends EZInput<any, any>>(classDefinition: new (id: string) => T, id: string, callback?: (input: T) => void){
  const [input, setInput] = useState(new classDefinition(id))

  useMemo(() =>{
    if (callback != null)
      callback(input)
  }, [])

  return input
}


