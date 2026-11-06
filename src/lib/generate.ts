import {
  ADJECTIVES,
  METRICS,
  NOUNS,
  OBJECT_METRICS,
  PREDICATES,
  VERBS,
  type Verb,
} from "./vocabulary";

export const LIMITS = {
  paragraphs: { min: 1, max: 8 },
  sentencesPerParagraph: { min: 2, max: 8 },
} as const;

export const DEFAULT_PARAGRAPHS = 3;
export const DEFAULT_SENTENCES = 4;
export const INITIAL_SEED = 2252;

const TEMPLATES: readonly string[] = [
  "{Verb} the {adj} {noun} so we can {verb} {metricObject} across the {noun}.",
  "Once we {verb} the {noun}, the {adj} {noun} can {verb} {metricObject}.",
  "Circle back on the {noun} after we {verb} the {adj} {noun}.",
  "The {adj} {noun} is how we {verb} {metricObject} without {gerund} the {noun}.",
  "We are {gerund} {anAdj} {noun} that {third} the {noun}.",
  "Unlock {metricObject} by {gerund} our {adj} {noun} into the {noun}.",
  "Stakeholders asked us to {verb} the {noun} before we {verb} the {adj} {noun}.",
  "This is the {noun}, purpose-built to {verb} {metricObject}.",
  "Net-net, the {adj} {noun} {third} {metricObject} at the intersection of the {noun} and the {noun}.",
  "Let's {verb} {anAdj} {noun} that helps every pod {verb} the {noun}.",
  "Ship the {noun} and let the {adj} {noun} {verb} {metricObject}.",
  "Going forward, we {verb} {metricObject} through {anAdj} {noun} rather than another {noun}.",
  "The north star is simple. {Verb} the {adj} {noun} until {metric} compounds.",
  "Take a step back. Our {adj} {noun} exists to {verb} {metricObject} across the {noun}.",
  "Double-click on the {noun} and you will find {anAdj} {noun} {gerund} {metricObject}.",
  "We do not need another {noun}. We need {anAdj} {noun} that can {verb} {metricObject}.",
  "Pressure-test the {adj} {noun} with the field before we {verb} it into the {noun}.",
  "The {noun} starts behaving like a motion once the {adj} {noun} is {gerund} {metricObject}.",
  "Put a pin in the roadmap and {verb} the {adj} {noun} that actually moves {metricObject}.",
  "Align the {noun} to the {noun}, then {verb} {metricObject} where leadership can see it.",
  "In the room, we aligned on {anAdj} {noun} to {verb} {metricObject} before the board readout.",
  "The ask is modest. {Verb} the {noun}, {verb} the {noun}, and report {metricObject} like it was inevitable.",
  "Our {adj} {noun} sits on top of the {noun} and quietly {third} {metricObject}.",
  "If we {verb} the {adj} {noun} this quarter, {metric} stops being a slide and starts being a motion.",
  "We will {verb} {metricObject} by standing up {anAdj} {noun} across the {noun}.",
  "Think of it as {anNoun} that {third} the {adj} {noun} into {metricObject}.",
  "The {adj} bet is to {verb} {metricObject} with {anNoun} instead of a bigger {noun}.",
  "After we {verb} the narrative, the {noun} should {verb} {metricObject} on its own.",
  "Every pod gets {anAdj} {noun}. Every pod {third} {metricObject}. That is the operating model.",
  "We are not boiling the ocean. We are {gerund} one {adj} {noun} until {metric} moves.",
  "Bring the {noun} to the {noun}, {verb} the {adj} story, and let {metric} do the talking.",
  "{AnAdj} {noun} is the shortest path from the {noun} to {metricObject}.",
  "The {noun} does not replace the team. It {third} the {adj} {noun} so {metric} shows up in the forecast.",
  "Sequence matters. {Verb} the {noun}, then {verb} the {adj} {noun}, then claim {metricObject}.",
  "What good looks like is {anAdj} {noun} {gerund} {metricObject} while leadership stays inside the narrative.",
  "We can {verb} the {noun} this week if we stop {gerund} the {adj} {noun}.",
  "Land the {adj} {noun} with one lighthouse account, then {verb} {metricObject} across the cohort.",
  "The board wants {metricObject}. The field wants {anNoun}. The {adj} {noun} pretends those are the same ask.",
  "Zoom out. The {noun} is the wedge. The {adj} {noun} is the platform. {Metric} is the story we tell afterward.",
  "Pending alignment, we will {verb} the {adj} {noun} and {verb} {metricObject} up through the steerco.",
  "Directionally, the {noun} should feel {predicate} enough that {metric} no longer needs a footnote.",
  "For what it is worth, {gerund} the {noun} is how a serious company {third} {metricObject}.",
  "At the end of the day, the {adj} {noun} either {third} {metricObject} or it is a slide with rounded corners.",
  "To be clear, nobody asked for another {noun}. They asked for {metricObject}, delivered through the {adj} {noun}.",
  "With the right people in the room, we can {verb} the {noun}, {verb} the {noun}, and call the quarter a win on {metric}.",
  "{Verb} the {adj} {noun} before the {noun} hardens into process.",
  "Stepping out of the weeds, the {noun} is simply {anAdj} {noun} pointed at {metricObject}.",
  "Quick pulse check. Is the {noun} actually {gerund} {metricObject}, or are we still narrating the {noun}?",
  "Subject to procurement, the {adj} {noun} can {verb} {metricObject} before renewal.",
  "Big picture: we {verb} one {adj} {noun} and let {metric} explain the rest of the roadmap.",
  "Across the value chain, the {noun} is the wedge and the {adj} {noun} is how {metric} becomes repeatable.",
  "Once the dust settles, we {verb} the {noun} into the {noun} and instrument {metric} like we mean it.",
  "Against that backdrop, {anNoun} without {anNoun} is just {anAdj} {noun} waiting on {metricObject}.",
  "If we are being honest, the {noun} is a rebrand of the {noun} with {anAdj} {noun} taped on for {metricObject}.",
  "Put the {noun} in the appendix. Lead with the {adj} {noun} and the promise of {metricObject}.",
  "We socialized the {noun}. We did not {verb} {metricObject}. Those are different sports.",
  "A good {noun} makes the {adj} {noun} obvious and makes {metric} feel inevitable.",
  "Do not boil the ocean. {Verb} the {noun}, {verb} {metricObject}, and send the readout.",
  "The {adj} {noun} is our system of record for {metric} until the {noun} is ready for a system of action.",
  "Circle back Thursday. By then the {adj} {noun} should be {gerund} {metricObject} without a war room.",
  "Ship the copilot for copilots, then {verb} the {adj} {noun} until {metric} compounds.",
  "Socialize the narrative first. The {adj} {noun} can {verb} {metricObject} after the room has nodded.",
  "Our multiplayer bet is {anAdj} {noun} that {third} {metricObject} while the {noun} stays in the slide.",
];

