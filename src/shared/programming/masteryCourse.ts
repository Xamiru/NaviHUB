import type { ProgLessonDef, ProgQuestion } from './types'

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
