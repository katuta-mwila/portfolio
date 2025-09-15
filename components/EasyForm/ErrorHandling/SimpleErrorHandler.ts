import { ValidationCheck } from "../EZFormTypes"

export default class EZErrorHandler{
  groups: Map<string, ErrorGroup>

  constructor(){
    this.groups = new Map()
  }

  populateGroup(groupName: string, clearExistingErrors: boolean = true){ // populate errors based on group
    return this.getGroup(groupName).populate(clearExistingErrors)
  }

  clearGroup(groupName: string){ // clear errors of a group
    this.getGroup(groupName).clearErrors()
  }

  clearAllGroups(){
    for (const [name, group] of this.groups){
      group.clearErrors()
    }
  }

  populateAll(clearExistingErrors: boolean = true){ // popupalte errors of all groupsand return the amount of errors
    let count = 0
    for (const [name, group] of this.groups){
      count += this.populateGroup(name, clearExistingErrors)
    }
    return count
  }

  hasAnyErrors(){ // Checks if there are any current errors
    for (const [name, group] of this.groups){
      if (group.errors.length > 0)
        return true
    }
    return false
  }

  hasErrors(groupName: string){ // whether a group as errors or not
    return this.getGroup(groupName).errorCount() > 0
  }

  getAllErrors(){ // get all errors of all groups
    const errors = []
    for (const [name, group] of this.groups){
      errors.push(...group.errors)
    }
    return errors
  }

  getErrorsOfGroup(groupName: string){
    return this.getGroup(groupName).errors
  }

  addGroup(groupName: string){ // add a new error group
    const g = new ErrorGroup()
    this.groups.set(groupName, g)
    return g
  }

  getGroup(groupName: string){ // get an error group
    const group = this.groups.get(groupName)
    if (group == null)
      throw new Error(`EZForm: Error group of '${groupName} does not exist`)
    return group
  }

  addValidationCheck(groupName: string, validationCheck: ValidationCheck){
    this.getGroup(groupName).validators.push(validationCheck)
  }
}

class ErrorGroup{
  validators: Array<ValidationCheck>
  errors: Array<string>

  constructor(){
    this.errors = []
    this.validators = []
  }

  populate(clearExistingErrors: boolean = true){ // run through all validation functions add add errors to errors array.
    if (clearExistingErrors) // if true clears current errors before checking
      this.clearErrors()

    for (let i = 0; i < this.validators.length; i++){
      const result = this.validators[i]()
      if (result != null){
        this.errors.push(result)
      }
    }
    return this.errors.length // return amound of errors
  }

  clearErrors(){ // clear all errors
    this.errors = []
  }

  errorCount(){ // error count
    return this.errors.length
  }
}