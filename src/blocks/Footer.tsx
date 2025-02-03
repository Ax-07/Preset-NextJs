// Footer.tsx
import React from "react";
import { navbarConfig } from "@/src/blocks/Navbar/navConfig";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const sections = navbarConfig.navItems.map((item) => ({
    title: item.title,
    links: item.subMenuItems.map((subItem) => ({
      name: subItem.title,
      href: subItem.link,
    })),
  }));

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com", icon: <FaXTwitter /> },
    { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  return (
        <footer className="container px-16 py-32">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:mb-0 ">
              <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:justify-start">
                <a href="https://shadcnblocks.com" className="flex items-center gap-2">
                  <img
                    src="https://shadcnblocks.com/images/block/block-1.svg"
                    alt="blocks for shadcn/ui"
                    className="h-10 bg-white"
                  />
                <p className="text-xl font-semibold">Shadcnblocks.com</p>
                </a>
              <p className="mt-4 font-bold">Components made easy.</p>
              </div>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Social</h3>
              <ul className="space-y-4 text-muted-foreground">
                {socialLinks.map((link, idx) => (
                  <li key={idx} className="flex items-center font-medium hover:text-primary">
                    <a href={link.href} className="flex items-center gap-2">
                      {link.icon}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center lg:items-start">
            <p>© 2024 Copyright. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="underline hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
  );
};

export default Footer;
