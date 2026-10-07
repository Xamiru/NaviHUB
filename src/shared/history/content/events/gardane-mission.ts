import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'gardane-mission',
  names: [
    { text: 'Gardane mission', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1807' },
        cites: [
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1809-02-13' },
        cites: [
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    { ref: 'place:tehran' },
    { ref: 'place:tabriz' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  participants: [
    {
      ref: 'person:claude-mathieu-de-gardane',
      role: 'leader',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '2' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '4' }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '6' }
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
          text: 'GARDANE MISSION (1807-09), a diplomatic and military project between France and Persia which represented Napoleon’s last attempt to realize his Oriental ambitions.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q2',
          text: 'These left no doubt about Napoleon’s intentions. Persia was then to be considered as Russia’s natural enemy and as a military passage to India.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q3',
          text: 'At Tabrīz, Verdier pursued Bontems’ training of Persian levies. In 14 months, he equipped and trained in the European manner three battalions (4,000 or 6,000 men).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Despite its limited results on both diplomatic and military fields, the Gardane mission opened the way for a long lasting French influence in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
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
            value: { d: '1807-12-04' },
            cites: [
              {
                source: 'iranica-calmard-gardane-mission',
                loc: { section: 'GARDANE MISSION', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'They were warmly received at Tabrīz by Mīrzā Bozorg and ʿAbbās Mīrzā (13 November) and reached Tehran (4 December) after “an extremely painful and dangerous voyage”',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gardane-mission'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-05' },
            cites: [
              {
                source: 'iranica-calmard-gardane-mission',
                loc: { section: 'GARDANE MISSION', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'While Gudovich’s envoy, the Baron de Wrede, presented Russia’s proposals at Tehran (May 1808), John Malcolm, commissioned by the East India Company, landed at Bushire. The shah, still faithful to the Treaty of Finkenstein, refused to allow him to proceed to Tehran; he was to communicate only with the governor of Fārs.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gardane-mission'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-11-23' },
            cites: [
              {
                source: 'iranica-calmard-gardane-mission',
                loc: { section: 'GARDANE MISSION', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'He summoned him to his presence (23 November 1808) and left him only sixty days delay (till 20 January 1809), in the expectation of knowing Napoleon’s intentions about Persia.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gardane-mission'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1809-02-13' },
            cites: [
              {
                source: 'iranica-calmard-gardane-mission',
                loc: { section: 'GARDANE MISSION', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Gardane left Tehran (13 February), the day before Jones entered it.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gardane-mission'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/The_Persian_Envoy_Mirza_Mohammed_Reza_Qazvini_Finkenstein_Castle_27_Avril_1807_by_Francois_Mulard.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Persian_Envoy_Mirza_Mohammed_Reza_Qazvini_Finkenstein_Castle_27_Avril_1807_by_Francois_Mulard.jpg',
    credit: { institution: 'L\'Histoire par l\'image', creator: 'François-Henri Mulard' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'gardane-1865-mission',
      mediaKind: 'document',
      title: 'Mission du général Gardane en Perse sous le premier empire. Documents historiques publiés par son fils, le comte Alfred e Gardane',
      date: { d: '1865' },
      url: 'https://archive.org/download/missiondugnr00gard/missiondugnr00gard.pdf',
      page: 'https://archive.org/details/missiondugnr00gard',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'Alfred de Gardane'
      },
      license: { id: 'public-domain' },
      bytes: 13083895
    }
  ]
})
