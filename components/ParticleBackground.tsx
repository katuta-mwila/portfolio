"use client"

import { Component, ReactNode } from "react";
import type { Container, Engine} from 'tsparticles-engine'
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default class ParticleBackground extends Component{
  particlesInit
  particlesLoaded

  constructor(props: object){
    super(props)
    this.particlesInit = async (engine: Engine) => {
      console.log(engine);
  
      // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadFull(engine);
      await loadSlim(engine);
    }

    this.particlesLoaded = async (container: Container | undefined) => {
      await console.log(container);
    }
  }

  render(): ReactNode {

    return <Particles
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          className="w-full h-full abs-cover"
          options={{
              fullScreen: {enable: false},
              background: {
                  color: {
                      value: "transparent",
                  },
              },
              fpsLimit: 120,
              interactivity: {
                  events: {
                      onClick: {
                          enable: true,
                          mode: "push",
                      },
                      onHover: {
                          enable: false,
                          mode: "repulse",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 4,
                      },
                      repulse: {
                          distance: 200,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: "#ffffff",
                  },
                  links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "bounce",
                      },
                      random: false,
                      speed: 2,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800,
                      },
                      value: 40,
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 1, max: 5 },
                  },
              },
              detectRetina: true,
          }}
        >
          
        </Particles>
  }
}