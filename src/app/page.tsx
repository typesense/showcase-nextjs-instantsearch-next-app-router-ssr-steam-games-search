import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto items-start gap-10 py-8 px-5 md:px-0"></main>
    </div>
  );
}
