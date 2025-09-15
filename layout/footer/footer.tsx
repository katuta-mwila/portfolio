import { NavLogo } from "@/components/logos";
import { Facebook, Instagram, Linkedin } from "@/svgdata";
import Link from "next/link";

export default function Footer(){
  const categories = [
    {
      category: "Site Map",
      links: [
        {name: "Home", link: "/"},
        {name: "About", link: "/about"},
        {name: "Services", link: "/services"},
        {name: "Our Work", link: "/our-work"},
        {name: "Contact", link: "/contact"},
      ]
    },
    {
      category: "Services",
      links: [
        {name: "Social Media", link: "/"},
        {name: "Website Building", link: "/"},
        {name: "Advertising", link: "/"},
        {name: "Strategy & planning", link: "/"},
        {name: "SEO Optimisation", link: "/"},
      ]
    },
    {
      category: "Help",
      links: [
        {name: "Contact", link: "/"},
        {name: "FAQ", link: "/"},
        {name: "Private Policy", link: "/"},
        {name: "Cookies", link: "/"}
      ]
    },
    {
      category: "Blog",
      links: [
        {name: "Latest Website", link: "/"},
        {name: "New Technology", link: "/"},
        {name: "Future of AI", link: "/"},
        {name: "Security Considerations", link: "/"}
      ]
    }
  ]

  const socials = [
    {
      link: 'https://www.facebook.com/',
      logo: <Facebook className="h-6 w-6 cursor-pointer hover:text-accent-1"/>
    },
    {
      link: "https://www.instagram.com/",
      logo: <Instagram className="h-6 w-6 cursor-pointer hover:text-accent-1"/>,
    },
    {
      link: "https://www.linkedin.com/",
      logo: <Linkedin className="h-6 w-6 cursor-pointer hover:text-accent-1"/>
    }
  ]

  return <footer className="theme-primary md:py-20 py-10">
    <div className="flex-vert centered-content-md gap-10">
      <div className="flex lg:flex-row flex-col gap-x-20 gap-y-10">
        <div>
          <NavLogo/>
        </div>
          <div className="flex gap-x-0 gap-y-5 justify-between flex-wrap grow">
            {categories.map(cat =>{
              return <div key={cat.category} className="flex-vert w-[180px]">
                <div className="flex-vert gap-2">
                  <h5 className="font-bold">{cat.category}</h5>
                  <div className="flex-vert gap-1">
                    {cat.links.map(link =>{
                      return <Link key={link.name} className="text-tint-dark hover:text-accent-1 text-sm" href={link.link}>{link.name}</Link>
                    })}
                  </div>
                </div>
              </div>
            })}
          </div>
      </div> 
      <div className="border-t border-t-gray-400"></div>
      <div className="flex md:flex-row flex-col-reverse gap-x-10 gap-y-5">
        <p className="text-sm grow md:text-start text-center text-tint-dark">Copyright © 2025 Woodmanweb.co.nz, All Right Reserved</p>
        <div className="flex-panel md:justify-start justify-center gap-2 text-2">
          {socials.map(social =>{
            return <Link key={social.link} href={social.link} target="_blank">{social.logo}</Link>
          })}
        </div>
      </div>
    </div>
  </footer>
}