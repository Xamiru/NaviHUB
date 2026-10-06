// Mushoku Tensei: Jobless Reincarnation — Rifujin na Magonote's novels and
// their adaptations, one row per release in release order: the light novel
// series and the Redundant Reincarnation after-story (stored as manga rows),
// the main manga and the Roxy spin-off manga, every Studio Bind TV part
// (season one parts 1-2, season two parts 1-2, season three part 1), the
// unaired Eris the Goblin Slayer episode, and the PC role-playing game Quest of
// Memories.
// No chrono column: one continuity told in release order; the spin-offs are
// marked instead.
// Excluded: the Recollections and Special Book companion volumes, the Eris
// Sharpens Her Fangs and 4-koma manga, the anthology volumes, the 2021-2022
// smartphone game (ended service, no PC release), and season three part 2
// (2027).
// Ids from AniList / Steam appdetails, story facts from the Wikipedia series
// article, AniList synopses and character pages, art from AniList, all
// verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const MUSHOKU_TENSEI: FranchiseCfg = {
  id: 'mushoku-tensei',
  name: 'Mushoku Tensei: Jobless Reincarnation',
  short: 'Mushoku Tensei',
  color: '#d98c4a',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/108465-RgsRpTMhP9Sv.jpg',
  studio: 'Rifujin na Magonote / Studio Bind',
  tagline: 'A wasted life, a second chance, and no regrets this time.',
  trivia: [
    {
      title: 'A web novel that refused to stop',
      body: 'Rifujin na Magonote had given up on submitting manuscripts to publishers when Kanekiru Kogitsune\'s Re:Monster led him to the web fiction site Shousetsuka ni Narou. He posted Mushoku Tensei there from November 22, 2012, to April 3, 2015. Criticism nearly made him end it early, but he kept going when it topped the site\'s daily rankings.\n\nMedia Factory published it as 26 light novel volumes between January 2014 and November 2022, illustrated by Shirotaka; the seventh volume is entirely new material. By April 2026 the series had more than 18 million copies in circulation.'
    },
    {
      title: 'Writing Rudeus',
      body: 'Magonote wanted to write about someone who failed at school getting another chance at life, and summed up the message as "everybody can make mistakes". He made Rudeus aware of his own controversial personality and left it to readers to judge him. He named Lucifer and the Biscuit Hammer and Parasyte, both centred on family and relationships, as influences, and said the climax drew on Tappei Nagatsuki\'s Re:Zero.\n\nThe story was not fixed in advance: Lilia was originally meant to die off-screen, with Aisha hiding under another identity, until he rewrote the arc so that she survives.'
    },
    {
      title: 'To the end of a life',
      body: 'The story follows Rudeus all the way to his death at 74, and Magonote considered ending it when Rudeus reached 34, the age at which he died in his first life. The Redundant Reincarnation after-story, first posted as web short stories between 2015 and 2017, covers the years after the final battle.\n\nStudio Bind\'s anime was delayed from 2020 to January 2021. Its first season ran in two parts that year, the second season from July 2023 to July 2024, and the first part of the third season from July to September 2026, with the second part set for 2027.'
    }
  ],
  entries: [
    {
      id: 'mushoku-ln',
      title: 'Mushoku Tensei: Jobless Reincarnation',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '85470' }],
      year: 2014,
      releaseDate: '2014-01-24',
      note: 'The light novels: a 34-year-old shut-in dies saving teenagers and is reborn as Rudeus Greyrat'
    },
    {
      id: 'mushoku-manga',
      title: 'Mushoku Tensei: Jobless Reincarnation (manga)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '85564' }],
      year: 2014,
      releaseDate: '2014-05-02',
      adaptation: true,
      note: 'Yuka Fujikawa\'s adaptation in Monthly Comic Flapper'
    },
    {
      id: 'mushoku-roxy-gets-serious',
      title: 'Mushoku Tensei: Roxy Gets Serious',
      mediaType: 'manga',
      aliases: ['Mushoku Tensei: Roxy datte Honki desu'],
      externalIds: [{ source: 'anilist', id: '104724' }],
      year: 2017,
      releaseDate: '2017-12-21',
      spinOff: true,
      note: 'Roxy, the one member of her tribe without telepathy, leaves home to study magic'
    },
    {
      id: 'mushoku-s1',
      title: 'Mushoku Tensei: Jobless Reincarnation',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '108465' }],
      year: 2021,
      releaseDate: '2021-01-11',
      adaptation: true,
      note: 'Studio Bind\'s first part: Rudeus grows up with Roxy, Sylphiette and Eris until the mana calamity'
    },
    {
      id: 'mushoku-s1-part-2',
      title: 'Mushoku Tensei: Jobless Reincarnation Cour 2',
      mediaType: 'anime',
      aliases: ['Mushoku Tensei: Jobless Reincarnation Part 2'],
      externalIds: [{ source: 'anilist', id: '127720' }],
      year: 2021,
      releaseDate: '2021-10-04',
      adaptation: true,
      note: 'Stranded on the Demon Continent, Rudeus, Eris and Ruijerd form the party Dead End'
    },
    {
      id: 'mushoku-eris-goblin-slayer',
      title: 'Mushoku Tensei: Jobless Reincarnation Cour 2 - Eris the Goblin Slayer',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '141534' }],
      year: 2022,
      releaseDate: '2022-03-16',
      spinOff: true,
      note: 'Unaired episode included on the fourth Blu-ray volume'
    },
    {
      id: 'mushoku-redundant-reincarnation',
      title: 'Mushoku Tensei: Redundant Reincarnation',
      mediaType: 'manga',
      aliases: ['Mushoku Tensei: Dasoku-hen'],
      externalIds: [{ source: 'anilist', id: '165131' }],
      year: 2023,
      releaseDate: '2023-06-23',
      spinOff: true,
      note: 'After-story volumes: Norn\'s wedding, Lucie\'s first day of school and more'
    },
    {
      id: 'mushoku-s2',
      title: 'Mushoku Tensei: Jobless Reincarnation Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '146065' }],
      year: 2023,
      releaseDate: '2023-07-03',
      adaptation: true,
      note: 'Heartbroken after Eris leaves him, Rudeus heads north in search of his mother'
    },
    {
      id: 'mushoku-s2-part-2',
      title: 'Mushoku Tensei: Jobless Reincarnation Season 2 Part 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '166873' }],
      year: 2024,
      releaseDate: '2024-04-08',
      adaptation: true,
      note: 'At the University of Magic, Rudeus reunites with Sylphiette and they marry'
    },
    {
      id: 'mushoku-quest-of-memories',
      title: 'Mushoku Tensei: Jobless Reincarnation Quest of Memories',
      externalIds: [{ source: 'steam', id: '2459420' }],
      year: 2024,
      releaseDate: '2024-06-20',
      spinOff: true,
      note: 'Role-playing game by Lancarse, published by Bushiroad Games'
    },
    {
      id: 'mushoku-s3',
      title: 'Mushoku Tensei: Jobless Reincarnation Season 3',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '178789' }],
      year: 2026,
      releaseDate: '2026-07-04',
      adaptation: true,
      note: 'First part of the third season, aired July to September 2026'
    }
  ],
  characters: [
    {
      id: 'mushoku-rudeus',
      name: 'Rudeus Greyrat',
      role: 'Protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88348-bIe5XnXdRpmX.png',
      appearsIn: [
        'mushoku-ln',
        'mushoku-manga',
        'mushoku-s1',
        'mushoku-s1-part-2',
        'mushoku-redundant-reincarnation',
        'mushoku-s2',
        'mushoku-s2-part-2',
        'mushoku-s3'
      ],
      blurb: 'Reborn with his memories after dying as a 34-year-old NEET, he resolves to live his new life without regrets. He has a rare gift for casting magic without an incantation.'
    },
    {
      id: 'mushoku-roxy',
      name: 'Roxy Migurdia',
      role: 'Rudeus\'s first teacher',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png',
      appearsIn: ['mushoku-ln', 'mushoku-manga', 'mushoku-roxy-gets-serious', 'mushoku-s1'],
      blurb: 'A Migurd mage who left her village because she cannot use her tribe\'s telepathy, and became Rudeus\'s magic tutor. Years later she becomes his second wife.'
    },
    {
      id: 'mushoku-sylphiette',
      name: 'Sylphiette',
      role: 'Childhood friend',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88346-h8kCL93AXj4n.png',
      appearsIn: ['mushoku-ln', 'mushoku-manga', 'mushoku-s1', 'mushoku-s2-part-2'],
      blurb: 'Rudeus\'s childhood friend, part human, elf and beast. They meet again at Ranoa Magic University, where she helps him recover, and soon marry.'
    },
    {
      id: 'mushoku-eris',
      name: 'Eris Boreas Greyrat',
      role: 'Noble student and swordswoman',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88349-5dsNUah3oBj8.png',
      appearsIn: [
        'mushoku-ln',
        'mushoku-manga',
        'mushoku-s1',
        'mushoku-s1-part-2',
        'mushoku-eris-goblin-slayer'
      ],
      blurb: 'A short-tempered noble girl and distant relative whom Rudeus tutors, and who is stranded with him on the Demon Continent. She leaves suddenly after they return home, and later becomes his third wife.'
    },
    {
      id: 'mushoku-ruijerd',
      name: 'Ruijerd Superdia',
      role: 'Superd warrior',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88351-grqY44xz6bvP.png',
      appearsIn: ['mushoku-ln', 'mushoku-manga', 'mushoku-s1', 'mushoku-s1-part-2'],
      blurb: 'The former leader of the Superd\'s warrior group, who once served Laplace. He helps Rudeus and Eris make the long journey home from the Demon Continent.'
    },
    {
      id: 'mushoku-paul',
      name: 'Paul Greyrat',
      role: 'Rudeus\'s father',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b88347-YtQTlChhN50m.png',
      appearsIn: ['mushoku-ln', 'mushoku-manga', 'mushoku-s1'],
      blurb: 'A swordsman who mastered all three sword styles young and a womanizer until Zenith settled him down. Rudeus later joins his search for his missing wife.'
    }
  ]
}
