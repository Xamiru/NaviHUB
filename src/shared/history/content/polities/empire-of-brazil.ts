import { definePolity } from '../../schema'

export default definePolity({
  id: 'empire-of-brazil',
  names: [
    { text: 'Empire of Brazil', lang: 'en', role: 'primary' },
    { text: 'Império do Brasil', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1822-09-07' },
        cites: [
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1889-11-15' },
        cites: [
          { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '386' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:rio-de-janeiro',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Brazil (code 140), capital Rio de Janeiro' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 217230 },
    { set: 'world', code: 140, to: 1889.87 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Coronation_of_Pedro_I_of_Brazil_%28by_Debret%29_%E2%80%93_1828.jpg/1280px-Coronation_of_Pedro_I_of_Brazil_%28by_Debret%29_%E2%80%93_1828.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Coronation_of_Pedro_I_of_Brazil_(by_Debret)_%E2%80%93_1828.jpg',
    credit: { institution: 'Palácio Itamaraty', creator: 'Jean-Baptiste Debret' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under the long reign of Dom Pedro II. progress and material prosperity made steady advancement in Brazil.',
          lang: 'en',
          cite: { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '545' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Brazil'
          }
        },
        {
          id: 'q2',
          text: 'The constitution of 1824 had created the usual three governmental powers--executive, legislative, and judicial--and a fourth, the moderating power. The emperor held this power, which gave him the right to name senators, to dismiss the legislature, and to shift control of the government from one party to the other. In theory, he was to act as the political balance wheel.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Returning from an excursion to Santos, Pedro received messages from his wife and from Andrada e Silva that the Côrtes considered his government traitorous and was dispatching more troops. In a famous scene at Ipiranga on September 7, 1822, he had to choose between returning to Portugal in disgrace or opting for independence. He tore the Portuguese blue and white insignia from his uniform, drew his sword, and swore: "By my blood, by my honor, and by God: I will make Brazil free." Their motto, he said, would be "Independence or Death!"',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Britain and Portugal recognized Brazilian independence by signing a treaty on August 29, 1825.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q5',
          text: 'The 1870s and 1880s saw a crisis in each of the three pillars of the imperial regime--the church, the military, and the slaveholding system.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'On the 14th of November 1889 the palace was quietly surrounded, and on the following morning the emperor and his family were placed on board ship and sent off to Portugal. A provisional government was then formed and a proclamation issued to the effect that the country would henceforth be known as the United States of Brazil, and that in due time a republican constitution would be framed.',
          lang: 'en',
          cite: { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '547' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Brazil'
          }
        },
        {
          id: 'q7',
          text: 'In the end, the empire fell because the elites did not need it to protect their interests.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'holanda-1960-historia-geral-da-civilizacao-brasileira',
      perspective: 'latin-american'
    },
    { source: 'carvalho-1980-a-construcao-da-ordem', perspective: 'latin-american' }
  ]
})
