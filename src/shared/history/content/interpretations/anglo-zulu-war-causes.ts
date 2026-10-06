import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-zulu-war-causes',
  about: ['event:anglo-zulu-war'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'federation-policy',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Army Museum' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1877, Lord Carnarvon, Secretary of State for the Colonies, was keen to extend British imperial influence in South Africa.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '7' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        },
        {
          id: 'q2',
          text: 'However, King Cetshwayo rejected Frere\'s demands for federation, as this would result in a loss of power, and refused to disband his Zulu army.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '8' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    },
    {
      id: 'labour-and-land',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Because blacks would not put up with such conditions if they could maintain an autonomous existence on their own lands, the British embarked on a large-scale program of conquest in the 1870s and the 1880s.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Africans and Industrialization', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/15.htm' }
        },
        {
          id: 'q4',
          text: 'As a result of such pressures, the British fought wars against the Zulu, the Griqua, the Tswana, the Xhosa, the Pedi, and the Sotho, conquering all but the last.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Africans and Industrialization', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/15.htm' }
        }
      ]
    }
  ]
})
