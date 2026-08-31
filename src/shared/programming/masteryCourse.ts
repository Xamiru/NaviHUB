import type { ProgLessonDef, ProgQuestion } from './types'

export const masteryCheck = (
  prompt: string,
  options: string[],
  correct: number,
  explain: string
): ProgQuestion => {
  const balanced = [...options]
  const trueQualifiers = [', in this context', ', within this scope', ', for this case']
  const falseQualifiers = [
    ', without verified evidence',
    ', while ignoring the stated scope',
    ', without testing the result'
  ]

  // The course quiz mixes questions together. Prevent the right answer from
  // becoming a visible shortest/longest tell while preserving each statement's
  // truth value: qualify a too-short truth, or extend one already-false choice.
  for (let pass = 0; pass < 6; pass += 1) {
    const answerLength = balanced[correct].length
    const distractors = balanced
      .map((option, index) => ({ option, index }))
      .filter(({ index }) => index !== correct)
    const shortest = Math.min(...distractors.map(({ option }) => option.length))
    const longest = Math.max(...distractors.map(({ option }) => option.length))

    if (answerLength < shortest) {
      balanced[correct] += trueQualifiers[pass % trueQualifiers.length]
      continue
    }
    if (answerLength > longest) {
      const target = distractors.reduce((best, candidate) =>
        candidate.option.length > best.option.length ? candidate : best
      )
      balanced[target.index] += falseQualifiers[pass % falseQualifiers.length]
      continue
    }
    break
  }

  return { prompt, options: balanced, correct, explain }
}

export const masteryLesson = (
  key: string,
  title: string,
  foundations: string,
  engineering: string,
  judgment: string,
  practice: string,
  solution: string,
  questions: ProgQuestion[]
): ProgLessonDef => ({
  key,
  title,
  body: `# ${title}

## Foundations

${foundations}

## Engineering model

${engineering}

## Failure modes and judgment

${judgment}

## Guided practice

${practice}

## Worked solution

${solution}

## Mastery standard

Explain the model without notes, implement the guided design, test normal and failure paths, interpret the resulting evidence, and defend every tradeoff, operating limit, and recovery choice.`,
  questions
})

// Dense mastery courses use four lesson-specific truths as explained checks.
// The shared distractors are deliberately comparable in length so the normal
// programming quiz cannot reveal the answer by option shape.
export const masteryQuestions = (
  topic: string,
  facts: [string, string, string, string]
): ProgQuestion[] => {
  const wrongA =
    'Rely on undocumented defaults and assume tool success proves the complete system property'
  const wrongB =
    'Grant maximum privilege and remove validation so unusual inputs cannot interrupt workflow'
  const wrongC =
    'Optimize one local metric while ignoring users, failure boundaries, recovery, and evidence'
  const wrongD =
    'Replace explicit ownership and tested controls with a manual step remembered by one operator'
  return [
    masteryCheck(
      `Which statement is a sound ${topic} foundation?`,
      [facts[0], wrongA, wrongB, wrongC],
      0,
      facts[0]
    ),
    masteryCheck(
      `Which ${topic} engineering practice is defensible?`,
      [wrongB, facts[1], wrongC, wrongD],
      1,
      facts[1]
    ),
    masteryCheck(
      `Which choice best limits ${topic} failure?`,
      [wrongA, wrongD, facts[2], wrongB],
      2,
      facts[2]
    ),
    masteryCheck(
      `What demonstrates practical ${topic} mastery?`,
      [wrongC, wrongA, wrongD, facts[3]],
      3,
      facts[3]
    )
  ]
}
