import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-egypt',
  names: [
    { text: 'Kingdom of Egypt', lang: 'en', role: 'primary' },
    { text: 'المملكة المصرية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1922-02-28' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '13' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1953-06-18' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:cairo',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Egypt (code 651), capital Cairo' } }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:khedivate-of-egypt' }
  ],
  cshapes: [
    { set: 'world', code: 651, from: 1922.16, to: 1953.46 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Fuad_I_of_Egypt.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fuad_I_of_Egypt.jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On February 28, 1922, Britain unilaterally declared Egyptian independence without any negotiations with Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/28.htm' }
        },
        {
          id: 'q2',
          text: 'Sultan Ahmad Fuad became King Fuad I, and his son, Faruk, was named as his heir.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/28.htm' }
        },
        {
          id: 'q3',
          text: 'Political life in Egypt during this period has been described as basically triangular, consisting of the king, the Wafd, and the British.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/29.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The king\'s rights included selecting and appointing the prime minister, dismissing the cabinet, and dissolving Parliament.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/29.htm' }
        },
        {
          id: 'q5',
          text: 'The British had overwhelming power, and if their interests were at stake, their power prevailed over the other two.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/29.htm' }
        },
        {
          id: 'q6',
          text: 'On April 28, 1936, King Fuad died and was succeeded by his son, Faruk.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/29.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'On June 18, Egypt was declared a republic, and the monarchy was abolished, ending the rule of Muhammad Ali\'s dynasty.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    }
  ]
})
