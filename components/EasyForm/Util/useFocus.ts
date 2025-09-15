//hook to make input focus next rerender

import { useEffect, useRef } from "react";

export default function useFocus(){
  const inputToFocus = useRef<string | undefined>(undefined)

  useEffect(() =>{
    if (inputToFocus.current == null) return
    document.getElementById(inputToFocus.current)?.focus()
    inputToFocus.current = undefined
  })

  return (inputId: string) =>{
    inputToFocus.current = inputId
  }
}