// Neon Genesis Evangelion — Hideaki Anno/Gainax's 1995 TV series, its two
// alternate theatrical endings, Yoshiyuki Sadamoto's manga, and the 2007-2021
// Rebuild of Evangelion tetralogy. Chrono: the manga shares the TV series'
// slot (1) as a parallel retelling of the same core story, even though it
// finishes with its own, calmer ending; Death & Rebirth and The End of
// Evangelion share slot 2 as the TV story's two attempts at a finale (Rebirth
// is the first reels of what became End of Evangelion). The Rebuild films are
// a separate, self-contained continuity rather than a sequel to the TV
// series, so they get their own later slots (3 for 1.0/2.0, 4 for 3.0, 5 for
// 3.0+1.0, since 3.0+1.0 continues directly from 3.0's cliffhanger). Route
// treats Rebuild as an optional second complete journey alongside the
// TV+End of Evangelion core. Excluded: the 2021 "30th Anniversary Special
// Screening" (a theatrical rescreening event, not a release) and short
// promotional/recap pieces with no AniList entry of their own.
// Ids and years from AniList, art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const EVANGELION: FranchiseCfg = {
  id: 'evangelion',
  name: 'Neon Genesis Evangelion',
  short: 'Evangelion',
  color: '#6b3fa0',
  heroUrl: `${AL}/media/anime/banner/30-gEMoHHIqxDgN.jpg`,
  studio: 'Gainax / Khara',
  tagline: 'Fourteen-year-olds pilot bio-mechanical giants against Angels, and the real battle is never the one with the Angels.',
  trivia: [
    {
      title: 'A mecha show that turns inward',
      body: 'Neon Genesis Evangelion starts as a conventional "giant robot defends Tokyo-3" series, then spends its second half pulling apart its own characters’ depression, dependency and fear of intimacy instead of resolving its science-fiction plot in the usual way. Hideaki Anno has said the production’s own exhaustion and his history with depression fed directly into Shinji Ikari’s arc.\n\nThe show’s TV finale famously abandons external spectacle almost entirely for two clip-heavy episodes of interior monologue, which fans received with enough anger that it helped push Anno toward a theatrical ending.'
    },
    {
      title: 'Two endings for one TV series',
      body: 'Death & Rebirth (1997) is a clip-show recap of the TV series followed by roughly 25 new minutes that become the opening of The End of Evangelion, released four months later. End of Evangelion replaces the TV series’ final two episodes with a new, more violent and more explicit resolution to Instrumentality and the Human Complementation Project — divisive on release, now generally treated as the "true" ending alongside the original broadcast.'
    },
    {
      title: 'The manga and the Rebuild films are different retellings',
      body: 'Character designer Yoshiyuki Sadamoto’s manga began serializing before the TV series finished airing and ran until 2013, following the same broad story at a slower pace with its own, quieter ending that skips the TV and film finales’ imagery entirely.\n\nThe Rebuild of Evangelion tetralogy (2007-2021) restarts the story in a new continuity: 1.0 closely retells the TV series’ opening arc, 2.0 begins to diverge, and 3.0 opens on a fourteen-year time skip that splits the fandom before 3.0+1.0 closes the project out in 2021 as Anno’s final word on the franchise.'
    }
  ],
  entries: [
    {
      id: 'eva-manga',
      title: 'Neon Genesis Evangelion',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30698' }],
      year: 1994,
      releaseDate: '1994-12-26',
      chrono: 1,
      mc: 84,
      adaptation: true,
      note: 'Sadamoto’s manga, serialized 1994-2013: the same core story at a slower pace, ending differently from either anime finale'
    },
    {
      id: 'eva-tv',
      title: 'Neon Genesis Evangelion',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '30' }],
      year: 1995,
      releaseDate: '1995-10-03',
      chrono: 1,
      route: 1,
      mc: 83,
      note: 'Shinji Ikari is drafted to pilot Eva Unit-01 against the Angels, and the back half turns the war inward'
    },
    {
      id: 'eva-death-rebirth',
      title: 'Neon Genesis Evangelion: Death & Rebirth',
      mediaType: 'anime',
      aliases: ['Evangelion: Death and Rebirth'],
      externalIds: [{ source: 'anilist', id: '31' }],
      year: 1997,
      releaseDate: '1997-03-15',
      chrono: 2,
      route: 2,
      optional: true,
      adaptation: true,
      mc: 73,
      note: 'A clip-show recap of the TV series followed by the new footage that opens The End of Evangelion'
    },
    {
      id: 'eva-eoe',
      title: 'Neon Genesis Evangelion: The End of Evangelion',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '32' }],
      year: 1997,
      releaseDate: '1997-07-19',
      chrono: 2,
      route: 3,
      mc: 85,
      note: 'Replaces the TV series’ last two episodes with a new, far more violent ending to Instrumentality'
    },
    {
      id: 'eva-rebuild-1',
      title: 'Evangelion: 1.0 You Are (Not) Alone',
      mediaType: 'anime',
      aliases: ['Evangelion Shin Gekijouban: Jo'],
      externalIds: [{ source: 'anilist', id: '2759' }],
      year: 2007,
      releaseDate: '2007-09-01',
      chrono: 3,
      route: 4,
      optional: true,
      remake: true,
      mc: 78,
      note: 'Opens the Rebuild tetralogy: a compressed, visually overhauled retelling of the TV series’ first third'
    },
    {
      id: 'eva-rebuild-2',
      title: 'Evangelion: 2.0 You Can (Not) Advance',
      mediaType: 'anime',
      aliases: ['Evangelion Shin Gekijouban: Ha'],
      externalIds: [{ source: 'anilist', id: '3784' }],
      year: 2009,
      releaseDate: '2009-06-27',
      chrono: 3,
      route: 5,
      optional: true,
      mc: 81,
      note: 'New pilot Asuka Langley Shikinami arrives as the Rebuild story starts to diverge from the original'
    },
    {
      id: 'eva-rebuild-3',
      title: 'Evangelion: 3.0 You Can (Not) Redo',
      mediaType: 'anime',
      aliases: ['Evangelion Shin Gekijouban: Kyuu'],
      externalIds: [{ source: 'anilist', id: '3785' }],
      year: 2012,
      releaseDate: '2012-11-17',
      chrono: 4,
      route: 6,
      optional: true,
      mc: 76,
      note: 'A fourteen-year time skip leaves Shinji friendless in a wrecked world that blames him for it'
    },
    {
      id: 'eva-rebuild-4',
      title: 'Evangelion: 3.0+1.0 Thrice Upon a Time',
      mediaType: 'anime',
      aliases: ['Shin Evangelion Gekijouban'],
      externalIds: [{ source: 'anilist', id: '3786' }],
      year: 2021,
      releaseDate: '2021-03-08',
      chrono: 5,
      route: 7,
      optional: true,
      mc: 85,
      note: 'Closes the Rebuild tetralogy and, per Anno, the franchise’s story of Shinji growing up'
    }
  ],
  characters: [
    {
      id: 'eva-shinji',
      name: 'Shinji Ikari',
      role: 'Protagonist, Eva Unit-01 pilot',
      portraitUrl: `${AL}/character/large/b89-ZtZhXkh1rITn.png`,
      appearsIn: ['eva-manga', 'eva-tv', 'eva-death-rebirth', 'eva-eoe', 'eva-rebuild-1', 'eva-rebuild-2', 'eva-rebuild-3', 'eva-rebuild-4'],
      blurb: 'Summoned by the father who abandoned him to pilot a giant bio-machine he never asked to touch, and desperate for anyone’s approval along the way.'
    },
    {
      id: 'eva-rei',
      name: 'Rei Ayanami',
      role: 'Eva Unit-00 pilot',
      portraitUrl: `${AL}/character/large/86-cA1zL7fyls8E.jpg`,
      appearsIn: ['eva-manga', 'eva-tv', 'eva-death-rebirth', 'eva-eoe', 'eva-rebuild-1', 'eva-rebuild-2', 'eva-rebuild-3', 'eva-rebuild-4'],
      blurb: 'Quiet and compliant to a point that unsettles everyone around her, and tied to NERV’s deepest secrets more directly than she knows.'
    },
    {
      id: 'eva-asuka',
      name: 'Asuka Langley Souryuu',
      role: 'Eva Unit-02 pilot',
      portraitUrl: `${AL}/character/large/b94-d631a3Z2KPvd.png`,
      appearsIn: ['eva-manga', 'eva-tv', 'eva-death-rebirth', 'eva-eoe'],
      blurb: 'A prodigy pilot whose confidence is a defense built over a childhood that gave her every reason to need one.'
    },
    {
      id: 'eva-misato',
      name: 'Misato Katsuragi',
      role: 'NERV operations director',
      portraitUrl: `${AL}/character/large/b1259-afTQkZ5SVMOn.png`,
      appearsIn: ['eva-manga', 'eva-tv', 'eva-death-rebirth', 'eva-eoe', 'eva-rebuild-1', 'eva-rebuild-2', 'eva-rebuild-3', 'eva-rebuild-4'],
      blurb: 'Commands the Evas in battle and takes Shinji into her apartment, carrying her own unresolved history with the Second Impact.'
    },
    {
      id: 'eva-gendo',
      name: 'Gendo Ikari',
      role: 'NERV commander',
      portraitUrl: `${AL}/character/large/b1257-qByikcrE8KTG.png`,
      appearsIn: ['eva-manga', 'eva-tv', 'eva-death-rebirth', 'eva-eoe', 'eva-rebuild-1', 'eva-rebuild-2', 'eva-rebuild-3', 'eva-rebuild-4'],
      blurb: 'Runs NERV, and his own agenda, from behind steepled fingers and a refusal to explain himself to his son.'
    },
    {
      id: 'eva-kaworu',
      name: 'Kaworu Nagisa',
      role: 'The Fifth Child',
      portraitUrl: `${AL}/character/large/b1261-HYRv3HpsSL92.jpg`,
      appearsIn: ['eva-tv', 'eva-death-rebirth', 'eva-eoe', 'eva-rebuild-3', 'eva-rebuild-4'],
      blurb: 'Arrives late and briefly, offers Shinji the acceptance no one else in the story manages, and is not what he first appears to be.'
    }
  ]
}
