import { definePerson } from '../../schema'

export default definePerson({
  id: 'haydar-safavi',
  names: [
    { text: 'Haydar Safavi', lang: 'en', role: 'primary' },
    { text: 'شیخ حیدر صفوی', lang: 'fa', role: 'native', translit: 'Ḥaydar Ṣafavi' },
    {
      text: 'Ḥaydar',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
      ]
    },
    {
      text: 'Shaikh Ḥaydar',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1459-07', approx: true },
        cites: [
          { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } },
          { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1488-07-09' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '5' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:amed',
    cites: [
      { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
    ]
  },
  diedIn: {
    ref: 'place:tabasaran',
    cites: [
      { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
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
          text: 'Under Ḥaydar’s leadership, the Qezelbāš confederate clans and their allies morphed into a well-organized military force capable of changing the balance of power in Azarbaijan.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Ḥaydar was born in circa Ramażān 863/June-July 1459 in Āmed, the capital of the province of Diyarbakir.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        },
        {
          id: 'q3',
          text: 'Ḥaydar’s mother, Ḵadija Begum bt. Qara ʿOṯmān, was a sister of the Āq Qoyunlu ruler, Uzun Ḥasan (r. 856-82/1452-78)',
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Ḥaydar succeeded his father as spiritual leader of the pro-Āq Qoyunlu faction of the Ṣafaviya Sufi order in circa 876/1471-2.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        },
        {
          id: 'q5',
          text: 'In Ardabil, Ḥaydar eked out an existence as a swordsmith.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '3' } },
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
          id: 'q6',
          text: 'Ḥaydar, instructed in a dream by the Imam ʿAlī, had devised for his followers a distinctive form of headgear known as the Ḥaydarī hat (tāj-e ḥaydarī).',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Ten sons and four daughters are known to have survived Ḥaydar.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        }
      ]
    }
  ]
})
