import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { RiNextjsFill } from "react-icons/ri";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href="https://typesense.org/"
          className="hidden text-md md:text-lg md:flex gap-2 items-center mr-3"
        >
          <span>
            type<b>sense</b>|
          </span>
          <span>x</span>
          <RiNextjsFill className="text-2xl" />
        </Link>
        <nav className=" text-sm flex items-center md:text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm gap-6 md:w-3/4 w-4/5">
          <Link href="https://typesense.org/docs">Docs</Link>
          <Link href="https://cloud.typesense.org">Typesense Cloud</Link>
        </nav>
        <div className="flex w-1/5 items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 container mx-auto items-start gap-10 py-8 px-5 md:px-0"></main>
    </div>
  );
}
