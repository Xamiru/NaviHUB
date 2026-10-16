import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-shahrukh',
  names: [
    { text: 'Reign of Shahrukh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1409' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          }
        ]
      },
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1447' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          },
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          },
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          }
        ]
      },
      {
        value: { d: '1446' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  parent: 'polity:timurid-empire',
  sections: [
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On the whole, the period was one of relative stability, prosperity, and development of economy and cultural activities.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394%2C_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_%28Shah_Rukh_detail%29.jpg/1280px-Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394%2C_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_%28Shah_Rukh_detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394,_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_(Shah_Rukh_detail).jpg',
    credit: { institution: 'Freer Gallery of Art', creator: '1435–36 artist' },
    license: { id: 'public-domain' }
  }
})
