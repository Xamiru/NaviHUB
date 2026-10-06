import { definePerson } from '../../schema'

export default definePerson({
  id: 'jawaharlal-nehru',
  names: [
    { text: 'Jawaharlal Nehru', lang: 'en', role: 'primary' },
    { text: 'जवाहरलाल नेहरू', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1889' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1964-05' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister of India',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1947' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Jawaharlal Nehru', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1964' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Jawaharlal Nehru', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Jawaharlal Nehru', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Jawaharlal Nehru (1889-1964), India\'s first prime minister, was the chief architect of domestic and foreign policies between 1947 and 1964.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/23.htm' }
        },
        {
          id: 'q2',
          text: 'Born into a wealthy Kashmiri Brahman family and educated at Oxford, Nehru embodied a synthesis of ideals: politically an ardent nationalist, ideologically a pragmatic socialist, and secular in religious outlook,',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/23.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'His guiding principles were nationalism, anticolonialism, internationalism, and nonalignment.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/23.htm' }
        },
        {
          id: 'q4',
          text: 'To many, notably to Jawaharlal Nehru, the idea of a sovereign state based on a common religion seemed a historical anachronism and a denial of democracy.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Physically debilitated and mentally exhausted, Nehru suffered a stroke and died in office in May 1964.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/23.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Nehru_in_the_Netherlands_1957%2C_Bestanddeelnr_908-7533.jpg/1280px-Nehru_in_the_Netherlands_1957%2C_Bestanddeelnr_908-7533.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nehru_in_the_Netherlands_1957,_Bestanddeelnr_908-7533.jpg',
    credit: { institution: 'Nationaal Archief (Anefo collection)', creator: 'Wim van Rossem' },
    license: { id: 'cc0' }
  }
})
