import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-japanese-war',
  names: [
    { text: 'Russo-Japanese War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '5'
            }
          },
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '35' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1905-09' },
        cites: [
          {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '2'
            }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'russia-central-asia'],
  prominence: 1,
  sides: [
    {
      key: 'russia',
      name: 'Russia',
      cites: [
        {
          source: 'state-dept-milestones-portsmouth',
          loc: {
            section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
            para: '2'
          }
        }
      ]
    },
    {
      key: 'japan',
      name: 'Japan',
      cites: [
        {
          source: 'state-dept-milestones-portsmouth',
          loc: {
            section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
            para: '2'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nicholas-ii',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
        }
      ]
    },
    {
      ref: 'person:theodore-roosevelt',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-portsmouth',
          loc: {
            section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
            para: '2'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:treaty-of-portsmouth', rel: 'followed-by' },
    {
      ref: 'event:russian-revolution-of-1905',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '1' }
        }
      ]
    },
    {
      ref: 'event:persian-constitutional-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1905' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'By 1904, Russia and Japan had endured several years of disputes over control of Manchuria.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        },
        {
          id: 'q2',
          text: 'Russia\'s uncoordinated and aggressive moves in the region ultimately led to the Russo-Japanese War (1904-05).',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '33' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q3',
          text: 'Witte and some Russian diplomats wanted to compromise with Japan and trade Manchuria for Korea, but a group of Witte\'s reactionary enemies, courtiers, and military and naval leaders refused to compromise. The tsar favored their viewpoint, and, disdaining Japan\'s threats--despite the latter\'s formal alliance with Britain--the Russian government equivocated until Japan declared war in early 1904.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '35' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In 1904, the Japanese attacked the Russian fleet at Port Arthur before the formal declaration of war was received in Moscow, surprising the Russian navy and earning an early victory.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        },
        {
          id: 'q5',
          text: 'In the war that followed, Japan\'s location, technological superiority, and superior morale gave it command of the seas, and Russia\'s sluggishness and incompetent commanders caused continuous setbacks on land.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'War casualties were high on both sides. At the battle over Mukden, the Russians lost 60,000 soldiers and the Japanese lost 41,000 soldiers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The Russo-Japanese War was a turning point in Russian history. It led to a popular uprising against the government that forced the regime to respond with domestic economic and political reforms.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1905-01' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In January 1905, after an eight-month siege, Russia surrendered Port Arthur, and in March the Japanese forced the Russians to withdraw north of Mukden.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1905-05' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In May, at the Tsushima Straits, the Japanese destroyed Russia\'s last hope in the war, a fleet assembled from the navy\'s Baltic and Mediterranean squadrons.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '36' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Battle_of_Port_Arthur_original.jpg/1280px-Battle_of_Port_Arthur_original.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Port_Arthur_original.jpg',
    credit: { institution: 'Library of Congress', creator: 'Kasai Torajirō' },
    license: { id: 'public-domain' }
  }
})
