import { definePolity } from '../../schema'

export default definePolity({
  id: 'austrian-empire',
  names: [
    { text: 'Austrian Empire', lang: 'en', role: 'primary' },
    { text: 'Kaisertum Österreich', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1804-08-11' },
        cites: [
          {
            source: 'britannica-1911-austria-hungary',
            loc: { section: 'AUSTRIA-HUNGARY', para: '331' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:vienna',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Austria-Hungary (code 300), capital Vienna' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 131964 },
    { set: 'europe', code: 300, to: 1867 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Friedrich_von_Amerling_-_Kaiser_Franz_I._von_%C3%96sterreich_%281832%29.jpg/1280px-Friedrich_von_Amerling_-_Kaiser_Franz_I._von_%C3%96sterreich_%281832%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Friedrich_von_Amerling_-_Kaiser_Franz_I._von_%C3%96sterreich_(1832).jpg',
    credit: { institution: 'Kunsthistorisches Museum', creator: 'Friedrich von Amerling' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Austria was the German-speaking heartland of the Holy Roman Empire (until 1806), the Austrian Empire (until 1867), and the Austro-Hungarian Empire (until 1918).',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-austrian-empire',
            loc: { section: 'Austrian Empire: Summary', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/austrian-empire'
          }
        },
        {
          id: 'q2',
          text: 'Although Austria emerged from the Congress of Vienna as one of the great powers in Europe, throughout the nineteenth century its status and territorial integrity depended on the support of at least one of the other great powers.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/austria/20.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Because French domination of Germany raised the possibility that Napoleon Bonaparte or one of his subordinates could be elected Holy Roman Emperor, Leopold\'s son, Franz II (r. 1792- 1835), took two steps to protect Habsburg interests. First, to guarantee his family\'s continued imperial status, he adopted a new, hereditary title, Emperor of Austria, in 1804, thus becoming Franz I of Austria. Second, to preclude completely the possibility of Napoleon\'s election, in 1806 he renounced the title of Holy Roman Emperor and dissolved the Holy Roman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Napoleonic Wars', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/austria/19.htm' }
        },
        {
          id: 'q4',
          text: 'On the 14th of May 1804, Napoleon was proclaimed emperor of the French; on the 11th of August Francis II. assumed the style of Francis I., hereditary emperor of Austria.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-austria-hungary',
            loc: { section: 'AUSTRIA-HUNGARY', para: '331' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Austria-Hungary'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'To cap the reorganization, the mentally incompetent Ferdinand formally abdicated on December 2, 1848, and his eighteen-year-old nephew was crowned Emperor Franz Joseph I (r. 1848-1916).',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The Compromise Ausgleich of 1867 divided the Habsburg Empire into two separate states with equal rights under a common ruler, hence the term "Dual Monarchy."',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/austria/26.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'rumpler-1997-eine-chance-fur-mitteleuropa', perspective: 'european' },
    { source: 'wandruszka-urbanitsch-1973-die-habsburgermonarchie', perspective: 'european' }
  ]
})
