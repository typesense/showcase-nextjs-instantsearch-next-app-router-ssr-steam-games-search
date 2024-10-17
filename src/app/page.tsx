import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="fixed inset-0 z-[-2] bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(161,161,170,0.2),rgba(255,255,255,0))]"></div>
      <main className="flex-1 container mx-auto items-start gap-10 py-8 md:px-0">
      </main>
    </div>
  );
}
