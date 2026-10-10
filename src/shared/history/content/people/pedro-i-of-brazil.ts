import { definePerson } from '../../schema'

export default definePerson({
  id: 'pedro-i-of-brazil',
  names: [
    { text: 'Pedro I of Brazil', lang: 'en', role: 'primary' },
    { text: 'Pedro I', lang: 'pt', role: 'native' },
    { text: 'Dom Pedro', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  regions: ['latin-america'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Brazil',
      polity: 'polity:empire-of-brazil',
      start: {
        alts: [
          {
            value: { d: '1822' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1831-04' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '16' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '1' }
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
          text: 'Dom Pedro meant to rule frugally and started by cutting his own salary, centralizing scattered government offices, and selling off most of the royal horses and mules.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1824 Pedro closed the Constituent Assembly that he had convened because he believed that body was endangering liberty.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q3',
          text: 'He then produced a constitution modeled on that of Portugal (1822) and France (1814).',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q4',
          text: 'It specified indirect elections and created the usual three branches of government but also added a fourth, the moderating power, to be held by the emperor.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'When Pedro dismissed his cabinet in April 1831, street and military demonstrators demanded its reinstatement in violation of his constitutional prerogatives. He refused, saying: "I will do anything for the people but nothing [forced] by the people."',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'Failing to form a new cabinet, he abdicated in favor of his five-year-old son Pedro II, boarded a British warship, and left Brazil as he had arrived, under the Union Jack.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Pedro_I_of_Brazil_1830.jpg/1280px-Pedro_I_of_Brazil_1830.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pedro_I_of_Brazil_1830.jpg',
    credit: { institution: 'Museu Imperial', creator: 'Simplício Rodrigues de Sá' },
    license: { id: 'public-domain' }
  }
})
