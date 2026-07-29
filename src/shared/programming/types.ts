// Shapes for the Programming learn section's code-defined content (the
// checklist.ts idiom: pure data importable by main, the renderer and tests).
// Course/lesson/sheet `key` strings are FROZEN vocabulary — prog_progress rows
// store '<courseKey>/<lessonKey>' and quiz_session settings store sheet keys.
// Rename titles freely, never keys.

// One multiple-choice self-check question at the end of a lesson.
export interface ProgQuestion {
  prompt: string
  options: string[] // exactly 4
  correct: number // index into options
  explain?: string // shown after answering
}

// Lesson bodies are Markdown for components/Markdown.tsx, whose parser
// (@shared/markdown.ts) supports: headings 1-3, paragraphs, FLAT lists,
// bold/italic/inline code/links, and ``` fenced code blocks. No tables, no
// blockquotes, no nesting — author within those limits.
export interface ProgLessonDef {
  key: string // FROZEN
  title: string
  body: string
  questions: ProgQuestion[]
}

export interface ProgCourseDef {
  key: string // FROZEN
  title: string
  description: string
  lessons: ProgLessonDef[]
}

// One cheatsheet row. `answers` makes the entry part of the typed practice
// drill: every accepted spelling of the command (flags included, file/target
// arguments left out), answers[0] being the canonical one shown on a miss.
// Entries without `answers` are reference-only.
export interface CheatEntry {
  cmd: string // display form, may include argument placeholders
  desc: string
  example?: string
  answers?: string[]
}

export interface CheatSheet {
  key: string // FROZEN
  title: string
  entries: CheatEntry[]
}
