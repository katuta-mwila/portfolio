"use client"

import { motion } from "framer-motion"
import { BlurImage } from "@/components/MediaComponents/BlurImage"
import QuickMap from "@/components/QuickMap"
import { IBlurSrc, PubImages } from "@/imageData"
import { Dotnet, Github, Nextjs, NodejsIcon, PostgresqlIcon, ReactLogo, TailwindLogo, TypescriptLogo, WebsocketLogo } from "@/svgdata"
import { Link2 } from "lucide-react"
import Link from "next/link"

interface IProject {
  name: string
  blurSrc: IBlurSrc
  href: string
  github: string
  techStackIcons: any[]
  techStackNames: string[]
  area: string
}

export default function Projects() {
  const projects: IProject[] = [
    {
      name: "Performance Logger",
      blurSrc: PubImages.pl,
      href: "https://performance-logger-demo.vercel.app/",
      github: "https://github.com/katuta-mwila/performance-logger",
      techStackIcons: [ReactLogo, TypescriptLogo, NodejsIcon, PostgresqlIcon],
      techStackNames: ["React", "TypeScript", "NodeJS", "PostgreSQL"],
      area: "one"
    },
    {
      name: "Football Fixture Viewer",
      blurSrc: PubImages.cf,
      href: "http://capitalfixtures.runasp.net/",
      github: "https://github.com/katuta-mwila/capital-fixtures",
      techStackIcons: [ReactLogo, Dotnet],
      techStackNames: ["React", "Dotnet"],
      area: "two"
    },
    {
      name: "Games Center",
      blurSrc: PubImages.gc,
      href: "https://games-center.azurewebsites.net/",
      github: "https://github.com/katuta-mwila/GamesCenter",
      techStackIcons: [ReactLogo, Dotnet, WebsocketLogo],
      techStackNames: ["React", "Dotnet", "Web Sockets"],
      area: "three"
    },
    {
      name: "Clinical Cuts",
      blurSrc: PubImages.clinicalcuts,
      href: "https://clinical-cuts.vercel.app/",
      github: "https://github.com/katuta-mwila/clinical-cuts",
      techStackIcons: [ReactLogo, Nextjs, TypescriptLogo, TailwindLogo],
      techStackNames: ["React", "NextJS", "TypeScript", "Tailwind"],
      area: "four"
    },
    {
      name: "Para Plumbing",
      blurSrc: PubImages.paraplumbing,
      href: "https://paraplumbing.vercel.app/",
      github: "https://github.com/katuta-mwila/paraplumbing",
      techStackIcons: [ReactLogo, Nextjs, TypescriptLogo, TailwindLogo],
      techStackNames: ["React", "NextJS", "TypeScript", "Tailwind"],
      area: "five"
    }
  ]

  return (
    <section id="projects" className="theme-primary pb-section-y vert-10">
      <motion.h2
        className="text-center"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Projects
      </motion.h2>
      <motion.div
        className="centered-content-full project-grid gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.5 } },
        }}
      >
        <QuickMap objects={projects} componentTag={ProjectCard} />
      </motion.div>
    </section>
  )
}

interface Props {
  project: IProject
}

function ProjectCard(project: IProject) {
  return (
    <motion.div
      className="bg-primary-shade-1 vert-0 rounded-xl project-card"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{gridArea: project.area}}
    >
      <h6 className="text-center p-4">{project.name}</h6>
      <div className="relative px-5 group overflow-hidden">
        <div className="overflow-hidden">
          <BlurImage
            alt=""
            blurSrc={project.blurSrc}
            containerClass="rounded-md group-hover:scale-110 duration-300 transition-transform"
            centerFill
          />
          <div className="abs-cover bg-black/15 hover:bg-black/0 duration-300"></div>
        </div>
      </div>
      <div className="vert-2 grow">
        <div className="pt-5 px-5 pb-4 grow vert-1">
          <h6 className="text-tint-light text-lg">Built With</h6>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {project.techStackIcons.map((Icon, i) => (
              <div
                key={i}
                className="flex-panel gap-2 bg-accent-2 hover:bg-accent-4 duration-300 rounded-xl py-1 px-3 text-sm text-tint-light cursor-default"
              >
                <Icon className="text-accent-1" />
                {project.techStackNames[i]}
              </div>
            ))}
          </div>
        </div>
        <div className="flex bg-accent-3">
          <Link
            href={project.github}
            target="_blank"
            className="text-lg flex-panel gap-2 px-5 rounded-tr-mds grow py-2 hover:text-accent-1 duration-300"
          >
            <Github /> Github
          </Link>
          <Link
            href={project.href}
            target="_blank"
            className="text-lg flex-panel gap-2 px-5 rounded-tl-mds grow justify-end hover:text-accent-1"
          >
            View Live
            <Link2 />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
