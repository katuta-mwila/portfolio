"use client"

import clsx from "clsx";
import { useEffect } from "react";
import { useNavigationContext } from "../navigationcontext/navigationcontext";
import { Menu } from "lucide-react";

export default function MobileNavButton({buttonId, menuId, className}: {buttonId: string, menuId: string, className?: string}){
  const navContext = useNavigationContext()

  const buttonClick = () =>{
    navContext.data.showMobileMenu = !navContext.data.showMobileMenu
    navContext.forceUpdate()
  }

  useEffect(() =>{
    if (navContext.data.showMobileMenu){
      document.documentElement.classList.add("overflow-hidden")
    } else{
      document.documentElement.classList.remove("overflow-hidden")
    }
  }, [navContext.data.showMobileMenu])

  return <>
    <div id={buttonId} className={clsx(className)} onClick={buttonClick}>
      <Menu className="h-8 w-8"/>
    </div>
  </>
}