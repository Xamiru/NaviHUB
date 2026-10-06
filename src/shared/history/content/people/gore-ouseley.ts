import { definePerson } from '../../schema'

export default definePerson({
  id: 'gore-ouseley',
  names: [
    { text: 'Gore Ouseley', lang: 'en', role: 'primary' },
    { text: 'Sir Gore Ouseley', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1770-06-24' },
        cites: [
          { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1844-11-18' },
        cites: [
          { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  roles: ['diplomat', 'scholar'],
  offices: [
    {
      title: 'Ambassador Extraordinary and Plenipotentiary to the Qajar court',
      cites: [
        { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'OUSELEY, Sir Gore, entrepreneur, diplomat, and orientalist (b. 24 June 1770, Monmouthshire, Wales; d. 18 November 1844, Hall Barn Park, Beaconsfield, Buckinghamshire, England).',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'When Abu’l-Ḥasan returned to Iran in 1810, Ouseley, traveling with wife and daughter as well as his brother William, accompanied him. They reached Shiraz in April 1811, and Ouseley was received by Fatḥ-ʿAlī Shah (r. 1797-1834) in November 1811.',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        },
        {
          id: 'q3',
          text: 'The new-drawn border between Russia and Iran was so disadvantageous to Iran that Ouseley suffered for a time the shah’s anger.',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Ouseley’s return was overshadowed by the Waterloo victory, and he failed to receive the peerage for which he had been recommended by both the Qajar shah and the Russian emperor. Ouseley was left quietly to retire on a pension, but he proved a helpful friend to students from Iran and remained involved with Persian-British politics.',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Ouseley was a gentleman–scholar who independently encouraged the study of Persian.',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Sir_Gore_Ouseley%2C_PA06227.jpg/1280px-Sir_Gore_Ouseley%2C_PA06227.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sir_Gore_Ouseley,_PA06227.jpg',
    credit: { institution: 'KU Leuven Libraries', creator: 'Henry Richard Cook' },
    license: { id: 'public-domain' }
  }
})
