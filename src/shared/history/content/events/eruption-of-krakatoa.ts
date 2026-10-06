import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'eruption-of-krakatoa',
  names: [
    { text: 'Eruption of Krakatoa', lang: 'en', role: 'primary' },
    { text: 'Krakatau', lang: 'id', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1883-08-26' },
        cites: [
          { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } },
          { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '35' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1883-08-28' },
        cites: [
          { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:krakatoa',
      cites: [
        { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 36000, qualifier: 'over' },
            cites: [
              { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '5' } }
            ]
          },
          {
            value: { min: 36000 },
            cites: [
              { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '36' } }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'KRAKATOA (Krakatao, Krakatau), a small volcanic island in Sunda Strait, between the islands of Java and Sumatra, celebrated for its eruption in 1883, one of the most stupendous ever recorded.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        },
        {
          id: 'q2',
          text: 'Nach einer Vulkanexplosion versinkt die nördliche Hälfte der zwischen den indonesischen Inseln Sumatra und Java liegenden Insel Krakatau.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '36' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1883.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1883 the manifestations of subterranean commotion became more decided, for in May Krakatoa broke out in eruption.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        },
        {
          id: 'q4',
          text: 'But on the 26th of August a succession of paroxysmal explosions began which lasted till the morning of the 28th. The four most violent took place on the morning of the 27th.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        },
        {
          id: 'q5',
          text: 'The actual sounds of the volcanic explosions were heard over a vast area, especially towards the west.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'All vessels lying in harbour or near the shore were stranded, the towns, villages and settlements close to the sea were either at once, or by successive inundations, entirely destroyed, and more than 36,000 human beings perished.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        },
        {
          id: 'q7',
          text: 'Der Einsturz des 822 m hohen Inselvulkans verursacht eine Flutwelle, die auf den umliegenden Inseln rund 300 Dörfer zerstört und 36.000 Menschen das Leben kostet.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '36' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1883.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The finer particles coming into the higher layers of the atmosphere were diffused over a large part of the surface of the earth, and showed their presence by the brilliant sunset glows to which they gave rise.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        },
        {
          id: 'q9',
          text: 'Another remarkable result of this eruption was the world-wide disturbance of the atmosphere.',
          lang: 'en',
          cite: { source: 'britannica-1911-krakatoa', loc: { section: 'KRAKATOA', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Krakatoa'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Krakatoa_eruption_lithograph.jpg/1280px-Krakatoa_eruption_lithograph.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Krakatoa_eruption_lithograph.jpg',
    credit: { creator: 'Parker & Coward' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'royal-society-krakatoa-report-1888',
      mediaKind: 'document',
      title: 'The eruption of Krakatoa, and subsequent phenomena',
      date: { d: '1888' },
      url: 'https://archive.org/download/eruptionkrakato00whipgoog/eruptionkrakato00whipgoog.pdf',
      page: 'https://archive.org/details/eruptionkrakato00whipgoog',
      credit: {
        institution: 'Harvard University (Internet Archive)',
        creator: 'Royal Society (Great Britain). Krakatoa Committee'
      },
      license: { id: 'public-domain' },
      bytes: 28609228
    }
  ]
})