const TOKEN =
  /\{(AnAdj|anAdj|Gerund|Verb|verb|gerund|third|Adj|adj|anNoun|noun|Metric|metricObject|metric|predicate)\}/g;

export type Rng = () => number;

export type GenerateOptions = {
  paragraphs?: number;
  sentencesPerParagraph?: number;
  seed?: number;
};

type Bag = {
  rng: Rng;
  recentVerbs: Verb[];
  recentNouns: string[];
  recentAdjs: string[];
  recentMetrics: string[];
  recentPredicates: string[];
};

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function mulberry32(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickFresh<T>(rng: Rng, items: readonly T[], recent: T[]): T {
  const blocked = new Set(recent);
  const fresh = items.filter((item) => !blocked.has(item));
  const pool = fresh.length > 0 ? fresh : items;
  const choice = pool[Math.floor(rng() * pool.length)]!;
  recent.push(choice);
  if (recent.length > 14) recent.shift();
  return choice;
}

export function indefinite(phrase: string): "a" | "an" {
  const word = phrase.trim().match(/[A-Za-z0-9]+/)?.[0]?.toLowerCase() ?? "";
  if (/^(use|user|usage|uni|util|eu|one|once)/.test(word)) return "a";
  if (/^(honest|hour|heir|honor|ai)/.test(word)) return "an";
  if (/^[aeiou]/.test(word)) return "an";
  return "a";
}

function withArticle(phrase: string): string {
  return `${indefinite(phrase)} ${phrase}`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createBag(rng: Rng): Bag {
  return {
    rng,
    recentVerbs: [],
    recentNouns: [],
    recentAdjs: [],
    recentMetrics: [],
    recentPredicates: [],
  };
}

function verb(bag: Bag): Verb {
  return pickFresh(bag.rng, VERBS, bag.recentVerbs);
}

function noun(bag: Bag): string {
  return pickFresh(bag.rng, NOUNS, bag.recentNouns);
}

function adjective(bag: Bag): string {
  return pickFresh(bag.rng, ADJECTIVES, bag.recentAdjs);
}

function metric(bag: Bag): string {
  return pickFresh(bag.rng, METRICS, bag.recentMetrics);
}

function metricObject(bag: Bag): string {
  if (bag.rng() < 0.22) {
    return pickFresh(bag.rng, OBJECT_METRICS, bag.recentMetrics);
  }
  return metric(bag);
}

function predicate(bag: Bag): string {
  return pickFresh(bag.rng, PREDICATES, bag.recentPredicates);
}

function slot(name: string, bag: Bag): string {
  switch (name) {
    case "Verb":
      return capitalize(verb(bag).base);
    case "verb":
      return verb(bag).base;
    case "Gerund":
      return capitalize(verb(bag).gerund);
    case "gerund":
      return verb(bag).gerund;
    case "third":
      return verb(bag).third;
    case "Adj":
      return capitalize(adjective(bag));
    case "adj":
      return adjective(bag);
    case "AnAdj": {
      const phrase = withArticle(adjective(bag));
      return capitalize(phrase);
    }
    case "anAdj":
      return withArticle(adjective(bag));
    case "noun":
      return noun(bag);
    case "anNoun":
      return withArticle(noun(bag));
    case "metric":
      return metric(bag);
    case "Metric":
      return capitalize(metric(bag));
    case "metricObject":
      return metricObject(bag);
    case "predicate":
      return predicate(bag);
    default:
      throw new Error(`Unknown token {${name}}`);
  }
}

function fill(template: string, bag: Bag): string {
  TOKEN.lastIndex = 0;
  const filled = template.replace(TOKEN, (_match, name: string) => slot(name, bag));
  if (filled.includes("{")) {
    throw new Error(`Unfilled template: ${filled}`);
  }
  return filled;
}

function sentence(bag: Bag, usedTemplates: Set<number>): string {
  let index = Math.floor(bag.rng() * TEMPLATES.length);
  let guard = 0;
  while (usedTemplates.has(index) && guard < 12) {
    index = Math.floor(bag.rng() * TEMPLATES.length);
    guard += 1;
  }
  usedTemplates.add(index);
  return fill(TEMPLATES[index]!, bag);
}

export function generateSlop(options: GenerateOptions = {}): string[] {
  const paragraphCount = clamp(
    options.paragraphs ?? DEFAULT_PARAGRAPHS,
    LIMITS.paragraphs.min,
    LIMITS.paragraphs.max,
  );
  const sentenceCount = clamp(
    options.sentencesPerParagraph ?? DEFAULT_SENTENCES,
    LIMITS.sentencesPerParagraph.min,
    LIMITS.sentencesPerParagraph.max,
  );
  const rng =
    options.seed === undefined ? Math.random : mulberry32(options.seed);

  const paragraphs: string[] = [];
  for (let i = 0; i < paragraphCount; i += 1) {
    const bag = createBag(rng);
    const usedTemplates = new Set<number>();
    const sentences: string[] = [];
    for (let j = 0; j < sentenceCount; j += 1) {
      sentences.push(sentence(bag, usedTemplates));
    }
    paragraphs.push(sentences.join(" "));
  }
  return paragraphs;
}

export function countWords(paragraphs: readonly string[]): number {
  const text = paragraphs.join(" ").trim();
  if (!text) return 0;
  return text.split(/\s+/).length;
}

export function randomSeed(): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0]!;
  }
  return Math.floor(Math.random() * 0xffffffff);
}
