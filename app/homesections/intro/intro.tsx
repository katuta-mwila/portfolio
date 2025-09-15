"use client"

import { createElement, useEffect, useRef, useState } from "react"

export default function Intro() {



  return <section className="theme-primary py-section-y">
      <div className="centered-content-md">
        <p className="w-30">para para paragraph
          para para paragraph
          para para paragraph
        </p>
        <div className="pb-50">
          <Comp tag="h1" className="ff">BIG BOY</Comp>
          <Comp tag="h1">BIG BOY</Comp>
        </div>

        <div className="pb-50">
          <Comp tag="h2" className="ff">BIG BOY</Comp>
          <Comp tag="h2">BIG BOY</Comp>
        </div>

        <div className="pb-50">
          <Comp tag="h3" className="ff">BIG BOY</Comp>
          <Comp tag="h3">BIG BOY</Comp>
        </div>

        <div className="pb-50">
          <Comp tag="h4" className="ff">BIG BOY</Comp>
          <Comp tag="h4">BIG BOY</Comp>
        </div>

        <div className="pb-50">
          <Comp tag="h5" className="ff">BIG BOY</Comp>
          <Comp tag="h5">BIG BOY</Comp>
        </div>

        <div className="pb-50">
          <Comp tag="h6" className="ff">BIG BOY</Comp>
          <Comp tag="h6">BIG BOY</Comp>
        </div>
        <div className="pb-20 vert-5">
          <div className="text-6xl">This is a pure 6xl</div>
          <Comp className="text-h1">This is responsive h1</Comp>
          <div className="text-5xl">This is a pure 5x;</div>
        </div>

        <div className="pb-20 vert-5">
          <div className="text-5xl">This is a pure 5xl</div>
          <Comp className="text-h2">This is responsive h2</Comp>
          <div className="text-4xl">This is a pure 4x;</div>
        </div>

        <div className="pb-20 vert-5">
          <div className="text-4xl">This is a pure 4xl</div>
          <Comp className="text-h3">This is responsive h3</Comp>
          <div className="text-3xl">This is a pure 3x;</div>
        </div>

        <div className="pb-20 vert-5">
          <div className="text-3xl">This is a pure 3xl</div>
          <Comp className="text-h4">This is responsive h4</Comp>
          <div className="text-2xl">This is a pure 2x;</div>
        </div>

        <div className="pb-20 vert-5">
          <div className="text-2xl">This is a pure 2xl</div>
          <Comp className="text-h5">This is responsive h5</Comp>
          <div className="text-1xl">This is a pure 1x;</div>
        </div>

        <div className="pb-20 vert-5">
          <div className="text-1xl">This is a pure 1xl</div>
          <Comp className="text-h6">This is responsive h6</Comp>
          <div className="text-lg">This is a pure lgx;</div>
        </div>

        </div>
  </section>
}

function Comp(props: any){
  const [height, setHeight] = useState(0)
  const ref = useRef<any>(undefined)

  useEffect(() =>{
    const onResize = () =>{
      setHeight(ref.current.getBoundingClientRect().height)
    }
    onResize()
    window.addEventListener("resize", onResize)

    return () =>{
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return createElement(props.tag || "div", {ref, className: props.className}, <>{props.children} ({height})</>)
}