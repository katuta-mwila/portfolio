"use client"

import { motion } from "framer-motion"
import ImageSection from "@/components/MediaComponents/ImageSection"
import { Csslogo, Dotnet, Github, Html, Javascript, NodejsIcon, PostgresqlIcon, ReactLogo, Typescriptfull } from "@/svgdata"

export default function Skills() {
  const skillset = [
    { name: "HTML", Icon: Html, percentage: "99%" },
    { name: "JavaScript", Icon: Javascript, percentage: "99%" },
    { name: "CSS", Icon: Csslogo, percentage: "99%" },
    { name: "TypeScript", Icon: Typescriptfull, percentage: "90%" },
    { name: "React", Icon: ReactLogo, percentage: "95%" },
    { name: "NodeJS", Icon: NodejsIcon, percentage: "95%" },
    { name: ".NET", Icon: Dotnet, percentage: "95%" },
    { name: "PostgreSQL", Icon: PostgresqlIcon, percentage: "85%" },
    { name: "Github", Icon: Github, percentage: "90%" },
  ]

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: {
      opacity: 0,
      x: () => Math.random() * 200 - 100,
      y: () => Math.random() * 200 - 100,
      rotate: () => Math.random() * 60 - 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <ImageSection src={"/images/gray_background2.png"} id="skills" className="theme-tertiary min-h-[70vh] shadow-glow-5 py-section-y">
      <div className="centered-content-md vert-10">
        <motion.h1
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Skills
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center md:gap-10 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {skillset.map((sk) => (
            <motion.div key={sk.name} variants={item} className="vert-5 items-center md:w-[210px] w-[100px]" layout>
              <div className="w-[80%] bg-primary px-5 pt-5 pb-2 vert-4 items-center rounded-md text-gray-100">
                <sk.Icon className="w-full h-full" />
                <div>{sk.percentage}</div>
              </div>
              <div className="text-h6">{sk.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ImageSection>
  )
}
