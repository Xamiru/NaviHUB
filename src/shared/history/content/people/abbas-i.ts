import { definePerson } from '../../schema'

export default definePerson({
  id: 'abbas-i',
  names: [
    { text: 'Abbas I', lang: 'en', role: 'primary' },
    { text: 'شاه عباس', lang: 'fa', role: 'native', translit: 'Šāh ʿAbbās' },
    {
      text: 'ʿAbbās the Great',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
      ]
    },
    {
      text: 'Shah Abbas the Great',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '19' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1571-01-27' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1629-01-19' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1588-10-01' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1587' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '30' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1629-01-19' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } },
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '30' }
        },
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Shah_abbas_I_by_Bishn_Das.jpg/1280px-Shah_abbas_I_by_Bishn_Das.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_abbas_I_by_Bishn_Das.jpg',
    credit: { creator: 'Bishandas', institution: 'British Museum' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ʿAbbās I is universally regarded as the greatest Safavid ruler, the embodiment of the age-old Persian ideal of the just monarch.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'Shah ʿAbbās possessed qualities which entitle him to be styled “the Great.”',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'For ʿAbbās, the path to the throne was anything but smooth; indeed, the experiences of his early years accounted in large part for the morbidly suspicious side of his nature, which poisoned his relationships with his own sons.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q4',
          text: 'The formative years of Shah ʿAbbās had thus been marked by the factionalism of the Qezelbāš tribes.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'From the moment of his accession, Shah ʿAbbās realized that he must impose his authority on the Qezelbāš or remain their tool.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q6',
          text: 'Within a short time after his accession Shah ʿAbbās had demonstrated his determination to rule de facto as well as de jure, but time was needed to build up the army sufficiently to be able to take the offensive against the archenemies of the Safavid state, the Uzbeks in the east and the Ottomans in the west.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q7',
          text: 'Shah ʿAbbās was first and foremost an outstanding strategist, keen to regain the territories that had been lost to enemy forces or to internal sedition.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'After his victory over the Uzbeks in 1017/1598, Shah ʿAbbās transferred his capital from Qazvīn to Isfahan, which he transformed into one of the most beautiful cities in the world.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q9',
          text: 'Shah ʿAbbās waged war until the end of his reign, reconquering Kandahar from the Mughals in 1622 and Baghdad from the Ottomans a year later.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '44' }
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
      kind: 'later-life',
      quotes: [
        {
          id: 'q10',
          text: 'As stated earlier, the youthful experiences of Shah ʿAbbās had created in him the moribund fear that ambitious men might use his own sons against him, just as he and his brothers had been used against their father.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q11',
          text: 'When Shah ʿAbbās I died of natural causes in early 1629, there were no sons to succeed him.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '45' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q12',
          text: 'He was born on 1 Ramażān 978/27 January 1571, and died in Māzandarān on Jomādā I 1038/19 January 1629, after reigning for forty-two lunar and forty-one solar years.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q13',
          text: 'Since two other sons had predeceased him, the result was personal tragedy for Shah ʿAbbās; when he died on 19 January 1629, he had no son capable of succeeding him.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    }
  ]
})
