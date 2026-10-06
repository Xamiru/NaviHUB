import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-modern-olympic-games',
  names: [
    { text: '1896 Summer Olympics', lang: 'en', role: 'primary' },
    {
      text: 'erste Olympische Spiele der Neuzeit',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '30' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'sport',
  start: {
    alts: [
      {
        value: { d: '1896-04-06' },
        cites: [
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '29' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:athens',
      cites: [
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '30' } },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1896' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:pierre-de-coubertin',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '23' } },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1896' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: '1896 The first modern Olympic games, revived by Baron Pierre de Coubertin (b. 1863 in Paris), are held in Athens.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'Eröffnung der ersten Olympischen Spiele der Neuzeit in Athen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '30' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1896.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: '1894: the French baron Pierre de Coubertin (1863-1937) refounded the Olympic Games during a congress at the Sorbonne as a hymn to virility, a union of “brawn and brains” of which only men were supposed to be capable.',
          lang: 'en',
          cite: {
            source: 'ehne-ripa-women-and-olympic-games',
            loc: { section: 'Women and the Olympic Games', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gendered-body/women-and-olympic-games'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'The first games were held in 1896 without them, to their great discontent.',
          lang: 'en',
          cite: {
            source: 'ehne-ripa-women-and-olympic-games',
            loc: { section: 'Women and the Olympic Games', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gendered-body/women-and-olympic-games'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1892-11-25' },
            cites: [
              { source: 'lemo-chronik-1892', loc: { section: 'Chronik 1892', para: '55' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Der französische Pädagoge Pierre de Coubertin (1863-1937) ruft in Paris auf der Jahrestagung des französischen Leichtathletikverbandes zur Wiederbelebung der Olympischen Spiele der Antike auf.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1892', loc: { section: 'Chronik 1892', para: '56' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1892.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1894-06-23' },
            cites: [
              { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '22' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Der französische Pädagoge und Historiker Pierre Baron de Coubertin (1863-1937) begründet das Internationale Olympische Komitee (IOC).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '23' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1894.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Athens_1896-Athletics-Pan-Athenian_stadium.jpg/1280px-Athens_1896-Athletics-Pan-Athenian_stadium.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Athens_1896-Athletics-Pan-Athenian_stadium.jpg',
    credit: { institution: 'International Olympic Committee' },
    license: { id: 'public-domain' }
  }
})
