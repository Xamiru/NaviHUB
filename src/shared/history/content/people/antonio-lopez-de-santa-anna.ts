import { definePerson } from '../../schema'

export default definePerson({
  id: 'antonio-lopez-de-santa-anna',
  names: [
    { text: 'Antonio López de Santa Anna', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['military', 'politician'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In the two decades after the 1834 collapse of the federal republic, Santa Anna dominated Mexico\'s politics.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        },
        {
          id: 'q2',
          text: 'Between 1833 and 1855, the caudillo occupied the presidency eleven times, completing none of his terms and frequently leaving the government in the hands of weak caretaker administrations.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        },
        {
          id: 'q3',
          text: 'Upon assuming dictatorial powers, Santa Anna promptly annulled Gómez Farías\'s reforms and abolished the constitution of 1824.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Santa Anna\'s bravery, energy, and organizational abilities were often matched by his vanity, cruelty, and opportunism.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        },
        {
          id: 'q5',
          text: 'His feats of heroism in victorious battle, his bold interventions in the political life of the country, and his countless shifts from one side of the political spectrum to the other responded to the insecurities of Mexican nationalists and the vacillations of the republic\'s fractious political class.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Antonio_Lopez_de_Santa_Anna%2C_head-and-shoulders_portrait%2C_facing_front_LCCN2005683078.jpg/1280px-Antonio_Lopez_de_Santa_Anna%2C_head-and-shoulders_portrait%2C_facing_front_LCCN2005683078.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Antonio_Lopez_de_Santa_Anna,_head-and-shoulders_portrait,_facing_front_LCCN2005683078.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
