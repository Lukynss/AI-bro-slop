import { SlopGenerator } from "@/components/slop-generator";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-dvh flex-1 flex-col">
      <div className="atmosphere" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="orb orb-d" />
      </div>
      <div className="grain" aria-hidden="true" />

      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-stone-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to generator
      </a>

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="glass-mark" aria-hidden="true">
            S
          </span>
          <span className="font-serif text-[1.35rem] tracking-[-0.03em] text-stone-950">
            Slopsum
          </span>
        </div>
        <p className="text-[0.68rem] font-medium tracking-[0.16em] text-stone-600 uppercase">
          Browser-only
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pb-12 sm:px-6">
        <div className="mx-auto my-auto w-full max-w-[760px]">
          <SlopGenerator />
        </div>
      </main>
    </div>
  );
}
