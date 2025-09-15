import { ReactNode, useContext } from "react";
import { EZFormContext } from "./Form/EZFormProvider";
import cls from "./Util/cls";

//Div that can rap around form inputs and will update classname based on form status
export default function EZCloak({formId, className, children}: {formId: string, className?: string, children?: ReactNode}){
  const formContext = useContext(EZFormContext)
  if (!formContext)
    throw new Error(`EZForm: Can not access form context when the provider has not been established in a parent element"`)
  const form = formContext.getForm(formId)
  if (form == null)
    throw new Error(`EZForm: attempting to access non existent form "${formId}"`)

  return <div id={formId} className={cls("ez-cloak", className, form.status)}>
    {children}
  </div>
}