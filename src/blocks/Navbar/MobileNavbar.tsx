import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/components/ui/accordion";
import { navbarConfig } from "./navConfig";

export const MobileNavbar: React.FC = React.memo(() => {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <img
            src={navbarConfig.logo.src}
            className="w-8 bg-primary"
            alt={navbarConfig.logo.alt}
          />
          <span className="text-lg font-semibold">Shadcnblocks.com</span>
        </Link>
        <Sheet aria-describedby="mobile-menu">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open Menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="overflow-y-auto"
            aria-describedby="mobile-menu"
          >
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    aria-label="Home"
                  >
                    <img
                      src={navbarConfig.logo.src}
                      className="w-8 bg-primary"
                      alt={navbarConfig.logo.alt}
                    />
                    <span className="text-lg font-semibold">
                      {navbarConfig.siteName}
                    </span>
                  </Link>
                </SheetClose>
              </SheetTitle>
              <SheetDescription aria-describedby="mobile-menu"></SheetDescription>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              <Accordion
                type="single"
                collapsible
                className="flex flex-col w-full gap-4"
              >
                {navbarConfig.navItems.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={item.title}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-0 font-semibold hover:no-underline text-base mb-0">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      {item.subMenuItems.map((subItem, idx) => (
                        <SheetClose asChild key={idx}>
                          <a
                            className={cn(
                              "flex items-start select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                            href={subItem.link}
                          >
                            <span className="flex-shrink-0">
                              {subItem.icon}
                            </span>
                            <div>
                              <div className="text-sm font-semibold">
                                {subItem.title}
                              </div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </div>
                          </a>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link href="/pricing" className="font-semibold">
                Pricing
              </Link>
              <Link href="/blog" className="font-semibold">
                Blog
              </Link>
              <Link href="/auth" className="font-semibold">
                Sign up
              </Link>
            </nav>
            <div className="mt-6 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/press" className="text-muted-foreground">
                  Press
                </Link>
                <Link href="/contact" className="text-muted-foreground">
                  Contact
                </Link>
                <Link href="/imprint" className="text-muted-foreground">
                  Imprint
                </Link>
                <Link href="/sitemap" className="text-muted-foreground">
                  Sitemap
                </Link>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="outline">Log in</Button>
              <Button>Sign up</Button>
            </div>
            <SheetFooter className="absolute bottom-5 left-[50%] transform -translate-x-1/2">
              <div className="flex justify-center shrink-0">
                <span className="text-muted-foreground">
                  © No rights reserved.
                </span>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
});
