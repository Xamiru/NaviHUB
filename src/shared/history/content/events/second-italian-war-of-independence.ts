import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-italian-war-of-independence',
  names: [
    { text: 'Second Italian War of Independence', lang: 'en', role: 'primary' },
    { text: 'Seconda guerra d\'indipendenza italiana', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1859' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1859-07' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  sides: [
    {
      key: 'italians',
      name: 'the Italians',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    },
    {
      key: 'austria',
      name: 'Austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'italians',
      cites: [
        {
          source: 'fordham-documents-of-italian-unification',
          loc: { section: 'Documents of Italian Unification, 1846-61', para: '7' }
        }
      ]
    },
    {
      name: 'Count Cavour',
      role: 'leader',
      side: 'italians',
      cites: [
        {
          source: 'fordham-documents-of-italian-unification',
          loc: { section: 'Documents of Italian Unification, 1846-61', para: '6' }
        }
      ]
    },
    {
      name: 'Franz Joseph',
      role: 'head-of-state',
      side: 'austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:crimean-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The empire\'s peoples could not be isolated from the larger nationalist struggles of the German, Italian, and Slavic peoples.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Because Franz Joseph was unwilling to make the concessions that were Prussia\'s price for assistance from the German Confederation and because he feared the French might stir up trouble in Hungary, Franz Joseph surrendered Lombardy in July 1859.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'La politique italienne de l\'Empereur - en faveur de l\'unification et au détriment de l\'Autriche - permet à la France d\'annexer, après plébiscite, Nice et la Savoie.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        },
        {
          id: 'q4',
          text: 'These failures did not bode well for the anticipated conflict with Prussia over German unification, so the emperor began to abandon absolutism and create a more viable political base.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Bossoli%2C_Carlo_-_Battle_of_Solferino.jpg/1280px-Bossoli%2C_Carlo_-_Battle_of_Solferino.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bossoli,_Carlo_-_Battle_of_Solferino.jpg',
    credit: { creator: 'Carlo Bossoli' },
    license: { id: 'public-domain' }
  }
})
