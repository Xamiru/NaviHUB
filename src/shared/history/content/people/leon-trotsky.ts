import { definePerson } from '../../schema'

export default definePerson({
  id: 'leon-trotsky',
  names: [
    { text: 'Leon Trotsky', lang: 'en', role: 'primary' },
    { text: 'Лев Давидович Троцкий', lang: 'ru', role: 'native' },
    {
      text: 'Leo D. Trotzki',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '21' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1879' },
        cites: [
          { source: 'eo1418-thatcher-trotsky', loc: { section: 'Trotsky, Leon' } },
          {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'From the July Days to the Kornilov Mutiny', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1940-08-21' },
        cites: [
          { source: 'eo1418-thatcher-trotsky', loc: { section: 'Trotsky, Leon' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe', 'latin-america'],
  roles: ['revolutionary', 'politician', 'journalist'],
  offices: [
    {
      title: 'commissar of foreign affairs',
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
          text: 'Leon Trotsky\'s communist leadership was partially responsible for bringing about the October Revolution of 1917, after which Russia exited the First World War. Starting as an activist, he became People’s Commissar for Foreign Affairs and People’s Commissar for War in the first Soviet government.',
          lang: 'en',
          cite: { source: 'eo1418-thatcher-trotsky', loc: { section: 'Trotsky, Leon' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/trotsky-leon/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In peace negotiations with the Central Powers Trotsky engaged in an unconventional strategy to further the European revolution when he refused to sign a treaty and declared a state of “no war, no peace.”',
          lang: 'en',
          cite: {
            source: 'eo1418-thatcher-trotsky',
            loc: { section: 'The 1917 Russian Revolution', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/trotsky-leon/'
          }
        },
        {
          id: 'q3',
          text: 'the Red Army, which Trotsky, named commissar of war in the Soviet government, organized to defend the new state.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'It was here that after several failed assassination attempts, one of Stalin’s agents murdered Trotsky in his study.',
          lang: 'en',
          cite: {
            source: 'eo1418-thatcher-trotsky',
            loc: { section: 'The 1917 Russian Revolution', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/trotsky-leon/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Leon_Trotsky_1918_%283x4_rotated_cropped%29.jpg/1280px-Leon_Trotsky_1918_%283x4_rotated_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Leon_Trotsky_1918_(3x4_rotated_cropped).jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'cc0' }
  }
})
