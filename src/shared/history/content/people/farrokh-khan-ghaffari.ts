import { definePerson } from '../../schema'

export default definePerson({
  id: 'farrokh-khan-ghaffari',
  names: [
    { text: 'Farrokh Khan Ghaffari', lang: 'en', role: 'primary' },
    { text: 'فرخ‌خان غفاری', lang: 'fa', role: 'native' },
    {
      text: 'Amīn-al-Dawla',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
          loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1812' },
        cites: [
          {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1871' },
        cites: [
          {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  roles: ['diplomat', 'politician'],
  offices: [
    {
      title: 'ambassador (īḷčī-e kabīr) to the court of Napoleon III',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
          loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
        }
      ]
    },
    {
      title: 'minister of the interior',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1859-04' },
            cites: [
              {
                source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
                loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
          loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
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
          text: 'AMĪN-AL-DAWLA, ABŪ ṬĀLEB FARROḴ KHAN ḠAFFĀRĪ (1227-88/1812-71), a high ranking Qajar official.',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In late 1855, they dispatched to Europe Farroḵ Khan Amin-al-Molk Ḡaffāri (later Amin-al-Dawla), a gifted statesman and diplomat, to negotiate with the British ambassadors in Istanbul and in Paris on Persia’s conditions for ending the Herat campaign. He was also instructed to solicit the mediation of France and seek a loan and military support from the United States.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'He remained for over two years in Europe, and at the insistence of the shah and Mīrzā Āqā Khan Nūrī, the grand vizier, he signed the treaty of Paris on 7 Raǰab 1273/3, March 1857 (Maḵzan al-waqāyeʿ, intro., pp. 17, 25; Maǰmūʿa-ye asnād I, pp. 209, 211, II, pp. 100, 182), thus ending the war by an Iranian retreat from Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        },
        {
          id: 'q4',
          text: 'He was also responsible for the establishment of the first diplomatic relations with the United States, in Rabīʿ II, 1273/December, 1856.',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q5',
          text: 'Much impressed by the political, social, and technical progress of the European countries, Farroḵ Khan joined the French freemasonry of Grand Orient (Thieury, France, pp. 35, 40; Maḵzan al-waqāyeʿ, intro., pp. 22, 47).',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        },
        {
          id: 'q6',
          text: 'Nāṣer-al-dīn Shah and Mīrzā Āqā Khan were so alarmed by the liberal models described by Farroḵ Khan that the publication of the book was banned (Maḵzan al-waqāyeʿ, intro., p. 26; Bakhash, Iran, p. 31).',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/A_Portrait_of_Farrokh_Khan_Amin_al-Dowleh%2C_signed_by_Abu%27l_Hasan_Ghaffari.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_Portrait_of_Farrokh_Khan_Amin_al-Dowleh,_signed_by_Abu%27l_Hasan_Ghaffari.jpg',
    credit: { creator: 'Mirza Abolhassan Khan Ghaffari' },
    license: { id: 'public-domain' }
  }
})
