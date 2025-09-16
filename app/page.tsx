import About from "./about";
import Contact from "./contact";
import Hero from "./hero";
import Projects from "./projects";
import Skills from "./skills";

export default function Home() {
  return <>
    <Hero/>
    <Projects/>
    <About/>
    <div className="h-40"></div>
    <Skills/>
    <div className="h-30"></div>
    <Contact/>
  </>
}
