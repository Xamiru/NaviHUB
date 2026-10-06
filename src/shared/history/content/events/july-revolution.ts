import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'july-revolution',
  names: [
    { text: 'July Revolution', lang: 'en', role: 'primary' },
    { text: 'Révolution de Juillet', lang: 'fr', role: 'native' },
    {
      text: 'Revolution of 1830',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'ehne-koch-female-allegories-nation',
          loc: { section: 'Female allegories of the nation' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1830' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '16' }
          },
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Charles X',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
        }
      ]
    },
    {
      name: 'Louis Philippe',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:november-uprising', rel: 'related' },
    { ref: 'event:belgian-revolution', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In the period between Napoleon\'s downfall in 1815 and the revolution of 1830, the restored French monarchy was in crisis, and the dey was weak politically, economically, and militarily.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Hardly had the news of the capture of Algiers reached Paris than Charles X was deposed, and his cousin Louis Philippe, the "citizen king," was named to preside over a constitutional monarchy.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'In 1830, after a popular uprising had occurred in France, the Poles in Russian Poland revolted.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q4',
          text: 'Liberty Leading the People, immortalized by Eugène Delacroix after the Revolution of 1830, was not yet called Marianne, but indeed personified revolutionary France.',
          lang: 'en',
          cite: {
            source: 'ehne-koch-female-allegories-nation',
            loc: { section: 'Female allegories of the nation' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/female-allegories-nation'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Eug%C3%A8ne_Delacroix_-_Liberty_Leading_the_People_%2828th_July_1830%29_-_WGA6177.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Liberty_Leading_the_People_(28th_July_1830)_-_WGA6177.jpg',
    credit: { institution: 'Musée du Louvre', creator: 'Eugène Delacroix' },
    license: { id: 'public-domain' }
  }
})
