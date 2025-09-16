"use client"
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="theme-primary py-section-y min-h-[65vh] flex-center">
      <motion.div
        className="centered-content-sm text-center vert-5 pt-[40px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-bold text-[90px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Katuta Mwila
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <span className="text-accent-1">Full Stack</span> developer who transforms <span className="text-accent-1">ideas</span> into <span className="text-accent-1">Reality</span>
        </motion.h2>
        <motion.div
          className="shadow-glow -translate-y-15"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        ></motion.div>
      </motion.div>
    </section>
  );
}


/*export default function Hero(){
  return <section id="home" className="theme-primary py-section-y min-h-[65vh] flex-center">
    <div className="centered-content-sm text-center vert-5 pt-[40px]">
      <h1 className="font-bold text-[90px]">Katuta Mwila</h1>
      <h2 className=""><span className="text-accent-1">Full Stack</span> developer who transforms <span className="text-accent-1">ideas</span> into <span className="text-accent-1">Reality</span></h2>
      <div className="shadow-glow -translate-y-15"></div>
    </div>
  </section>
}*/