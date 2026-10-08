import { definePolity } from '../../schema'

export default definePolity({
  id: 'bangladesh',
  names: [
    { text: 'Bangladesh', lang: 'en', role: 'primary' },
    { text: 'বাংলাদেশ', lang: 'bn', role: 'native', translit: 'Bāṅlādeś' },
    {
      text: 'People’s Republic of Bangladesh',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Foreword', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1971-03-26' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Independence', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:dhaka',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Bangladesh (code 771), capital Dhaka' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 771, from: 1971.958, to: 2019.999 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Bangladesh_%28WFB_2000%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_of_Bangladesh_(WFB_2000).jpg',
    credit: { institution: 'CIA World Factbook' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BANGLADESH, FORMERLY THE East Wing of Pakistan, emerged as an independent nation in December 1971.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/3.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The "independent, sovereign republic of Bangladesh" was first proclaimed in a radio message broadcast from a captured station in Chittagong on March 26, 1971.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Independence', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
        },
        {
          id: 'q3',
          text: 'On April 17, the "Mujibnagar" government formally proclaimed independence and named Mujib as its president.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Independence', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Constitution--adopted on November 4, 1972--stated that the new nation was to have a prime minister appointed by the president and approved by a single-house parliament.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'When Bangladesh joined the community of nations, it was at first recognized by only India and Bhutan.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/3.htm' }
        }
      ]
    }
  ]
})
