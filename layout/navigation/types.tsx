import { ReactNode } from "react"

export interface ITabDesign{
  className?: string,
  button: {
    className?: string,
    componentType: ITabButtonFunction
  },
  dropdown?: {
    className?: string,
    componentType: ITabDropdownFunction
  },
}
export interface ISubTab{
  href: string,
  text: string
  pathType: "relative" | "absolute"
  selected?: boolean
}

export interface ITab{
  id: string,
  isIndex?: boolean,
  text: string,
  href: string,
  hasDropdown: boolean,
  desktop?: ITabDesign,
  mobile?: ITabDesign,
  subTabs: ISubTab[]

}

export type ITabButtonFunction = ({tab}: {tab: ITab}) => ReactNode

export type ITabDropdownFunction = ({tab}: {tab: ITab}) => ReactNode