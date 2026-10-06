import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-turkish-war-1877-1878',
  names: [
    { text: 'Russo-Turkish War of 1877–1878', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1877-04-24' },
        cites: [
          { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '22' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1878-03-03' },
        cites: [
          { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '16' } }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:edirne',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    },
    {
      ref: 'place:san-stefano',
      cites: [
        { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '17' } }
      ]
    },
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'loc-bulgaria-country-study-1992',
          loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russia',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'the Ottoman Empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '60' } }
      ]
    },
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '62' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:congress-of-berlin',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '7' }
        }
      ]
    },
    { ref: 'event:ottoman-constitution-of-1876', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The April Uprising of 1876 was more widespread, but it also suffered from poor coordination.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        },
        {
          id: 'q2',
          text: 'Massacres at Batak and other towns further outraged international opinion by showing the insincerity of recent Turkish reform proposals. The deaths of an estimated 30,000 Bulgarians in these massacres spurred the Bulgarian national movement.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        },
        {
          id: 'q3',
          text: 'When the sultan rejected the reforms, Russia declared war unilaterally in early 1877.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'War resumed between Russia and the Ottoman Empire in 1877. Russia opened hostilities in response to Ottoman suppression of uprisings in Bulgaria and to the threat posed to Serbia by Ottoman forces.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q5',
          text: 'This was Russia\'s golden opportunity to gain control of Western trade routes to its southwest and finally destroy the empire that had blocked this ambition for centuries.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'Russland erklärt als Protektor der Balkanvölker dem Osmanischen Reich den Krieg. Die russischen Truppen dringen über die Donau rasch nach Bulgarien vor und stehen Ende Januar 1878 vor Konstantinopel. Auf die Eroberung der Stadt wird mit Rücksicht auf die drohende Haltung Großbritanniens verzichtet.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1877.html'
          }
        },
        {
          id: 'q7',
          text: 'In eight months, Russian troops occupied all of Bulgaria and reached Constantinople.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The treaty reduced Ottoman holdings in Europe to eastern Thrace and created a large, independent Bulgarian state under Russian protection.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1876-05-04' },
            cites: [
              { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '27' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In Bulgarien beginnt ein von Russland unterstützter Aufstand gegen die osmanische Herrschaft.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1876.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1877-05-21' },
            cites: [
              { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '27' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Das Parlament des Fürstentums Rumänien proklamiert während des russisch-türkischen Krieges die Unabhängigkeit vom Osmanischen Reich und kündigt die Einstellung der Tributzahlungen an.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1877.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1878-03-03' },
            cites: [
              { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '16' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Der Vorfriede von San Stefano beendet den 1877 begonnenen achten russisch-türkischen Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '17' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1878.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1878-03' },
            cites: [
              {
                source: 'loc-bulgaria-country-study-1992',
                loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'At this high point of its influence on Balkan affairs, Russia dictated the Treaty of San Stefano in March 1878. This treaty provided for an autonomous Bulgarian state (under Russian protection) almost as extensive as the First Bulgarian Empire, bordering the Black and Aegean seas.',
        lang: 'en',
        cite: {
          source: 'loc-bulgaria-country-study-1992',
          loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Osman_Pasha_brought_to_Skobeleff_at_Plevna_-_J.L.G._Ferrix_pinx._LCCN99405721.tif/lossy-page1-1280px-Osman_Pasha_brought_to_Skobeleff_at_Plevna_-_J.L.G._Ferrix_pinx._LCCN99405721.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Osman_Pasha_brought_to_Skobeleff_at_Plevna_-_J.L.G._Ferrix_pinx._LCCN99405721.tif',
    credit: { institution: 'Library of Congress', creator: 'Jean Leon Gerome Ferris' },
    license: { id: 'public-domain' }
  }
})
