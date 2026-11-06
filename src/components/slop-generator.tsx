"use client";

import { useEffect, useId, useState } from "react";
import Minus from "lucide-react/icons/minus";
import Plus from "lucide-react/icons/plus";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_PARAGRAPHS,
  DEFAULT_SENTENCES,
  INITIAL_SEED,
  LIMITS,
  countWords,
  generateSlop,
  randomSeed,
} from "@/lib/generate";

type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  decrementLabel: string;
  incrementLabel: string;
  onChange: (value: number) => void;
};

function Stepper({
  label,
  value,
  min,
  max,
  decrementLabel,
  incrementLabel,
  onChange,
}: StepperProps) {
  const labelId = useId();

  return (
    <div className="min-w-0">
      <p
        id={labelId}
        className="mb-2 text-[0.68rem] font-medium tracking-[0.16em] text-stone-700 uppercase"
      >
        {label}
      </p>
      <div
        role="group"
        aria-labelledby={labelId}
        className="glass-inset flex h-14 items-center justify-between rounded-full p-1"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-12 cursor-pointer rounded-full text-stone-900 hover:bg-white/80"
          aria-label={decrementLabel}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus aria-hidden="true" />
        </Button>
        <span className="min-w-8 text-center text-base font-medium text-stone-950 tabular-nums">
          {value}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-12 cursor-pointer rounded-full text-stone-900 hover:bg-white/80"
          aria-label={incrementLabel}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function copyWithTextarea(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.append(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

export function SlopGenerator() {
  const [paragraphs, setParagraphs] = useState(DEFAULT_PARAGRAPHS);
  const [sentences, setSentences] = useState(DEFAULT_SENTENCES);
  const [output, setOutput] = useState(() =>
    generateSlop({
      paragraphs: DEFAULT_PARAGRAPHS,
      sentencesPerParagraph: DEFAULT_SENTENCES,
      seed: INITIAL_SEED,
    }),
  );
  const [revision, setRevision] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => {
      setStatus(null);
      setCopyState("idle");
    }, 2200);
    return () => window.clearTimeout(timeout);
  }, [status]);

  function generate() {
    const next = generateSlop({
      paragraphs,
      sentencesPerParagraph: sentences,
      seed: randomSeed(),
    });
    setOutput(next);
    setRevision((value) => value + 1);
    setCopyState("idle");
    setStatus(
      `Generated ${next.length} ${next.length === 1 ? "paragraph" : "paragraphs"}, ${countWords(next)} words.`,
    );
  }

  async function copy() {
    const text = output.join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      setStatus("Copied to clipboard.");
    } catch {
      const copied = copyWithTextarea(text);
      if (copied) {
        setCopyState("copied");
        setStatus("Copied to clipboard.");
      } else {
        setCopyState("failed");
        setStatus("Could not copy. Select the paragraphs and copy them manually.");
      }
    }
  }

  const copyLabel =
    copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy";
  const words = countWords(output);

  return (
    <section id="generator" aria-labelledby="slop-title" className="glass-panel">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-full bg-white/55 blur-2xl" />

      <div className="relative px-5 py-7 sm:px-10 sm:py-10">
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-stone-600 uppercase">
          New enterprise filler
        </p>
        <h1
          id="slop-title"
          className="font-serif mt-3 max-w-xl text-[2.55rem] leading-[0.98] tracking-[-0.035em] text-balance text-stone-950 sm:text-[3.45rem]"
        >
          Operationalize
          <span className="block font-normal italic">the placeholder.</span>
        </h1>
        <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-pretty text-stone-700 sm:text-base">
          Drop-in paragraphs of agentic, AI-native business speak. Grammatically
          intact. Semantically vacant. For the mockup that still needs a narrative.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] md:items-end">
          <Stepper
            label="Paragraphs"
            value={paragraphs}
            min={LIMITS.paragraphs.min}
            max={LIMITS.paragraphs.max}
            decrementLabel="Fewer paragraphs"
            incrementLabel="More paragraphs"
            onChange={setParagraphs}
          />
          <Stepper
            label="Sentences"
            value={sentences}
            min={LIMITS.sentencesPerParagraph.min}
            max={LIMITS.sentencesPerParagraph.max}
            decrementLabel="Fewer sentences per paragraph"
            incrementLabel="More sentences per paragraph"
            onChange={setSentences}
          />
          <Button
            type="button"
            className="h-12 w-full cursor-pointer rounded-full bg-stone-950 px-5 text-[0.95rem] text-white shadow-[0_10px_24px_rgba(28,25,23,0.16)] hover:bg-stone-800 md:w-auto md:min-w-[8.25rem]"
            onClick={generate}
          >
            Generate
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full cursor-pointer rounded-full border-white/80 bg-white/45 px-5 text-[0.95rem] text-stone-950 backdrop-blur-md hover:bg-white/75 md:w-auto md:min-w-[8.25rem]"
            onClick={copy}
          >
            {copyLabel}
          </Button>
        </div>

        <div className="mt-8 border-t border-white/60 pt-7">
          <h2 className="sr-only">Generated paragraphs</h2>
          <div key={revision} className={revision > 0 ? "slop-in" : undefined}>
            <div className="font-serif space-y-5 text-[1.125rem] leading-[1.7] text-pretty text-stone-800 sm:text-[1.2rem]">
              {output.map((paragraph, index) => (
                <p key={`${revision}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.75rem] tracking-[0.04em] text-stone-600">
            <span className="tabular-nums">{words} words</span>
            <span className="text-stone-400" aria-hidden="true">
              /
            </span>
            <span>Semantically empty. Operationally ready.</span>
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {status ?? ""}
      </p>
    </section>
  );
}
