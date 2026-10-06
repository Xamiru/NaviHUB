import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'greek-war-of-independence',
  names: [
    { text: 'Greek War of Independence', lang: 'en', role: 'primary' },
    { text: 'Ελληνική Επανάσταση', lang: 'el', role: 'native' },
    {
      text: 'Greek revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '29' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '3' }
          },
          {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '29' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1832' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '3' }
          }
        ]
      },
      {
        value: { d: '1829' },
        cites: [
          {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '20' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Steven W. Sowards' }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 1,
  related: [
    { ref: 'event:battle-of-navarino', rel: 'related' },
    { ref: 'event:russo-turkish-war-1828-1829', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:alexander-ypsilantis',
      role: 'leader',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '32' }
        }
      ]
    },
    {
      name: 'John Capodistrias',
      role: 'participant',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '25' }
        }
      ]
    },
    {
      name: 'Tudor Vladimirescu',
      role: 'participant',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Russian Protectorate', para: '3' }
        }
      ]
    },
    {
      name: 'Theodore Kolokotrones',
      role: 'leader',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '37' }
        }
      ]
    },
    {
      name: 'Alexander Mavrokordatos',
      role: 'leader',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '37' }
        }
      ]
    },
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'participant',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
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
          text: 'The first nineteenth-century crisis to bring about European intervention was the Greek War of Independence (1821-32).',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'The European powers forced the Porte to recognize Greek independence under the London Convention of 1832.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The original instigators of the uprising were members of a secret society called the "Philike Hetairia" or "friendly society."',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q4',
          text: 'It was founded in 1814 in the Russian port of Odessa.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q5',
          text: 'The date for the uprising was first set for 1820, then pushed back to the spring of 1821.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q6',
          text: 'Turkey was at war with Persia, and in the Balkans Ali Pasha was in revolt.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q7',
          text: 'If the Serbian uprising of 1804 began with a spontaneous national response to Turkish attacks, the Greek revolution of 1821 began as a planned conspiracy, in which only selected elements of the Greek nation had a role.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'The revolution swept across the Morea: Turkish towns were taken and the Muslim population was massacred.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q9',
          text: 'Turkish forces meanwhile massacred Greeks where they could, including the island of Chios.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Moreover, the decisive victory of 1830 was won less by the Greeks themselves than by the intervention of England, France and Russia, who thereafter claimed a major role in Greek politics.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
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
            value: { d: '1821-03' },
            cites: [
              {
                source: 'sowards-msu-balkan-lectures-greek-revolution',
                loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'When Ypsilantis and 450 men of the "Sacred Battalion" entered Moldavia in March 1821, however, the Romanian peasants ignored the Turks and instead attacked the manor houses of their local boyar landlords.',
        lang: 'en',
        cite: {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1823' },
            cites: [
              {
                source: 'sowards-msu-balkan-lectures-greek-revolution',
                loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '37' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'By 1823 the two sides were engaged in a civil war.',
        lang: 'en',
        cite: {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '37' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1825' },
            cites: [
              {
                source: 'sowards-msu-balkan-lectures-greek-revolution',
                loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '41' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In return for a promise that he and his sons could rule what they captured, Mehmet Ali\'s modernized navy and army invaded Greece in 1825, where they captured the port of Navarino.',
        lang: 'en',
        cite: {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '41' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1827-10' },
            cites: [
              {
                source: 'sowards-msu-balkan-lectures-greek-revolution',
                loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In 1827 the British, French and Russians agreed to seek a mediated peace and backed up their demands by sending a combined three-Power fleet of 27 ships to Navarino Bay in October to observe the Egyptian navy.',
        lang: 'en',
        cite: {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1830' },
            cites: [
              {
                source: 'sowards-msu-balkan-lectures-greek-revolution',
                loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The London Protocol of 1830 created a small, independent Greek kingdom ruled by Prince Otto of Bavaria, a German prince acceptable to all three powers.',
        lang: 'en',
        cite: {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Eug%C3%A8ne_Delacroix_-_La_Gr%C3%A8ce_sur_les_ruines_de_Missolonghi_%281826%29.jpg/1280px-Eug%C3%A8ne_Delacroix_-_La_Gr%C3%A8ce_sur_les_ruines_de_Missolonghi_%281826%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_Gr%C3%A8ce_sur_les_ruines_de_Missolonghi_(1826).jpg',
    credit: { creator: 'Eugène Delacroix' },
    license: { id: 'public-domain' }
  }
})
