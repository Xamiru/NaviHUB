import { definePerson } from '../../schema'

export default definePerson({
  id: 'pierre-de-coubertin',
  names: [
    { text: 'Pierre de Coubertin', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1863' },
        cites: [
          { source: 'lemo-chronik-1892', loc: { section: 'Chronik 1892', para: '56' } },
          {
            source: 'ehne-ripa-women-and-olympic-games',
            loc: { section: 'Women and the Olympic Games', para: '5' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1937' },
        cites: [
          { source: 'lemo-chronik-1892', loc: { section: 'Chronik 1892', para: '56' } },
          {
            source: 'ehne-ripa-women-and-olympic-games',
            loc: { section: 'Women and the Olympic Games', para: '5' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:paris',
    cites: [
      {
        source: 'iranica-yarshater-chronology-part-2',
        loc: { section: 'Chronology of Iranian History Part 2, 1896' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['scholar', 'activist'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Der französische Pädagoge Pierre de Coubertin (1863-1937) ruft in Paris auf der Jahrestagung des französischen Leichtathletikverbandes zur Wiederbelebung der Olympischen Spiele der Antike auf.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1892', loc: { section: 'Chronik 1892', para: '56' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1892.html'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Despite the misogynous opposition of its founder, which was widespread throughout Europe, the 1900 Paris Games included 22 women (French, Belgian, Italian, Russian, etc.) out of 997 participants, with each gender competing separately.',
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
  ]
})
