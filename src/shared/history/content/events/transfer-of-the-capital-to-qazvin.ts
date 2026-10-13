import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'transfer-of-the-capital-to-qazvin',
  names: [
    { text: 'Transfer of the capital to Qazvin', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1548' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1557' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Colin Paul Mitchell', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:qazvin',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahmasp-i',
      role: 'leader',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:transfer-of-the-capital-to-isfahan',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
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
          text: 'Although the date of the official transfer is still debated among historians, it is almost certain that Ṭahmāsp began preparations to have the royal capital moved from Tabriz to Qazvin during this period of ethnic re-settlement in the 1540s.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q2',
          text: 'This prompted Shah Ṭahmāsp in 1548 to move his capital from Tabriz, which had been briefly occupied in 1534 by the Ottomans, to Qazvin, a city located further in the interior.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Most scholars concur that Tabriz had shown itself to be vulnerable to Ottoman attack, and strategy dictated having a centrally located royal capital.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'A more appealing explanation for basing the central, royal administration in Qazvin lies with the aforementioned agenda of minimizing undue Turkic influence in the Safavid court.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'After the Peace of Amasya and the shift of the imperial residence, the militant nomadism associated with the dawlat-e qezelbāš that had dominated the first forty years of Safavid dynastic rule began to dissipate.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Portrait_of_Shah_Tahmasp_circa_1531.jpg/1280px-Portrait_of_Shah_Tahmasp_circa_1531.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Tahmasp_circa_1531.jpg',
    credit: { creator: 'Sultan Muhammad' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1534', notAfter: '1536' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Between 1534 and 1536, Iraq fell to the Ottomans.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1557' },
            cites: [
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '10' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Colin Paul Mitchell', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'However, a series of Safavid victories in the early 1550s: the conquest of the Armenian cities of Arjiš, Aḵlāt,Van, and Bitlis',
        lang: 'en',
        cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/tahmasp-i'
        }
      }
    }
  ]
})
