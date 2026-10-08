import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-famine-of-1932-1933',
  names: [
    { text: 'Soviet famine of 1932–1933', lang: 'en', role: 'primary' },
    {
      text: 'Holodomor',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Ukraine (Ministry of Foreign Affairs)' },
        { kind: 'organization', name: 'European Parliament' }
      ],
      cites: [
        {
          source: 'ukraine-mfa-2023-11-25-holodomor-90th-anniversary',
          loc: { section: 'Comment of the MFA of Ukraine', para: '1' }
        },
        {
          source: 'european-parliament-2022-12-15-holodomor-resolution',
          loc: { section: 'Paragraph 1' }
        }
      ]
    },
    { text: 'Голодомор', lang: 'uk', role: 'native' },
    {
      text: 'Famine-Genocide of 1932–3',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'scholar', name: 'Bohdan Klid' },
        { kind: 'scholar', name: 'Andrij Makuch' }
      ],
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
        }
      ]
    },
    {
      text: 'голод 30-х годов на территории СССР',
      lang: 'ru',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Russian Federation (State Duma)' }
      ],
      cites: [
        {
          source: 'state-duma-2008-04-02-famine-statement',
          loc: {
            section: 'Заявление «Памяти жертв голода 30-х годов на территории СССР»',
            para: '1'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1932' },
        cites: [
          {
            source: 'us-commission-ukraine-famine-1988-report',
            loc: { section: 'Executive Summary: Findings' }
          },
          {
            source: 'state-duma-2008-04-02-famine-statement',
            loc: {
              section: 'Заявление «Памяти жертв голода 30-х годов на территории СССР»',
              para: '3'
            }
          }
        ]
      },
      {
        value: { d: '1931' },
        cites: [
          {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1933' },
        cites: [
          {
            source: 'us-commission-ukraine-famine-1988-report',
            loc: { section: 'Executive Summary: Findings' }
          },
          {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:ukraine',
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:soviet-union' }
  ],
  participants: [
    {
      ref: 'person:joseph-stalin',
      role: 'leader',
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
        }
      ]
    },
    {
      name: 'Viacheslav Molotov',
      role: 'participant',
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '20' }
        },
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '21' }
        }
      ]
    },
    {
      name: 'Lazar Kaganovich',
      role: 'participant',
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '20' }
        }
      ]
    },
    {
      name: 'Pavel Postyshev',
      role: 'participant',
      cites: [
        {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '20' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 4000000, qualifier: 'about' },
            cites: [
              {
                source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
                loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
              },
              {
                source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
                loc: { section: 'Was the Holodomor a Genocide?', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Bohdan Klid' },
              { kind: 'scholar', name: 'Andrij Makuch' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The death through starvation of about four million people, mainly ethnic Ukrainian peasants, in a famine in Soviet Ukraine caused by the policies and actions authorized by Joseph Stalin and other leaders of the Bolshevik party and USSR government.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q2',
          text: '1) There is no doubt that large numbers of inhabitants of the Ukrainian SSR and the North Caucasus Territory starved to death in a man-made famine in 1932-1933, caused by the seizure of the 1932 crop by Soviet authorities.',
          lang: 'en',
          cite: {
            source: 'us-commission-ukraine-famine-1988-report',
            loc: { section: 'Executive Summary: Findings' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/investigationofu00unit_0/investigationofu00unit_0_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'Пострадали многие регионы РСФСР (Поволжье, Центрально-Черноземная область, Северный Кавказ, Урал, Крым, часть Западной Сибири), Казахстана, Украины, Белоруссии.',
          lang: 'ru',
          cite: {
            source: 'state-duma-2008-04-02-famine-statement',
            loc: {
              section: 'Заявление «Памяти жертв голода 30-х годов на территории СССР»',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://duma.gov.ru/news/1293/' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The Holodomor had its genesis in the overly ambitious first Five-Year Plan adopted by the Soviet leadership in 1928, which prioritized the rapid industrialization of the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q5',
          text: 'Within the collective farms, the authorities in many instances exacted such high levels of procurement that starvation was widespread.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'While tens of thousands died of famine in Soviet Ukraine in the first part of 1932 and the full year’s toll reached approximately 250,000, excess deaths from famine spiked in the first half of 1933 to about 3.5 million.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q7',
          text: 'Demographers estimate that close to four million residents of Ukraine, mostly Ukrainian peasants, perished as a direct result of starvation.',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q8',
          text: 'Outright denial: the Soviet government refused offers of international aid from the Red Cross and other groups on the grounds that there was no Famine. Soviet foreign minister, Maxim Litvinov, publicly denied the existence of Famine in the USSR in 1933.',
          lang: 'en',
          cite: {
            source: 'hrec-loroff-vincent-kuryliw-holodomor-denial-and-silences',
            loc: { section: 'The Cover-Up: Denials, Dismissals and Silences', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://education.holodomor.ca/teaching-materials/holodomor-denial-silences/'
          }
        },
        {
          id: 'q9',
          text: 'Since independence it has also become known as the Holodomor (from moryty holodom ‘to cause suffering and death through starvation’). ‘Great Famine,’ ‘artificial famine,’ and ‘organized famine’ were used in Ukrainian diaspora circles before ‘Holodomor’ became the accepted term throughout much of the world.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
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
            value: { d: '1932-08-07' },
            cites: [
              {
                source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
                loc: { section: 'Famine-Genocide of 1932–3', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The most important of the new measures was the adoption of the all-Union decree known as the ‘Five Ears of Grain Law’ enacted on 7 August 1932.',
        lang: 'en',
        cite: {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932-11-18' },
            cites: [
              {
                source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
                loc: { section: 'Famine-Genocide of 1932–3', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 18 November 1932, under Viacheslav Molotov’s direction, the CP(B)U issued a resolution calling for the blacklisting of entire villages and collective farms that had failed to meet their grain quotas.',
        lang: 'en',
        cite: {
          source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
          loc: { section: 'Famine-Genocide of 1932–3', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-01-22' },
            cites: [
              {
                source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
                loc: { section: 'Was the Holodomor a Genocide?', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On January 22, 1933, in response to large numbers of hungry Ukrainian farmers leaving their villages in search of food, primarily to Russia, the Soviet leadership issued an order prohibiting their departure from the republic.',
        lang: 'en',
        cite: {
          source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
          loc: { section: 'Was the Holodomor a Genocide?', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/HolodomorKharkiv_1933_Wienerberger.jpg/1280px-HolodomorKharkiv_1933_Wienerberger.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:HolodomorKharkiv_1933_Wienerberger.jpg',
    credit: { institution: 'Diözesanarchiv Wien', creator: 'Alexander Wienerberger' },
    license: { id: 'public-domain' }
  }
})
