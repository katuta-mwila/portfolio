import { createElement, CSSProperties, ReactNode } from "react"

interface Props{
  src: string,
  tag?: string,
  className?: string,
  id?: string,
  children?: ReactNode
}

// uses background-image

export default function ImageSection({src, id, children, className, tag="section"}: Props){

  const style: CSSProperties ={
    backgroundImage: `url(${src})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'

  }

  return createElement(tag, {className, style, id}, children)
}