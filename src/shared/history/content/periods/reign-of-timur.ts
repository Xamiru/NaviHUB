import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-timur',
  names: [
    { text: 'Reign of Timur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  periodType: 'reign',
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
        value: { d: '1405' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '2' } },
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 2,
  parent: 'polity:timurid-empire',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A product of both Turkish and Mongol descent, Timur claimed Genghis Khan as an ancestor.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/afghanistan/9.htm' }
        },
        {
          id: 'q2',
          text: 'Although he was not a descendant of Chinggis, Timur became the de facto ruler of Mawarannahr and proceeded to conquer all of western Central Asia, Iran, Asia Minor, and the southern steppe region north of the Aral Sea.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '2' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        },
        {
          id: 'q3',
          text: 'His empire disintegrated rapidly after his death in 1405, however, and Mongol tribes, Uzbeks, and Bayundur Turkomans ruled roughly the area of present-day Iran until the rise of the Safavid dynasty, the first native Iranian dynasty in almost 1,000 years.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/iran/10.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The rebuilding of the city on its new site was resumed on a grand scale after Timur’s return from his western campaigns in 1396, in particular with the construction of the Friday mosque (Bibi Ḵānum) next to the northern gates and the opening of the bazaar mainstreet between the mosque and the Registān area.',
          lang: 'en',
          cite: {
            source: 'iranica-grenet-samarqand-i',
            loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/samarqand-i'
          }
        },
        {
          id: 'q5',
          text: 'The next thirty years or so were spent in various wars and expeditions.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Portrait_of_Timur_%28d.1405%29%2C_as_commissioned_by_his_grandson_Ibrahim_Sultan_in_the_1436_Zafarnama.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Timur_(d.1405),_as_commissioned_by_his_grandson_Ibrahim_Sultan_in_the_1436_Zafarnama.jpg',
    credit: { creator: '1436 painter' },
    license: { id: 'public-domain' }
  }
})
