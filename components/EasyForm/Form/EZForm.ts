import { useContext, useMemo, useRef } from "react"
import { addInputOptions, EZInputBase, ValidationCheck } from "../EZFormTypes"
import { EZInput } from "../Inputs/EZInput"
import { EZFormContext } from "./EZFormProvider"
import useForceUpdate from "../useForceUpdate"
import EZErrorHandler from "../ErrorHandling/SimpleErrorHandler"

// Main class the forms
export default class EZForm
{
  id: string // Each form must have a unique id
  forceUpdate: () => void// function used to force update the ui when changes are made
  status: 'ready' | 'waiting' | 'complete' = 'ready' // status of form. Ready = ready to be submitted, 'waiting' = waiting for response, 'complete' = form is complete and no further submissions are allowed

  #inputs: Map<string, EZInputBase> = new Map() // Inputs are stored in the form using a map which maps an inputs id to it's instance.
  errorHandler: EZErrorHandler // Error handling for errors related to the form as a whole and not a particular input

  constructor(_id: string){
    this.id = _id
    this.forceUpdate = () => {}

    this.errorHandler = new EZErrorHandler()
    this.errorHandler.addGroup("server")
    this.errorHandler.addGroup("client")
  }

  addInput(input: EZInputBase, addInputOptions?: addInputOptions){
    this.#inputs.set(input.id, input)
    input.elementId = `ezinput_${input.id}_${this.id}`
    input.ezForm = this
    input.forceUpdateSource = addInputOptions?.inputSource || 'form'
    if (addInputOptions?.groupName)
      input.groups.add(addInputOptions.groupName)
  }

  addInputs(inputs: EZInputBase[], addInputOptions?: addInputOptions){
    for (const input of inputs){
      this.addInput(input, addInputOptions)
    }
  }
  
  getInput<T extends EZInput<any, any>>(id: string){
    return this.#inputs.get(id) as T | undefined
  }

  removeInput(id: string){
    return this.#inputs.delete(id)
  }

  removeByGroup(groupName: string){
    for (const [id, input] of this.#inputs){
      if (input.groups.has(groupName))
        this.removeInput(id)
    }
  }

  refresh(){
    this.forceUpdate()
  }

  triggerAllErrorHandlers(){ // populate for errors AND all input errors, return count of errors
    let count = 0
    count += this.errorHandler.populateAll()
    for (const [inputId, input] of this.#inputs){
      count += input.errorHandler.populateAll()
    }
    this.forceUpdate()
    return count
  }

  safeToSubmit(){ // check that form has NO errors AND that form is in a ready state
    if (this.status === 'ready' && this.triggerAllErrorHandlers() === 0)
      return true
    this.forceUpdate()
    return false
  }

  addValidationCheck(groupName: string, validationCheck: ValidationCheck){
    this.errorHandler.addValidationCheck(groupName, validationCheck)
  }

  async submit<T>(submitFunc: () => Promise<T> | T){ // completely optional way of submitting that wraps certain logic such as validating the form and setting the status.
    if (!this.safeToSubmit()) return
    this.setStatus('waiting')
    const result = await submitFunc();
    this.setStatus('ready')
    return result
  }

  setStatus(status: 'ready' | 'waiting' | 'complete'){
    this.status = status
    this.forceUpdate()
  }

  getAllErrors(){ // every single error of every input.
    const allErrors = []
    for (const [inputId, input] of this.#inputs){
      allErrors.push(...input.errorHandler.getAllErrors())
    }
    return allErrors
  }

  absorbProblemDetails(problemDetails: any){
    this.errorHandler.getGroup("server").errors.push(...problemDetails.globalErrors)
    for (const field of Object.keys(problemDetails.errors)){
      const input = this.getInput(field)
      if (!input) return
      input.errorHandler.getErrorsOfGroup('server').push(...problemDetails.errors[field])
    }
  }
}

const listsEqual = (l1: Array<any>, l2: Array<any>) =>{
  for (let i = 0; i < Math.max(l1.length, l2.length); i++){
    if (l1[i] !== l2[i]) return false
  }
  return true;
}

export function useEZForm(id: string, callback?: (ezForm: EZForm) => void, dependencyArr?: Array<any>){
  const forceUpdate = useForceUpdate("ezForm")
  const formContext = useContext(EZFormContext)
  const dependencies = useRef<Array<any>>([])

  if (dependencyArr === undefined)
    dependencyArr = []

  if (formContext == null)
    throw new Error("EZForm: Could not find EZFormContext. Has EZFormProvider been declared in the application?")

  let form = formContext.getForm(id)

  if (!callback && !form){
    throw new Error("EZForm: Cannot call useEZForm without a callback function unless the form already exists")
  }

  if (form == null || dependencyArr == null || !listsEqual(dependencyArr, dependencies.current)){
    dependencies.current = dependencyArr ? [...dependencyArr] : []
    form = new EZForm(id);
    form.forceUpdate = forceUpdate
    formContext.addForm(form)
    callback!(form)
  }

  if (form != null)
    form.forceUpdate = forceUpdate
  
  return form
}