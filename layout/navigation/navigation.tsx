"use client"

import MobileNav from "./mobilenav/mobilenav"
import GenericTab from "./generictab/generictab"
import clsx from "clsx"
import { useNavigationContext } from "./navigationcontext/navigationcontext"
import { NavLogo } from "@/components/logos"
export default function Navigation(){
  const navContext = useNavigationContext()

  const click = (elementId: string) =>{
    const element = document.getElementById(elementId.substring(1))
    if (!element) return
    const rect = element.getBoundingClientRect()
    console.log(rect)
    console.log(window.scrollY)
    window.scrollTo({
      top: window.scrollY + rect.top,
      left: 0,
      behavior: 'smooth'
    })
  }

  return <>
    <nav id="navigation" className={clsx("theme-primary bg-primary/0 h-nav partial-fixed", !navContext.data.showNavBar && "hide")}>
      <div className="flex h-full justify-center py-4">
        <div className="flex-panel bg-primary-shade-1/95 rounded-4xl px-5 shadow-glow-2">
          <div className="md:flex-panel hidden">
            {navContext.data.tabs.map(tab =>{
              if (!tab.desktop) return
              return <div key={tab.id} onClick={() => click(tab.href)}>
                <GenericTab tab={tab} navType="desktop"/>
              </div>
            })}
          </div>
          <MobileNav/>
        </div>
      </div>
    </nav>
  </>
}