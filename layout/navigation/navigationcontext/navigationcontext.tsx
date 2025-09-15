"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import { ITab } from "../types"
import useForceUpdate from "@/components/EasyForm/useForceUpdate"
import { usePathname } from "next/navigation"
import { navigationTabs as tabs } from "./navigationtabs"
import isSubPath from "@/util/isSubPath"

interface INavigationData{
  tabs: ITab[]
  selectedTab?: number
  openTab?: number
  showNavBar: boolean,
  showMobileMenu: boolean,
  navMode: "desktop" | "mobile",
  is0Scroll: boolean,
}

interface INavigationContext{
  forceUpdate: () => void
  data: INavigationData
  isSelected: (tabId: string) => boolean
  isOpen: (tabId: string) => boolean
}

export const NavigationContext = createContext<INavigationContext>({} as any as INavigationContext)

export function NavigationProvider({children}: {children?: ReactNode}){
  const [tabMap] = useState<Map<string, number>>(() =>{
    const m = new Map<string, number>()
    for (let i = 0; i < tabs.length; i++){
      m.set(tabs[i].id, i)
    }
    return m
  })
  
  const dataRef = useRef<INavigationData>({
      tabs,
      selectedTab: undefined,
      openTab: undefined,
      showNavBar: true,
      showMobileMenu: false,
      navMode: "desktop", // informational as css will decide what mode nav is in
      is0Scroll: true,
    }
  )
  const data = dataRef.current

  const lastScroll = useRef(-1)

  const pathname = usePathname()
  const forceUpdate = useForceUpdate("Navigation Provider")

  const fromId = (tabId: string) =>{
    const index = tabMap.get(tabId)
    if (!index) return undefined
    return data.tabs[index]
  }

  const isSelected = (tabId: string) => {
    return (data.selectedTab != null) && (data.selectedTab === tabMap.get(tabId))
  }

  const isOpen = (tabId: string) => {
    return (data.openTab != null) && (data.openTab === tabMap.get(tabId))
  }

  const onPageChange = () =>{
    data.openTab = undefined
    data.showMobileMenu = false

    for (let i = 0; i < data.tabs.length; i++){
      const tab = data.tabs[i]
      if ((tab.isIndex && tab.href == pathname) || (!tab.isIndex && isSubPath(pathname, tab.href))){
        data.selectedTab = i
        for (let j = 0; j < tab.subTabs.length; j++){
          const subTab = tab.subTabs[j]
          const href = subTab.pathType == "absolute" ? subTab.href : tab.href + subTab.href 
          if (isSubPath(pathname, href))
            subTab.selected = true
        }
      }
    }
  }

  useEffect(() =>{
    lastScroll.current = -1

    const navElement = document.getElementById("navigation")!
    const navHeight = navElement?.getBoundingClientRect().height

    const onResize = () =>{
      const w  = window.innerWidth
      if (w >= 768 && data.navMode !== "desktop"){
        data.navMode = "desktop"
        data.showMobileMenu = false
        forceUpdate()
      } else if (w < 768 && data.navMode != "mobile"){
        data.navMode = "mobile"
        forceUpdate()
      }
      
    }

    const onScroll = () =>{
      const ls = lastScroll.current
      const cs = window.scrollY
      let nextShowNavBar = true
      if (ls < 0){ // keep scroll bar visible at first load
        lastScroll.current = cs
        return
      } else if (cs > ls && cs > navHeight){
        nextShowNavBar = false
      }

      if (nextShowNavBar != data.showNavBar && navElement.querySelector('.generic-tab.open') == null){
        data.showNavBar = nextShowNavBar
        forceUpdate()
      }

      lastScroll.current = cs
    }

    const check0Scroll = () =>{
      let nextIs0Scroll = true
      if (window.scrollY === 0)
        nextIs0Scroll = true
      else
        nextIs0Scroll = false

      if (nextIs0Scroll != data.is0Scroll){
        data.is0Scroll = nextIs0Scroll
        forceUpdate()
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    if (navElement.classList.contains("partial-fixed")){
      window.addEventListener("scroll", onScroll)
      onScroll()
    }

    window.addEventListener("scroll", check0Scroll)
    check0Scroll()

    return () =>{
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scroll", check0Scroll)
    }
  }, [pathname])

  useMemo(() =>{
    onPageChange()
  }, [pathname])

  return <NavigationContext.Provider value={{data, isSelected, forceUpdate, isOpen}}>
    {children}
  </NavigationContext.Provider>

}

export const useNavigationContext = () => useContext(NavigationContext)