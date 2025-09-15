import clsx from "clsx";
import { createElement, ReactNode } from "react";
import Image from "next/image";

interface Props{
  src: string,
  loading?: "eager" | "lazy",
  containerClass?: string,
  imageClass?: string,
  innerClass?: string,
  children?: ReactNode,
  tag?: string,
  alt?: string
}

export default function LazyImageSection(props: Props){
  return createElement(props.tag || "section", {className: clsx("relative", props.containerClass)}, <>
    <Image src={props.src} alt={props.alt || ""} loading={props.loading} className={clsx(props.imageClass)} objectFit="cover" objectPosition="center" fill/>
    <div className={clsx(props.innerClass, "h-full w-full top-0 left-0 absolute")}>
      {props.children}
    </div>
  </>)
}