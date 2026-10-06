import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-hasan-shirazi',
  names: [
    { text: 'Mirza Hasan Shirazi', lang: 'en', role: 'primary' },
    { text: 'میرزا حسن شیرازی', lang: 'fa', role: 'native' },
    {
      text: 'Ḥājj Mirzā Moḥammad Ḥasan Širāzi',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-floor-tobacco', loc: { section: 'TOBACCO', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran', 'mena'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In 1287/1870, Samarra came temporarily to overshadow Naǰaf, when Mīrzā Ḥasan Šīrāzī, soon to become the sole marǰaʿ-e taqlīd of the day, moved there from Naǰaf to escape various pressures to which he was subject (Āḡā Bozorg Tehrānī, Mīrzā-ye Šīrāzī, Tehran, 1362 Š./ 1983, pp. 40-41).',
          lang: 'en',
          cite: { source: 'iranica-algar-atabat', loc: { section: 'ʿATABĀT', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabat'
          }
        }
      ]
    }
  ]
})
