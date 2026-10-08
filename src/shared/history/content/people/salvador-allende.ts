import { definePerson } from '../../schema'

export default definePerson({
  id: 'salvador-allende',
  names: [
    { text: 'Salvador Allende', lang: 'en', role: 'primary' },
    {
      text: 'Salvador Allende Gossens',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'bcn-resena-salvador-allende-gossens',
          loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '44' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1908-06-26' },
        cites: [
          {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '30' }
          },
          {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '74' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1973-09-11' },
        cites: [
          {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '33' }
          },
          {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '106' }
          },
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende’s Leftist Regime, 1970-73', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'president of Chile',
      start: {
        alts: [
          {
            value: { d: '1970-11-03' },
            cites: [
              {
                source: 'bcn-resena-salvador-allende-gossens',
                loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '39' }
              },
              {
                source: 'state-dept-milestones-allende-years-and-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '6' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1973-09-11' },
            cites: [
              {
                source: 'bcn-resena-salvador-allende-gossens',
                loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '39' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'bcn-resena-salvador-allende-gossens',
          loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '39' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Salvador_Allende%2C_President_of_Chile%2C_gtfy.00154.jpg/1280px-Salvador_Allende%2C_President_of_Chile%2C_gtfy.00154.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Salvador_Allende,_President_of_Chile,_gtfy.00154.jpg',
    credit: {
      institution: 'Library of Congress, Prints and Photographs Division',
      creator: 'Bernard Gotfryd'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 24 the Chilean Congress voted to elect Allende president by a large margin, and on November 3 he was officially sworn in as President of Chile.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-years-and-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q2',
          text: 'Salvador Allende Gossens (Santiago[1], 26 de junio de 1908 – 11 de septiembre de 1973). Médico y político del Partido Socialista de Chile. Presidente de la República entre el 3 de noviembre de 1970 y el 11 de septiembre de 1973.',
          lang: 'es',
          cite: {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Salvador_Allende_Gossens'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'On December 21, 1970, Allende proposed an amendment to the Chilean constitution that would authorize the expropriation of the mining companies. The Chilean Congress passed the nationalization amendment on July 11, 1971, and it became law five days later.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-years-and-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q4',
          text: 'The Allende experiment enjoyed a triumphant first year, followed by two disastrous final years.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende’s Leftist Regime, 1970-73', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q5',
          text: 'On August 22, the Chamber of Deputies charged the Allende government with breaching numerous sections of the Constitution. Allende refuted the allegations, stating that his actions were constitutional.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-years-and-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Allende committed suicide while defending (with an assault rifle) his socialist government against the coup d\'état.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende’s Leftist Regime, 1970-73', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q7',
          text: 'El 11 de septiembre de 1973 fue derrocado su gobierno mediante un Golpe Militar liderado por las Fuerzas Armadas y de Carabineros. Se suicidó ese mismo día durante el ataque al Palacio de La Moneda.',
          lang: 'es',
          cite: {
            source: 'bcn-resena-salvador-allende-gossens',
            loc: { section: 'Reseña Biográfica Salvador Allende Gossens', para: '106' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Salvador_Allende_Gossens'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Debate continues over the reasons for Allende\'s downfall. Why did he fail to preserve democracy or achieve socialism?',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende’s Leftist Regime, 1970-73', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'garces-1976-allende-y-la-experiencia-chilena', perspective: 'latin-american' },
    {
      source: 'chile-1991-informe-de-la-comision-nacional-de-verdad-y-reconciliacion',
      perspective: 'latin-american'
    }
  ]
})
