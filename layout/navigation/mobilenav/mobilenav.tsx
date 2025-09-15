"use client"

import clsx from "clsx";
import MobileMenu from "./mobilemenu";
import MobileNavButton from "./mobilenavbutton";
import { useNavigationContext } from "../navigationcontext/navigationcontext";

export default function MobileNav(){
  const navContext = useNavigationContext()
  const buttonId = "open-mobile-nav"
  const menuId = "mobile-nav-menu"
  return <div className={clsx("mobile-nav text-2-hover", navContext.data.showMobileMenu && "open")}>
    <MobileNavButton className="nav-button" buttonId={buttonId} menuId={menuId}/>
    <div id={menuId} className="nav-menu">
        <MobileMenu/>
    </div>
  </div>
}