"use client"

import { motion } from "framer-motion"
import ParticleBackground from "@/components/ParticleBackground"
import { Github, Linkedin } from "@/svgdata"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const socials = [
    { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/katuta-mwila-b9b498341/" },
    { name: "GitHub", Icon: Github, href: "https://github.com/katuta-mwila" },
    { name: "katutam.mwilam@gmail.com", Icon: Mail, href: "mailto:katutam.mwilam@gmail.com" },
  ]

  return (
    <section id="contact" className="py-section-y relative overflow-hidden">
      <ParticleBackground />
      <div className="centered-content-xs vert-10 z-10 relative">
        <h2 className="text-center">Socials</h2>
        <div className="vert-10 flex flex-wrap justify-center gap-8">
          {socials.map((social, i) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, x: -80, y: 80, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="vert-5"
            >
              <SocialCard social={social} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialCard({ social }: { social: any }) {
  return (
    <Link
      href={social.href}
      target="_blank"
      className="hover:text-accent-1 items-center bg-secondary p-10 min-w-[300px] rounded-lg hover:shadow-gl hover:shadow-glow-2 hover:translate-y-2 duration-300 flex flex-col gap-4"
    >
      <social.Icon className="h-20 w-20" />
      <div className="wrap-anywhere text-center">{social.name}</div>
    </Link>
  )
}
