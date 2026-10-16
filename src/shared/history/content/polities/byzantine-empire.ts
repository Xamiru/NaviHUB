import { definePolity } from '../../schema'

export default definePolity({
  id: 'byzantine-empire',
  names: [
    { text: 'Byzantine Empire', lang: 'en', role: 'primary' },
    {
      text: 'Eastern Roman Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-guide-byzantine-empire', loc: { section: 'Introduction' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '0330' },
        cites: [
          { source: 'loc-guide-byzantine-empire', loc: { section: 'Introduction' } },
          {
            source: 'britannica-1911-constantinople',
            loc: { section: 'Constantinople', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1453' },
        cites: [
          { source: 'loc-guide-byzantine-empire', loc: { section: 'Introduction' } },
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'britannica-1911-constantinople',
          loc: { section: 'Constantinople', para: '2' }
        },
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 112039853 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Byzantine Empire, also known as the Eastern Roman Empire, lasted for over 1100 years, from 330-1453.',
          lang: 'en',
          cite: { source: 'loc-guide-byzantine-empire', loc: { section: 'Introduction' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://guides.loc.gov/byzantine-empire' }
        },
        {
          id: 'q2',
          text: 'Constantinople is famous in history, first as the capital of the Roman empire in the East for more than eleven centuries (330–1453), and secondly as the capital of the Ottoman empire since 1453.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constantinople',
            loc: { section: 'Constantinople', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constantinople'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On the death of John Palaeologus in 1391 his son Manuel, who was serving in the Turkish army, fled, without asking leave, to Constantinople, and assumed the imperial dignity.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1344' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'An Orthodox monk had claimed that, once Constantinople had fallen to the Ottoman Empire in 1453, the Muscovite tsar was the only legitimate Orthodox ruler and that Moscow was the Third Rome because it was the final successor to Rome and Constantinople, the centers of Christianity in earlier periods.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '8' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Theodosian_Walls_of_Constantinople%2C_Istanbul_%281991%29.jpg/1280px-Theodosian_Walls_of_Constantinople%2C_Istanbul_%281991%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Theodosian_Walls_of_Constantinople,_Istanbul_(1991).jpg',
    credit: { creator: 'Peter Christian Riemann' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
