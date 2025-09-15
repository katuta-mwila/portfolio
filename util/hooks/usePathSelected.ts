"use client"

import { usePathname } from "next/navigation"
import isSubPath from "../isSubPath"
import { useCallback } from "react"

export default function usePathSelected(){
  const pathname = usePathname()

  const foo = useCallback((testPath: string) =>{  
    return isSubPath(pathname, testPath)
  }, [pathname])

  return foo
}