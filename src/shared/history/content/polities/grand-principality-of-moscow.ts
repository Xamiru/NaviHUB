import { definePolity } from '../../schema'

export default definePolity({
  id: 'grand-principality-of-moscow',
  names: [
    { text: 'Grand Principality of Moscow', lang: 'en', role: 'primary' },
    {
      text: 'Muscovy',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'grand-duchy',
  start: {
    alts: [
      {
        value: { d: '1325' },
        cites: [
          { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } },
          { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '16' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1547' },
        cites: [
          { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '11' } },
          { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1140' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:moscow',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 170770 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When the Mongols invaded the lands of Kievan Rus\', Moscow was an insignificant trading outpost in the principality of Vladimir-Suzdal\'.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q2',
          text: 'More important to Moscow\'s development in what became the state of Muscovy, however, was its rule by a series of princes who were ambitious, determined, and lucky.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The first ruler of the principality of Muscovy, Daniil Aleksandrovich (d. 1303), secured the principality for his branch of the Rurik Dynasty.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q4',
          text: 'Under Ivan Kalita (1325–1341) the principality of Vladimir—where the princes of Kiev and the metropolitan of Russia had taken refuge after the wars that desolated south-western Russia—became united with Moscow; and in 1325 the metropolitan Peter established his seat at Moscow, thus giving new importance and powerful support to the young principality.',
          lang: 'en',
          cite: { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Moscow'
          }
        },
        {
          id: 'q5',
          text: 'The increase of the principality continued during the first half of the 15th century, and at the death of Vasili (or Basil) the Blind, in 1462, it included not only the whole of what is now the government of Moscow, but also large parts of the present governments of Kaluga, Tula, Vladimir, Nijniy-Novgorod, Kostroma, Vyatka, Vologda, Yaroslav and Tver.',
          lang: 'en',
          cite: { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Moscow'
          }
        },
        {
          id: 'q6',
          text: 'By the fifteenth century, the rulers of Muscovy considered the entire Russian territory their collective property.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '7' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Muscovy gained full sovereignty over the ethnically Russian lands in 1480 when Mongol overlordship ended officially, and by the beginning of the sixteenth century virtually all those lands were united.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '4' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q8',
          text: 'Gradually, the Muscovite ruler emerged as a powerful, autocratic ruler, a tsar.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '8' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q9',
          text: 'Ivan IV became grand prince of Muscovy in 1533 at the age of three.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '11' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Muscovy_1300-1462.png/1280px-Muscovy_1300-1462.png',
    page: 'https://commons.wikimedia.org/wiki/File:Muscovy_1300-1462.png',
    credit: { creator: 'Koryakov Yuri' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
