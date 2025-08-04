"use client";
import React from "react";
import Link from "next/link";
import { Menu, Rocket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Solution", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export default function HeroSection() {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <>
      <header>
        <nav
          data-state={menuState && "active"}
          className="fixed z-20 w-full border-b border-dashed backdrop-blur md:relative lg:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2 uppercase text-lg font-semibold tracking-tight text-muted-foreground transition-colors duration-200 hover:text-accent-foreground lg:text-xl"
                >
                  PlotForge
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="bg-background dark:bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/sign-in">
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/sign-up">
                      <span>Sign up</span>
                    </Link>
                  </Button>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
                <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125]">
                  <span className="font-bold">PlotForge</span>: Creador de
                  Historias Interactivas
                </h1>
                <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
                  Crea historias interactivas ramificadas donde cada decisión
                  cuenta. Construye narrativas envolventes como novelas visuales
                  y juegos narrativos.
                </p>

                <div className="mt-8 gap-2 flex flex-col sm:flex-row sm:justify-center">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">
                      <Rocket className="relative size-4" />
                      <span className="text-nowrap">Comenzar a Escribir</span>
                    </Link>
                  </Button>
                  <Button size="lg" asChild>
                    <Link href="/explore">
                      <Rocket className="relative size-4" />
                      <span className="text-nowrap">Explorar historias</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative mt-16">
              <div
                aria-hidden
                className="bg-linear-to-b to-background dark:to-background absolute inset-0 z-10 from-transparent from-35%"
              />
              <div className="relative mx-auto max-w-6xl overflow-hidden px-4">
                <Image
                  className="z-2 border-border/25 relative hidden rounded-2xl border dark:block"
                  src="/hero.jpg"
                  alt="app screen"
                  width={2796}
                  height={2008}
                />
                <Image
                  className="z-2 border-border/25 relative rounded-2xl border dark:hidden"
                  src="/hero.jpg"
                  alt="app screen"
                  width={2796}
                  height={2008}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
