import Constants from "@/Constants";
import { DesktopTemplateTab, MobileTemplateTab } from "@/layout/navigation/tabdesigns/TemplateTab";
import { ITabDesign, ITab, ISubTab } from "../types";

const rootPath = Constants.rootPath

/*
const desktopTabDesign: ITabDesign = { 
  button: UnderlineButton,
  dropdown: DesktopTemplateTab.dropdown
}*/

const desktopTabDesign = DesktopTemplateTab

const mobileTabDesign: ITabDesign = {
  className: MobileTemplateTab.className,
  button: MobileTemplateTab.button,
  dropdown: MobileTemplateTab.dropdown
}

export function getSubTabPath(tab: ITab, subTab: ISubTab){
  return subTab.pathType == "absolute" ? subTab.href : tab.href + subTab.href 
}

export const navigationTabs: ITab[] = [
  {
    id: "home",
    isIndex: true,
    text: "Home",
    href: rootPath + "/",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
  {
    id: "page-2",
    text: "Services",
    href: rootPath + "/page-2",
    hasDropdown: true,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: [
      {
        pathType: "relative",
        href: "/subpage-1",
        text: "Website Building"
      },
      {
        pathType: "relative",
        href: "/subpage-2",
        text: "Analytics"
      },
      {
        pathType: "relative",
        href: "/subpage-3",
        text: "Research"
      }
    ]
  },
  {
    id: "page-3",
    text: "Page 3",
    href: rootPath + "/page-3",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: undefined,
    subTabs: []
  },
]