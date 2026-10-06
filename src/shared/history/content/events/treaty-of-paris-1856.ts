import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-paris-1856',
  names: [
    { text: 'Treaty of Paris (1856)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1856' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
          },
          {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    { ref: 'place:paris' }
  ],
  participants: [
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:crimean-war',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
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
          text: 'The 1856 Treaty of Paris, signed at the end of the Crimean War, had demilitarized the Black Sea and deprived Russia of southern Bessarabia and a narrow strip of land at the mouth of the Danube River.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'The treaty gave the West European powers the nominal duty of protecting Christians living in the Ottoman Empire, removing that role from Russia, which had been designated as such a protector in the 1774 Treaty of Kuchuk-Kainarji.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q3',
          text: 'Under the Treaty of Paris, which ended the war, Russia abandoned its claim to protect Orthodox Christians in the Ottoman Empire and renounced the right to intervene in the Balkans.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q4',
          text: 'De jure Ottoman suzerainty over the principalities continued after the treaty, which abolished the Russian protectorate and replaced it with a joint European guarantee. The treaty also freed navigation on the Danube and forced Russia to cede part of southern Bessarabia, which included control of the river\'s mouth, to Moldavia.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/15.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Russia\'s primary goal during the first phase of Alexander II\'s foreign policy was to alter the Treaty of Paris to regain naval access to the Black Sea.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q6',
          text: 'The year 1856 began the active campaign for union of Walachia and Moldavia.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/15.htm' }
        },
        {
          id: 'q7',
          text: 'The Romanians themselves overcame the imposed separation in 1859 when the separate assemblies at Bucharest and Iasi unanimously elected the same man, Alexandru Ioan Cuza, governor of both principalities.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/15.htm' }
        },
        {
          id: 'q8',
          text: 'Distracted by war in Italy, the leading European nations yielded to a fait accompli and accepted unification, and Cuza (1859-66) became prince.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/15.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Congress_of_Paris_1856.jpg/1280px-Congress_of_Paris_1856.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Congress_of_Paris_1856.jpg',
    credit: { creator: 'Edouard Louis Dubufe' },
    license: { id: 'public-domain' }
  }
})
