"use client"

import { usePathname } from "next/navigation";
import { createElement, ReactNode, useEffect, useRef } from "react";

interface Props{
  tag: () => ReactNode
  props?: any
}

/*Wrapper that ensures scripts are fully reloaded when the path changes (e.g when a user clines on a <Link/> tag*/
export default function PageLoadScript({tag, props}: Props){
  const loads = useRef(0)
  const pathname = usePathname()

  useEffect(() =>{
    loads.current++
  }, [pathname])

  return createElement(tag, {key: loads.current, ...props})
}