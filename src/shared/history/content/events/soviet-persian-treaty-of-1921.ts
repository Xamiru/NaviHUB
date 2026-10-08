import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-persian-treaty-of-1921',
  names: [
    { text: 'Soviet–Persian Treaty of 1921', lang: 'en', role: 'primary' },
    { text: 'عهدنامه مودت ایران و شوروی ۱۹۲۱', lang: 'fa', role: 'native' },
    {
      text: 'Irano-Soviet Friendship Treaty of 1921',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1921-02-26' },
        cites: [
          {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      name: 'ʿAlī-qolī Khan Anṣārī',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    },
    {
      name: 'Georgy Chicherin',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '6' }
        }
      ]
    },
    {
      name: 'Lev Karakhan',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '6' }
        }
      ]
    },
    {
      ref: 'person:vladimir-lenin',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '11' }
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
          text: 'On 26 February 1921 the Soviet-Iranian Treaty was officially signed in Moscow. This had been prepared and agreed upon prior to the military coup of Reza Khan on 21 February 1921',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q2',
          text: 'According to its terms, the Soviet government annulled all its previous treaties with Persia, as well as other treaties of the Tsarist government concluded to the detriment of Iranian interests, and surrendered the rights to the loans of the Tsarist government and its concessions.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q3',
          text: 'The Āšurādā and other islands on the Caspian Sea were transferred to Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q4',
          text: 'Eventually, following prolonged and critical negotiations in Tehran and Moscow that culminated in a personal interview with Lenin by the Iranian envoy, ʿAlī-qolī Khan Anṣārī, the Soviet government agreed to withdraw Russian troops if Britain withdrew her own forces from Iranian territory. This understanding was incorporated into the Irano-Soviet Friendship Treaty of 1921.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'For the Soviet government, the safety of the frontiers was of more importance, and in exchange for the refusal from all claims to the property of the Tsarist Russia, clauses 5 and 6 were included in the treaty. These two clauses excluded the possibility for organizations or individuals engaged in armed struggle against the government of either country to reside or operate on the territory of the other country (clause 5), and envisaged the possibility of the Soviet troops entering Iranian territory if the Persian government proved unable to avert this threat (clause 6). These two clauses, which undoubtedly violated the sovereign rights of Persia, were implemented during the Second World War.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q6',
          text: 'According to Article 21 of the Agreement, the Soviet Union reserves the right to dispatch its armed forces to Iran in the event of the occupation of Iran by another country.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1921' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q7',
          text: 'The first Soviet ambassador to Tehran, Theodor (Feodor) Rothstein, thus exerted heavy pressure on Persian communists and Jangalīs to end their armed struggle and come to terms with Tehran',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-communism-in-persia',
            loc: { section: 'COMMUNISM i. In Persia to 1941', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-i/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'In essence, it was the first equitable treaty for Persia, and it was even more profitable to Tehran than to Moscow.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q9',
          text: 'The treaty of 1921 is fundamental to relations between the two countries. It has remained valid to the present, except for clauses 5 and 6 that were unilaterally annulled by the Iranian side after the Islamic Revolution of 1979.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0_%D0%BC%D0%B5%D0%B6%D0%B4%D1%83_%D0%A0%D0%A1%D0%A4%D0%A1%D0%A0_%D0%B8_%D0%9F%D0%B5%D1%80%D1%81%D0%B8%D0%B5%D0%B9._%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0_26.02.1921.jpg/1280px-%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0_%D0%BC%D0%B5%D0%B6%D0%B4%D1%83_%D0%A0%D0%A1%D0%A4%D0%A1%D0%A0_%D0%B8_%D0%9F%D0%B5%D1%80%D1%81%D0%B8%D0%B5%D0%B9._%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0_26.02.1921.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0_%D0%BC%D0%B5%D0%B6%D0%B4%D1%83_%D0%A0%D0%A1%D0%A4%D0%A1%D0%A0_%D0%B8_%D0%9F%D0%B5%D1%80%D1%81%D0%B8%D0%B5%D0%B9._%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0_26.02.1921.jpg',
    credit: { institution: 'Russian Ministry of Foreign Affairs' },
    license: { id: 'public-domain' }
  }
})
