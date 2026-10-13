import { definePolity } from '../../schema'

export default definePolity({
  id: 'portuguese-empire',
  names: [
    { text: 'Portuguese Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1415' },
        cites: [
          {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Early Voyages', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'south-asia', 'subsaharan-africa'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 200464, to: 1700 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Portuguese_discoveries_and_explorationsV2en.png/1280px-Portuguese_discoveries_and_explorationsV2en.png',
    page: 'https://commons.wikimedia.org/wiki/File:Portuguese_discoveries_and_explorationsV2en.png',
    credit: { creator: 'Descobrimentos e explorações portugueses (Wikimedia Commons contributors)' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Portugal\'s maritime expansion began in 1415 when João I seized Ceuta in Morocco, the western depot for the spice trade.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Early Voyages', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/22.htm' }
        },
        {
          id: 'q2',
          text: 'Having discovered the sea route to India, Manuel organized successive fleets to that region in order to establish Portuguese commercial hegemony.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Empire in Asia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/24.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The maritime expansion of Portugal was the result of the threat to Mediterranean commerce that had developed very rapidly after the crusades, especially the trade in spices.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Maritime Expansion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/21.htm' }
        },
        {
          id: 'q4',
          text: 'Prince Henry was motivated by scientific curiosity and religious fervor, seeing the voyages as a continuation of the crusades against the Muslims and the conversion of new peoples to Christianity, as well as by the desire to open a sea route to India.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Early Voyages', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/22.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In 1505 Francisco de Almeida left Lisbon with a fleet of 22 ships and 2,500 men, 1,500 of whom were soldiers.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Empire in Asia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/24.htm' }
        },
        {
          id: 'q6',
          text: 'This victory assured Portuguese commercial and military hegemony over India and allowed Portugal to extend its empire to the Far East.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Empire in Asia', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/24.htm' }
        },
        {
          id: 'q7',
          text: 'Albuquerque established his capital at Goa, which he attacked and occupied in 1510.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Empire in Asia', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/24.htm' }
        },
        {
          id: 'q8',
          text: 'In 1502 Fernão Noronha was given a three-year commercial monopoly on dyewood in return for exploring 300 leagues (about 1,500 kilometers) of the Brazilian coast each year.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Colonization of Brazil', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/25.htm' }
        },
        {
          id: 'q9',
          text: 'Other seaports and islands were conquered or colonized in rapid succession, and by 1540 Portugal had acquired a line of scattered maritime possessions extending along the coasts of Brazil, East and West Africa, Malabar, Ceylon, Persia, Indo-China and the Malay Archipelago.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '85' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Portugal\'s empire in Asia made its monarchy the richest in Europe and made Lisbon the commercial capital of the world.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Imperial Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/27.htm' }
        },
        {
          id: 'q11',
          text: 'As the empire in Asia was a state-run enterprise, no middle class or commercial sector independent of the crown of any consequence emerged as it had in other parts of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Imperial Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/27.htm' }
        },
        {
          id: 'q12',
          text: 'The empire in the East was rarely solvent.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '89' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        }
      ]
    }
  ]
})
