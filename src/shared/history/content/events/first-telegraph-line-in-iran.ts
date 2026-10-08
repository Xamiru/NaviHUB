import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-telegraph-line-in-iran',
  names: [
    { text: 'First telegraph line in Iran', lang: 'en', role: 'primary' },
    { text: 'نخستین خط تلگراف ایران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1858-04-24' },
        cites: [
          {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Soli Shahvar' }
        ]
      },
      {
        value: { d: '1857' },
        cites: [
          {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '15' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John D. Gurney' },
          { kind: 'scholar', name: 'Negin Nabavi' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:malkom-khan',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
        }
      ]
    },
    {
      name: 'August Kržiž',
      role: 'participant',
      cites: [
        {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:founding-of-the-dar-al-fonun', rel: 'related' },
    { ref: 'event:indo-european-telegraph-line', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Electric telegraph was first introduced in Persia by one of the leading reformists of the Qajar period, the Armenian Mirzā Malkom Khan (1833/34-1908).',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        },
        {
          id: 'q2',
          text: 'On Sunday, 10 Ramadan 1274/24 April 1858, Nāṣer-al-Din Shah was invited to operate the line connecting the Golestān Palace with Bāḡ-e Lālazār for himself. Amazed at the speed and accuracy with which messages were exchanged, the Shah praised the participants of the project and ordered the line to be made permanent—an order which was carried out by Kržiž (Eʿtemād-al-Salṭana, 1877-80, II, p. 219).',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        },
        {
          id: 'q3',
          text: 'In 1274/1857 he laid the first telegraph line from the Arg to the Bāḡ-e Lālazār, linking the shah’s palace and Dār al-fonūn (Polak, I, p. 315).',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'William Doria, the British Chargé d’Affaires in Tehran, criticized this initial small telegraphic network in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        },
        {
          id: 'q5',
          text: 'The telegraphic connection with Tabriz provided the central government in Tehran with the means to have, for the first time in Persian history, speedy communications with the periphery.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
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
            value: { d: '1859-04' },
            cites: [
              {
                source: 'iranica-shahvar-telegraph-i',
                loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'During April and May 1859, about twenty miles of wire were laid down between Tehran and Karaj (Doria to Stanley, 6 June 1859).',
        lang: 'en',
        cite: {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1859-07-03' },
            cites: [
              {
                source: 'iranica-shahvar-telegraph-i',
                loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'After the completion of the Tehran-Solṭāniya line, the Shah left Tehran for Solṭāniya, where he arrived on 2 Ḏuʾl-Ḥejja 1275/3 July 1859. For the first time, the news of the Shah’s arrival was telegraphed to Šemirān, north of Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-shahvar-telegraph-i',
          loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Mirza_Malkam_Khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Malkam_Khan.jpg',
    credit: { institution: 'E. G. Browne, The Press and Poetry of Modern Persia (1914)' },
    license: { id: 'public-domain' }
  }
})
