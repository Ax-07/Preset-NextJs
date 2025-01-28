import React from "react";
import { cn } from "@/src/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { ListItem } from "./ListItem";
import Link from "next/link";
import { navbarConfig } from "./navConfig";

export const DesktopNavbar: React.FC = React.memo(() => {
    return (
      <nav className="hidden lg:flex justify-between items-center" aria-label="Main Navigation">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <img
                src={navbarConfig.logo.src}
                className="w-8 bg-primary"
                alt={navbarConfig.logo.alt}
              />
              <span className="text-lg font-semibold">{navbarConfig.siteName}</span>
          </Link>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navbarConfig.navItems.map((item, idx) => (
                    <NavigationMenuItem key={idx}>
                        <NavigationMenuTrigger className="text-muted-foreground">
                            {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        <ul className="w-80 p-3">
                            {item.subMenuItems.map((subItem, idx) => (
                                <ListItem key={idx} title={subItem.title} href={subItem.link} icon={subItem.icon}>
                                    {subItem.description}
                                </ListItem>
                            ))}
                        </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    ))}
              </NavigationMenuList>
            </NavigationMenu>
            {navbarConfig.navLinks.map((item, idx) => (
                <Link key={idx} href={item.link} className={cn(
                    "text-muted-foreground",
                    navigationMenuTriggerStyle,
                    buttonVariants({ variant: "ghost" })
                    )}>
                    {item.title}
                </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Log in
          </Button>
          <Link href="/auth">
              <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </nav>
    );
  });