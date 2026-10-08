import { definePolity } from '../../schema'

export default definePolity({
  id: 'russian-empire',
  names: [
    { text: 'Russian Empire', lang: 'en', role: 'primary' },
    { text: 'Российская империя', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
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
        value: { d: '1917-03-15' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:saint-petersburg',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Early Imperial Russia', para: '9' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 365 },
    { set: 'europe', code: 365, from: 1816, to: 1886 },
    { set: 'world', code: 365, to: 1917.2 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Peter_I%2C_The_Great%2C_Emperor_of_Russia%2C_1672-1725%2C_half-length_portrait%2C_standing%2C_sword_in_hand%2C_facing_left_LCCN2005689664.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Peter_I,_The_Great,_Emperor_of_Russia,_1672-1725,_half-length_portrait,_standing,_sword_in_hand,_facing_left_LCCN2005689664.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the eighteenth century, Muscovy was transformed from a static, somewhat isolated, traditional state into the more dynamic, partially Westernized, and secularized Russian Empire.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Early Imperial Russia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/4.htm' }
        },
        {
          id: 'q2',
          text: 'During the early nineteenth century, Russia\'s population, resources, international diplomacy, and military forces made it one of the most powerful states in the world.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The official birthday of the Russian empire was the 22nd of October 1721, when, after a solemn thanksgiving service in the Troitsa Cathedral for the peace of Nystad, the tsar proceeded to the senate and was there acclaimed: “Father of the Fatherland, Peter the Great, and Emperor of All Russia.”',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        },
        {
          id: 'q4',
          text: 'Peter achieved Muscovy\'s expansion into Europe and its transformation into the Russian Empire through several major initiatives.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Early Imperial Russia', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/4.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The best illustration of Peter\'s drive for Westernization, his break with traditions, and his coercive methods was his construction in 1703 of a new, architecturally Western capital, St. Petersburg, situated on land newly conquered from Sweden on the Gulf of Finland.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Early Imperial Russia', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/4.htm' }
        },
        {
          id: 'q6',
          text: 'With her emphasis on a uniformly administered empire, Catherine presaged the policy of Russification that later tsars and their successors would practice.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Early Imperial Russia', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/4.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Advised by his generals that he lacked the support of the country, Nicholas informed the delegates that he was abdicating in favor of his brother, Grand Duke Michael. When Michael in turn refused the throne, imperial rule in Russia came to an end.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'zaionchkovskii-1954-otmena-krepostnogo-prava-v-rossii',
      perspective: 'russian-soviet'
    },
    { source: 'zaionchkovskii-1964-krizis-samoderzhaviia', perspective: 'russian-soviet' },
    { source: 'kurat-1970-turkiye-ve-rusya', perspective: 'turkish' }
  ]
})
