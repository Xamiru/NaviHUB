import { definePerson } from '../../schema'

export default definePerson({
  id: 'toussaint-louverture',
  names: [
    { text: 'Toussaint Louverture', lang: 'en', role: 'primary' },
    {
      text: 'Toussaint L’Ouverture',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-haitian-revolution',
          loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1743', approx: true, notAfter: '1746' },
        cites: [
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1803-04-07' },
        cites: [
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['revolutionary', 'military'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Born sometime between 1743 and 1746 in Saint-Domingue, Toussaint belonged to the small, fortunate class of slaves employed by humane masters as personal servants.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'A constitution, approved in 1801 by the then still-extant Colonial Assembly, granted Toussaint, as Governor-general-for-life, all effective power as well as the privilege of choosing his successor.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Recognizing his weak position, Toussaint surrendered to Leclerc on May 5, 1802. The French assured Toussaint that he would be allowed to retire quietly, but a month later, they seized him and transported him to France, where he died of neglect in the frigid dungeon of Fort de Joux in the Jura Mountains on April 7, 1803.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Social historian James G. Leyburn has said of Toussaint Louverture that "what he did is more easily told than what he was."',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Portret_van_Toussaint_Louverture%2C_RP-P-1878-A-2156.jpg/1280px-Portret_van_Toussaint_Louverture%2C_RP-P-1878-A-2156.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portret_van_Toussaint_Louverture,_RP-P-1878-A-2156.jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' }
  }
})
