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
            <motion.div
              className="p-5 gap-5 shadow-glow-4 shadow-xl flex-panel rounded-lg"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Certificate className="text-accent-1 min-w-30 min-h-30"/>
              <div className="vert-5">
                <Link href="https://katuta-mwila.github.io/documents/dev_academy_cert.pdf" className="text-h4 hover:underline hover:text-accent-1">
                  New Zealand Level 6 Certificate, Applied Software Development
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="p-5 gap-5 shadow-glow-4 flex-panel rounded-lg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Azure className="text-accent-1 min-w-30 min-h-30"/>
              <Link href="https://learn.microsoft.com/en-us/users/katutamwila/credentials/181AD39E9FEEF410" className="text-h4 hover:underline hover:text-accent-1">
                Microsoft Cloud Certification - Azure Fundamentals
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
