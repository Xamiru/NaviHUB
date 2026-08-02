import { describe, expect, it } from 'vitest'
import {
  assAlignment,
  assStyleClass,
  buildTrack,
  cueMatches,
  cuesAt,
  decodeSubtitleBytes,
  detectSubFormat,
  dialogueText,
  englishLookupTerm,
  filterDialogue,
  formatTime,
  guessCueLang,
  nextCue,
  normalizeCues,
  parseAss,
  parseAssTime,
  parseSrt,
  parseSrtTime,
  parseSubtitleFileName,
  parseSubtitles,
  parseVtt,
  pickDefaultTracks,
  prevCue,
  splitEnglishWords,
  stripAssOverrides,
  type RawCue,
  type SubCue
} from '../src/shared/subtitles'

const cue = (bits: Partial<RawCue>): RawCue => ({
  start: 0,
  end: 1,
  text: 'x',
  top: false,
  style: null,
  actor: null,
  ...bits
})

describe('timestamps', () => {
  it('reads ASS centiseconds and SRT milliseconds as the same decimal fraction', () => {
    // 0:00:01.50 (ASS, centiseconds) and 00:00:01,500 (SRT, milliseconds) are
    // both 1.5s — which is why one parser serves all three formats.
    expect(parseAssTime('0:00:01.50')).toBe(1.5)
    expect(parseSrtTime('00:00:01,500')).toBe(1.5)
    expect(parseSrtTime('01:02:03,250')).toBe(3723.25)
  })

  it('accepts the MM:SS short form and either separator, and rejects junk', () => {
    expect(parseSrtTime('02:03,500')).toBe(123.5)
    expect(parseSrtTime('00:00:01.500')).toBe(1.5)
    expect(parseSrtTime('')).toBeNull()
    expect(parseSrtTime('not a time')).toBeNull()
    expect(parseSrtTime('1:2:3:4')).toBeNull()
  })

  it('formats for the scrubber', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(123)).toBe('2:03')
    expect(formatTime(3723)).toBe('1:02:03')
    expect(formatTime(123.45, { ms: true })).toBe('2:03.4')
    expect(formatTime(NaN)).toBe('0:00')
  })
})

describe('decodeSubtitleBytes', () => {
  it('decodes Shift-JIS when UTF-8 comes back mojibake', () => {
    // こんにちは in Shift-JIS. 0x82 is an invalid UTF-8 lead byte, so the UTF-8
    // attempt yields replacement chars and the fallback chain takes over.
    const sjis = new Uint8Array([0x82, 0xb1, 0x82, 0xf1, 0x82, 0xc9, 0x82, 0xbf, 0x82, 0xcd])
    expect(decodeSubtitleBytes(sjis)).toBe('こんにちは')
  })

  it('strips a UTF-8 BOM and passes clean UTF-8 through', () => {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf, ...new TextEncoder().encode('お早う')])
    expect(decodeSubtitleBytes(bom)).toBe('お早う')
    expect(decodeSubtitleBytes(new TextEncoder().encode('plain'))).toBe('plain')
  })
})

describe('parseSrt', () => {
  it('parses a canonical file', () => {
    const cues = parseSrt(
      ['1', '00:00:01,000 --> 00:00:03,000', 'Hello there.', '', '2', '00:00:04,000 --> 00:00:05,500', 'Second line.', ''].join('\n')
    )
    expect(cues).toHaveLength(2)
    expect(cues[0]).toMatchObject({ start: 1, end: 3, text: 'Hello there.' })
    expect(cues[1]).toMatchObject({ start: 4, end: 5.5, text: 'Second line.' })
  })

  it('anchors on the --> line, so broken indices and missing blanks survive', () => {
    // Non-numeric index, a duplicated index, and no blank line between blocks:
    // all three are common in the wild and none of them should lose a cue.
    const cues = parseSrt(
      [
        'not-a-number',
        '00:00:01,000 --> 00:00:02,000',
        'First.',
        '7',
        '00:00:03,000 --> 00:00:04,000',
        'Second.'
      ].join('\n')
    )
    expect(cues.map((c) => c.text)).toEqual(['First.', 'Second.'])
  })

  it('handles CRLF, a BOM and a trailing block with no final newline', () => {
    const cues = parseSrt('﻿1\r\n00:00:01,000 --> 00:00:02,000\r\nLast one.')
    expect(cues).toHaveLength(1)
    expect(cues[0].text).toBe('Last one.')
  })

  it('strips inline markup, decodes entities and joins multi-line bodies', () => {
    const cues = parseSrt(
      ['1', '00:00:01,000 --> 00:00:02,000', '<i>Wait</i> &mdash; <font color="#fff">stop</font>!', "It&#39;s fine &amp; safe."].join('\n')
    )
    expect(cues[0].text).toBe("Wait &mdash; stop!\nIt's fine & safe.")
  })

  it('ignores the trailing coordinate block after the end time', () => {
    const cues = parseSrt(['1', '00:00:01,000 --> 00:00:02,000 X1:0 X2:640 Y1:0 Y2:480', 'Positioned.'].join('\n'))
    expect(cues[0]).toMatchObject({ start: 1, end: 2, text: 'Positioned.' })
  })

  it('honours {\\an8} carried over from an ASS conversion', () => {
    const cues = parseSrt(['1', '00:00:01,000 --> 00:00:02,000', '{\\an8}Sign text'].join('\n'))
    expect(cues[0]).toMatchObject({ top: true, text: 'Sign text' })
  })
})

