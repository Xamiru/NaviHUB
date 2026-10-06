import { definePerson } from '../../schema'

export default definePerson({
  id: 'malkom-khan',
  names: [
    { text: 'Mirza Malkom Khan', lang: 'en', role: 'primary' },
    { text: 'میرزا ملکم خان', lang: 'fa', role: 'native' },
    {
      text: 'Malkam Khan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1833', notAfter: '1834' },
        cites: [
          {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1908' },
        cites: [
          {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  roles: ['diplomat', 'writer', 'politician'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Malkom Khan, the famous diplomat and advocate of constitutionalism, was a student in Paris from 1259/1843 to 1267/1851 (Maḥbūbī, Moʾassasāt I, pp. 189-95; Algar, passim; Nashat, p. 27).',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1851, upon completing his higher education in Paris, he returned to Tehran soon after the foundation of the Dār al-Fonun (‘Polytechnic College’), where he gained employment as both translator and geography teacher (Malkom Khan, 1948, p. 2).',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        },
        {
          id: 'q3',
          text: 'Others were also assimilated to the teaching staff; for example, Mīrzā Malkom Khan translated for Zatti but also taught mathematics and geometry at both general and more advanced levels.',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        },
        {
          id: 'q5',
          text: 'It was one of the first batch of initiates to Sincère Amitié, Mīrzā Malkom Khan (d. 1326/1908), who established the earliest farāmūš-ḵāna on Persian soil; it must, however, be regarded as a pseudo-Masonic institution given its lack of affiliation to any of the European obediences.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'In 1858 officials like Malkam Khan began to suggest in essays that the weakness of the government and its inability to prevent foreign interference lay in failure to learn the arts of government, industry, science, and administration from the advanced states of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q6',
          text: 'From this, and from the content of treatises on governmental reform that Malkom wrote during the years when the farāmūš-ḵāna was operating, it may be deduced that his purpose was to gather together under his leadership members of the Persian elite who might be disposed to some degree of westernizing reform.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    }
  ]
})
