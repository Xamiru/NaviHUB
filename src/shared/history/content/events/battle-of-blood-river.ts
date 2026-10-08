import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-blood-river',
  names: [
    { text: 'Battle of Blood River', lang: 'en', role: 'primary' },
    { text: 'Slag van Bloedrivier', lang: 'af', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1838-12' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 3,
  places: [
    {
      ref: 'place:blood-river',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:great-trek' }
  ],
  sides: [
    {
      key: 'voortrekkers',
      name: 'the Voortrekkers',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    },
    {
      key: 'zulu',
      name: 'Dingane\'s army',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Andries Pretorius',
      role: 'commander',
      side: 'voortrekkers',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    },
    {
      name: 'Dingane',
      role: 'leader',
      side: 'zulu',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    },
    {
      name: 'Mpande',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '6' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'voortrekkers',
      value: {
        alts: [
          {
            value: { min: 500 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Great Trek', para: '5' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Dingane then sent out Zulu regiments to eliminate all Voortrekkers in the area; they killed several hundred men, women, and children and captured more than 35,000 head of cattle and sheep.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Commanded by Andries Pretorius, the Voortrekkers pledged that they would commemorate a victory as a sign of divine protection. They then met and defeated Dingane\'s army at the Battle of Blood River.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q2',
          text: 'Not all of the settlers were killed, however, and in December the survivors, reinforced by men from the Cape Colony, marched 500 strong to avenge the deaths of Retief and his followers.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Zulu kingdom split into warring factions after this defeat.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q6',
          text: 'One group under Mpande, a half-brother of Shaka and Dingane, allied with Pretorius and the Voortrekkers, and together they succeeded in destroying Dingane\'s troops and in forcing him to flee to the lands of the Swazi, where he was killed.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q7',
          text: 'Their victory is celebrated each year on December 16, the Day of the Vow.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gardiner_-_Dingane_in_Ordinary_and_Dancing_Dresses_%281836%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Gardiner_-_Dingane_in_Ordinary_and_Dancing_Dresses_(1836).png',
    credit: {
      institution: 'Allen F. Gardiner, Narrative of a Journey to the Zoolu Country (1836)',
      creator: 'Allen Francis Gardiner'
    },
    license: { id: 'public-domain' }
  }
})
