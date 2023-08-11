import React from "react";
import { Navbar } from "@/containers/home-page/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes";

export const HomePage = () => {
  return (
    <main
      className="h-screen pt-16 md:pt-32"
      style={{
        backgroundImage: 'url("/lines.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <header className="container mx-auto w-full">
        <div className="max-w-xl">
          <h1 className="font-mono text-[56px] font-bold leading-[60px]">
            Create and sign documents easily
          </h1>
          <p className="mt-10 text-lg">
            Easily craft customized contracts and seamlessly dispatch them to
            recipients for swift and secure electronic signatures.
          </p>

          <Button asChild size="lg" className="mt-14">
            <Link href={routes.login()}>Get Started</Link>
          </Button>
        </div>
      </header>
    </main>
  );
};
