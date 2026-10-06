import { definePerson } from '../../schema'

export default definePerson({
  id: 'harford-jones-brydges',
  names: [
    { text: 'Harford Jones Brydges', lang: 'en', role: 'primary' },
    {
      text: 'Harford Jones',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-perry-brydges',
          loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1764' },
        cites: [
          {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1847' },
        cites: [
          {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  roles: ['diplomat', 'writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BRYDGES, Sir HARFORD JONES (1764-1847), English diplomat and author, ambassador to the court of Fatḥ-ʿAlī Shah Qājār from 1807 to 1811.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/brydges-sir-harford-jones/'
          }
        },
        {
          id: 'q2',
          text: 'Born Harford Jones of a Herefordshire family, he assumed the additional name of Brydges (from his maternal grandmother’s family) by royal dispensation in 1836.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/brydges-sir-harford-jones/'
          }
        },
        {
          id: 'q3',
          text: 'Minto, piqued at London’s success, refused to honor Brydges’ bills and in 1810 sent Malcolm back to Iran; London, however, confirmed Brydges’ credentials and henceforth retained control of diplomatic relations with Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/brydges-sir-harford-jones/'
          }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'jones-1834-mission',
      mediaKind: 'document',
      title: 'An account of the transactions of His Majesty\'s mission to the court of Persia, : in the years 1807-11,',
      date: { d: '1834' },
      url: 'https://archive.org/download/b29348730/b29348730.pdf',
      page: 'https://archive.org/details/b29348730',
      credit: { institution: 'Wellcome Library (Internet Archive)', creator: 'Harford Jones' },
      license: { id: 'public-domain' },
      bytes: 38559883
    }
  ]
})
