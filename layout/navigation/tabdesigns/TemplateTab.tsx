import Link from "next/link"
import SelectComponent from "../SelectComponent"
import { getSubTabPath } from "../navigationcontext/navigationtabs"
import { ITabButtonFunction, ITabDropdownFunction, ITabDesign } from "../types"
import { ChevronDown } from "lucide-react"

const DesktopButton: ITabButtonFunction = ({tab}) =>{
  return <>
    <div>{tab.text}</div>
    {tab.hasDropdown && <ChevronDown className="w-6 h-6"/>}
  </>
}

const MobileButton: ITabButtonFunction = ({tab}) =>{
  return <>
    <div>{tab.text}</div>
    {tab.hasDropdown && <ChevronDown className="w-6 h-6"/>}
  </>
}

const DesktopMenu: ITabDropdownFunction = ({tab}) =>{
  return <>
    {tab.subTabs.map(subTab =>{
      const href = getSubTabPath(tab, subTab)
      return <SelectComponent key={href} tag={Link} props={{href: href, className: "menu-button"}}>{subTab.text}</SelectComponent>
    })}
  </>
}

const MobileMenu: ITabDropdownFunction = ({tab}) =>{
  return <>
    {tab.subTabs.map(subTab =>{
      const href = getSubTabPath(tab, subTab)
      return <SelectComponent key={href} tag={Link} props={{href: href, className: "menu-button"}}>{subTab.text}</SelectComponent>
    })}
  </>
}

export const DesktopTemplateTab: ITabDesign = {
  button: {
    className: "desktop-template-button",
    componentType: DesktopButton
  },
  dropdown: {
    className: "desktop-template-menu",
    componentType: DesktopMenu
  }
}

export const MobileTemplateTab: ITabDesign = {
  className: "flex-vert w-full gap-2 px-7",
  button: {
    className: "mobile-template-button",
    componentType: MobileButton
  },
  dropdown: {
    className: "mobile-template-menu",
    componentType: MobileMenu
  }
}