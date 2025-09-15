"use client"

import GenericTab from "../generictab/generictab";
import { navigationTabs } from "../navigationcontext/navigationtabs";

export default function MobileMenu(){
  return <>
    {navigationTabs.map(tab =>{
      if (!tab.mobile) return
      return <GenericTab key={tab.id} tab={tab} navType="mobile"/>
    })}
  </>
}