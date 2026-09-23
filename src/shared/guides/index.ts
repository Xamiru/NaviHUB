import type { MediaItem, MediaType } from '../types'
import { matchLibrary } from '../franchises/match'
export interface GuideEntry {
  id: string
  title: string
  mediaType: MediaType
  aliases?: string[]
  year: number
  relation: 'original' | 'sequel' | 'adaptation' | 'remake' | 'alternate' | 'side-story'
  optional?: boolean
  note: string
  source: string
}
export interface MediaGuide {
  id: string
  title: string
  description: string
  entries: GuideEntry[]
}
const sci = 'https://www.kagaku-adv.com/titles/'
const hig = 'https://07th-expansion.net/hig_gensaku'
// Frozen guide and entry keys. Suggested order is editorial; years describe the
// original work, never a later translated Steam release. These are compact introductions.
export const MEDIA_GUIDES: MediaGuide[] = [
  {
    id: 'science-adventure',
    title: 'Science Adventure',
    description:
      'Four core visual novels, with three optional anime adaptations alongside their sources. This introductory route follows the core novels’ release sequence; it does not cover the whole series. Adaptations are optional detours in the suggested order.',
    entries: [
      {
        id: 'sa-noah',
        title: 'Chaos;Head Noah',
        aliases: ['CHAOS;HEAD NOAH', 'カオスヘッド ノア'],
        mediaType: 'visual_novel',
        year: 2009,
        relation: 'remake',
        note: 'The expanded version of Chaos;Head opens this route. Its setting and concepts provide useful context for Chaos;Child.',
        source: `${sci}chaoshead_noah/`
      },
      {
        id: 'sa-sg-vn',
        title: 'Steins;Gate',
        aliases: ['シュタインズ・ゲート'],
        mediaType: 'visual_novel',
        year: 2009,
        relation: 'original',
        note: 'Continue with the visual novel’s branching time-travel story.',
        source: `${sci}steinsgate/`
      },
      {
        id: 'sa-sg-anime',
        title: 'Steins;Gate',
        mediaType: 'anime',
        year: 2011,
        relation: 'adaptation',
        optional: true,
        note: 'An optional screen adaptation after the novel, or a separate way to revisit the story.',
        source: `${sci}steinsgate/`
      },
      {
        id: 'sa-rn-vn',
        title: 'Robotics;Notes',
        aliases: ['ROBOTICS;NOTES ELITE', 'ロボティクス・ノーツ'],
        mediaType: 'visual_novel',
        year: 2012,
        relation: 'original',
        note: 'The next core novel shifts to a school robotics club. Elite is an edition of this story, accepted here for library matching.',
        source: `${sci}roboticsnotes/`
      },
      {
        id: 'sa-rn-anime',
        title: 'Robotics;Notes',
        mediaType: 'anime',
        year: 2012,
        relation: 'adaptation',
        optional: true,
        note: 'Optional anime adaptation of the robotics-club story.',
        source: `${sci}roboticsnotes/`
      },
      {
        id: 'sa-cc-vn',
        title: 'Chaos;Child',
        aliases: ['ChäoS;Child', 'カオスチャイルド'],
        mediaType: 'visual_novel',
        year: 2014,
        relation: 'sequel',
        note: 'Return to the Chaos branch after Noah. This is a new cast and case rather than a replacement edition.',
        source: `${sci}chaoschild/`
      },
      {
        id: 'sa-cc-anime',
        title: 'Chaos;Child',
        aliases: ['ChäoS;Child'],
        mediaType: 'anime',
        year: 2017,
        relation: 'adaptation',
        optional: true,
        note: 'Optional adaptation after the novel; it is a separate library entry.',
        source: `${sci}chaoschild/`
      }
    ]
  },
  {
    id: 'when-they-cry',
    title: 'When They Cry',
    description:
      'The original Higurashi and Umineko question/answer novel arcs, plus three optional anime entries. Later Higurashi omnibus editions, console additions, Gou/Sotsu, manga and side stories are outside this guide. The years identify the first original arc releases.',
    entries: [
      {
        id: 'wtc-higu-question',
        title: 'Higurashi no Naku Koro ni',
        aliases: ['Higurashi When They Cry', 'ひぐらしのなく頃に'],
        mediaType: 'visual_novel',
        year: 2002,
        relation: 'original',
        note: 'Begin with the four question arcs (chapters 1–4), before Kai. Individual chapter releases are not automatically treated as the complete set.',
        source: hig
      },
      {
        id: 'wtc-higu-answer',
        title: 'Higurashi no Naku Koro ni Kai',
        aliases: ['Higurashi When They Cry Kai', 'ひぐらしのなく頃に解'],
        mediaType: 'visual_novel',
        year: 2004,
        relation: 'sequel',
        note: 'The four answer arcs (chapters 5–8) form the second half of the original Higurashi story.',
        source: hig
      },
      {
        id: 'wtc-higu-anime',
        title: 'Higurashi no Naku Koro ni',
        aliases: ['Higurashi: When They Cry'],
        mediaType: 'anime',
        year: 2006,
        relation: 'adaptation',
        optional: true,
        note: 'The first TV adaptation. Its arc distribution differs from the novel volumes; follow it with the Kai season.',
        source: 'https://anilist.co/anime/934'
      },
      {
        id: 'wtc-kai-anime',
        title: 'Higurashi no Naku Koro ni Kai',
        mediaType: 'anime',
        year: 2007,
        relation: 'sequel',
        optional: true,
        note: 'The sequel TV season continues the first anime. Do not confuse it with the Kai visual novel.',
        source: 'https://anilist.co/anime/1889'
      },
      {
        id: 'wtc-umi-question',
        title: 'Umineko no Naku Koro ni',
        aliases: [
          'Umineko When They Cry - Question Arcs',
          'Umineko When They Cry',
          'うみねこのなく頃に'
        ],
        mediaType: 'visual_novel',
        year: 2007,
        relation: 'original',
        note: 'Start Umineko with episodes 1–4. Placing it after Higurashi is this guide’s editorial route through the two series.',
        source: 'https://store.steampowered.com/app/406550/'
      },
      {
        id: 'wtc-umi-answer',
        title: 'Umineko no Naku Koro ni Chiru',
        aliases: ['Umineko When They Cry - Answer Arcs', 'うみねこのなく頃に散'],
        mediaType: 'visual_novel',
        year: 2009,
        relation: 'sequel',
        note: 'Episodes 5–8 follow the question arcs and complete the main novel story.',
        source: 'https://store.steampowered.com/app/639490/'
      },
      {
        id: 'wtc-umi-anime',
        title: 'Umineko no Naku Koro ni',
        aliases: ['Umineko: When They Cry'],
        mediaType: 'anime',
        year: 2009,
        relation: 'adaptation',
        optional: true,
        note: 'This optional anime covers question-arc material only. It does not complete the novel’s eight-episode story.',
        source: 'https://anilist.co/anime/4896'
      }
    ]
  }
]
export function matchGuide(entries: GuideEntry[], items: MediaItem[]): Map<string, MediaItem> {
  const result = new Map<string, MediaItem>()
  // Reuse exact normalized franchise matching, independently per media type.
  for (const type of new Set(entries.map((e) => e.mediaType))) {
    for (const [key, value] of matchLibrary(
      entries.filter((e) => e.mediaType === type).map((e) => ({ ...e, bgUrl: '' })),
      items.filter((m) => m.mediaType === type)
    ))
      result.set(key, value)
  }
  return result
}
