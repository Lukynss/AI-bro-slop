import assert from "node:assert/strict";
import { test } from "node:test";
import { countWords, generateSlop } from "./generate";

const ARTICLE_ERRORS = [
  /\ba (?!use|user|usage|uni|util|eu|one|once)[aeiou]/i,
  /\ban (?!hour\b|honest\b|heir\b|honor\b)[bcdfghjklmnpqrstvwxyz]/i,
  /\s{2,}/,
  /\bundefined\b/,
  /\bNaN\b/,
  /\{[A-Za-z]+\}/,
  /lorem ipsum/i,
  /\bdolor sit\b/i,
];

test("same seed returns the same paragraphs", () => {
  const first = generateSlop({ paragraphs: 3, sentencesPerParagraph: 4, seed: 1 });
  const second = generateSlop({ paragraphs: 3, sentencesPerParagraph: 4, seed: 1 });
  assert.deepEqual(first, second);
});

test("different seeds diverge", () => {
  const first = generateSlop({ paragraphs: 2, sentencesPerParagraph: 4, seed: 1 }).join(" ");
  const second = generateSlop({ paragraphs: 2, sentencesPerParagraph: 4, seed: 2 }).join(" ");
  assert.notEqual(first, second);
});

test("clamps counts into the supported range", () => {
  const paragraphs = generateSlop({
    paragraphs: 0,
    sentencesPerParagraph: 100,
    seed: 3,
  });
  assert.equal(paragraphs.length, 1);
  const sentences = paragraphs[0]?.split(/(?<=[.?!])\s+/) ?? [];
  assert.ok(sentences.length >= 8);
});

test("paragraphs stay grammatical across a wide sample", () => {
  for (let seed = 1; seed <= 80; seed += 1) {
    const paragraphs = generateSlop({
      paragraphs: 8,
      sentencesPerParagraph: 8,
      seed,
    });
    assert.equal(paragraphs.length, 8);
    for (const paragraph of paragraphs) {
      for (const pattern of ARTICLE_ERRORS) {
        assert.equal(
          pattern.test(paragraph),
          false,
          `${pattern} matched: ${paragraph}`,
        );
      }
      const sentences = paragraph.split(/(?<=[.?!])\s+/);
      assert.ok(sentences.length >= 8, paragraph);
      for (const sentence of sentences) {
        assert.match(sentence, /^[A-Z0-9]/, sentence);
        assert.match(sentence, /[.?!]$/, sentence);
      }
    }
    assert.ok(countWords(paragraphs) > 40);
  }
});
