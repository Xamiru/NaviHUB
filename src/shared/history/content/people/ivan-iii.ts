import { definePerson } from '../../schema'

export default definePerson({
  id: 'ivan-iii',
  names: [
    { text: 'Ivan III', lang: 'en', role: 'primary' },
    {
      text: 'Ivan the Great',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '4' } },
        {
          source: 'loc-name-authority-ivan-iii-grand-duke-of-moscow',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    },
    { text: 'Иван III Васильевич', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1440' },
        cites: [
          {
            source: 'loc-name-authority-ivan-iii-grand-duke-of-moscow',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1505' },
        cites: [
          {
            source: 'loc-name-authority-ivan-iii-grand-duke-of-moscow',
            loc: { section: 'MARC field 046: birth and death dates' }
          },
          { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '4' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Grand Prince of Moscow',
      polity: 'polity:grand-principality-of-moscow',
      start: {
        alts: [
          {
            value: { d: '1462' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Muscovy', para: '4' }
              },
              { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '17' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1505' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Muscovy', para: '4' }
              },
              { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '17' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '4' } },
        { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '17' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Ivan_III_of_Russia.jpg/1280px-Ivan_III_of_Russia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ivan_III_of_Russia.jpg',
    credit: { institution: 'University of Texas Libraries', creator: 'André Thevet' },
    license: { id: 'public-domain' },
    title: 'Albus rex'
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The most successful practitioner of this process was Ivan III (the Great; r. 1462-1505), who conquered Novgorod in 1478 and Tver\' in 1485.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '4' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q2',
          text: 'Ivan III was the first Muscovite ruler to use the titles of tsar and "Ruler of all Rus\'."',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '5' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Ivan III forced the lesser princes to acknowledge the grand prince of Muscovy and his descendants as unquestioned rulers with control over military, judicial, and foreign affairs.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '7' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q4',
          text: 'He first directed his attention to Novgorod, and by gradually undermining and then destroying the ancient republican liberties he reduced the haughty city, which had long styled itself Lord Novgorod the Great, to the rank of a provincial town.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1137' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        },
        {
          id: 'q5',
          text: 'On the death of Casimir, king of Poland and grand-prince of Lithuania, in 1492, the kingdom and the principality ceased to be united and Ivan III. considered he had a good opportunity for attacking the latter.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1144' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Indeed, after Ivan III\'s marriage to Sophia Paleologue, the niece of the last Byzantine emperor, the Muscovite court adopted Byzantine terms, rituals, titles, and emblems such as the double-headed eagle.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'Muscovy', para: '8' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/russia/3.htm' }
        },
        {
          id: 'q7',
          text: 'With a view to strengthen this claim Ivan III. married a niece of the emperor Constantine Palaeologus, who had fallen fighting when his capital was taken by the Turks (1453).',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1138' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        },
        {
          id: 'q8',
          text: 'It was not however until the reign (1462–1505) of Ivan III. that the prince of Moscow set up claims to other parts of Russia, and called himself “Ruler of all Russia.”',
          lang: 'en',
          cite: { source: 'britannica-1911-moscow', loc: { section: 'Moscow', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Moscow'
          }
        }
      ]
    }
  ]
})
