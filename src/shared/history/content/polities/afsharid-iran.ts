import { definePolity } from '../../schema'

export default definePolity({
  id: 'afsharid-iran',
  names: [
    { text: 'Afsharid Iran', lang: 'en', role: 'primary' },
    {
      text: 'Afsharid dynasty',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1736' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } },
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1796' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } },
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia', 'russia-central-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:mashhad',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1098' } },
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '30' } }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 63149558 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Nominally a continuation of the Iranian empire as reestablished by Nāder, after his death the Afsharid state was in practice confined to Iranian Khorasan.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q2',
          text: 'Although Nader Shah achieved political unity, his military campaigns and extortionate taxation proved a terrible drain on a country already ravaged and depopulated by war and disorder, and in 1747 he was murdered by chiefs of his own Afshar tribe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'By the end of 1735, Nāder felt that he had gained enough prestige through a series of victories and had secured the immediate military situation well enough to assume the throne himself.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q4',
          text: 'After a successful offensive that culminated in the final defeat of the Mughal forces at the battle of Karnāl near Delhi in February 1739, Nāder made the Mughal emperor Moḥammad Šāh (r. 1719-48) his vassal and divested him of a large part of his fabulous riches, including the Peacock Throne and the Koh-i-Noor diamond.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q5',
          text: 'In June 1747, a cabal of Afšār and Qajar officers succeeded in killing Nāder.',
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
          text: 'As a scion of the Safavid house, Šāhroḵ was more acceptable to the populace than a mere descendent of Nāder; as a youth of seventeen, he was also a convenient front behind which the amirs of Khorasan could appropriate Nāder’s treasure.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Šāhroḵ capitulated before the new ruler of Iran; he was tortured to reveal the whereabouts of his remaining jewels and sent with his younger children to Māzandarān, where he shortly died.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q8',
          text: 'Upon Āḡā Moḥammad’s death the following year, Nāder Mīrzā recaptured Mašhad, and was tolerated by Fatḥ-ʿAlī Shah until he could mount a personal campaign in 1216/1802.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Nader_Shah_Afshar_and_his_court%2C_India_or_Iran%2C_18th_century.jpg/1280px-Nader_Shah_Afshar_and_his_court%2C_India_or_Iran%2C_18th_century.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nader_Shah_Afshar_and_his_court,_India_or_Iran,_18th_century.jpg',
    credit: { institution: 'Christie\'s' },
    license: { id: 'public-domain' }
  }
})
