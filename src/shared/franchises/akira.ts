// Akira — Katsuhiro Otomo's manga (AniList manga) and his 1988 film, which
// AniList files as an anime movie (the user's library holds it under that
// type too, so it is one anime row here, not a TMDB movie row).
// Chrono is not used: the film compresses the manga's story into a different
// ending and a different year, so the two are separate tellings rather than
// slots on one timeline.
// Excluded: other AniList manga records that merely share the title, art books
// and the soundtrack releases.
// Ids, dates and scores from AniList, art from AniList; story facts from
// Wikipedia, all checked 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const AKIRA: FranchiseCfg = {
  id: 'akira',
  name: 'Akira',
  short: 'Akira',
  color: '#d7263d',
  heroUrl: `${AL}/media/manga/banner/30664-B3RVMh7TnXEB.jpg`,
  studio: 'Katsuhiro Otomo',
  tagline: 'A biker gang in Neo-Tokyo, a boy given too much power, and a government that already made that mistake once.',
  trivia: [
    {
      title: 'The film came out before the manga ended',
      body: 'Otomo serialized the manga in Kodansha\'s Young Magazine from December 1982 and collected it in six large volumes. He directed the 1988 film himself while the story was still running, so the film compresses roughly the first half into a single ending of its own; the manga carries on for years afterward and finishes somewhere quite different.'
    },
    {
      title: 'Voices first, pictures second',
      body: 'Most anime is animated first and voiced afterward. Akira was recorded the other way round, with the dialogue laid down before the animation so the drawn mouths could follow the speech. The score by the collective Geinoh Yamashirogumi, built on Balinese gamelan and Japanese noh, became as famous as the picture.'
    },
    {
      title: 'A city rebuilt on a blast crater',
      body: 'Both versions open with an explosion that destroys Tokyo and lead into a rebuilt Neo-Tokyo; the film places its story in 2019, after a third world war. It became one of the works that introduced anime to audiences outside Japan.'
    }
  ],
  entries: [
    {
      id: 'akira-manga',
      title: 'Akira',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30664' }],
      year: 1982,
      releaseDate: '1982-12-20',
      mc: 84,
      note: 'Otomo\'s manga, 1982-1990 in six volumes: Kaneda and Tetsuo in a Neo-Tokyo of gangs, soldiers and psychics'
    },
    {
      id: 'akira-film',
      title: 'Akira',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '47' }],
      year: 1988,
      releaseDate: '1988-07-16',
      mc: 79,
      adaptation: true,
      note: 'Otomo\'s own film of the first half of the story, with its own ending'
    }
  ],
  characters: [
    {
      id: 'akira-kaneda',
      name: 'Shotaro Kaneda',
      role: 'Biker gang leader',
      portraitUrl: `${AL}/character/large/b2588-OfACKXYm2lkV.png`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'The leader of a Neo-Tokyo biker gang, drawn into the secret of his childhood friend Tetsuo.'
    },
    {
      id: 'akira-tetsuo',
      name: 'Tetsuo Shima',
      role: 'Psychic',
      portraitUrl: `${AL}/character/large/b2589-HR4oPhkLGq6q.png`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'Kaneda\'s friend, whose awakening psychic power makes him an object of the military and a danger to the city.'
    },
    {
      id: 'akira-kei',
      name: 'Kei',
      role: 'Resistance activist',
      portraitUrl: `${AL}/character/large/b9875-8eHWcOTvtTQB.png`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'A strong-willed young woman Kaneda meets on his search for Tetsuo, loyal to an anti-government resistance group.'
    },
    {
      id: 'akira-shikishima',
      name: 'Colonel Shikishima',
      role: 'Army officer',
      portraitUrl: `${AL}/character/large/b16288-fCbFrPrvtlvC.jpg`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'A senior military officer who oversees research into psychic abilities and seeks to capture Tetsuo to exploit his powers.'
    },
    {
      id: 'akira-kaori',
      name: 'Kaori',
      role: 'Resistance member',
      portraitUrl: `${AL}/character/large/b16289-1PsWTr11jxQg.png`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'A timid young girl who becomes Tetsuo\'s companion and, in the manga, Akira\'s babysitter.'
    },
    {
      id: 'akira-yamagata',
      name: 'Yamagata',
      role: 'Gang member',
      portraitUrl: `${AL}/character/large/b20463-wa6RVPshbPZC.png`,
      appearsIn: ['akira-manga', 'akira-film'],
      blurb: 'One of the most prominent members of Kaneda\'s gang, whose habit of deriding Tetsuo breeds harsh feelings between them.'
    }
  ]
}
