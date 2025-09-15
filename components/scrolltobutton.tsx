"use client"

import { clsx } from "clsx"
import { HTMLMotionProps, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface Props{
  className?: string
  iconClass?: string
  scrollToId: string
  animate?: boolean
}

export default function ScrollToButton({className, scrollToId, iconClass, animate=true}: Props){
  
  const click = () =>{
    const element = document.getElementById(scrollToId)
    if (!element) return
    const rect = element.getBoundingClientRect()
    console.log(rect)
    console.log(window.scrollY)
    window.scrollTo({
      top: window.scrollY + rect.top,
      left: 0,
      behavior: 'smooth'
    })
  }

  let motionProps: HTMLMotionProps<"div"> = {}

  if (animate){
    motionProps = {
      animate: {
        y: ['-5px', '5px', '-5px']
      },
      transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  }
  

  return <motion.div {...motionProps} className={clsx("rounded-full cursor-pointer text-accent-1", className)} onClick={click} title="View More">
    <ChevronDown className={clsx(iconClass || "w-20 h-20")}/>
  </motion.div>
}