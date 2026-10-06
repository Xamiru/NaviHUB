import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-ali-mirza-dowlatshah',
  names: [
    { text: 'Mohammad-Ali Mirza Dowlatshah', lang: 'en', role: 'primary' },
    { text: 'محمدعلی میرزا دولتشاه', lang: 'fa', role: 'native' },
    { text: 'Moḥammad-ʿAlī Mīrzā Dawlatšāh', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1789' },
        cites: [
          {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '1' }
          },
          {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          }
        ]
      },
      {
        value: { d: '1823' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'military'],
  offices: [
    {
      title: 'governor-general (wālī) of the western frontier provinces',
      start: {
        alts: [
          {
            value: { d: '1809' },
            cites: [
              {
                source: 'iranica-amanat-dawlatshah',
                loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '3' }
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
          text: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ (1203-37/1789-1821), eldest son of Fatḥ-ʿAlī Shah (1212-50/1797-1834) and powerful prince-governor of western provinces of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Following the age-old tradition of assigning frontier provinces to senior sons, in 1224/1809 the shah formally appointed Moḥammad-ʿAlī Mīrzā governor-general (wālī) of the entire frontier region from Kermānšāh, Zohāb, and Sonqor to Hamadān, Lorestān, Baḵtīārī, and Ḵūzestān; he served in this post unchallenged for the rest of his life.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        },
        {
          id: 'q3',
          text: 'Under his rule Kermānšāh and the western provinces enjoyed an exceptional period of prosperity and social calm, enhanced by trade and pilgrim traffic, as well as by the expansion of the rich agricultural base.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        },
        {
          id: 'q4',
          text: 'Some admired his robustness, articulacy, and assertiveness, whereas his critics judged him volatile and imperious.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'This campaign ended abruptly, however, with the prince’s death from cholera at Ṭāq-e Garrā during his withdrawal.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        },
        {
          id: 'q6',
          text: 'His death removed the most formidable challenge to ʿAbbās Mīrzā’s succession and reduced the intensity of the civil war fought in 1249-50/1834-35 between ʿAbbās Mīrzā’s son Moḥammad Shah (1250-64/1834-48) and the surviving senior sons of Fatḥ-ʿAlī Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        }
      ]
    }
  ]
})
