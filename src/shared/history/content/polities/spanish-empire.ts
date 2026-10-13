import { definePolity } from '../../schema'

export default definePolity({
  id: 'spanish-empire',
  names: [
    { text: 'Spanish Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1516' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 80702, to: 1700 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Cross_of_Burgundy.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_of_Cross_of_Burgundy.svg',
    credit: { creator: 'Ningyou.' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On Ferdinand\'s death in 1516, Charles of Ghent, the son of Juana and Philip, inherited Spain (which he ruled as Charles I, r. 1516-56), its colonies, and Naples.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q2',
          text: 'Charles, in only a few years, was able to bring together the world\'s most diverse empire since Rome.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Ferdinand and Isabella were the last of the Trastamaras, and a native dynasty would never again rule Spain.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q4',
          text: 'The political union of the several independent realms in the Iberian Peninsula and the final expulsion of the Moors after 700 years of intermittent warfare had instilled in Spaniards a sense of destiny and a militant religious zeal.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When he abdicated in 1556 to retire to a Spanish monastery, Charles divided his empire.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q6',
          text: 'He governed his scattered dominions through a system of councils, such as the Council of the Indies, which were staffed by professional civil servants whose activities were coordinated by the Council of State, which was responsible to Philip.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q7',
          text: 'Spain was also Europe\'s preeminent military power, with occasion to exercise its strength on many fronts--on land in Italy, Germany, North Africa, and the Netherlands, and at sea against the Dutch, French, Turks, and English.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q8',
          text: 'But the repulse of the great Spanish armament was an event of the first historical importance.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The seventeenth century was a period of unremitting political, military, economic, and social decline.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Spain in Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/9.htm' }
        },
        {
          id: 'q10',
          text: 'Portugal, with English aid, reasserted its independence in 1640, and an attempt was made to separate Andalusia from Spain.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Spain in Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/9.htm' }
        },
        {
          id: 'q11',
          text: 'During the long regency for Charles II (1665-1700), the last of the Spanish Habsburgs, validos milked Spain\'s treasury, and Spain\'s government operated principally as a dispenser of patronage.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Spain in Decline', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/9.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'Well into the seventeenth century, music, art, literature, theater, dress, and manners from Spain\'s Golden Age were admired and imitated; they set a standard by which the rest of Europe measured its culture.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        }
      ]
    }
  ]
})
