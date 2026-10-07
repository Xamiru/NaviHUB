import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bosnian-annexation-crisis',
  names: [
    { text: 'Bosnian annexation crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
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
          id: 'q4',
          text: 'A crisis erupted in 1908, when Turkey began to be reorganized as a constitutional state. Bosnia and Hercegovina, which was Turkish territory under Austro-Hungarian administration, was invited to send delegates to the new Turkish parliament. Austria-Hungary responded by formally annexing Bosnia and Hercegovina in violation of various international agreements.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE FINAL YEARS OF THE EMPIRE AND WORLD WAR I: The Crisis over Bosnia and Hercegovina',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/30.htm' }
        },
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
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Le_Petit_Journal_Balkan_Crisis_%281908%29.jpg/1280px-Le_Petit_Journal_Balkan_Crisis_%281908%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Le_Petit_Journal_Balkan_Crisis_(1908).jpg',
    credit: { institution: 'Le Petit Journal (Supplément illustré, 18 October 1908)' },
    license: { id: 'public-domain' }
  }
})