describe('parseVtt', () => {
  it('skips the header, NOTE/STYLE/REGION blocks and cue identifiers', () => {
    const cues = parseVtt(
      [
        'WEBVTT - Some Title',
        'Kind: captions',
        '',
        'NOTE this is a comment',
        'and it continues here',
        '',
        'STYLE',
        '::cue { color: pink }',
        '',
        'intro-cue',
        '00:00:01.000 --> 00:00:02.000',
        'Real text.'
      ].join('\n')
    )
    expect(cues).toHaveLength(1)
    expect(cues[0].text).toBe('Real text.')
  })

  it('reads line: settings as top placement', () => {
    const cues = parseVtt(
      [
        'WEBVTT',
        '',
        '00:00:01.000 --> 00:00:02.000 line:0 align:center',
        'Up top.',
        '',
        '00:00:03.000 --> 00:00:04.000 line:90%',
        'Down low.'
      ].join('\n')
    )
    expect(cues[0].top).toBe(true)
    expect(cues[1].top).toBe(false)
  })

  it('pulls the speaker out of <v> and strips karaoke timestamps', () => {
    const cues = parseVtt(
      ['WEBVTT', '', '00:00:01.000 --> 00:00:02.000', '<v Narrator>Once <00:00:01.500><c.loud>upon</c> a time'].join('\n')
    )
    expect(cues[0].actor).toBe('Narrator')
    expect(cues[0].text).toBe('Once upon a time')
  })
})

describe('stripAssOverrides', () => {
  it('removes override blocks and resolves the escapes that carry meaning', () => {
    expect(stripAssOverrides('{\\an8\\fs40\\c&HFFFFFF&}Hello{\\b1} world')).toBe('Hello world')
    expect(stripAssOverrides('First line\\NSecond line')).toBe('First line\nSecond line')
    expect(stripAssOverrides('spaced\\hout')).toBe('spaced out')
    expect(stripAssOverrides('{\\k30}ka{\\k25}ra{\\k40}o{\\k20}ke')).toBe('karaoke')
  })

  it('keeps escaped braces as literal text and tolerates an unmatched brace', () => {
    expect(stripAssOverrides('a \\{literal\\} brace')).toBe('a {literal} brace')
    expect(stripAssOverrides('unmatched { brace')).toBe('unmatched { brace')
  })

  it('drops vector drawing runs but keeps text after \\p0', () => {
    // Everything between \p1 and \p0 is coordinates, not dialogue — left in, a
    // typeset sign contributes "m 0 0 l 100 0" to the comprehension corpus.
    expect(stripAssOverrides('{\\p1}m 0 0 l 100 0 100 100{\\p0}caption')).toBe('caption')
    expect(stripAssOverrides('{\\p1}m 0 0 l 50 50 0 100')).toBe('')
  })
})

describe('assAlignment / assStyleClass', () => {
  it('reads \\anN directly and maps legacy SSA \\aN through', () => {
    expect(assAlignment('{\\an8}x')).toBe(8)
    expect(assAlignment('{\\an2}x')).toBe(2)
    expect(assAlignment('{\\a6}x')).toBe(8) // legacy top-center
    expect(assAlignment('{\\a2}x')).toBe(2)
    expect(assAlignment('plain text')).toBeNull()
  })

  it('classifies the style names fansub releases actually ship', () => {
    expect(assStyleClass('Default')).toBe('dialogue')
    expect(assStyleClass('Main')).toBe('dialogue')
    expect(assStyleClass('Signs')).toBe('sign')
    expect(assStyleClass('Sign - Newspaper')).toBe('sign')
    expect(assStyleClass('OP Romaji')).toBe('song')
    expect(assStyleClass('ED-Kanji')).toBe('song')
    expect(assStyleClass(null, 'Banner;30;0;0')).toBe('sign')
  })
})

