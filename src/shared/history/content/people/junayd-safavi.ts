import { definePerson } from '../../schema'

export default definePerson({
  id: 'junayd-safavi',
  names: [
    { text: 'Junayd Safavi', lang: 'en', role: 'primary' },
    { text: 'شیخ جنید صفوی', lang: 'fa', role: 'native' },
    {
      text: 'Jonayd',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '1' } }
      ]
    },
    {
      text: 'Shaikh Jonayd',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1460-03-12' },
        cites: [
          { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tabasaran',
    cites: [
      { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Jonayd was the first Ṣafavi mystic to claim rule.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Exiled from his hometown, Jonayd purportedly traveled west to Diārbakr, where Jahānšāh’s rival, the Āq Qoyunlu ruler Uzun Ḥasan, was expanding his dominion to the north, east, and west.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        },
        {
          id: 'q3',
          text: 'Though Jonayd did marry Uzun Ḥasan’s sister and in the alliance placed his bets on the rising fortunes of Uzun Ḥasan, the marriage did not take place before 1456.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        },
        {
          id: 'q4',
          text: 'Through missionary activities Jonayd successfully converted many Turkmen and recruited devotees—later known as Qezelbāš, or Red Heads, because of the color of their high caps—who contributed to his military might and later aided his grandson Esmāʿil in founding an empire.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        },
        {
          id: 'q5',
          text: 'Jonayd gathered a following among these mostly Turkmen tribesmen, trained them for military operations, and used them in raids against the peoples of the Caucasus, Armenians, Georgians and Circassians.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Less than a year later, Jonayd mounted a military campaign against Georgia and southern Dagestan.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q7',
          text: 'Jonayd drew on sentiments of revenge and called for justice, identifying his messianic mission with the struggle of those who, despite centuries of Sunni Muslim hegemony, continued to love Moḥammad’s family (ahl-e bayt) with unmitigated loyalty.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        },
        {
          id: 'q8',
          text: 'Upon the transformation in the movement, Shaikh Jonayd donned the title of sultan, emphasizing the dimension of temporal sovereignty (maʿnawi), besides that of spiritual dominion (suri).',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'During one such raid to the Caucasus (Šervān) in 1460, Jonayd was felled on the battlefield and killed by the troops of the local ruler, Šervānšāh Ḵalil I b. Ebrāhim I (r. 1418-63).',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    }
  ]
})
