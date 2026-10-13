import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tokugawa-shogunate-founding',
  names: [
    { text: 'Founding of the Tokugawa shogunate', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1600' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1603' },
        cites: [
          { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:sekigahara',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '3' }
        }
      ]
    },
    {
      ref: 'place:edo',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:tokugawa-shogunate',
      cites: [
        { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tokugawa-ieyasu',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '2' }
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
          text: 'Instrumental in the rise of the new bakufu was Tokugawa Ieyasu, the main beneficiary of the achievements of Nobunaga and Hideyoshi.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q2',
          text: 'The Tokugawa (or Edo) period brought 200 years of stability to Japan.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Three major figures dominated the period in succession: Oda Nobunaga (1534-82), Toyotomi Hideyoshi (1536-98), and Tokugawa Ieyasu (1542-1616), each of whom emerged as a major overlord with large military forces under his command.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Reunification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/18.htm' }
        },
        {
          id: 'q4',
          text: 'After Hideyoshi\'s death, Ieyasu moved quickly to seize control from the Toyotomi family.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The political system evolved into what historians call bakuhan, a combination of the terms bakufu and han (domains) to describe the government and society of the period.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q6',
          text: 'Finally, in 1635 an edict prohibited any Japanese from traveling outside Japan or, if someone left, from ever returning.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        },
        {
          id: 'q7',
          text: 'Besides small trade of some outer daimyo with Korea and the Ryukyu Islands, to the southwest of Japan\'s main islands, by 1641 foreign contacts were limited to Nagasaki.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1600' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Tokugawa Period', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Ieyasu\'s victory over the western daimyo at the Battle of Sekigahara (1600) gave him virtual control of all Japan.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1603' },
            cites: [
              { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The founder of this dynasty was Iyéyasu Tokugawa (1542–1616), a great general and consummate politician, who was connected by descent with the Minamoto clan.',
        lang: 'en',
        cite: { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tokugawa'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1605' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Tokugawa Period', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After further strengthening his power base, Ieyasu was confident enough to install his son Hidetada (1579-1632) as shogun and himself as retired shogun in 1605.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1615' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Tokugawa Period', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1615 the Toyotomi stronghold at Osaka was destroyed by the Tokugawa army.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Battle_of_Sekigahara_folding_screen.jpg/1280px-Battle_of_Sekigahara_folding_screen.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Sekigahara_folding_screen.jpg',
    credit: { creator: 'Unknown' },
    license: { id: 'public-domain' }
  }
})
