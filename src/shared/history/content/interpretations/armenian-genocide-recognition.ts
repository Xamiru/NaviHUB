import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'armenian-genocide-recognition',
  about: ['event:armenian-genocide'],
  topic: 'naming',
  researched: '2026-10-07',
  positions: [
    {
      id: 'genocide-scholarly',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ronald Grigor Suny' },
        { kind: 'scholar', name: 'Boris Adjemian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'New scholarship confirms that the Ottoman government intended the elimination of Armenians and Assyrians to render them impotent in the contest for lands in eastern Anatolia.',
          lang: 'en',
          cite: { source: 'eo1418-suny-armenian-genocide', loc: { section: 'Armenian Genocide' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q2',
          text: 'The Armenian genocide has long been overlooked by historians of the Great War. Yet it was a major event in early 20th-century European history.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      id: 'recognised-by-the-united-states',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Each year on this day, we remember the lives of all those who died in the Ottoman-era Armenian genocide and recommit ourselves to preventing such an atrocity from ever again occurring.',
          lang: 'en',
          cite: {
            source: 'whitehouse-2021-04-24-biden-armenian-remembrance-day',
            loc: {
              section: 'Statement by President Joe Biden on Armenian Remembrance Day',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2021/04/24/statement-by-president-joe-biden-on-armenian-remembrance-day/'
          }
        },
        {
          id: 'q4',
          text: 'The American people honor all those Armenians who perished in the genocide that began 106 years ago today.',
          lang: 'en',
          cite: {
            source: 'whitehouse-2021-04-24-biden-armenian-remembrance-day',
            loc: {
              section: 'Statement by President Joe Biden on Armenian Remembrance Day',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2021/04/24/statement-by-president-joe-biden-on-armenian-remembrance-day/'
          }
        }
      ]
    },
    {
      id: 'turkish-state-denial',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Republic of Turkey' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'Turkey does not deny the suffering of Armenians, including the loss of many innocent lives, during the First World War. However, greater numbers of Turks died or were killed in the years leading to and during the War. Without belittling the tragic consequences for any group, Turkey objects to the one-sided presentation of this tragedy as a genocide by one group against another.',
          lang: 'en',
          cite: {
            source: 'turkey-mfa-events-of-1915-overview',
            loc: {
              section: 'The Events of 1915 and the Turkish-Armenian Controversy over History: An Overview',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/2015/http://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa'
          }
        },
        {
          id: 'q13',
          text: 'In response, the Ottoman Government ordered in 1915 the Armenian population residing in or near the war zone to be relocated to the southern Ottoman provinces away from the supply routes and army transport lines on the way of the advancing Russian army.',
          lang: 'en',
          cite: {
            source: 'turkey-mfa-events-of-1915-overview',
            loc: {
              section: 'The Events of 1915 and the Turkish-Armenian Controversy over History: An Overview',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/2015/http://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa'
          }
        },
        {
          id: 'q14',
          text: 'Genocide is a clearly defined crime. Genocide is not a generic word to be used loosely to describe some grave atrocity. It is the worst of crimes.',
          lang: 'en',
          cite: {
            source: 'turkey-mfa-events-of-1915-overview',
            loc: {
              section: 'The Events of 1915 and the Turkish-Armenian Controversy over History: An Overview',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/2015/http://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Hushed up in Turkey, after 1945, the genocide was the subject of intense denial, which continues to the present day.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        },
        {
          id: 'q5',
          text: 'but the government of the Turkish state and many of its supporters deny that a genocide took place; rather, they claim that the government acted to suppress an Armenian insurrection and people were killed in the process.',
          lang: 'en',
          cite: { source: 'eo1418-suny-armenian-genocide', loc: { section: 'Armenian Genocide' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q6',
          text: 'Armenians believe--and Turks deny--that the catastrophe that befell their community was the result of atrocities committed by Turkish soldiers following government directives.',
          lang: 'en',
          cite: { source: 'loc-turkey-country-study-1995', loc: { section: 'Armenians', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/33.htm' }
        }
      ]
    },
    {
      id: 'denialist-security-argument',
      category: 'revisionist',
      holders: [
        { kind: 'school', name: 'Denialists and their sympathizers' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'What to denialists and their sympathizers appears to be a rational and justified strategic choice to eliminate a rebellious and seditious population, in this account is seen as the outcome of the Young Turk leaders’ pathological construction of the Armenian enemy.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Genocide as Response to Crisis', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'The connection between ethnic cleansing or genocide and the legitimacy of the national state underlies the desperate efforts to deny or distort the history of the nation and the state’s genesis.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Genocide as Response to Crisis', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ]
    },
    {
      id: 'armenian-memory',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Armenians' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'Armenians outside Turkey refer to the deaths of 1915-16 as an instance of genocide, and over the years various Armenian political groups have sought to avenge the tragedy by carrying out terrorist attacks against Turkish diplomats and officials abroad (see Armenian Terrorism, ch. 5).',
          lang: 'en',
          cite: { source: 'loc-turkey-country-study-1995', loc: { section: 'Armenians', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/33.htm' }
        }
      ]
    },
    {
      id: 'no-massacre-but-an-arrangement',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ziya Gökalp' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'there was no Armenian massacre, there was a Turkish-Armenian arrangement. They stabbed us in the back, we stabbed them back.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Genocide as Response to Crisis', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ]
    }
  ]
})