describe('parseAss', () => {
  const header = ['[Script Info]', 'ScriptType: v4.00+', '', '[Events]']

  it('parses dialogue and keeps commas inside the Text field', () => {
    const cues = parseAss(
      [
        ...header,
        'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
        'Dialogue: 0,0:00:01.00,0:00:03.00,Default,Rin,0,0,0,,Yes, I know, but still.'
      ].join('\n')
    )
    expect(cues).toHaveLength(1)
    expect(cues[0]).toMatchObject({
      start: 1,
      end: 3,
      text: 'Yes, I know, but still.',
      style: 'Default',
      actor: 'Rin'
    })
  })

  it('follows a REORDERED Format line rather than assuming the canonical order', () => {
    // The single most common ASS parsing bug: hardcoding the ten canonical
    // fields. Here Style and Name are swapped and MarginV comes early.
    const cues = parseAss(
      [
        ...header,
        'Format: Layer, Start, End, Name, Style, MarginV, MarginL, MarginR, Effect, Text',
        'Dialogue: 0,0:00:05.00,0:00:07.00,Akagi,Signs,20,0,0,,Closed today'
      ].join('\n')
    )
    expect(cues[0]).toMatchObject({ start: 5, end: 7, style: 'Signs', actor: 'Akagi', text: 'Closed today' })
  })

  it('skips Comment: lines and section-info lines', () => {
    const cues = parseAss(
      [
        ...header,
        'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
        'Comment: 0,0:00:01.00,0:00:02.00,Default,,0,0,0,,TL note: not shown',
        '; a stray semicolon comment',
        'Dialogue: 0,0:00:03.00,0:00:04.00,Default,,0,0,0,,Shown'
      ].join('\n')
    )
    expect(cues.map((c) => c.text)).toEqual(['Shown'])
  })

  it('drops a drawing-only line and flags {\\an8} as top', () => {
    const cues = parseSubtitles(
      [
        ...header,
        'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
        'Dialogue: 0,0:00:01.00,0:00:02.00,Signs,,0,0,0,,{\\p1}m 0 0 l 10 0 10 10{\\p0}',
        'Dialogue: 0,0:00:03.00,0:00:04.00,Signs,,0,0,0,,{\\an8}Tokyo Station'
      ].join('\n'),
      'ass'
    )
    // The drawing-only cue is normalized away; only the real sign survives.
    expect(cues).toHaveLength(1)
    expect(cues[0]).toMatchObject({ text: 'Tokyo Station', top: true, style: 'Signs' })
  })

  it('parses legacy SSA v4 with its Marked field', () => {
    const cues = parseAss(
      [
        '[Script Info]',
        'ScriptType: v4.00',
        '',
        '[Events]',
        'Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
        'Dialogue: Marked=0,0:00:02.00,0:00:04.00,Default,,0000,0000,0000,,Old school'
      ].join('\n')
    )
    expect(cues[0]).toMatchObject({ start: 2, end: 4, text: 'Old school' })
  })

  it('handles a Format line that is not the canonical length', () => {
    const cues = parseAss(
      [...header, 'Format: Start, End, Style, Text', 'Dialogue: 0:00:01.00,0:00:02.00,Default,Short, with a comma'].join('\n')
    )
    expect(cues[0]).toMatchObject({ start: 1, end: 2, style: 'Default', text: 'Short, with a comma' })
  })
})

describe('detectSubFormat', () => {
  it('prefers the extension and sniffs content otherwise', () => {
    expect(detectSubFormat('ep01.ja.ass')).toBe('ass')
    expect(detectSubFormat('ep01.SSA')).toBe('ass')
    expect(detectSubFormat('ep01.vtt')).toBe('vtt')
    expect(detectSubFormat('ep01.srt')).toBe('srt')
    expect(detectSubFormat('WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nhi')).toBe('vtt')
    expect(detectSubFormat('[Script Info]\nScriptType: v4.00+')).toBe('ass')
    expect(detectSubFormat('1\n00:00:01,000 --> 00:00:02,000\nhi')).toBe('srt')
  })
})

