import { definePerson } from '../../schema'

export default definePerson({
  id: 'shahrokh-afshar',
  names: [
    { text: 'Shahrokh Afshar', lang: 'en', role: 'primary' },
    { text: 'شاهرخ افشار', lang: 'fa', role: 'native', translit: 'Šāhroḵ Afšār' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1734-03' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '10' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1796' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } },
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah (Khorasan)',
      polity: 'polity:afsharid-iran',
      start: {
        alts: [
          {
            value: { d: '1748-10-01' },
            cites: [
              { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '7' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1796' },
            cites: [
              { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '7' } },
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Coin_of_Shahrokh_Afshar%2C_struck_at_the_Ganja_mint_%28obverse%29.jpg/1280px-Coin_of_Shahrokh_Afshar%2C_struck_at_the_Ganja_mint_%28obverse%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Coin_of_Shahrokh_Afshar,_struck_at_the_Ganja_mint_(obverse).jpg',
    credit: { institution: 'American Numismatic Society' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'As a scion of the Safavid house, Šāhroḵ was more acceptable to the populace than a mere descendent of Nāder; as a youth of seventeen, he was also a convenient front behind which the amirs of Khorasan could appropriate Nāder’s treasure.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q2',
          text: 'Šāhroḵ thus formed a direct link between the lineages of Nāder and the Safavids—an important basis for Šāhroḵ’s eventual right to rule.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'In March 1734, Šāhroḵ was born to Reżā-qoli and Fāṭema Begum.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Nine weeks previously, however, on 8 Šawwāl/1 October, Šāhroḵ Mīrzā had been elevated to the throne by a junta of Kurdish and Bayāt tribal leaders at Mašhad.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q5',
          text: 'Nāder’s grandson Šāhroḵ, although blinded after an earlier coup attempt, finally secured the throne in Khorasan in 1748 as a vassal of the Afghan Aḥmad Shah Dorrāni (r. 1747-73).',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q6',
          text: 'Šāhroḵ capitulated before the new ruler of Iran; he was tortured to reveal the whereabouts of his remaining jewels and sent with his younger children to Māzandarān, where he shortly died.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'The aging Šāhroḵ Shah, a puppet in the hands of the tribal leaders and his son Nāder Mīrzā (who fled to Afghanistan), was deposed',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    }
  ]
})
