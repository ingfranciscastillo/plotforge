import Link from "next/link";
import BuyMeaCoffee from "./icons/BuyMeACoffeeIcon";
import Twitter from "./icons/XformerlyTwitter";
import Facebook from "./icons/FacebookIcon";
import Threads from "./icons/ThreadsIcon";
import XformerlyTwitter from "./icons/XformerlyTwitter";
import Instagram from "./icons/InstagramIcon";

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto block size-fit uppercase text-center text-2xl font-bold tracking-wider text-primary md:text-3xl"
        >
          PlotForge
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="https://x.com/ingfranciscas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <XformerlyTwitter className="size-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ingfranciscastillo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary block"
          >
            <Facebook className="size-6" />
          </Link>
          <Link
            href="buymeacoffee.com/ingfranciscastillo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy Me a Coffee"
            className="text-muted-foreground hover:text-primary block"
          >
            <BuyMeaCoffee className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="text-muted-foreground hover:text-primary block"
          >
            <Threads className="size-6" />
          </Link>
          <Link
            href="https://www.instagram.com/ingfranciscastillo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary block"
          >
            <Instagram className="size-6" />
          </Link>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} PlotForge, All rights reserved
        </span>
      </div>
    </footer>
  );
}
