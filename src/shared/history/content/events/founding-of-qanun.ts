import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-qanun',
  names: [
    { text: 'Founding of the newspaper Qānūn', lang: 'en', role: 'primary' },
    { text: 'انتشار روزنامهٔ قانون', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1890-02-20' },
        cites: [
          {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '35' }
          },
          {
            source: 'browne-1914-press-and-poetry-of-modern-persia',
            loc: { section: 'Introduction' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:london',
      cites: [
        {
          source: 'iranica-amanat-constitutional-revolution-intellectual-background',
          loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '5' }
        },
        {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '35' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:dismissal-of-malkom-khan', rel: 'preceded-by' },
    { ref: 'event:tobacco-protest', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:malkom-khan',
      role: 'journalist',
      cites: [
        {
          source: 'iranica-amanat-constitutional-revolution-intellectual-background',
          loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '5' }
        },
        {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '35' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'participant',
      cites: [
        {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '36' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '35' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Mirza_Malkam_Khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Malkam_Khan.jpg',
    credit: { institution: 'E. G. Browne, The Press and Poetry of Modern Persia (1914)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Later in life, in his newspaper Qānūn (Constitution), published in London in the early 1890s, Malkom blended advocacy of reform with an uninhibited critique of tyranny and political corruption.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q2',
          text: 'In the decade before the Constitutional Revolution the hazy notion of a parliamentary system with a constitution (konsṭeṭūsīon, qānūn-e asāsī), division of powers, and popular representation put forward in Qānūn was central to the emerging revolutionary ferment.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'To the cry for a fixed Code of Laws is now added a demand for a Parliament representing the people, free to discuss all matters connected with the welfare of the State, the members of which shall enjoy the privilege of immunity, whatever they may lawfully say or do in the discharge of their functions.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'The control of all affairs of State in the hands of ignorant and base-born persons',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'The rights of the State bartered to please Legation dragomans.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q6',
          text: 'Our army the laughing-stock of the world.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q7',
          text: 'Our towns each a metropolis of dirt.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q8',
          text: 'Our roads worse than the tracks of animals.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q9',
          text: 'The leaders of Church and State, and all persons of intelligence, must, in response to the demands of this time for increased watchfulness, unite to support this Assembly, and seek by every means to make the Persian people understand that the regeneration of Persia depends on carrying out the Law, and that carrying out the Law depends on the consideration and authority enjoyed by this Assembly.',
          lang: 'en',
          cite: {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q10',
          text: 'at least one hundred of the great mojtaheds, the renowned learned men, and savants of Persia be gathered in a national consultative assembly (majles-e šūrā-ye mellī). They should be held responsible and given the full authority, first, to establish, codify, and officially proclaim the laws and principles that are necessary for the reorganization (tanẓīm) of Persia. Second, according to an orderly arrangement, the national consultative assembly should hold itself as the guardian, the overseer, and the agent for the execution of the law',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The entry of this paper into Persia was forbidden, so that numbers of it were highly prized by such as possessed them.',
          lang: 'en',
          cite: {
            source: 'browne-1914-press-and-poetry-of-modern-persia',
            loc: { section: 'Qanun (The Law)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/presspoetryofmod00browuoft/presspoetryofmod00browuoft_djvu.txt'
          }
        },
        {
          id: 'q12',
          text: 'By reason of the incomparable style and expression of Mirza Malkom Khan in Persian, this became the best newspaper in the Persian language, and, by reason of its effects, has an important historical position in the Persian awakening.',
          lang: 'en',
          cite: {
            source: 'browne-1914-press-and-poetry-of-modern-persia',
            loc: { section: 'Introduction', page: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/presspoetryofmod00browuoft/presspoetryofmod00browuoft_djvu.txt'
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
            value: { d: '1890-03-22' },
            cites: [
              {
                source: 'browne-1910-persian-revolution',
                loc: { section: 'The Persian Revolution of 1905–1909', page: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The next number, dated March 22, 1890, contains the following summary of complaints, in the course of a long description of the woes of Persia',
        lang: 'en',
        cite: {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'adamiyat-1973-andisheh-ye-taraqqi', perspective: 'iranian' }
  ]
})
