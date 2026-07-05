import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import { flattenGlossary } from '@shared/dictContent'
import type { DictEntry } from '@shared/types'

// Shared vocab-mining logic between the standalone mine page
// (JapaneseMinePage) and the manga reader's mining panel, so the two capture
// flows can't drift.

export interface MineTarget {
  lessonId: number
  label: string
}

export interface MineTargets {
  inboxLessonId: number
  lessons: MineTarget[]
}

// Ensure the inbox exists, then offer it plus every vocab lesson as a target.
export function useMineTargets() {
  return useQuery({
    queryKey: qk.japanese.mineTargets,
    queryFn: async (): Promise<MineTargets> => {
      const inbox = await api.japanese.ensureMiningInbox()
      const courses = await api.japanese.listCourses()
      const details = await Promise.all(courses.map((c) => api.japanese.getCourse(c.id)))
      const lessons = details
        .filter((d): d is NonNullable<typeof d> => d != null)
        .flatMap((d) =>
          d.lessons
            .filter((l) => l.kind === 'vocab')
            .map((l) => ({ lessonId: l.id, label: `${d.title} · ${l.title}` }))
        )
      return { inboxLessonId: inbox.lessonId, lessons }
    }
  })
}

export interface MiningDraft {
  front: string
  reading: string
  back: string
  pos: string
  notes: string
  exampleJp: string
}

export const EMPTY_DRAFT: MiningDraft = {
  front: '',
  reading: '',
  back: '',
  pos: '',
  notes: '',
  exampleJp: ''
}

// Draft card state + the save loop (create card → invalidate → toast → reset,
// keeping the source and target lesson for rapid multi-word capture).
export function useMiningDraft(opts: { sourceMediaId: number | null; onSaved?: () => void }) {
  const qc = useQueryClient()
  const { data: targets } = useMineTargets()
  const [draft, setDraft] = useState<MiningDraft>(EMPTY_DRAFT)
  const [lessonId, setLessonId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const targetLessonId = lessonId ?? targets?.inboxLessonId ?? null
  const canSave = !!draft.front.trim() && !!draft.back.trim() && targetLessonId != null

  // Fills the draft from a unified dictionary entry (offline or jisho fallback).
  // reading is left blank for a kana-only headword (front already is the kana);
  // back is the flattened first definition; pos is the first def's tags.
  function fillFromEntry(e: DictEntry, exampleJp?: string) {
    const back = e.defs.length ? flattenGlossary(e.defs[0].glossary, 500) : ''
    setDraft((d) => ({
      front: e.expression,
      reading: e.reading, // '' for a kana-only headword
      back,
      pos: e.defs[0]?.tags.join(', ') ?? '',
      notes: '',
      exampleJp: exampleJp ?? d.exampleJp
    }))
  }

  async function save(): Promise<boolean> {
    if (!canSave || saving) return false
    setSaving(true)
    try {
      await api.japanese.createCard(targetLessonId!, {
        front: draft.front.trim(),
        reading: draft.reading.trim() || null,
        back: draft.back.trim(),
        pos: draft.pos.trim() || null,
        notes: draft.notes.trim() || null,
        exampleJp: draft.exampleJp.trim() || null,
        sourceMediaId: opts.sourceMediaId
      })
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`Added 「${draft.front.trim()}」`, 'success')
      setDraft(EMPTY_DRAFT)
      opts.onSaved?.()
      return true
    } finally {
      setSaving(false)
    }
  }

  return {
    targets,
    draft,
    setDraft,
    fillFromEntry,
    targetLessonId,
    setLessonId,
    canSave,
    saving,
    save
  }
}