describe('normalizeCues', () => {
  it('sorts, assigns sequential ids and clamps a non-positive duration', () => {
    const out = normalizeCues([
      cue({ start: 5, end: 6, text: 'b' }),
      cue({ start: 1, end: 1, text: 'a' })
    ])
    expect(out.map((c) => c.text)).toEqual(['a', 'b'])
    expect(out.map((c) => c.id)).toEqual([0, 1])
    expect(out[0].end).toBeCloseTo(1.05)
  })

  it('drops empty cues and cues with unusable timings', () => {
    const out = normalizeCues([
      cue({ text: '   ' }),
      cue({ start: NaN, text: 'nan' }),
      cue({ start: -2, text: 'negative' }),
      cue({ start: 1, end: 2, text: 'kept' })
    ])
    expect(out.map((c) => c.text)).toEqual(['kept'])
  })

  it('merges an exact duplicate but joins a two-line dialogue pair', () => {
    const out = normalizeCues([
      cue({ start: 1, end: 2, text: 'same', style: 'Default' }),
      cue({ start: 1, end: 2, text: 'same', style: 'Alt' }),
      cue({ start: 3, end: 4, text: '— Where?' }),
      cue({ start: 3, end: 4, text: '— Over there.' })
    ])
    expect(out.map((c) => c.text)).toEqual(['same', '— Where?\n— Over there.'])
  })

  it('snaps a sub-frame overlap but preserves a real one', () => {
    const out = normalizeCues([
      cue({ start: 0, end: 2.03, text: 'flicker' }),
      cue({ start: 2, end: 4, text: 'next' }),
      cue({ start: 5, end: 12, text: 'long speech' }),
      cue({ start: 6, end: 7, text: 'interjection' })
    ])
    expect(out[0].end).toBe(2) // snapped: a 30ms overlap is a rendering artefact
    expect(out[2].end).toBe(12) // preserved: two speakers genuinely overlap
    expect(out[3].start).toBe(6)
  })
})

describe('cuesAt', () => {
  const track = buildTrack(
    normalizeCues([
      cue({ start: 0, end: 2, text: 'a' }),
      cue({ start: 1, end: 10, text: 'long' }),
      cue({ start: 3, end: 4, text: 'b' })
    ])
  )

  it('finds cues that started long before t and are still open', () => {
    // The whole reason for the maxEnd prefix: 'long' starts before 'b' but is
    // still on screen when 'b' plays, so a plain binary search would miss it.
    expect(cuesAt(track, 3.5).map((c) => c.text)).toEqual(['long', 'b'])
    expect(cuesAt(track, 0.5).map((c) => c.text)).toEqual(['a'])
    expect(cuesAt(track, 1.5).map((c) => c.text)).toEqual(['a', 'long'])
    expect(cuesAt(track, 20)).toEqual([])
  })

  it('matches a naive scan over a randomized overlapping track', () => {
    // Deterministic LCG — Math.random would make a failure unreproducible.
    let seed = 1337
    const rand = (): number => {
      seed = (seed * 1103515245 + 12345) % 2147483648
      return seed / 2147483648
    }
    const raw: RawCue[] = []
    for (let i = 0; i < 400; i += 1) {
      const start = rand() * 600
      raw.push(cue({ start, end: start + rand() * 25, text: `c${i}` }))
    }
    const big = buildTrack(normalizeCues(raw))
    const naive = (t: number): SubCue[] => big.cues.filter((c) => c.start <= t && t < c.end)
    for (let i = 0; i < 2000; i += 1) {
      const t = rand() * 650
      expect(cuesAt(big, t).map((c) => c.id)).toEqual(naive(t).map((c) => c.id))
    }
  })
})

describe('nextCue / prevCue', () => {
  const track = buildTrack(
    normalizeCues([
      cue({ start: 10, end: 12, text: 'one' }),
      cue({ start: 20, end: 22, text: 'two' }),
      cue({ start: 30, end: 32, text: 'three' })
    ])
  )

  it('steps forward from gaps, boundaries and the end', () => {
    expect(nextCue(track, 0)?.text).toBe('one')
    expect(nextCue(track, 11)?.text).toBe('two') // mid-cue → the following one
    expect(nextCue(track, 15)?.text).toBe('two')
    expect(nextCue(track, 31)).toBeNull()
  })

  it('replays the current line once you are into it, and steps back at its start', () => {
    expect(prevCue(track, 21)?.text).toBe('two') // 1s in → replay
    expect(prevCue(track, 20.1)?.text).toBe('one') // barely started → step back
    expect(prevCue(track, 25)?.text).toBe('two') // in the gap after → replay it
    expect(prevCue(track, 0)).toBeNull()
  })
})

