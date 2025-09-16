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
    href: "#home",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
  {
    id: "projects",
    text: "Projects",
    href: "#projects",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
  {
    id: "about",
    text: "About",
    href: "#about",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
  {
    id: "skills",
    text: "Skills",
    href: "#skills",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
  {
    id: "contact",
    text: "Contact",
    href: "#contact",
    hasDropdown: false,
    desktop: desktopTabDesign,
    mobile: mobileTabDesign,
    subTabs: []
  },
]