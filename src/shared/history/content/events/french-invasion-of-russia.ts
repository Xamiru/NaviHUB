import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-invasion-of-russia',
  names: [
    { text: 'French invasion of Russia', lang: 'en', role: 'primary' },
    { text: 'Отечественная война 1812 года', lang: 'ru', role: 'native' },
    {
      text: 'Russian campaign',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1812 – THE RUSSIAN DISASTER' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1812-06-24' },
        cites: [
          {
            source: 'hartley-1991-napoleon-in-russia',
            loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1812-12-14' },
        cites: [
          {
            source: 'hartley-1991-napoleon-in-russia',
            loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'france',
      name: 'Grand Army',
      cites: [
        {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russian forces',
      cites: [
        {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '7' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '7' }
        }
      ]
    },
    {
      ref: 'person:mikhail-kutuzov',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'fondation-napoleon-kutuzov',
          loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 600000 },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Ruling the Empire', para: '7' }
              }
            ]
          },
          {
            value: { min: 400000, max: 450000 },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
              }
            ]
          },
          {
            value: { min: 480000 },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1812 – THE RUSSIAN DISASTER'
                }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-leipzig',
      rel: 'led-to',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'The Russo-French alliance gradually became strained. Napoleon was concerned about Russia\'s intentions in the strategically vital Bosporus and Dardenelles straits. At the same time, Alexander viewed the Grand Duchy of Warsaw, the French-controlled reconstituted Polish state, with suspicion. The requirement of joining France\'s Continental Blockade against Britain was a serious disruption of Russian commerce, and in 1810 Alexander repudiated the obligation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q2',
          text: 'Alexander I could not accept the creation of the Duchy of Warsaw and was becoming impatient regarding war with the Ottoman Empire and its division. Taking the French annexation of the German Duchy of Oldenburg as a pretext, he declared war on 8 April 1812.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1812 – THE RUSSIAN DISASTER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In June 1812, Napoleon invaded Russia with 600,000 troops--a force twice as large as the Russian regular army. Napoleon hoped to inflict a major defeat on the Russians and force Alexander to sue for peace.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q4',
          text: 'The Russian tactics centred on refusing battle, disrupting the French forces and forcing them to spread out and become dispersed.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1812 – THE RUSSIAN DISASTER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q5',
          text: 'As Napoleon pushed the Russian forces back, however, he became seriously overextended. Obstinate Russian resistance combined with the Russian winter to deal Napoleon a disastrous defeat, from which fewer than 30,000 of his troops returned to their homeland.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'As the French retreated, the Russians pursued them into Central and Western Europe and to the gates of Paris.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q7',
          text: 'Young officers who had pursued Napoleon into Western Europe came back to Russia with revolutionary ideas, including human rights, representative government, and mass democracy.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1812-06-24' },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On June 24th, 1812 Napoleon crossed the river Niemen and entered Russian territory with a multi-national army of between 400,000 and 450,000 men.',
        lang: 'en',
        cite: {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812-08-18' },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On August 18th, after the first major battle with the Russian forces, the French entered Smolensk.',
        lang: 'en',
        cite: {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812-09-14' },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A week later, the French entered a city soon to be consumed in flames; the Russians had sacrificed it in order to destroy any supplies or ammunition from which the French could have profited.',
        lang: 'en',
        cite: {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1812 – THE RUSSIAN DISASTER' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812-10-19' },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Grand Army left Moscow on October 19th, taking the road south-west towards the town of Kaluga, but after the costly battle of Maloiaroslavets (a small town in Kaluga province) the army was forced to retreat along its path of invasion through Smolensk and Vil\'na.',
        lang: 'en',
        cite: {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812-11-26', notAfter: '1812-11-29' },
            cites: [
              {
                source: 'hartley-1991-napoleon-in-russia',
                loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The remnants of the Grand Army crossed the Berezina on November 26th-29th, and reached Prussian territory by crossing the Niemen on December 13th-14th.',
        lang: 'en',
        cite: {
          source: 'hartley-1991-napoleon-in-russia',
          loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Napoleons_retreat_from_Moscow_by_Adolph_Northen.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Napoleons_retreat_from_Moscow_by_Adolph_Northen.jpg',
    credit: { creator: 'Adolph Northen' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'wilson-1860',
      mediaKind: 'document',
      title: 'Narrative of events during the Invasion of Russia by Napoleon Bonaparte, and the Retreat of the French Army, 1812',
      date: { d: '1860' },
      url: 'https://archive.org/download/narrativeofevent00wils/narrativeofevent00wils.pdf',
      page: 'https://archive.org/details/narrativeofevent00wils',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'Robert Thomas Wilson'
      },
      license: { id: 'public-domain' },
      bytes: 25556277
    }
  ]
})
