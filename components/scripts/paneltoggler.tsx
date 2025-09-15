'use client'

import { usePathname } from "next/navigation"
import { useEffect } from "react"

type ClickType = "content" | "other" | "button" | "auto"

interface IToggleEventParams{
  clickType: ClickType
  nextStatus: "on" | "off" // if event isn't canceled
  buttonElement: HTMLElement
  contentElement: HTMLElement
}

export type ToggleEvent = (params: IToggleEventParams) => boolean | void // return true to cancel

export default function PanelToggler({buttonId, contentId, toggleEvent, defaultState = 'off'}: {buttonId: string, contentId: string, toggleEvent?: ToggleEvent, defaultState?: 'on' | 'off'}){
  
  const pathname = usePathname()

  useEffect(() =>{
    const buttonElement = document.getElementById(buttonId)
    const contentElement = document.getElementById(contentId)

    if (!buttonElement){
      throw new Error("PanelToggler: Could not find either button element " + buttonId)
    }

    if (!contentElement){
      throw new Error("PandelToggler: Could not find content element " + contentId)
    }

    const togglePanel = (nextStatus: "on" | "off", clickType: ClickType) =>{
      if (!toggleEvent || !toggleEvent({
          clickType: clickType, 
          nextStatus, 
          buttonElement, 
          contentElement
        })){
        if (nextStatus == "on"){
          buttonElement.classList.add('toggle-on')
          contentElement.classList.add('toggle-on')
        } else{
          buttonElement.classList.remove('toggle-on')
          contentElement.classList.remove('toggle-on')
        }
        
      }
    }

    if (defaultState === "on"){
      togglePanel("on", "auto")
    } else{
      togglePanel("off", "auto")
    }

    const handleClick = (e: MouseEvent) =>{
      const target = e.target as HTMLElement
      if (!target) return
      if (target.closest('#' + contentId)){
        togglePanel(buttonElement.classList.contains("toggle-on") ? "on" : "off", "button")
      } else if (target.closest('#' + buttonId)){
        togglePanel(buttonElement.classList.contains("toggle-on") ? "off" : "on", "button")
      } else {
        togglePanel("off", "other")
        
      }
    }

    document.addEventListener('click', handleClick)

    return () =>{
      document.removeEventListener('click', handleClick)
    }

  }, [pathname])
  
  return <>
  </>
}