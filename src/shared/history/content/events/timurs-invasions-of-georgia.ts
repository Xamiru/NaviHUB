import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'timurs-invasions-of-georgia',
  names: [
    { text: 'Timur’s invasions of Georgia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1386' },
        cites: [
          {
            source: 'loc-georgia-country-study-1994',
            loc: { section: 'Occupation and Inclusion in the Russian Empire', para: '1' }
          },
          { source: 'britannica-1911-georgia', loc: { section: 'GEORGIA', para: '4' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1403' },
        cites: [
          { source: 'britannica-1911-georgia', loc: { section: 'GEORGIA', para: '4' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tbilisi',
      cites: [
        {
          source: 'loc-georgia-country-study-1994',
          loc: { section: 'Occupation and Inclusion in the Russian Empire', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        { source: 'britannica-1911-georgia', loc: { section: 'GEORGIA', para: '4' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      cites: [
        {
          source: 'loc-georgia-country-study-1994',
          loc: { section: 'Occupation and Inclusion in the Russian Empire', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:five-years-campaign', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A brief resurgence of Georgian power in the fourteenth century ended when the Turkic conquerer Timur (Tamerlane) destroyed Tbilisi in 1386.',
          lang: 'en',
          cite: {
            source: 'loc-georgia-country-study-1994',
            loc: { section: 'Occupation and Inclusion in the Russian Empire', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/georgia/4.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the end of the fourteenth century, another Mongol, Timur (also known as Tamarlane), invaded Azerbaijan, at about the same time that Azerbaijani rule was reviving under the Shirvan Dynasty.',
          lang: 'en',
          cite: {
            source: 'loc-azerbaijan-country-study-1995',
            loc: { section: 'The Introduction of Islam and the Turkish Language', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/azerbaijan/5.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1393' },
            cites: [
              { source: 'britannica-1911-georgia', loc: { section: 'GEORGIA', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Georgia was again twice (1386 and 1393–1394) desolated by the Mongols under Timur (Tamerlane), prince of Samarkand, who on the second occasion laid waste the entire country with fire and sword, and crushed it under his relentless heel until the year 1403.',
        lang: 'en',
        cite: { source: 'britannica-1911-georgia', loc: { section: 'GEORGIA', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Georgia'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Sharaf_al-Din_Ali_Yazdi._Timur_Besieges_the_Georgian_Castle_of_Gortin._Miniature_manuscripts_%2815th_century%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sharaf_al-Din_Ali_Yazdi._Timur_Besieges_the_Georgian_Castle_of_Gortin._Miniature_manuscripts_(15th_century).jpg',
    credit: { institution: 'Harvard University Library' },
    license: { id: 'public-domain' }
  }
})
