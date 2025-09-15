import { ChevronDown2 } from "@/components/svgs/svgs";
import { ITabButtonFunction, ITab, ITabDropdownFunction } from "../types";

const Button: ITabButtonFunction = ({tab}: {tab: ITab}) =>{
  return <>
    <div className="select-line-1"></div>
    <div className="py-0.5 flex-panel gap-2">
      {tab.text}
      {tab.hasDropdown && <ChevronDown2 className='w-4 h-4'/>}
    </div>
    <div className="select-line-2"></div>
  </>
}

const Menu: ITabDropdownFunction = ({tab}: {tab: ITab}) =>{
  return "TAB MENU"
}

export const UnderlineButton = {
  className: "underline-button",
  componentType: Button 
}