import clsx from "clsx";
import { createElement, ReactNode } from "react";

interface Props{
  src: string,
  children? :ReactNode,
  tag?: string,
  className?: string,
  type: string,
  videoClass?: string
}

export default function VideoSection({src, type, children, className, videoClass, tag="section"}: Props){
  
  return createElement(tag, {className: clsx(className, "relative")}, <>
    <video autoPlay muted loop playsInline className={clsx(videoClass, "absolute top-0 left-0 w-full h-full object-cover -z-10")}>
        <source src={src} type={type}/>
        Your browser does not support HTML5 video.
    </video>
    {children}
  </>)
}