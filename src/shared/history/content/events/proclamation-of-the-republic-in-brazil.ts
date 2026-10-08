import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-the-republic-in-brazil',
  names: [
    { text: 'Proclamation of the Republic in Brazil', lang: 'en', role: 'primary' },
    { text: 'Proclamação da República', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1889-11-15' },
        cites: [
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '53' } },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '54' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:rio-de-janeiro',
      cites: [
        { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '386' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:empire-of-brazil' },
    { ref: 'polity:republic-of-brazil' }
  ],
  related: [
    {
      ref: 'period:old-republic-brazil',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Old or First Republic, 1889-1930', para: '1' }
        }
      ]
    },
    { ref: 'event:lei-aurea', rel: 'related' }
  ],
  participants: [
    {
      name: 'Field Marshal Manuel Deodoro da Fonseca',
      role: 'leader',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '24' }
        }
      ]
    },
    {
      ref: 'person:pedro-ii-of-brazil',
      role: 'victim',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '24' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Taking advantage of cabinet crises in 1888 and 1889 and of rising frustration among military officers, republicans favoring change by revolution rather than by evolution drew military officers, led by Field Marshal Fonseca, into a conspiracy to replace the cabinet in November 1889. What started as an armed demonstration demanding replacement of a cabinet turned within hours into a coup d\'état deposing Emperor Pedro II.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q8',
          text: 'The rising generation had become honeycombed with republicanism, the prospects of the imperial succession were justly regarded as unsatisfactory, the higher classes had been estranged by the emancipation of the slaves, and all these causes of discontent found expression in a military revolt, which in November 1889 overthrew the seemingly solid edifice of the Brazilian Empire in a few hours.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The end of the war coincided with the resurgence of republicanism as disenchanted liberals cast about for a new route to power.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q4',
          text: 'In 1884 a civilian minister of war attempted to impose order by forbidding officers to write or speak publicly about governmental matters. The subsequent punishments of offending officers led Field Marshal Manuel Deodoro da Fonseca and General José Antônio Correia de Câmara (Visconde de Pelotas) to head protests that eventually forced the minister to resign in February 1887 and the cabinet to fall in March 1888.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q5',
          text: 'Between 1880 and 1889, there were ten cabinets (seven in the first five years) and three parliamentary elections, with no Parliament able to complete its term.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The republicans made Deodoro president (1889-91) and, after a financial crisis, appointed Field Marshal Floriano Vieira Peixoto minister of war to ensure the allegiance of the military.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        },
        {
          id: 'q7',
          text: 'Indeed, the Brazilian people were bystanders to the events shaping their history.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Benedito_Calixto_-_Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica%2C_1893.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Benedito_Calixto_-_Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica,_1893.jpg',
    credit: { creator: 'Benedito Calixto' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'carvalho-1987-os-bestializados', perspective: 'latin-american' },
    { source: 'costa-1977-da-monarquia-a-republica', perspective: 'latin-american' }
  ]
})
