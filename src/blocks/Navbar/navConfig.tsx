import { 
  Book, 
  FileText, 
  Building, 
  Users, 
  Headphones, 
  HelpCircle, 
  Mail, 
  Activity, 
} from "lucide-react";

export const navbarConfig = {
    // Nom du site et logo
    siteName: "Shadcnblocks.com",
    logo: {
      src: "https://shadcnblocks.com/images/block/block-1.svg",
      alt: "Shadcnblocks logo",
    },
    // Menu de navigation
    navItems: [
      {
        title: "Products",
        subMenuItems: [
          {
            title: "Blog",
            description: "The latest industry news, updates, and info",
            icon: <Book className="size-6" />,
            link: "/blog",
          },
          {
            title: "Company",
            description: "Our mission is to innovate and empower the world",
            icon: <Building className="size-6" />,
            link: "/company",
          },
          {
            title: "Careers",
            description: "Browse job listings and discover our workspace",
            icon: <Users className="size-6" />,
            link: "/careers",
          },
          {
            title: "Support",
            description: "Get in touch with our support team or visit our community forums",
            icon: <Headphones className="size-6" />,
            link: "/support",
          },
        ],
      },
      {
        title: "Resources",
        subMenuItems: [
          {
            title: "Help Center",
            description: "Get all the answers you need right here",
            icon: <HelpCircle className="size-6" />,
            link: "/help-center",
          },
          {
            title: "Contact Us",
            description: "We are here to help you with any questions you have",
            icon: <Mail className="size-6" />,
            link: "/contact",
          },
          {
            title: "Status",
            description: "Check the current status of our services and APIs",
            icon: <Activity className="size-6" />,
            link: "/status",
          },
          {
            title: "Terms of Service",
            description: "Our terms and conditions for using our services",
            icon: <FileText className="size-6" />,
            link: "/terms-of-service",
          },
        ],
      },
    ],
    // Liens de navigation
    navLinks: [
      {
        title: "Pricing",
        link: "/pricing",
      },
      {
        title: "Blog",
        link: "/blog",
      },
    ],
}