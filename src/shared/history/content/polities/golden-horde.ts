import { definePolity } from '../../schema'

export default definePolity({
  id: 'golden-horde',
  names: [
    { text: 'Golden Horde', lang: 'en', role: 'primary' },
    {
      text: 'Khanate of the Golden Horde',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'khanate',
  start: {
    alts: [
      {
        value: { d: '1236', notAfter: '1240' },
        cites: [
          {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 3,
  cshapes: [
    { set: 'early', code: 79965 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'GOLDEN HORDE, name given to the Mongol Khanate ruled by the descendants of Joči (Juji; d. 624/1226-27), the eldest son of Čengiz (Genghis) Khan',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        },
        {
          id: 'q2',
          text: 'Its core was the steppelands north of the Black Sea and the Caspian conquered in 1236-40 by an army under Joči’s son Batu (Bātu), who ranks as its first khan and whose descendants reigned until about 1360; Batu’s older brother Orda (Urda) reigned over the territories of the so-called White Horde to the north-east.',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Taking advantage of the disintegration of the Ilkhanate after Abu Saʿid’s death, the khan Janibeg (Jāni Bēg, 1342-1358) invaded and occupied Azarbaijan, putting to death its Chobanid',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        },
        {
          id: 'q6',
          text: 'At last in 1378 Tōkṭāmish, of the Eastern Kipchaks, succeeded in ousting all rivals, and establishing himself as ruler of eastern and western Kipchak.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Golden_Horde'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Timur’s invasion of the Qepčaq steppe put an end to incursions by the Golden Horde into Persia, and in the 15th century the Golden Horde dissolved into a number of smaller states.',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Map_of_the_Golden_Horde.png/1280px-Map_of_the_Golden_Horde.png',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Golden_Horde.png',
    credit: { creator: 'Natural Earth' },
    license: { id: 'cc0' }
  }
})