describe('track helpers', () => {
  const cues = normalizeCues([
    cue({ start: 1, end: 2, text: 'ほんとうに？', style: 'Default' }),
    cue({ start: 3, end: 4, text: '東京駅', style: 'Signs' }),
    cue({ start: 5, end: 6, text: 'ほんとうに？', style: 'Default' }),
    cue({ start: 7, end: 8, text: 'また明日', style: 'Default' })
  ])

  it('filters signs out of the clickable/corpus view', () => {
    expect(filterDialogue(cues).map((c) => c.text)).toEqual(['ほんとうに？', 'ほんとうに？', 'また明日'])
  })

  it('drops consecutive repeats when feeding the comprehension corpus', () => {
    // A held line re-cued every few seconds would otherwise inflate its own
    // frequency in the word counts.
    expect(dialogueText(cues)).toEqual(['ほんとうに？', 'また明日'])
    expect(dialogueText(normalizeCues([cue({ text: 'x' }), cue({ start: 2, end: 3, text: 'x' })]))).toEqual(['x'])
  })

  it('searches case-insensitively and treats a blank query as everything', () => {
    expect(cueMatches(cues[0], 'ほんとう')).toBe(true)
    expect(cueMatches(cues[3], 'ほんとう')).toBe(false)
    expect(cueMatches(cues[0], '  ')).toBe(true)
  })

  it('guesses cue language', () => {
    expect(guessCueLang('また明日')).toBe('ja')
    expect(guessCueLang('カタカナ')).toBe('ja')
    expect(guessCueLang('See you tomorrow')).toBe('en')
    expect(guessCueLang('!?!?')).toBe('other')
  })
})

describe('parseSubtitleFileName', () => {
  it('reads language and flags out of real-world sidecar names', () => {
    expect(parseSubtitleFileName('S01E03.ja.ass')).toMatchObject({ lang: 'ja', forced: false, signs: false })
    expect(parseSubtitleFileName('S01E03.jpn.forced.srt')).toMatchObject({ lang: 'ja', forced: true })
    expect(parseSubtitleFileName('[Group] Show - 03 [1080p].en.sdh.ass')).toMatchObject({ lang: 'en', sdh: true })
    expect(parseSubtitleFileName('3_Signs & Songs.ass')).toMatchObject({ signs: true })
    expect(parseSubtitleFileName('Show.03.srt')).toMatchObject({ lang: 'other', forced: false })
  })
})

describe('pickDefaultTracks', () => {
  const t = (lang: 'ja' | 'en' | 'other', extra?: { signs?: boolean; forced?: boolean }) => ({
    lang,
    ...extra
  })

  it('prefers a dialogue track in the wanted language over a signs track', () => {
    const signs = t('ja', { signs: true })
    const dialogue = t('ja')
    const english = t('en')
    const picked = pickDefaultTracks([signs, dialogue, english], { primary: 'ja', secondary: 'en' })
    expect(picked.primary).toBe(dialogue)
    expect(picked.secondary).toBe(english)
  })

  it('never puts the same track in both slots and degrades to null', () => {
    const only = t('ja')
    const picked = pickDefaultTracks([only], { primary: 'ja', secondary: 'en' })
    expect(picked.primary).toBe(only)
    expect(picked.secondary).toBeNull()
    expect(pickDefaultTracks([], { primary: 'ja', secondary: 'en' })).toEqual({
      primary: null,
      secondary: null
    })
  })
})

describe('splitEnglishWords', () => {
  it('segments words from punctuation without losing any characters', () => {
    const parts = splitEnglishWords("Don't stop — it's well-known!")
    expect(parts.filter((p) => p.word).map((p) => p.text)).toEqual([
      "Don't",
      'stop',
      "it's",
      'well-known'
    ])
    expect(parts.map((p) => p.text).join('')).toBe("Don't stop — it's well-known!")
  })

  it('normalizes the lookup term', () => {
    expect(englishLookupTerm("Cat's")).toBe('cat')
    expect(englishLookupTerm('Well-Known')).toBe('well-known')
    expect(englishLookupTerm("'quoted'")).toBe('quoted')
  })
})
