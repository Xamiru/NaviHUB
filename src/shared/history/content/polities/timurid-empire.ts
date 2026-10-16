import { definePolity } from '../../schema'

export default definePolity({
  id: 'timurid-empire',
  names: [
    { text: 'Timurid Empire', lang: 'en', role: 'primary' },
    {
      text: 'Timurids',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1370' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
          },
          {
            source: 'iranica-perry-deportations-iii',
            loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '15' }
          }
        ]
      },
      {
        value: { d: '1371' },
        cites: [
          { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Peter B. Golden', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1369' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1507' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:samarkand',
      start: {
        alts: [
          {
            value: { d: '1371' },
            cites: [
              {
                source: 'iranica-grenet-samarqand-i',
                loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-grenet-samarqand-i',
          loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
        },
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        },
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
      ]
    }
  ],
  dynasties: ['period:reign-of-timur', 'period:reign-of-shahrukh'],
  cshapes: [
    { set: 'early', code: 484195 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From his capital of Samarkand, Timur created an empire that, by the late fourteenth century, extended from India to Turkey.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/afghanistan/9.htm' }
        },
        {
          id: 'q3',
          text: 'Although his empire extended from Moscow and the Ukrainian plains to the borders of China and from the Mediterranean to India—a little less extensive than that of Chengiz, which included China, but not India—his empire soon became an arena for his contending descendents as well as the Turkmen dynasties of Qara Qoyunlu and Āq Qoyunlu',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'According to the Turko-Mongol political tradition, the members of the Timurid house and the military aristocracy, amirs, were relatively independent from the central power through a system of land tenure (soyurḡāl; see EQṬĀʿ), and fiscal and legal privileges.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q6',
          text: 'He mostly left the conquered lands in the hand of their defeated rulers without integrating them into his own domains.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The Timurid state quickly broke into two halves after the death of Timur.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '4' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        },
        {
          id: 'q11',
          text: 'In 1507, when the army of Moḥammad Khan Šaybāni (Šibak Khan) arrived at Herat, only the garrison, besieged in the citadel, resisted, while the notables surrendered the town without fight',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q12',
          text: 'The turn of the sixteenth century brought an end to Timurid Empire when another Mongol-Turkish ruler overwhelmed the weak Timurid ruler in Herat.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/afghanistan/9.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'Timur initiated the last flowering of Mawarannahr by gathering in his capital, Samarqand, numerous artisans and scholars from the lands he had conquered.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Map_of_the_Timurid_Empire.png/1280px-Map_of_the_Timurid_Empire.png',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Timurid_Empire.png',
    credit: { creator: 'Natural Earth' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'manz-1989-the-rise-and-rule-of-tamerlane', perspective: 'american' },
    { source: 'woods-1990-the-timurid-dynasty', perspective: 'american' },
    { source: 'subtelny-2007-timurids-in-transition', perspective: 'other' },
    { source: 'yazdi-2008-zafarnama', perspective: 'iranian' }
  ]
})
