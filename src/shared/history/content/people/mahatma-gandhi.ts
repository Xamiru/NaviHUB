import { definePerson } from '../../schema'

export default definePerson({
  id: 'mahatma-gandhi',
  names: [
    { text: 'Mahatma Gandhi', lang: 'en', role: 'primary' },
    { text: 'मोहनदास करमचंद गांधी', lang: 'hi', role: 'native' },
    {
      text: 'Gandhiji',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1869' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '40' } },
          { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '227' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1948' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '40' } },
          { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '227' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['activist', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A native of Gujarat who had been educated in Britain, he was an obscure and unsuccessful provincial lawyer. Gandhi had accepted an invitation in 1893 to represent indentured Indian laborers in South Africa, where he stayed on for more than twenty years, emerging ultimately as the voice and conscience of thousands who had been subjected to blatant racial discrimination.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q2',
          text: 'For Gandhi, moral regeneration, social progress, and national freedom were inseparable.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'Gandhi\'s ideas and strategies of nonviolent civil disobedience (satyagraha--see Glossary), first applied during his South Africa days, initially appeared impractical to many educated Indians. In Gandhi\'s own words, "Civil disobedience is civil breach of unmoral statutory enactments," but as he viewed it, it had to be carried out nonviolently by withdrawing cooperation with the corrupt state.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'The assassination of Mahatma Gandhi on January 30, 1948, in New Delhi, by a Hindu extremist opposed to Gandhi\'s openness to Muslims ended the tenuous celebration of independence and deepened the hatred and mutual suspicion in Hindu-Muslim relations.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Independent India', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/22.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Gandhi_and_Indira_1924.jpg/1280px-Gandhi_and_Indira_1924.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gandhi_and_Indira_1924.jpg',
    credit: { institution: 'Gujarat Vidyapith' },
    license: { id: 'public-domain' }
  }
})
