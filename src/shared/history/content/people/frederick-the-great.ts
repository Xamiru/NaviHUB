import { definePerson } from '../../schema'

export default definePerson({
  id: 'frederick-the-great',
  names: [
    { text: 'Frederick the Great', lang: 'en', role: 'primary' },
    { text: 'Friedrich der Große', lang: 'de', role: 'native' },
    {
      text: 'Frederick II of Prussia',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-frederick-ii-of-prussia',
          loc: { section: 'Frederick II. of Prussia', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1712-01-24' },
        cites: [
          {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1786-08-17' },
        cites: [
          {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '16' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:sanssouci',
    cites: [
      {
        source: 'britannica-1911-frederick-ii-of-prussia',
        loc: { section: 'Frederick II. of Prussia', para: '16' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'king of Prussia',
      polity: 'polity:kingdom-of-prussia',
      start: {
        alts: [
          {
            value: { d: '1740-05-31' },
            cites: [
              {
                source: 'britannica-1911-frederick-ii-of-prussia',
                loc: { section: 'Frederick II. of Prussia', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1786-08-17' },
            cites: [
              {
                source: 'britannica-1911-frederick-ii-of-prussia',
                loc: { section: 'Frederick II. of Prussia', para: '16' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-frederick-ii-of-prussia',
          loc: { section: 'Frederick II. of Prussia', para: '4' }
        },
        {
          source: 'britannica-1911-frederick-ii-of-prussia',
          loc: { section: 'Frederick II. of Prussia', para: '16' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Attributed_to_Antoine_Pesne_%281683-1757%29_-_Frederick_II_of_Prussia%2C_later_Frederick_the_Great_%281712-1786%29_-_RCIN_405262_-_Royal_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Attributed_to_Antoine_Pesne_(1683-1757)_-_Frederick_II_of_Prussia,_later_Frederick_the_Great_(1712-1786)_-_RCIN_405262_-_Royal_Collection.jpg',
    credit: { institution: 'Royal Collection', creator: 'Attributed to Antoine Pesne' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'FREDERICK II., known as “the Great” (1712–1786), king of Prussia, born on the 24th of January 1712, was the eldest son of Frederick William I.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On the 31st of May 1740 he became king. He maintained all the forms of government established by his father, but ruled in a far more enlightened spirit; he tolerated every form of religious opinion, abolished the use of torture, was most careful to secure an exact and impartial administration of justice, and, while keeping the reins of government strictly in his own hands, allowed every one with a genuine grievance free access to his presence. The Potsdam regiment of giants was disbanded, but the real interests of the army were carefully studied, for Frederick realized that the two pillars of the Prussian state were sound finances and a strong army.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        },
        {
          id: 'q3',
          text: 'Frederick sent an ambassador to Vienna, offering, in the event of his rights in Silesia being conceded, to aid Maria Theresa against her enemies.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        },
        {
          id: 'q4',
          text: 'Thus began the Seven Years’ War, in which, supported by England, Brunswick and Hesse-Cassel, he had for a long time to oppose Austria, France, Russia, Saxony and Sweden.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        },
        {
          id: 'q5',
          text: 'Six years afterwards, unfortunately for his fame, he joined in the first partition of Poland, by which he received Polish Prussia, without Danzig and Thorn, and Great Poland as far as the river Netze.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q6',
          text: 'He carried on a lively correspondence with Voltaire and other French men of letters, and was a diligent student of philosophy, history and poetry.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'He died at Sanssouci on the 17th of August 1786; his death being hastened by exposure to a storm of rain, stoically borne, during a military review.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-frederick-ii-of-prussia',
            loc: { section: 'Frederick II. of Prussia', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
          }
        }
      ]
    }
  ]
})
