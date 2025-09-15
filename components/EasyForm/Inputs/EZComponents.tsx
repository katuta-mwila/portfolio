import React, { ReactElement, ReactNode } from "react"

export function ConditionalWrapper({wrap, children, containerElement}: {wrap: boolean, children?: ReactNode, containerElement: ReactElement}){
  return wrap ? React.cloneElement(containerElement, undefined, children) : <>{children}</>
}