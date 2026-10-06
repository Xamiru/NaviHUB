import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'crimean-war',
  names: [
    { text: 'Crimean War', lang: 'en', role: 'primary' },
    { text: 'Крымская война', lang: 'ru', role: 'native' },
    {
      text: 'guerre de Crimée',
      lang: 'fr',
      role: 'alternative',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1853' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '16'
            }
          },
          {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '1' }
          }
        ]
      },
      {
        value: { d: '1854' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1856-04' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '4' }
          }
        ]
      },
      {
        value: { d: '1855' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '16'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:sevastopol',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'allies',
      name: 'France, Britain, and the Ottoman Empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    },
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
        }
      ]
    },
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      name: 'Lord John Russell',
      role: 'participant',
      side: 'allies',
      cites: [
        {
          source: 'hansard-commons-1854-03-31-war-with-russia',
          loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '3' }
        }
      ]
    },
    {
      name: 'Earl of Clarendon',
      role: 'participant',
      side: 'allies',
      cites: [
        {
          source: 'hansard-lords-1854-03-31-war-with-russia',
          loc: { section: 'HL Deb 31 March 1854 vol 132 cc140-98', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-paris-1856',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
        }
      ]
    },
    { ref: 'period:reign-of-nicholas-i', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1853 Tsar Nicholas I of Russia described the Ottoman Empire as "the sick man of Europe."',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'Russia withdrew from Walachia and Moldavia in 1851 but returned yet again in the summer of 1853, thus precipitating the Crimean War.',
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
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The Crimean War (1854-56) pitted France, Britain, and the Ottoman Empire against Russia.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q4',
          text: 'Fearing the results of an Ottoman defeat by Russia, in 1854 Britain and France joined what became known as the Crimean War on the Ottoman side.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'Austria offered the Ottomans diplomatic support, and Prussia remained neutral, leaving Russia without allies on the continent.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q6',
          text: 'The European allies landed in Crimea and laid siege to the well-fortified Russian base at Sevastopol\'. After a year\'s siege the base fell, exposing Russia\'s inability to defend a major fortification on its own soil.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q7',
          text: 'During the Crimean War (1853-56), the situation in Hungary made Austria vulnerable to economic and political pressure from Britain and France, the allies of Turkey against Russia. Thus, when Russia asked for Austria\'s support, Austria initially sought to mediate the conflict but then joined the western allies against Russia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        },
        {
          id: 'q8',
          text: 'A l\'occasion de la guerre de Crimée, Napoléon III confirme le retour de la France dans la vie politique européenne.',
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
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Nicholas I died before the fall of Sevastopol\', but he already had recognized the failure of his regime.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q10',
          text: 'Russia now faced the choice of initiating major reforms or losing its status as a major European power.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q11',
          text: 'By failing to repay Russia for its help in Hungary in 1849, Austria lost critical Russian support for its position in Germany and Italy.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        },
        {
          id: 'q12',
          text: 'In the meantime, the diplomatic scene had changed since the end of the Crimean War in April, 1856: Russia could consider further progress toward India, and France was no longer Britain’s ally (Standish, “The Persian War,” p. 30).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1854-03-31' },
            cites: [
              {
                source: 'hansard-commons-1854-03-31-war-with-russia',
                loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'It is now more than half a century since a Message of a similar import was brought to this House.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1854-03-31-war-with-russia',
          loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1854/mar/31/war-with-russia-the-queens-message'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/RogerFentonvalley1.jpg/1280px-RogerFentonvalley1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RogerFentonvalley1.jpg',
    credit: {
      institution: 'Library of Congress Prints and Photographs Division',
      creator: 'Roger Fenton'
    },
    license: { id: 'public-domain' }
  }
})
