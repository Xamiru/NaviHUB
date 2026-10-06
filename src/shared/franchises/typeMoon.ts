// Type-Moon outside Fate — Fate has its own page (fate.ts), so no Fate rows
// appear here. Rows: the original Tsukihime (Winter Comiket 2000), Kagetsu
// Tohya, the 2003 Lunar Legend Tsukihime anime and manga, Ufotable's eight
// Garden of Sinners (Kara no Kyoukai) films plus Recalled Out Summer and the
// side-story novel it adapts, the Garden of Sinners manga, Carnival Phantasm,
// Witch on the Holy Night (its 2022 remaster is the same row), the 2021
// Tsukihime remake (its own remake row), and the Melty Blood fighting games as
// spin-off rows: Actress Again Current Code stands for the original series
// (the 2002 doujin original, Re-ACT and Act Cadenza fold into it) and
// Type Lumina for the reboot.
// No chrono column: the original Tsukihime, the remake continuity and The
// Garden of Sinners are separate timelines, so one story order would be
// invented.
// Excluded: the main Garden of Sinners light novel (no catalogue entry), the
// 2009 Remix compilation film, the extra chorus short, Tsukihime Plus-Disc,
// the Melty Blood manga, the Tsukihime anthologies, and unreleased titles: the
// Witch on the Holy Night film (2026-11-20), Melty Blood: Twi-Lumina (2027)
// and Tsukihime -The other side of red garden-.
// Ids from VNDB / AniList / Steam appdetails, story facts from the Wikipedia
// Tsukihime, Melty Blood, Garden of Sinners and Witch on the Holy Night
// articles and AniList synopses, art from AniList, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const TYPE_MOON: FranchiseCfg = {
  id: 'type-moon',
  name: 'Type-Moon',
  short: 'Type-Moon',
  color: '#6f8fe0',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/169-Iakt1obzX7Fw.jpg',
  studio: 'Type-Moon',
  tagline: 'Mystic eyes, vampires and magi under the same moon.',
  trivia: [
    {
      title: 'Where the Nasuverse began',
      body: 'The Garden of Sinners came first. Kinoko Nasu and illustrator Takashi Takeuchi released its chapters on their doujin website between October 1998 and August 1999, before they formed Type-Moon. Its heroine, Shiki Ryougi, has the Mystic Eyes of Death Perception, the same power later given to Tsukihime\'s Shiki Tohno, and the novel introduced concepts such as the Root, Magic and Magecraft that run through the later games.\n\nThe first four chapters were bundled with the 2001 Tsukihime Plus-Disc, which made the story popular enough for a doujin print at the end of 2001 and a Kodansha edition in 2004. The two editions together sold more than 700,000 copies.'
    },
    {
      title: 'Ufotable\'s achronological films',
      body: 'Ufotable adapted The Garden of Sinners as seven films released between December 2007 and August 2009, in achronological order: the first film is set in September 1998, the second jumps back to 1995, when Mikiya first meets Shiki. An eighth chapter followed on home video in 2011, and Recalled Out Summer adapted the Mirai Fukuin side story in 2013.\n\nThe same studio is making the Witch on the Holy Night film, scheduled for November 20, 2026.'
    },
    {
      title: 'Twenty years to a remake',
      body: 'Tsukihime was first released at the Winter Comiket in December 2000. A remake was announced in 2008, but work only started in 2012, stopped in 2013 while Type-Moon worked on Fate/Grand Order, and resumed in 2017. The first part, A Piece of Blue Glass Moon, finally arrived in 2021; the second, The Other Side of Red Garden, has so far only appeared in a secret trailer.\n\nThe remake moves the story from the town of Misaki in 1999 to the city of Soya in 2014, making it a direct sequel to the remastered Witch on the Holy Night. Nasu has said Evangelion: 1.0 You Are (Not) Alone inspired the changes: Arcueid\'s route reproduces the old Tsukihime, while Ciel\'s route was written to be new.'
    }
  ],
  entries: [
    {
      id: 'tm-tsukihime',
      title: 'Tsukihime',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '7' }],
      year: 2000,
      note: 'Shiki Tohno, who sees the lines of death, comes home to his family and a vampire hunt'
    },
    {
      id: 'tm-kagetsu-tohya',
      title: 'Kagetsu Tohya',
      mediaType: 'visual_novel',
      aliases: ['Kagetsu Tooya'],
      externalIds: [{ source: 'vndb', id: '47' }],
      year: 2001,
      releaseDate: '2001-08-13',
      note: 'A year later, Shiki relives the same day in a dream until he finds its creator, Len'
    },
    {
      id: 'tm-lunar-legend-manga',
      title: 'Lunar Legend Tsukihime',
      mediaType: 'manga',
      aliases: ['Shingetsutan Tsukihime'],
      externalIds: [{ source: 'anilist', id: '30705' }],
      year: 2003,
      releaseDate: '2003-10-01',
      adaptation: true,
      note: 'Sasaki Shounen\'s ten-volume manga, largely following Arcueid\'s route'
    },
    {
      id: 'tm-lunar-legend-anime',
      title: 'Lunar Legend Tsukihime',
      mediaType: 'anime',
      aliases: ['Shingetsutan Tsukihime'],
      externalIds: [{ source: 'anilist', id: '169' }],
      year: 2003,
      releaseDate: '2003-10-10',
      adaptation: true,
      note: 'J.C.Staff\'s 12-episode adaptation'
    },
    {
      id: 'tm-garden-1',
      title: 'The Garden of Sinners Chapter 1: Overlooking View',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 1: Thanatos. (Overlooking View)',
        'Kara no Kyoukai: Fukan Fuukei'
      ],
      externalIds: [{ source: 'anilist', id: '2593' }],
      year: 2007,
      releaseDate: '2007-12-01',
      note: 'September 1998: schoolgirls keep leaping to their deaths from the Fujou Building'
    },
    {
      id: 'tm-garden-2',
      title: 'The Garden of Sinners Chapter 2: Murder Speculation (Part A)',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 2: …and nothing heart. (Murder Speculation Part A)',
        'Kara no Kyoukai: Satsujin Kousatsu (Zen)'
      ],
      externalIds: [{ source: 'anilist', id: '3782' }],
      year: 2007,
      releaseDate: '2007-12-29',
      note: '1995: Mikiya meets Shiki Ryougi as a series of bizarre murders begins'
    },
    {
      id: 'tm-garden-3',
      title: 'The Garden of Sinners Chapter 3: Remaining Sense of Pain',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 3: ever cry, never life. (Remaining Sense of Pain)',
        'Kara no Kyoukai: Tsuukaku Zanryuu'
      ],
      externalIds: [{ source: 'anilist', id: '3783' }],
      year: 2008,
      releaseDate: '2008-02-09',
      note: 'July 1998: torn-apart bodies turn up across the city'
    },
    {
      id: 'tm-garden-4',
      title: 'The Garden of Sinners Chapter 4: The Hollow Shrine',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 4: garan-no-dou. (The Hollow Shrine)',
        'Kara no Kyoukai: Garan no Dou'
      ],
      externalIds: [{ source: 'anilist', id: '4280' }],
      year: 2008,
      releaseDate: '2008-05-24',
      note: 'June 1998: Shiki wakes from a two-year coma with amnesia and meets Touko Aozaki'
    },
    {
      id: 'tm-garden-mirai-fukuin-novel',
      title: 'The Garden of Sinners: Recalled Out Summer',
      mediaType: 'manga',
      aliases: ['Kara no Kyoukai: Mirai Fukuin'],
      externalIds: [{ source: 'anilist', id: '40429' }],
      year: 2008,
      releaseDate: '2008-08-15',
      spinOff: true,
      note: 'Side-story novel: two psychics who foresee the future cross paths with Mikiya and Shiki'
    },
    {
      id: 'tm-garden-5',
      title: 'The Garden of Sinners Chapter 5: Paradox Paradigm',
      mediaType: 'anime',
      aliases: ['The Garden of Sinners Chapter 5: Paradox Spiral', 'Kara no Kyoukai: Mujun Rasen'],
      externalIds: [{ source: 'anilist', id: '4282' }],
      year: 2008,
      releaseDate: '2008-08-16',
      note: 'November 1998: a runaway who claims to be a murderer hides in Shiki\'s apartment'
    },
    {
      id: 'tm-melty-blood-aacc',
      title: 'Melty Blood Actress Again Current Code',
      aliases: ['Melty Blood Actress Again', 'Melty Blood'],
      externalIds: [{ source: 'steam', id: '411370' }],
      year: 2008,
      releaseDate: '2008-09-19',
      spinOff: true,
      note: 'Fourth Melty Blood game; the 2002 original is set a month after Kagetsu Tohya'
    },
    {
      id: 'tm-garden-6',
      title: 'The Garden of Sinners Chapter 6: Oblivion Recording',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 6: Fairy Tale. (Oblivion Recording)',
        'Kara no Kyoukai: Boukyaku Rokuon'
      ],
      externalIds: [{ source: 'anilist', id: '5204' }],
      year: 2008,
      releaseDate: '2008-12-20',
      note: 'January 1999: Mikiya\'s sister Azaka hunts fairies that steal students\' memories'
    },
    {
      id: 'tm-garden-7',
      title: 'The Garden of Sinners Chapter 7: Murder Speculation (Part B)',
      mediaType: 'anime',
      aliases: [
        'the Garden of sinners Chapter 7: ……not nothing heart. (Murder Speculation Part B)',
        'Kara no Kyoukai: Satsujin Kousatsu (Kou)'
      ],
      externalIds: [{ source: 'anilist', id: '5205' }],
      year: 2009,
      releaseDate: '2009-08-08',
      note: 'February 1999: murders echoing 1995 wake the urge to kill dormant in Shiki'
    },
    {
      id: 'tm-garden-manga',
      title: 'Kara no Kyoukai: The Garden of Sinners',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '53947' }],
      year: 2010,
      releaseDate: '2010-11-01',
      note: 'Tenkuu Sphere\'s adaptation of the novels, supervised by Nasu and Takeuchi'
    },
    {
      id: 'tm-garden-8',
      title: 'The Garden of Sinners Chapter 8: The Final Chapter',
      mediaType: 'anime',
      aliases: ['Kara no Kyoukai: Shuushou'],
      externalIds: [{ source: 'anilist', id: '6954' }],
      year: 2011,
      releaseDate: '2011-02-02',
      note: 'March 1999: Mikiya meets Shiki again where they first met four years earlier'
    },
    {
      id: 'tm-carnival-phantasm',
      title: 'Carnival Phantasm',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '10012' }],
      year: 2011,
      releaseDate: '2011-08-14',
      spinOff: true,
      note: 'Comedy OVA mixing the Tsukihime and Fate casts for Type-Moon\'s tenth anniversary'
    },
    {
      id: 'tm-witch-on-the-holy-night',
      title: 'Witch on the Holy Night',
      mediaType: 'visual_novel',
      aliases: ['Mahoutsukai no Yoru'],
      externalIds: [{ source: 'vndb', id: '777' }],
      year: 2012,
      releaseDate: '2012-04-12',
      note: 'Late-1980s Misaki: Aoko learns sorcery from Alice as Soujuurou moves in; a Tsukihime prequel'
    },
    {
      id: 'tm-garden-recalled-out-summer',
      title: 'The Garden of Sinners: Recalled Out Summer',
      mediaType: 'anime',
      aliases: ['Kara no Kyoukai: Mirai Fukuin'],
      externalIds: [{ source: 'anilist', id: '14807' }],
      year: 2013,
      releaseDate: '2013-09-16',
      adaptation: true,
      note: 'Film of the side story, ending with a day with Shiki\'s daughter Mana ten years on'
    },
    {
      id: 'tm-tsukihime-remake',
      title: 'Tsukihime -A piece of blue glass moon-',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '17909' }],
      year: 2021,
      releaseDate: '2021-08-26',
      remake: true,
      note: 'Remake of the Arcueid and Ciel routes, moved to the city of Soya in 2014'
    },
    {
      id: 'tm-melty-blood-type-lumina',
      title: 'Melty Blood: Type Lumina',
      externalIds: [{ source: 'steam', id: '1372280' }],
      year: 2021,
      releaseDate: '2021-09-30',
      spinOff: true,
      note: 'Fighting-game reboot built around the remake\'s characters'
    }
  ],
  characters: [
    {
      id: 'tm-shiki-tohno',
      name: 'Shiki Tohno',
      role: 'Tsukihime protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2212-pgKYEq8gGCsY.jpg',
      appearsIn: [
        'tm-tsukihime',
        'tm-kagetsu-tohya',
        'tm-lunar-legend-manga',
        'tm-lunar-legend-anime',
        'tm-melty-blood-aacc',
        'tm-tsukihime-remake'
      ],
      blurb: 'An anemic high school student who gained the Mystic Eyes of Death Perception after a childhood injury. Glasses from Aoko Aozaki hide the lines of death that would otherwise overwhelm him.'
    },
    {
      id: 'tm-arcueid',
      name: 'Arcueid Brunestud',
      role: 'Tsukihime heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2213-xqqwnMLn1Nqc.png',
      appearsIn: [
        'tm-tsukihime',
        'tm-lunar-legend-manga',
        'tm-lunar-legend-anime',
        'tm-tsukihime-remake'
      ],
      blurb: 'The title\'s moon princess, a True Ancestor vampire who suppresses her thirst for blood. In the remake Shiki kills her during an anemic attack; she revives furious and makes him help hunt the vampire Vlov.'
    },
    {
      id: 'tm-ciel',
      name: 'Ciel',
      role: 'Tsukihime heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2214-8qHm1qJ4uIS4.png',
      appearsIn: [
        'tm-tsukihime',
        'tm-lunar-legend-anime',
        'tm-tsukihime-remake'
      ],
      blurb: 'A friendly senior at Shiki\'s school who is secretly an Executor of the Church\'s Burial Agency. She was once a host of the reincarnating vampire Roa herself.'
    },
    {
      id: 'tm-aoko',
      name: 'Aoko Aozaki',
      role: 'Witch on the Holy Night protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b11298-QVINnNyLJCN9.png',
      appearsIn: [
        'tm-tsukihime',
        'tm-kagetsu-tohya',
        'tm-melty-blood-aacc',
        'tm-witch-on-the-holy-night',
        'tm-tsukihime-remake'
      ],
      blurb: 'Heir of the family that oversees Misaki and a student council president just starting to learn sorcery. Years later she is the woman who gives young Shiki Tohno his glasses.'
    },
    {
      id: 'tm-alice',
      name: 'Alice Kuonji',
      role: 'Witch on the Holy Night heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b61127-LemVV2jIZFb7.jpg',
      appearsIn: ['tm-witch-on-the-holy-night'],
      blurb: 'A natural-born witch who lives alone in the rumored witch\'s mansion. Emotionally detached, she becomes Aoko\'s partner and teacher.'
    },
    {
      id: 'tm-shiki-ryougi',
      name: 'Shiki Ryougi',
      role: 'The Garden of Sinners protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3105-lI0m8vJ3JQK1.png',
      appearsIn: [
        'tm-garden-1',
        'tm-garden-2',
        'tm-garden-4',
        'tm-garden-mirai-fukuin-novel',
        'tm-garden-5',
        'tm-garden-6',
        'tm-garden-7',
        'tm-garden-manga',
        'tm-garden-8',
        'tm-garden-recalled-out-summer'
      ],
      blurb: 'A girl raised as a demon hunter who woke from a two-year coma with the Mystic Eyes of Death Perception. She works the supernatural cases that come to Touko\'s agency.'
    },
    {
      id: 'tm-mikiya',
      name: 'Mikiya Kokutou',
      role: 'The Garden of Sinners protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5267-aBSt3ADW1fvW.png',
      appearsIn: [
        'tm-garden-1',
        'tm-garden-2',
        'tm-garden-3',
        'tm-garden-mirai-fukuin-novel',
        'tm-garden-7',
        'tm-garden-8',
        'tm-garden-recalled-out-summer'
      ],
      blurb: 'Shiki\'s friend since high school, who dropped out of college while she lay in a coma and went to work for Touko as an investigator. His knack for finding things is what led him to her hidden office.'
    },
    {
      id: 'tm-touko',
      name: 'Touko Aozaki',
      role: 'Magus and puppet maker',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5266-058UnUQ6pufZ.png',
      appearsIn: [
        'tm-garden-1',
        'tm-garden-4',
        'tm-garden-6',
        'tm-witch-on-the-holy-night'
      ],
      blurb: 'A powerful magus posing as a puppet maker, who runs the Garan no Dou agency. In Witch on the Holy Night she is the intruder disrupting Misaki\'s bounded field, having killed her and Aoko\'s grandfather.'
    }
  ]
}
