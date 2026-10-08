import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'greco-turkish-war-1897',
  names: [
    { text: 'Greco-Turkish War of 1897', lang: 'en', role: 'primary' },
    {
      text: 'türkisch-griechischer Krieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1897-04-07' },
        cites: [
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } },
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '-1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1897-12-04' },
        cites: [
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '52' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottoman Empire',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '11' }
        }
      ]
    },
    {
      key: 'greece',
      name: 'Greece',
      polity: 'polity:kingdom-of-greece',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:hamidian-massacres', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'The neglect of the Porte to carry out all the stipulations of the Cretan arrangement of 1896 led to a renewal of the disturbances, […] and Greece began to take steps for the invasion of the island; in February 1897 Colonel Vassos sailed from the Piraeus with an armed force, intending to proclaim the annexation of Crete to Greece, and Greek troops were massed on the Thessalian frontier.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1449' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Outside support for a rebellion on Crete also caused the Porte to declare war on Greece in 1897.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q3',
          text: 'Although the Ottoman army defeated the Greeks decisively in Thrace, the European powers forced a compromise peace that kept Crete under Ottoman suzerainty while installing the son of the Greek king as its governor.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Under the terms of the treaty of peace, signed on 20th September, and arranged by the European powers, Turkey obtained an indemnity of £T4,000,000, and a rectification of the Thessalian frontier, carrying with it some strategic advantage.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-greco-turkish-war-1897',
            loc: { section: 'GRECO-TURKISH WAR, 1897', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Greco-Turkish_War,_1897'
          }
        },
        {
          id: 'q10',
          text: 'But Europe was determined that the Cretan question should be definitely settled, at least for a period of some years, and, after an outbreak at Candia, in which the lives of British troops were sacrificed, the four powers (Germany and Austria having withdrawn from the concert) who had taken over the island en dépôt handed it over in October 1898 to Prince George of Greece as high commissioner (see Crete: History).',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1449' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
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
            value: { d: '1897-04-07' },
            cites: [
              { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Diplomacy busied itself with fruitless attempts to avert hostilities; on the 17th of April 1897 war was declared by Turkey.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1449' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897-12-04' },
            cites: [
              { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '52' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Nach der griechischen Niederlage im Krieg gegen das Osmanische Reich unterzeichnen beide Parteien in Konstantinopel einen Friedensvertrag, der den im April begonnenen türkisch-griechischen Krieg beendet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Greek_retreat_from_Domokos_-_Crown_Prince_Constantine_and_entourage.jpg/1280px-Greek_retreat_from_Domokos_-_Crown_Prince_Constantine_and_entourage.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Greek_retreat_from_Domokos_-_Crown_Prince_Constantine_and_entourage.jpg',
    credit: { institution: 'The Graphic (5 June 1897)', creator: 'Henry Marriott Paget' },
    license: { id: 'public-domain' }
  }
})
