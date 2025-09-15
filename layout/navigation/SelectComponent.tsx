"use client"

import isSubPath from "@/util/isSubPath";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

export default function SelectComponent(props: {children?: ReactNode, tag: any, props: any, initialSelect?: boolean}){
  const pathname = usePathname()
  const [selected, setSelected] = useState(props.initialSelect == true)

  useEffect(() =>{
    setSelected(isSubPath(pathname, props.props.href))
  }, [pathname])

  return React.createElement(props.tag, {...props.props, className: clsx(props.props.className, selected && "selected")}, props.children)
}