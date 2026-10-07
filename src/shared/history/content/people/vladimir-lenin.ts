import { definePerson } from '../../schema'

export default definePerson({
  id: 'vladimir-lenin',
  names: [
    { text: 'Vladimir Lenin', lang: 'en', role: 'primary' },
    { text: 'Владимир Ильич Ленин', lang: 'ru', role: 'native' },
    {
      text: 'Vladimir Il’ich Lenin',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-ennker-lenin', loc: { section: 'Lenin, Vladimir Il’ich' } }
      ]
    },
    {
      text: 'Ulyanov',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-ennker-lenin', loc: { section: 'Lenin, Vladimir Il’ich' } }
      ]
    }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1870-04-22' },
        cites: [
          { source: 'eo1418-ennker-lenin', loc: { section: 'Lenin, Vladimir Il’ich' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1924-01-21' },
        cites: [
          { source: 'eo1418-ennker-lenin', loc: { section: 'Lenin, Vladimir Il’ich' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  roles: ['revolutionary', 'head-of-state'],
  offices: [
    {
      title: 'chairman of the Council of People\'s Commissars',
      start: {
        alts: [
          {
            value: { d: '1917-11' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '15' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '15' }
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
          text: 'Vladimir Il’ich Lenin was the founder and leader of the Bolshevik Party and of the Soviet state up until his death. Theoretically and practically he combined the strategy of a socialist revolution with imperialism and war. After thus successfully seizing power in Russia, he maintained control in the form of a “dictatorship of the proletariat” using extremely repressive politics.',
          lang: 'en',
          cite: { source: 'eo1418-ennker-lenin', loc: { section: 'Lenin, Vladimir Il’ich' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'From a Russian Social Democracy standpoint, he predicted the tsarist government’s defeat in the war and called for all socialists to adopt this revolutionary defeatism against their own governments in order to transform the imperialist war into civil war.',
          lang: 'en',
          cite: {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Reaction to World War I', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The German imperial government allowed Lenin passage through Germany, hoping to thus undermine the German enemy’s ability to continue fighting. Speculations on the role of “German gold” in the Russian Revolution have circulated since then. However, new documentary evidence has shown that Lenin received less than $40,000 worth of German money.2 This money was primarily used to prepare for world revolution; it was decisive neither for revolution nor for war.',
          lang: 'en',
          cite: {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Revolution and Peace', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        },
        {
          id: 'q4',
          text: 'It was only thanks to Lenin’s decisive role that the Bolshevik Party eventually accepted the treaty.',
          lang: 'en',
          cite: {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Lenin and the Peace Treaties', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Thus, Lenin’s campaign to turn the “imperialist war into a civil war” – the core strategy of his revolution concept8 – had fatal consequences.',
          lang: 'en',
          cite: {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Transforming War into Civil War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Lenin_LCCN2014715123_%28cropped%29.jpg/1280px-Lenin_LCCN2014715123_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lenin_LCCN2014715123_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Viktor Bulla' },
    license: { id: 'public-domain' }
  }
})
