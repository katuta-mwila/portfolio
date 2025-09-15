"use client"
/* skeleton for a navigation tab */

import clsx from "clsx";
import { createElement, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigationContext } from "../navigationcontext/navigationcontext";
import { ITab } from "../types";


/*
  TAB STATES WILL BE THE FOLLOWING:
  - none (no class or anything)
  - .selected
  - :hover
  - .open
*/

export default function GenericTab({tab, navType}: {tab: ITab, navType: 'desktop' | 'mobile'}){
  const tabDesign = navType == 'desktop' ? tab.desktop : tab.mobile
  if (!tabDesign) return

  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navContext = useNavigationContext()

  const tabId = tab.id + '_' + navType
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() =>{
    const handleClick = (e: MouseEvent) =>{
      const target = e.target as HTMLElement
      if (!target || !ref.current) return

      if (target.closest('.generic-tab') != ref.current){
        setOpen(false)
      } else if (target.closest('.tab-button')){
        if (tab.hasDropdown)
          setOpen(prev => !prev)
      } else if (target.closest('.tab-dropdown')){
        
      }
    }

    document.addEventListener("click", handleClick)

    return () =>{
      document.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() =>{
    if (!navContext.data.showNavBar){
      setOpen(false)
    }
  }, [navContext.data.showNavBar])

  useEffect(() =>{
    setOpen(false)
  }, [pathname, navContext.data.showMobileMenu])

  return <div ref={ref} id={tabId} className={clsx("generic-tab relative", tabDesign.className, navContext.isSelected(tab.id) && "selected", open && "open")}>
    {
      createElement(tab.hasDropdown ? "div" : Link, {className: clsx("tab-button", tabDesign.button.className), href: tab.href}, 
        createElement(tabDesign.button.componentType, {tab: tab})
      )
    }
    {
      tab.hasDropdown && 
      <>
        <div className={clsx("tab-dropdown", tabDesign.dropdown?.className)}>
          {createElement(tabDesign.dropdown!.componentType, {tab: tab})}
        </div>
      </>
    }
    {/*<TabLogic id={tabId} isIndex={tab.isIndex} href={tab.href} hasDropdown={tab.hasDropdown}/>*/}
  </div>
}