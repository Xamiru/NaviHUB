import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'jameson-raid',
  names: [
    { text: 'Jameson Raid', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1895-12-29' },
        cites: [
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '64' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1896-01-02' },
        cites: [
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '5' } },
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '6' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:doornkop',
      cites: [
        {
          source: 'britannica-1911-jameson-leander-starr',
          loc: { section: 'JAMESON, LEANDER STARR', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:british-empire' }
  ],
  participants: [
    {
      ref: 'person:cecil-rhodes',
      role: 'organizer',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
        },
        { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '65' } }
      ]
    },
    {
      name: 'Leander Starr Jameson',
      role: 'commander',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
        }
      ]
    },
    {
      name: 'Paul Kruger',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 500 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:south-african-war',
      rel: 'contributed-to',
      cites: [
        { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '65' } },
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q10',
          text: 'The discovery of gold on the Witwatersrand greatly increased Boer-British tensions.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q1',
          text: 'These economic tensions lay at the base of a political issue: the right of English speakers to have the vote.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In December 1895, Cecil Rhodes took matters a step further by sending 500 armed men, employees of his British South Africa Company, into the South African Republic under the leadership of Dr. Leander Starr Jameson.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q3',
          text: 'The invasion, however, was a fiasco: Boer commandos disarmed Jameson and his men with little resistance, and the uitlanders took no action.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'On the occasion of the Jameson Raid he despatched to the president of the Transvaal a telegram, in which he congratulated him that “without appealing to the help of friendly powers,” he had succeeded in restoring peace and preserving the independence of his country.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-ii-of-germany',
            loc: { section: 'WILLIAM II. OF GERMANY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_II._of_Germany'
          }
        },
        {
          id: 'q9',
          text: 'It was very difficult to regard this merely as an impulsive act of generous sympathy with a weak state unjustly attacked, and though warmly approved in Germany, it caused a long alienation from Great Britain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-ii-of-germany',
            loc: { section: 'WILLIAM II. OF GERMANY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_II._of_Germany'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Jameson Raid and anti-Boer sentiments expressed by gold magnates and British officials further cemented an Afrikaner sense of distinctiveness, which in the 1890s reached across political boundaries to include Dutch speakers in the Cape and the citizens of the Orange Free State as well as the Transvaalers.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q7',
          text: 'Dieser so genannte Jameson Raid verschärft die Spannungen zwischen Großbritannen und Transvaal im Vorfeld des Burenkriegs.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '65' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Jameson_Raid.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jameson_Raid.jpg',
    credit: { creator: 'William Heysham Overend' },
    license: { id: 'cc-by', version: '4.0' }
  },
  archive: [
    {
      id: 'garrett-edwards-african-crisis-1897',
      mediaKind: 'document',
      title: 'The story of an African crisis: being the truth about the Jameson Raid and Johannesburg revolt of 1896',
      date: { d: '1897' },
      url: 'https://archive.org/download/storyofafricancr00garruoft/storyofafricancr00garruoft.pdf',
      page: 'https://archive.org/details/storyofafricancr00garruoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Garrett, Fydell Edmund, 1865-1907; Edwards, E. J.'
      },
      license: { id: 'public-domain' },
      bytes: 14727711
    }
  ]
})
