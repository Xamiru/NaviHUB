import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nanjing-massacre-casualties',
  about: ['event:nanjing-massacre'],
  topic: 'casualties',
  researched: '2026-10-09',
  framing: {
    id: 'q1',
    text: 'Interpretations of the Nanjing Incident in Japan are usually summarised as falling into three schools of thought,[12] defined by the number of people each argues were massacred in Nanjing',
    lang: 'en',
    cite: {
      source: 'askew-2002-nanjing-incident-recent-research',
      loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '21' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
    }
  },
  positions: [
    {
      id: 'china-300000',
      category: 'official',
      holders: [
        { kind: 'state', name: 'People’s Republic of China' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Nanjing Massacre took place when Japanese troops captured the then-Chinese capital on Dec. 13, 1937. Over the course of six weeks, they proceeded to kill approximately 300,000 Chinese civilians and unarmed soldiers in one of the most barbaric episodes of World War II.',
          lang: 'en',
          cite: {
            source: 'govcn-2024-12-13-nanjing-massacre-commemoration',
            loc: {
              section: 'China holds national commemoration for Nanjing Massacre victims',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://english.www.gov.cn/news/202412/13/content_WS675bd237c6d0868f4e8edeb6.html'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'Although there is real debate in Japan, no one there now accepts the figure of 300,000 victims as plausible, while in China the figure is set in concrete (in both senses of the word) at the entrance of the Memorial for the Compatriot [Chinese] Victims of the Japanese Massacre in Nanjing.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    },
    {
      id: 'japan-cannot-be-denied',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Japan (Ministry of Foreign Affairs)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Government of Japan believes that it cannot be denied that following the entrance of the Japanese Army into Nanjing in 1937, the killing of noncombatants, looting and other acts occurred. However, there are numerous theories as to the actual number of victims, and the Government of Japan believes it is difficult to determine which the correct number is.',
          lang: 'en',
          cite: { source: 'mofa-japan-history-issues-qa', loc: { section: 'Q6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20241227150748/https://www.mofa.go.jp/policy/q_a/faq16.html'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The problem is that the orthodox position is completely different in China and Japan, and within Japan itself there are three distinct orthodoxies.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    },
    {
      id: 'great-massacre-school',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Great Massacre School (daigyakusatsu-ha)' },
        { kind: 'scholar', name: 'Kasahara Tokushi' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Great Massacre School ranges from at least 100,000 (Eguchi), more than 120,000 (10 sūman), a figure which has become the orthodox position of this school and which is advocated by Himeta, Inoue, Kasahara and Yoshida, to the older orthodoxy, 200,000, which is still advocated by Fujiwara and Takasaki.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    },
    {
      id: 'middle-of-the-road-school',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Middle-of-the-Road School (chūkan-ha)' },
        { kind: 'scholar', name: 'Hata Ikuhiko' },
        { kind: 'scholar', name: 'Itakura Yoshiaki' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The Middle-of-the-Road School, which is given a broader definition than the one I use, ranges from "several thousand" (Nakamura and Unemoto) through about 10,000 (Okazaki, Sakurai, and Tanabe) to about 20,000 (Hara) (I would place all but Hara in the Illusion School).',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    },
    {
      id: 'illusion-school',
      category: 'revisionist',
      holders: [
        { kind: 'school', name: 'Illusion School (maboroshi-ha)' },
        { kind: 'scholar', name: 'Higashinakano Osamichi' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Members of the Illusion School answered that the number was zero (Fuji Nobuo), almost zero, or, in the case of Watanabe, 40 to 50.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'The Illusion School mainly consists of conservative thinkers who are not professional historians, and of the three groups is easily the one with the largest number of lay members.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        },
        {
          id: 'q8',
          text: 'Rabe has clearly destroyed much of the basis for the arguments of the Great Massacre School, but also makes it absolutely clear that he was convinced that the Japanese army was responsible for looting, arson, rape and the execution of thousands of men identified as "ex-soldiers".',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    }
  ]
})
