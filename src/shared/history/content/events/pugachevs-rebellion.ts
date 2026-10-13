import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'pugachevs-rebellion',
  names: [
    { text: 'Pugachev’s Rebellion', lang: 'en', role: 'primary' },
    {
      text: 'Pugachev rising',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1773' },
        cites: [
          {
            source: 'britannica-1911-pugachev-emelyan-ivanovich',
            loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
          },
          { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1774-09' },
        cites: [
          {
            source: 'britannica-1911-pugachev-emelyan-ivanovich',
            loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:russian-empire',
      cites: [
        { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1168' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Emelyan Pugachev',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-pugachev-emelyan-ivanovich',
          loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
        }
      ]
    },
    {
      ref: 'person:catherine-the-great',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      value: {
        alts: [
          {
            value: { min: 10000 },
            cites: [
              {
                source: 'britannica-1911-pugachev-emelyan-ivanovich',
                loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Pugachev)'
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 2000 },
            cites: [
              { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Russia)'
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 6000 },
            cites: [
              { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Russia)'
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:partitions-of-poland',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1773 a Don Cossack called Pugachev, who was so uneducated that he could not even sign the manifestoes written for him, declared himself to be Peter III., and announced that he was going to St Petersburg to punish his faithless wife and place his son Paul on the throne.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        },
        {
          id: 'q2',
          text: 'Many believed, or affected to believe, in the pretender, and in a short time he gathered around him a large force of Cossacks, peasants, Tatars and Tchuvash, swept over the basin of the lower Volga, executed mercilessly the landed proprietors, seized and pillaged the town of Kazan, and kept the whole country in a state of alarm for more than a year.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By such means Catherine made herself very popular in the upper ranks of society, but as a woman and a usurper who did little or nothing to lighten the burdens of the people she failed to gain the loyalty and devotion of the masses.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        },
        {
          id: 'q4',
          text: 'Pugachev dubbed himself Peter III. the better to attract to his standard all those (and they were many) who attributed their misery to the government of Catherine II., for Peter III. was generally remembered as the determined opponent of Catherine.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-pugachev-emelyan-ivanovich',
            loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Panin’s savage reprisals, after the capture of Penza, completed their discomfiture.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-pugachev-emelyan-ivanovich',
            loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
          }
        },
        {
          id: 'q6',
          text: 'His name and exploits still live in the popular legends, and the insurrection is often referred to in revolutionary pamphlets as a laudable popular protest against tyrannical autocracy.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Not till August 1774 did General Mikhelson inflict a crushing defeat upon the rebels near Tsaritsyn, when they lost ten thousand in killed and prisoners.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-pugachev-emelyan-ivanovich',
            loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
          }
        },
        {
          id: 'q8',
          text: 'Finally, after a crushing defeat in which 2000 of the insurgents were killed and 6000 taken prisoners, he was betrayed by some of his followers and executed in Moscow.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
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
            value: { d: '1773' },
            cites: [
              {
                source: 'britannica-1911-pugachev-emelyan-ivanovich',
                loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Pugachev, now a Cossack ensign, served under Count Peter Panin and was present at the siege of Bender. Invalided home, he led for the next few years a wandering life; was more than once arrested and imprisoned as a deserter; and finally, after frequenting the monasteries of the “Old Believers,” who exercised considerable influence over him, suddenly proclaimed himself (1773) to be Peter III.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-pugachev-emelyan-ivanovich',
          loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1774' },
            cites: [
              {
                source: 'britannica-1911-pugachev-emelyan-ivanovich',
                loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Even then, however, Catherine, in her correspondence with Voltaire, affected to treat “l’affaire du Marquis de Pugachev” as a mere joke, but by the beginning of 1774 the joke had developed into a very serious danger.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-pugachev-emelyan-ivanovich',
          loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1775-01' },
            cites: [
              {
                source: 'britannica-1911-pugachev-emelyan-ivanovich',
                loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Pugachev was delivered up by his own Cossacks on attempting to fly to the Urals (Sept. 14), and was executed at Moscow on the 11th of January 1775.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-pugachev-emelyan-ivanovich',
          loc: { section: 'Pugachev, Emel’yan Ivanovich', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pugachev,_Emel\'yan_Ivanovich'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Pugachev.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pugachev.jpg',
    credit: { institution: 'Pushkin, History of the Pugachev Rebellion (1834)' },
    license: { id: 'public-domain' }
  }
})
