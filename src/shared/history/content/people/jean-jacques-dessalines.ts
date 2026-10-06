import { definePerson } from '../../schema'

export default definePerson({
  id: 'jean-jacques-dessalines',
  names: [
    { text: 'Jean-Jacques Dessalines', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['monarch', 'revolutionary', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Dessalines, who had commanded the black and the mulatto forces during the final phase of the revolution, became the new country\'s leader; he ruled under the dictatorial 1801 constitution.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        },
        {
          id: 'q2',
          text: 'In 1805 Dessalines crowned himself Emperor of Haiti.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        },
        {
          id: 'q3',
          text: 'Accordingly, whites were slaughtered wholesale under the rule of Dessalines.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'A group of people, probably hired by Pétion or Etienne-Elie Gérin (another mulatto officer), shot the emperor and hacked his body to pieces.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'The rule of Dessalines set a pattern for direct involvement of the army in politics that continued unchallenged for more than 150 years.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Jean-Jaques_Dessalines_%28Fondateur_de_l%27Independance_d%27Haiti%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jean-Jaques_Dessalines_(Fondateur_de_l%27Independance_d%27Haiti).jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
