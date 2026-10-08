import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reform-and-opening-up',
  names: [
    { text: 'Reform and opening up', lang: 'en', role: 'primary' },
    { text: '改革开放', lang: 'zh', role: 'native', translit: 'Gǎigé kāifàng' },
    {
      text: 'Four Modernizations',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '-1' }
        }
      ]
    },
    { text: '四个现代化', lang: 'zh', role: 'alternative', translit: 'Sì gè xiàndàihuà' }
  ],
  researched: '2026-10-09',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1978-12' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:deng-xiaoping',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '1' }
        }
      ]
    },
    {
      name: 'Hu Yaobang',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
        }
      ]
    },
    {
      name: 'Zhao Ziyang',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
        }
      ]
    },
    {
      name: 'Chen Yun',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
        }
      ]
    },
    {
      name: 'Hua Guofeng',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:death-of-mao-zedong',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157-restored.jpg/1280px-Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157-restored.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157-restored.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration (NARA 183157)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The culmination of Deng Xiaoping\'s re-ascent to power and the start in earnest of political, economic, social, and cultural reforms were achieved at the Third Plenum of the Eleventh National Party Congress Central Committee in December 1978. The Third Plenum is considered a major turning point in modern Chinese political history.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q2',
          text: 'The first reforms to affect China\'s economy were instituted between 1979 and 1984. The programs were systemic economic reforms aimed at revising China\'s foreign economic relations and refocusing the country\'s agricultural system. The desire to purchase foreign equipment and technology needed for China\'s modernization led to a policy of opening up to the outside world that would earn foreign exchange through tourism, exports, and arms sales.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/117.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The new balance of power clearly was unsatisfactory to Deng, who sought genuine party reform and, soon after the National Party Congress, took the initiative to reorganize the bureaucracy and redirect policy. His longtime protege Hu Yaobang replaced Hua supporter Wang Dongxing as head of the CCP Organization Department. Educational reforms were instituted, and Cultural Revolution-era verdicts on literature, art, and intellectuals were overturned.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Post-Mao Period, 1976-78', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
        },
        {
          id: 'q4',
          text: 'Differences among the two competing factions--that headed by Hua Guofeng (soon to be branded as a leftist) and that led by Deng and the more moderate figures--became readily apparent by the time the Fifth National People\'s Congress was held in February and March 1978. Serious disputes arose over the apparently disproportionate development of the national economy, the Hua forces calling for still more largescale projects that China could ill afford. In the face of substantive losses in leadership positions and policy decisions, the leftists sought to counterattack with calls for strict adherence to Mao Zedong Thought and the party line of class struggle. Rehabilitations of Deng\'s associates and others sympathetic to his reform plans were stepped up.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Post-Mao Period, 1976-78', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: '"Left" mistakes committed before and during the Cultural Revolution were "corrected," and the "two whatevers" policy ("support whatever policy decisions Chairman Mao made and follow whatever instructions Chairman Mao gave") was repudiated. The classic party line calling for protracted class struggle was officially exchanged for one promoting the Four Modernizations. In the future, the attainment of economic goals would be the measure of the success or failure of policies and individual leadership; in other words, economics, not politics, was in command. To effect such a broad policy redirection, Deng placed key allies on the Political Bureau (including Chen Yun as an additional vice chairman and Hu Yaobang as a member) while positioning Hu Yaobang as secretary general of the CCP and head of the party\'s Propaganda Department. Although assessments of the Cultural Revolution and Mao were deferred, a decision was announced on "historical questions left over from an earlier period." The 1976 Tiananmen Square incident, the 1959 removal of Peng Dehuai, and other now infamous political machinations were reversed in favor of the new leadership. New agricultural policies intended to loosen political restrictions on peasants and allow them to produce more on their own initiative were approved.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q6',
          text: 'Rapid change occurred in the subsequent months and years. The year 1979 witnessed the formal exchange of diplomatic recognition between the People\'s Republic and the United States, a border war between China and Vietnam, the fledgling "democracy movement" (which had begun in earnest in November 1978), and the determination not to extend the thirty-year-old Treaty of Friendship, Alliance, and Mutual Assistance with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q7',
          text: 'One major effect of the plenum was the resignation of the members of the "Little Gang of Four" (an allusion to the original Gang of Four, Mao\'s allies)--Hua\'s closest collaborators and the backbone of opposition to Deng. Wang Dongxing, Wu De, Ji Dengkui, and Chen Xilian were charged with "grave [but unspecified] errors" in the struggle against the Gang of Four and demoted from the Political Bureau to mere Central Committee membership. In turn, the Central Committee elevated Deng\'s proteges Hu Yaobang and Zhao Ziyang to the Standing Committee of the Political Bureau and the newly restored party Secretariat.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q8',
          text: 'In China\'s rural areas, the economic reform program decollectivized agriculture through a contract responsibility system based on individual households. The people\'s communes established under Mao were largely replaced with a system of family-based farming.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/117.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The opening up policy included sending large numbers of students abroad to acquire special training and needed skills. The effect was to make China more dependent on major sectors of the world economy and reverse the Maoist commitment to the ideal of self-reliance.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/117.htm' }
        },
        {
          id: 'q10',
          text: 'The rural reforms successfully increased productivity, the amount of available arable land, and peasant per capita income. All of these were major reform achievements. Their success stimulated substantial support in the countryside for the expansion and deepening of the reform agenda.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/117.htm' }
        },
        {
          id: 'q11',
          text: 'While the opening up policy and rural reform produced significant benefits to the Chinese economy and won enthusiastic support for the Deng reformers, they also generated substantial problems and brought political opposition from conservative leaders. The Maoist ideal of self-reliance still had proponents among the leadership in the 1980s, and many were openly critical of the expanding foreign influences, especially in such areas as the special economic zones. In rural areas, economic reform led to inequalities among economic regions and appeared in some instances to produce a new, potentially exploitative class of rich peasants.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE FIRST WAVE OF REFORM, 1979-84', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/117.htm' }
        },
        {
          id: 'q12',
          text: 'In his place, CCP secretary general Hu Yaobang became chairman. Hua also gave up his position as chairman of the party\'s Central Military Commission in favor of Deng Xiaoping. The plenum adopted the 35,000-word "Resolution on Certain Questions in the History of Our Party Since the Founding of the People\'s Republic of China."',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1979-09' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'As part of this campaign, a major document was presented at the September 1979 Fourth Plenum of the Eleventh National Party Congress Central Committee, giving a "preliminary assessment" of the entire thirty-year period of Communist rule. At the plenum, party Vice Chairman Ye Jianying pointed out the achievements of the CCP while admitting that the leadership had made serious political errors affecting the people. Furthermore, Ye declared the Cultural Revolution "an appalling catastrophe" and "the most severe setback to [the] socialist cause since [1949]."',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-02' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Economic advances and political achievements had strengthened the position of the Deng reformists enough that by February 1980 they were able to call the Fifth Plenum of the Eleventh National Party Congress Central Committee.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In June 1981 the Sixth Plenum of the Eleventh National Party Congress Central Committee marked a major milestone in the passing of the Maoist era. The Central Committee accepted Hua\'s resignation from the chairmanship',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '1' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'vogel-2011-deng-xiaoping-and-the-transformation-of', perspective: 'american' }
  ]
})
