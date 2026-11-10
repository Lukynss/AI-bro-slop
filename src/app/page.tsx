import { SlopGenerator } from "@/components/slop-generator";

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col">
      <div className="field" aria-hidden="true" />

      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-stone-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to generator
      </a>

      <header className="relative z-10 px-6 pt-7 sm:px-10 sm:pt-9">
        <p className="font-serif text-[1.15rem] tracking-[-0.02em] text-stone-950">
          Slopsum
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pt-8 pb-16 sm:px-8">
        <div className="mx-auto my-auto w-full max-w-[40rem]">
          <SlopGenerator />
        </div>
      </main>
    </div>
  );
}
