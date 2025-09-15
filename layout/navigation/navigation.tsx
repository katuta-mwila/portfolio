"use client"

import MobileNav from "./mobilenav/mobilenav"
import GenericTab from "./generictab/generictab"
import clsx from "clsx"
import { useNavigationContext } from "./navigationcontext/navigationcontext"
import { NavLogo } from "@/components/logos"
export default function Navigation(){
  const navContext = useNavigationContext()

  return <>
    <nav id="navigation" className={clsx("theme-secondary h-nav partial-fixed", !navContext.data.showNavBar && "hide")}>
      <div className="centered-content-md flex h-full justify-between">
        <NavLogo/>
        <div className="flex-panel">
          <div className="md:flex-panel hidden">
            {navContext.data.tabs.map(tab =>{
              if (!tab.desktop) return
              return <GenericTab key={tab.id} tab={tab} navType="desktop"/>
            })}
          </div>
          <MobileNav/>
        </div>
      </div>
    </nav>
  </>
}