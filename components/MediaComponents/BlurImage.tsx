"use client"

import { IBlurSrc, PubImages } from "@/imageData"
import clsx from "clsx"
import Image, {ImageProps, StaticImageData} from "next/image"
import { SyntheticEvent, useState } from "react"

interface Props{
  containerClass?: string,
  blurUrl?: string,
  centerFill?: boolean,
  disableBlur?: boolean, /* here incase it's decided that the blur is no good */
  src?: string | StaticImageData
  blurSrc?: IBlurSrc
}

type IBlurImage = Omit<ImageProps, "src"> & Props

export const BlurImage = (props: IBlurImage) =>{
  const [loaded, setLoaded] = useState(false)
  let {containerClass, blurUrl, disableBlur, onLoad, className, centerFill, style, fill, src, blurSrc, ...imageProps}: IBlurImage  = props

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) =>{
    setLoaded(true)
    if (onLoad)
      onLoad(e)
  }

  let centerFillStyle = {}
  if (centerFill)
    centerFillStyle = {objectFit: 'cover', objectPosition: 'center'}

  if (blurSrc){
    src = blurSrc.main
    blurUrl = blurSrc.small
  } else if (!src){
    src = PubImages.placeholder.main
    blurUrl = PubImages.placeholder.small
  }

  return <div className={clsx("blur-container overflow-hidden", containerClass)} style={{
    backgroundImage: disableBlur ? undefined : `url(${blurUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: centerFill ? 'relative' : undefined
  }}>
    <Image {...imageProps} src={src} fill={fill || centerFill} style={{...centerFillStyle ,...style}} onLoad={onImageLoad} className={clsx(className, "transition-opacity duration-250", (loaded || disableBlur == true) ? "opacity-100" : "opacity-0")}/>
  </div>
}