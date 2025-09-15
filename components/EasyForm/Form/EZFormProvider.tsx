"use client"

import React, { ReactNode, useState } from "react";
import EZForm from "./EZForm";

export interface IEZFormContext{
  forms: Map<string, EZForm>,
  addForm: (form: EZForm) => void,
  removeForm: (id: string) => boolean,
  getForm: (id: string) => EZForm | undefined
}

export const EZFormContext = React.createContext<IEZFormContext | undefined>(undefined)

export function EZFormProvider({children}: {children?: ReactNode}){
  const [value] = useState<IEZFormContext>(() =>{
    const forms = new Map<string, EZForm>()

    const addForm = (form: EZForm) =>{
      forms.set(form.id, form)
    }

    const removeForm = (id: string) => forms.delete(id)

    const getForm = (id: string) => forms.get(id)

    return {forms, addForm, removeForm, getForm}
  })

  return <EZFormContext.Provider value={value}>
    {children}
  </EZFormContext.Provider>
}