import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'texas-revolution-causes',
  about: ['event:texas-revolution'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'texan-grievances',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Convention of the people of Texas' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In this expectation they have been cruelly disappointed, inasmuch as the Mexican nation has acquiesced in the late changes made in the government by General Antonio Lopez de Santa Anna, who having overturned the constitution of his country, now offers us the cruel alternative, either to abandon our homes, acquired by so many privations, or submit to the most intolerable of all tyranny, the combined despotism of the sword and the priesthood.',
          lang: 'en',
          cite: {
            source: 'tslac-texas-declaration-of-independence-1836',
            loc: { section: 'Declaration of Independence of Texas, 1836', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.tsl.texas.gov/treasures/republic/declaration.html'
          }
        },
        {
          id: 'q2',
          text: 'It has sacrificed our welfare to the state of Coahuila, by which our interests have been continually depressed through a jealous and partial course of legislation, carried on at a far distant seat of government, by a hostile majority, in an unknown tongue, and this too, notwithstanding we have petitioned in the humblest terms for the establishment of a separate state government, and have, in accordance with the provisions of the national constitution, presented to the general Congress a republican constitution, which was, without just cause, contemptuously rejected.',
          lang: 'en',
          cite: {
            source: 'tslac-texas-declaration-of-independence-1836',
            loc: { section: 'Declaration of Independence of Texas, 1836', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.tsl.texas.gov/treasures/republic/declaration.html'
          }
        }
      ]
    },
    {
      id: 'centralism',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The nationalist and authoritarian style of the new centralist regime soon brought it into conflict with the loosely governed lands of Mexico\'s northern frontier.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        },
        {
          id: 'q4',
          text: 'Santa Anna\'s efforts to exert central authority over the English-speaking settlements in the northern state of Coahuila-Tejas eventually collided with the growing assertiveness of the frontier population that described itself as Texan.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        }
      ]
    },
    {
      id: 'american-colonization',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'By 1835 they outnumbered the Mexicans, four to one.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q6',
          text: 'Most Mexicans began to fear the incursions by North Americans and the possibility of losing Texas to the United States.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q7',
          text: 'Restrictions were placed on the future immigration of colonists from the United States, and slavery was abolished in 1829 in the hope of discouraging United States southerners from moving into the area.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        }
      ]
    }
  ]
})
