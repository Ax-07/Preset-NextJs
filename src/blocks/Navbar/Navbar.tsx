"use client";

import React from "react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

const Navbar: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const fixedNav = "fixed top-0 left-0 z-10 w-full bg-background";

  
  return (
    <section className={`py-4 border-b ${fixedNav}`}>
      <div className="container mx-auto px-4">
        {isDesktop ? <DesktopNavbar/>
        : <MobileNavbar/>}
      </div>
    </section>
  );
};

export default Navbar;
