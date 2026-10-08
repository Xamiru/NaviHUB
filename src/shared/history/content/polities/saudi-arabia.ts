import { definePolity } from '../../schema'

export default definePolity({
  id: 'saudi-arabia',
  names: [
    { text: 'Saudi Arabia', lang: 'en', role: 'primary' },
    { text: 'المملكة العربية السعودية', lang: 'ar', role: 'native' },
    {
      text: 'Kingdom of Saudi Arabia',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'state-dept-countries-saudi-arabia',
          loc: { section: 'Saudi Arabia: Recognition', para: '5' }
        }
      ]
    },
    {
      text: 'Kingdom of Hejaz and Nejd and its Dependencies',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'state-dept-countries-saudi-arabia',
          loc: { section: 'Saudi Arabia: Recognition', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1932-09-18' },
        cites: [
          {
            source: 'state-dept-countries-saudi-arabia',
            loc: { section: 'Saudi Arabia: Recognition', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:riyadh',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Rise of Abd Al Aziz', para: '4' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 670, from: 1932.72 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Official_Portrait_of_King_Abdulaziz.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Official_Portrait_of_King_Abdulaziz.jpg',
    credit: { institution: 'Saudi Press Agency', creator: 'Saudi Press Agency' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Abd al Aziz established the Saudi state in three stages, namely, by retaking Najd in 1905, defeating the Rashidi clan at Hail in 1921, and conquering the Hijaz in 1924.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rise of Abd Al Aziz', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/saudi-arabia/9.htm' }
        },
        {
          id: 'q2',
          text: 'The name of the state was changed to the Kingdom of Saudi Arabia by a decree of September 18, 1932.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-saudi-arabia',
            loc: { section: 'Saudi Arabia: Recognition', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/saudi-arabia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'When he became the ruler of Mecca and Medina as well, Abd al Aziz took on the responsibilities of Khadim al Haramayn (servant of the two shrines) and so assumed an important position in the wider Muslim world.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        },
        {
          id: 'q4',
          text: 'This was difficult, however, because the new Saudi kingdom had little money in its first twenty years.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        },
        {
          id: 'q5',
          text: 'Saudi Arabia was an absolute monarchy in 1992. The king was not constrained by a written constitution, a legislative assembly, or elections.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'STRUCTURE OF GOVERNMENT', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/saudi-arabia/46.htm' }
        },
        {
          id: 'q6',
          text: 'Saudis considered the Quran, the holy book of Islam, their country\'s constitution.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'STRUCTURE OF GOVERNMENT', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/saudi-arabia/46.htm' }
        }
      ]
    }
  ]
})
