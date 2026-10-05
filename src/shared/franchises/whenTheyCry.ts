// When They Cry — 07th Expansion's Higurashi and Umineko sound novels, their
// anime and the Square Enix manga and Kodansha novel adaptations. Formerly the
// "When They Cry" cross-media guide: its franchise and entry ids
// (when-they-cry, wtc-*) are kept. Core rows: the four original arc sets
// (Higurashi, Kai, Umineko, Chiru) plus the Gou / Sotsu anime sequel.
// Adaptations are optional; Rei and Ciconia are optional side novels. Later
// omnibus editions (Hou, the console arcs) are excluded, as are gag
// spin-offs (Kira, Ura Higu, the 4-koma) and the manga-original arcs.
// Umineko novelisations use plain titles and match by AniList id only, because
// AniList gives them the same romaji titles as the manga.
// Story order: Higurashi 1983, its epilogues, Gou/Sotsu, Umineko 1986, Ciconia.
// Ids and years from VNDB/AniList, art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const WHEN_THEY_CRY: FranchiseCfg = {
  id: 'when-they-cry',
  name: 'When They Cry',
  short: 'When They Cry',
  color: '#b83a4b',
  heroUrl: `${AL}/media/anime/banner/1889-cZ3RMG35FZSG.jpg`,
  studio: '07th Expansion (Ryukishi07)',
  tagline: 'A village that repeats June 1983, and an island where a witch keeps score.',
  trivia: [
    {
      title: 'Question arcs and answer arcs',
      body: 'Ryukishi07 released Higurashi as eight doujin chapters at Comiket between 2002 and 2006. The first four, the question arcs, show the same June 1983 in Hinamizawa ending in different murders, and readers were invited to solve them; the answer arcs then reveal what really happened and how the cycle can be broken.\n\nUmineko (2007-2010) repeats the structure on Rokkenjima in 1986, and turns the mystery itself into a duel: Battler insists every death has a human culprit, while the witch Beatrice insists it was magic.'
    },
    {
      title: 'How to approach it',
      body: 'Read Higurashi before Umineko; Umineko assumes you know how Higurashi works and references it. The original novels (or the Steam releases, which have the same text) are the core. The 2006/2007 anime covers Higurashi well; the 2009 Umineko anime adapts only episodes 1-4 and is widely considered rushed. The Square Enix manga adapt every arc of both series faithfully and are a full alternative to reading the novels.'
    },
    {
      title: 'Gou is not a remake',
      body: 'Higurashi Gou (2020) was marketed as a new adaptation of the original story. Its arcs soon diverged from the originals, and the second half revealed it as a sequel: a new loop that begins after Matsuribayashi, aimed at viewers who already know the answers. Sotsu (2021) answers Gou the way Kai answered the original.'
    }
  ],
  entries: [
    {
      id: 'wtc-higu-question',
      title: 'Higurashi no Naku Koro ni',
      mediaType: 'visual_novel',
      aliases: ['Higurashi When They Cry', 'ひぐらしのなく頃に'],
      externalIds: [{ source: 'vndb', id: '67' }],
      year: 2002,
      releaseDate: '2002-08-10',
      chrono: 1,
      route: 1,
      note: 'June 1983, Hinamizawa: Keiichi’s new friends hide something about the Watanagashi festival (question arcs 1–4)'
    },
    {
      id: 'wtc-higu-answer',
      title: 'Higurashi no Naku Koro ni Kai',
      mediaType: 'visual_novel',
      aliases: ['Higurashi When They Cry Kai', 'ひぐらしのなく頃に解'],
      externalIds: [{ source: 'vndb', id: '68' }],
      year: 2004,
      releaseDate: '2004-12-30',
      chrono: 2,
      route: 2,
      note: 'The answer arcs 5–8: the same June seen from the culprits’ side, then the fight to break the loop'
    },
    {
      id: 'wtc-higu-m-onikakushi',
      title: 'Higurashi When They Cry: Abducted by Demons Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni: Onikakushi-hen'],
      externalIds: [{ source: 'anilist', id: '31257' }],
      year: 2005,
      releaseDate: '2005-03-24',
      chrono: 1,
      adaptation: true,
      optional: true,
      note: 'Manga of question arc 1'
    },
    {
      id: 'wtc-higu-m-watanagashi',
      title: 'Higurashi When They Cry: Cotton Drifting Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni: Watanagashi-hen'],
      externalIds: [{ source: 'anilist', id: '31258' }],
      year: 2005,
      releaseDate: '2005-04-26',
      chrono: 1,
      adaptation: true,
      optional: true,
      note: 'Manga of question arc 2'
    },
    {
      id: 'wtc-higu-m-tatarigoroshi',
      title: 'Higurashi When They Cry: Curse Killing Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni: Tatarigoroshi-hen'],
      externalIds: [{ source: 'anilist', id: '31260' }],
      year: 2005,
      releaseDate: '2005-05-18',
      chrono: 1,
      adaptation: true,
      optional: true,
      note: 'Manga of question arc 3'
    },
    {
      id: 'wtc-higu-anime',
      title: 'Higurashi no Naku Koro ni',
      mediaType: 'anime',
      aliases: ['Higurashi: When They Cry', 'When They Cry'],
      externalIds: [{ source: 'anilist', id: '934' }],
      year: 2006,
      releaseDate: '2006-04-05',
      chrono: 1,
      route: 4,
      adaptation: true,
      optional: true,
      note: 'Studio Deen’s first season: the question arcs plus the first two answer arcs'
    },
    {
      id: 'wtc-higu-m-tsumihoroboshi',
      title: 'Higurashi When They Cry: Atonement Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni Kai: Tsumihoroboshi-hen'],
      externalIds: [{ source: 'anilist', id: '31263' }],
      year: 2006,
      releaseDate: '2006-06-22',
      chrono: 2,
      adaptation: true,
      optional: true,
      note: 'Manga of answer arc 6'
    },
    {
      id: 'wtc-higu-m-meakashi',
      title: 'Higurashi When They Cry: Eye Opening Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni Kai: Meakashi-hen'],
      externalIds: [{ source: 'anilist', id: '31262' }],
      year: 2006,
      releaseDate: '2006-06-26',
      chrono: 2,
      adaptation: true,
      optional: true,
      note: 'Manga of answer arc 5'
    },
    {
      id: 'wtc-higu-m-himatsubushi',
      title: 'Higurashi When They Cry: Time Killing Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni: Himatsubushi-hen'],
      externalIds: [{ source: 'anilist', id: '31261' }],
      year: 2006,
      releaseDate: '2006-09-22',
      chrono: 1,
      adaptation: true,
      optional: true,
      note: 'Manga of question arc 4'
    },
    {
      id: 'wtc-higu-rei',
      title: 'Higurashi no Naku Koro ni Rei',
      mediaType: 'visual_novel',
      aliases: ['Higurashi When They Cry Rei', 'ひぐらしのなく頃に礼'],
      externalIds: [{ source: 'vndb', id: '69' }],
      year: 2006,
      releaseDate: '2006-12-31',
      chrono: 3,
      route: 3,
      spinOff: true,
      optional: true,
      note: 'Fan disc whose Saikoroshi-hen strands Rika in a world without the tragedy'
    },
    {
      id: 'wtc-kai-anime',
      title: 'Higurashi no Naku Koro ni Kai',
      mediaType: 'anime',
      aliases: ['Higurashi: When They Cry Kai', 'When They Cry Kai'],
      externalIds: [{ source: 'anilist', id: '1889' }],
      year: 2007,
      releaseDate: '2007-07-06',
      chrono: 2,
      route: 5,
      adaptation: true,
      optional: true,
      note: 'Second season: the remaining answer arcs to the end of Matsuribayashi'
    },
    {
      id: 'wtc-umi-question',
      title: 'Umineko no Naku Koro ni',
      mediaType: 'visual_novel',
      aliases: ['Umineko When They Cry - Question Arcs', 'Umineko When They Cry', 'うみねこのなく頃に'],
      externalIds: [{ source: 'vndb', id: '24' }],
      year: 2007,
      releaseDate: '2007-08-17',
      chrono: 6,
      route: 6,
      note: 'October 1986, Rokkenjima: eighteen people, a typhoon and a witch who claims the murders (episodes 1–4)'
    },
    {
      id: 'wtc-umi-m1',
      title: 'Umineko When They Cry Episode 1: Legend of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Episode 1: Legend of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '33749' }],
      year: 2007,
      releaseDate: '2007-12-22',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 1'
    },
    {
      id: 'wtc-higu-m-minagoroshi',
      title: 'Higurashi When They Cry: Massacre Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni Kai: Minagoroshi-hen'],
      externalIds: [{ source: 'anilist', id: '39548' }],
      year: 2008,
      releaseDate: '2008-06-18',
      chrono: 2,
      adaptation: true,
      optional: true,
      note: 'Manga of answer arc 7'
    },
    {
      id: 'wtc-higu-m-matsuribayashi',
      title: 'Higurashi When They Cry: Festival Accompanying Arc',
      mediaType: 'manga',
      aliases: ['Higurashi no Naku Koro ni Kai: Matsuribayashi-hen'],
      externalIds: [{ source: 'anilist', id: '39738' }],
      year: 2008,
      releaseDate: '2008-06-22',
      chrono: 2,
      adaptation: true,
      optional: true,
      note: 'Manga of answer arc 8'
    },
    {
      id: 'wtc-higu-rei-anime',
      title: 'Higurashi no Naku Koro ni Rei',
      mediaType: 'anime',
      aliases: ['Higurashi: When They Cry Rei', 'When They Cry Rei'],
      externalIds: [{ source: 'anilist', id: '3652' }],
      year: 2009,
      releaseDate: '2009-02-15',
      chrono: 3,
      adaptation: true,
      optional: true,
      note: 'OVA adapting Saikoroshi-hen and two comedy chapters'
    },
    {
      id: 'wtc-umi-n1',
      title: 'Umineko Episode 1 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '102540' }],
      year: 2009,
      releaseDate: '2009-07-01',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Ryukishi07’s own novelisation of episode 1'
    },
    {
      id: 'wtc-umi-anime',
      title: 'Umineko no Naku Koro ni',
      mediaType: 'anime',
      aliases: ['Umineko: When They Cry'],
      externalIds: [{ source: 'anilist', id: '4896' }],
      year: 2009,
      releaseDate: '2009-07-02',
      chrono: 6,
      route: 7,
      adaptation: true,
      optional: true,
      note: 'Studio Deen’s anime of episodes 1–4 only; it does not continue into Chiru'
    },
    {
      id: 'wtc-umi-m2',
      title: 'Umineko When They Cry Episode 2: Turn of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Episode 2: Turn of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '39547' }],
      year: 2009,
      releaseDate: '2009-07-22',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 2'
    },
    {
      id: 'wtc-umi-answer',
      title: 'Umineko no Naku Koro ni Chiru',
      mediaType: 'visual_novel',
      aliases: ['Umineko When They Cry - Answer Arcs', 'うみねこのなく頃に散'],
      externalIds: [{ source: 'vndb', id: '2153' }],
      year: 2009,
      releaseDate: '2009-08-15',
      chrono: 7,
      route: 8,
      note: 'Episodes 5–8: a detective, the game board’s rules and the truth of 1986'
    },
    {
      id: 'wtc-umi-m3',
      title: 'Umineko When They Cry Episode 3: Banquet of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Episode 3: Banquet of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '46081' }],
      year: 2009,
      releaseDate: '2009-09-19',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 3'
    },
    {
      id: 'wtc-umi-m4',
      title: 'Umineko When They Cry Episode 4: Alliance of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Episode 4: Alliance of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '46144' }],
      year: 2009,
      releaseDate: '2009-10-01',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 4'
    },
    {
      id: 'wtc-umi-n2',
      title: 'Umineko Episode 2 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146744' }],
      year: 2009,
      releaseDate: '2009-11-05',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 2'
    },
    {
      id: 'wtc-umi-n3',
      title: 'Umineko Episode 3 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146745' }],
      year: 2010,
      releaseDate: '2010-03-02',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 3'
    },
    {
      id: 'wtc-umi-n4',
      title: 'Umineko Episode 4 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146746' }],
      year: 2010,
      releaseDate: '2010-07-02',
      chrono: 6,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 4'
    },
    {
      id: 'wtc-umi-m5',
      title: 'Umineko When They Cry Episode 5: End of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Chiru Episode 5: End of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '51498' }],
      year: 2010,
      releaseDate: '2010-10-22',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 5'
    },
    {
      id: 'wtc-umi-m6',
      title: 'Umineko When They Cry Episode 6: Dawn of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Chiru Episode 6: Dawn of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '51499' }],
      year: 2010,
      releaseDate: '2010-11-18',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 6'
    },
    {
      id: 'wtc-umi-m7',
      title: 'Umineko When They Cry Episode 7: Requiem of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Chiru Episode 7: Requiem of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '53900' }],
      year: 2011,
      releaseDate: '2011-04-12',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 7'
    },
    {
      id: 'wtc-umi-m8',
      title: 'Umineko When They Cry Episode 8: Twilight of the Golden Witch',
      mediaType: 'manga',
      aliases: ['Umineko no Naku Koro ni Chiru Episode 8: Twilight of the Golden Witch'],
      externalIds: [{ source: 'anilist', id: '64053' }],
      year: 2012,
      releaseDate: '2012-01-21',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Manga of episode 8'
    },
    {
      id: 'wtc-umi-n5',
      title: 'Umineko Episode 5 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '92936' }],
      year: 2012,
      releaseDate: '2012-07-13',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 5'
    },
    {
      id: 'wtc-umi-n6',
      title: 'Umineko Episode 6 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146748' }],
      year: 2014,
      releaseDate: '2014-03-04',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 6'
    },
    {
      id: 'wtc-umi-n7',
      title: 'Umineko Episode 7 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146747' }],
      year: 2015,
      releaseDate: '2015-06-03',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 7'
    },
    {
      id: 'wtc-umi-n8',
      title: 'Umineko Episode 8 (novel)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '146749' }],
      year: 2018,
      releaseDate: '2018-09-30',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Novelisation of episode 8'
    },
    {
      id: 'wtc-ciconia',
      title: 'Ciconia no Naku Koro ni',
      mediaType: 'visual_novel',
      aliases: ['Ciconia When They Cry', 'キコニアのなく頃に'],
      externalIds: [{ source: 'vndb', id: '24770' }],
      year: 2019,
      releaseDate: '2019-10-04',
      chrono: 8,
      spinOff: true,
      optional: true,
      note: 'Phase 1 of a new When They Cry story: child soldiers in a near-future world war'
    },
    {
      id: 'wtc-gou',
      title: 'Higurashi no Naku Koro ni Gou',
      mediaType: 'anime',
      aliases: ['Higurashi: When They Cry - GOU'],
      externalIds: [{ source: 'anilist', id: '114446' }],
      year: 2020,
      releaseDate: '2020-10-01',
      chrono: 4,
      route: 9,
      note: 'Presented as a remake, revealed as a sequel: a new loop after Matsuribayashi'
    },
    {
      id: 'wtc-sotsu',
      title: 'Higurashi no Naku Koro ni Sotsu',
      mediaType: 'anime',
      aliases: ['Higurashi: When They Cry - SOTSU'],
      externalIds: [{ source: 'anilist', id: '131149' }],
      year: 2021,
      releaseDate: '2021-07-01',
      chrono: 5,
      route: 10,
      note: 'Answers Gou: the same arcs from the other side, and the end of the loop'
    }
  ],
  characters: [
    {
      id: 'wtc-keiichi',
      name: 'Keiichi Maebara',
      role: 'Protagonist (Higurashi)',
      portraitUrl: `${AL}/character/large/b1851-stMK6YF2jvhS.png`,
      appearsIn: ['wtc-higu-question', 'wtc-higu-answer', 'wtc-higu-anime', 'wtc-kai-anime', 'wtc-gou', 'wtc-sotsu'],
      blurb: 'The new boy in Hinamizawa, adopted into the club’s games within a week and then, arc after arc, into its paranoia.'
    },
    {
      id: 'wtc-rena',
      name: 'Rena Ryuugu',
      role: 'Club member (Higurashi)',
      portraitUrl: `${AL}/character/large/b1427-28AR4oy0y2Hw.png`,
      appearsIn: ['wtc-higu-question', 'wtc-higu-answer', 'wtc-higu-anime', 'wtc-kai-anime', 'wtc-gou', 'wtc-sotsu'],
      blurb: 'Cheerful, obsessed with cute things, and the most frightening person in Hinamizawa when she stops smiling.'
    },
    {
      id: 'wtc-mion',
      name: 'Mion Sonozaki',
      role: 'Club president (Higurashi)',
      portraitUrl: `${AL}/character/large/b1611-z9SVkC9loi4y.png`,
      appearsIn: ['wtc-higu-question', 'wtc-higu-answer', 'wtc-higu-anime', 'wtc-kai-anime', 'wtc-gou', 'wtc-sotsu'],
      blurb: 'Heir to the family that rules the village, and its twin secret is the hinge of the first answer arc.'
    },
    {
      id: 'wtc-rika',
      name: 'Rika Furude',
      role: 'Shrine maiden (Higurashi)',
      portraitUrl: `${AL}/character/large/b1534-CtOvaSPOMZne.png`,
      appearsIn: ['wtc-higu-question', 'wtc-higu-answer', 'wtc-higu-anime', 'wtc-kai-anime', 'wtc-higu-rei', 'wtc-higu-rei-anime', 'wtc-gou', 'wtc-sotsu'],
      blurb: 'The child priestess of Furude Shrine, who has lived June 1983 more times than she can count and remembers every one.'
    },
    {
      id: 'wtc-satoko',
      name: 'Satoko Houjou',
      role: 'Club member (Higurashi)',
      portraitUrl: `${AL}/character/large/b1612-lL5sulSea1fZ.png`,
      appearsIn: ['wtc-higu-question', 'wtc-higu-answer', 'wtc-higu-anime', 'wtc-kai-anime', 'wtc-gou', 'wtc-sotsu'],
      blurb: 'The club’s trap-setter and Rika’s best friend. Gou and Sotsu are, in the end, her story.'
    },
    {
      id: 'wtc-battler',
      name: 'Battler Ushiromiya',
      role: 'Protagonist (Umineko)',
      portraitUrl: `${AL}/character/large/n14040-o1st9jZsCZcN.jpg`,
      appearsIn: ['wtc-umi-question', 'wtc-umi-answer', 'wtc-umi-anime'],
      blurb: 'Back on Rokkenjima after six years away, he refuses to accept a witch and argues every murder back to a human hand.'
    },
    {
      id: 'wtc-beatrice',
      name: 'Beatrice',
      role: 'The Golden Witch (Umineko)',
      portraitUrl: `${AL}/character/large/b10285-oyIek2zBT5Vm.jpg`,
      appearsIn: ['wtc-umi-question', 'wtc-umi-answer', 'wtc-umi-anime'],
      blurb: 'The witch whose portrait hangs in the Ushiromiya mansion, and who sets out to prove her own existence one massacre at a time.'
    },
    {
      id: 'wtc-ange',
      name: 'Ange Ushiromiya',
      role: 'Battler’s sister (Umineko)',
      portraitUrl: `${AL}/character/large/n19407-EKt1ldJOjSOK.jpg`,
      appearsIn: ['wtc-umi-answer'],
      blurb: 'The one relative who missed the 1986 family conference, still searching twelve years later for what happened on the island.'
    }
  ]
}
