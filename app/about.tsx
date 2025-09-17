"use client"

import { Azure, Certificate } from "@/svgdata"
import Link from "next/link"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-section-y">
      <motion.div
        className="centered-content-sm vert-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          className="vert-5"
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >
          <h2 className="text-center">Who is Katuta?</h2>
          <p className="text-h4 text-tint-light mt-4">
            I'm a software developer who specialises in front-end and back-end web development building responsive web applications and APIs.
            I design my websites with care creating an intuitive user experience and organising data appropriately.
          </p>
        </motion.div>

        <motion.div
          className="vert-5"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          <h3>Certificates</h3>
          <div className="vert-10 flex flex-col gap-5">
          <Link
            target="_blank"
            href="https://katuta-mwila.github.io/documents/dev_academy_cert.pdf"
            className="block"
          >
            <motion.div
              className="p-5 gap-5 shadow-glow-4 shadow-xl flex-panel rounded-lg group transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-accent-1/50 hover:shadow-2xl"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Certificate className="text-accent-1 md:min-w-30 md:min-h-30 min-w-20 min-h-20 transition-colors duration-300 group-hover:text-accent-1" />
              <div className="vert-5 md:text-h4 text-h6 transition-colors duration-300 group-hover:underline group-hover:text-accent-1">
                New Zealand Level 6 Certificate, Applied Software Development
              </div>
            </motion.div>
          </Link>

          <Link
            target="_blank"
            href="https://learn.microsoft.com/en-us/users/katutamwila/credentials/181AD39E9FEEF410"
            className="block"
          >
            <motion.div
              className="p-5 gap-5 shadow-glow-4 flex-panel rounded-lg group transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-accent-1/50 hover:shadow-2xl"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Azure className="text-accent-1 md:min-w-30 md:min-h-30 min-w-20 min-h-20 transition-colors duration-300 group-hover:text-accent-1" />
              <div className="md:text-h4 text-h6 transition-colors duration-300 group-hover:underline group-hover:text-accent-1">
                Microsoft Cloud Certification - Azure Fundamentals
              </div>
            </motion.div>
          </Link>


          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
