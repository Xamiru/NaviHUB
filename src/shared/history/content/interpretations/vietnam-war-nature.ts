import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'vietnam-war-nature',
  about: ['event:vietnam-war'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'defending-south-vietnam-against-aggression',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Lyndon B. Johnson' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The first reality is that North Viet-Nam has attacked the independent nation of South Viet-Nam. Its object is total conquest.',
          lang: 'en',
          cite: { source: 'lbj-1965-04-07-address-at-johns-hopkins-university', loc: { para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-7-1965-address-johns-hopkins-university'
          }
        },
        {
          id: 'q2',
          text: 'We are there because we have a promise to keep. Since 1954 every American President has offered support to the people of South Viet-Nam. We have helped to build, and we have helped to defend. Thus, over many years, we have made a national pledge to help South Viet-Nam defend its independence.',
          lang: 'en',
          cite: { source: 'lbj-1965-04-07-address-at-johns-hopkins-university', loc: { para: '25' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-7-1965-address-johns-hopkins-university'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The VWP leadership concluded that only armed struggle would lead to success and called for an escalation of the war.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Escalation of the War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/vietnam/28.htm' }
        },
        {
          id: 'q7',
          text: 'Moreover, with the completion of the so-called Ho Chi Minh Trail through Laos, the number of PAVN troops infiltrated into the South began to increase.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Escalation of the War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/vietnam/28.htm' }
        }
      ]
    },
    {
      id: 'resistance-war-against-the-us-invaders',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Socialist Republic of Vietnam (Ministry of National Defence)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Our resistance war against the US invaders is such a historic one. Right in the fiercest stage of the war, on 17 July 1966, President Ho Chi Minh gave out his call for national resistance against the U.S invaders in which he affirmed: “Nothing is more precious than independence and freedom”.',
          lang: 'en',
          cite: {
            source: 'vn-national-defence-journal-2016-nothing-more-precious',
            loc: { para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://tapchiqptd.vn/en/research-and-discussion/value-of-ho-chi-minhs-thought-nothing-is-more-precious-than-independence-and-freedom-in-th/9210.html'
          }
        },
        {
          id: 'q4',
          text: '1. When the US troops directly engaged in the South in 1965 and escalated the war to the North, our independence and freedom was severely threatened.',
          lang: 'en',
          cite: {
            source: 'vn-national-defence-journal-2016-nothing-more-precious',
            loc: { para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://tapchiqptd.vn/en/research-and-discussion/value-of-ho-chi-minhs-thought-nothing-is-more-precious-than-independence-and-freedom-in-th/9210.html'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'Escalation of the war resulted in some immediate success for the struggle in the South. By 1964 a liberated zone had been established from the Central Highlands to the edge of the Mekong Delta, giving the communists control over more than half the total land area and about half the population of the South.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Escalation of the War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/vietnam/28.htm' }
        }
      ]
    },
    {
      id: 'from-containment-to-prestige',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'United States support for South Vietnam, which had begun as an effort to defend Southeast Asia from the communist threat, developed into a matter of preserving United States prestige.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Escalation of the War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/28.htm' }
        }
      ]
    }
  ]
})
