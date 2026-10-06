import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bosnian-annexation-crisis',
  names: [
    { text: 'Bosnian annexation crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1908' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '15' }
          },
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  participants: [
    {
      name: 'Aleksandr Izvol\'skiy',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '15' }
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
          text: 'But in 1908, Izvol\'skiy foolishly consented to support formal annexation in return for Austria\'s support for revision of the agreement on the neutrality of the Bosporus and Dardanelles--a change that would give Russia special navigational rights of passage. Britain stymied the Russian gambit by blocking the revision, but Austria proceeded with the annexation. Then, backed by German threats of war, Austria-Hungary exposed Russia\'s weakness by forcing Russia to disavow support for Serbia.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'After Austria-Hungary\'s annexation of Bosnia and Herzegovina, Russia became a major part of the increased tension and conflict in the Balkans.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        },
        {
          id: 'q3',
          text: 'The complex system of alliances and Great Power support was extremely unstable; among the Balkan parties harboring resentments over past defeats, the Serbs maintained particular animosity toward the Austro-Hungarian annexation of Bosnia and Herzegovina.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    }
  ]
})
