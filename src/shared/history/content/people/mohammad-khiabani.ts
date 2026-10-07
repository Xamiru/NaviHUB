import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-khiabani',
  names: [
    { text: 'Mohammad Khiabani', lang: 'en', role: 'primary' },
    { text: 'شیخ محمد خیابانی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1879', approx: true, notAfter: '1880' },
        cites: [
          {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1920-09-14' },
        cites: [
          {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '1' }
          },
          {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-bonakdarian-khiabani',
        loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'revolutionary', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'cleric, nationalist, constitutionalist revolutionary (1908-9), member of the Second Majles (1909-11), elected to the Fourth Majles, leader of the Democrat party of (Iranian) Azarbaijan, and founder of the short-lived Ᾱzādisetān autonomous province in 1920',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q2',
          text: 'It was at this stage that Ḵiābāni transitioned from being primarily a constitutionalist anti-imperialist to embracing a combined platform of nationalism, constitutionalism, and socio-economic reforms and social justice.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'A band of Cossacks in pursuit of Ḵiābāni discovered him early the next morning (14 September) at a neighbor’s basement, where he was killed. Hedāyat would insist Ḵiābāni had committed suicide.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q4',
          text: 'News of Ḵiābāni’s death generated a great deal of public dismay and condemnation across the country, even among some of his political opponents.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/MohammadKhiabaniAndOthers.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:MohammadKhiabaniAndOthers.jpg',
    credit: { institution: 'Digital Library of India (Internet Archive)' },
    license: { id: 'public-domain' }
  }
})
