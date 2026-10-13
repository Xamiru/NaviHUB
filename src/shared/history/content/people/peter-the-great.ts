import { definePerson } from '../../schema'

export default definePerson({
  id: 'peter-the-great',
  names: [
    { text: 'Peter the Great', lang: 'en', role: 'primary' },
    { text: 'Пётр I', lang: 'ru', role: 'native', translit: 'Pyotr I' },
    {
      text: 'Peter I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1672-06-09', julian: true },
        cites: [
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1725-02-08', julian: true },
        cites: [
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of All Russia',
      polity: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1721-11-02', julian: true },
            cites: [
              { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '8' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1725-02-08', julian: true },
            cites: [
              { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '8' } },
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Pieter_van_der_Werff_-_Portrait_of_Peter_the_Great_-_WGA25542.jpg/1280px-Pieter_van_der_Werff_-_Portrait_of_Peter_the_Great_-_WGA25542.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pieter_van_der_Werff_-_Portrait_of_Peter_the_Great_-_WGA25542.jpg',
    credit: { creator: 'Pieter van der Werff' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'PETER I., called “the Great” (1672–1725), emperor of Russia, son of the tsar Alexius Mikhailovich and Natalia Naruishkina, was born at Moscow on the 30th of May 1672.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        },
        {
          id: 'q2',
          text: 'The official birthday of the Russian empire was the 22nd of October 1721, when, after a solemn thanksgiving service in the Troitsa Cathedral for the peace of Nystad, the tsar proceeded to the senate and was there acclaimed: “Father of the Fatherland, Peter the Great, and Emperor of All Russia.”',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'By this time the White Sea had become too narrow for Peter, and he was looking about him for more hospitable waters.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        },
        {
          id: 'q4',
          text: 'The year 1700 is memorable in Russian history as the starting-point of Peter’s long and desperate struggle for the hegemony of the north.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        },
        {
          id: 'q5',
          text: 'Peter the Great initiated aggressive policies towards Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q6',
          text: 'In 1715-18, a young officer, Artemiĭ Petrovich Volynskiĭ, was sent to Iran to gather information about the troops and fortresses and the political and economic situation there.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'Two months before Shah Solṭān-Ḥosayn was overthrown by the Afghans, Peter invaded the Caucasian coast of the Caspian at the head of more than 100,000 Russian soldiers.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q8',
          text: 'During the last four years of his reign Peter’s policy was predominantly Oriental.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'The Persian campaigns wore out the feeble health of Peter, who had been ailing for some time.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    }
  ]
})
