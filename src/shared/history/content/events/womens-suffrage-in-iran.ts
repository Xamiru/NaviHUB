import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'womens-suffrage-in-iran',
  names: [
    { text: 'Women’s suffrage in Iran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1963-01-26' },
        cites: [
          {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamideh Sedghi' }
        ]
      },
      {
        value: { d: '1963-02' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  related: [
    {
      ref: 'event:white-revolution',
      rel: 'related',
      cites: [
        {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Iranian_women_voting_during_White_Revolution.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iranian_women_voting_during_White_Revolution.jpg',
    credit: { institution: 'Ettelaat newspaper (No. 11008, 6 Bahman 1341/26 Jan 1963, p.13)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The six-point program of the White Revolution, announced on 9 January 1963, included land redistribution and women’s enfranchisement.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q2',
          text: 'While women’s votes were counted separately from men’s, the referendum approved and passed women’s suffrage without difficulties.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q3',
          text: 'In addition to these other reforms, the shah announced in February that he was extending the right to vote to women.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In 1956 the Society along with the Association of Women Lawyers (Anjoman-e zanān-e ḥoqūqdān), founded by Mehrangīz Manūčehrīān, and the League of Women Supporters of Human Rights (Jamʿīyat-e zanān-e ṭarafdār-e ḥoqūq-e bašar), founded by Badr-al-Molūk Bāmdād, launched a campaign for women’s suffrage (Paidar, pp. 136-37).',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q5',
          text: 'Behbahānī’s relations with the regime began to sour in 1959. The question of female enfranchisement was raised anew in the Senate, and Behbahānī denounced its proponents—especially Senator Hedāyat-Allāh Matīn-Daftarī—in a letter that was published in Keyhān on 17 Day 1337 Š./7 January 1958.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-behbahani-mohammad',
            loc: { section: 'BEHBAHĀNĪ, AYATOLLAH MOḤAMMAD', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150441/https://www.iranicaonline.org/articles/behbahani-ayatollah-mohammad/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Almost two weeks after the proclamation of women’s enfranchisement, demonstrations broke out in the bāzār and in the southern neighborhoods of Tehran. In response to these reactions, women also protested and went on strike.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q7',
          text: 'In the new Majles, 81 percent of the deputies, including six women, were serving for the first time.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The government had also extended the franchise to women. The overall significance of this measure was, however, eclipsed by the eroding credibility of the electoral process.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    }
  ]
})
