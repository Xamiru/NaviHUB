import { definePolity } from '../../schema'

export default definePolity({
  id: 'emirate-of-bukhara',
  names: [
    { text: 'Emirate of Bukhara', lang: 'en', role: 'primary' },
    { text: 'امارت بخارا', lang: 'fa', role: 'native' },
    {
      text: 'Khanate of Bukhara',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'emirate',
  start: {
    alts: [
      {
        value: { d: '1756' },
        cites: [
          { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920' },
        cites: [
          { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '1' } },
          {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Jadidists and Basmachis', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:bukhara',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Bokhara (code 7020), capital Bukhara' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'loc-uzbekistan-country-study-1996',
                loc: { section: 'The Russian Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1917-03-12', julian: true },
            cites: [
              { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '23' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 746558 },
    { set: 'world', code: 7020, to: 1920.67 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Alim_Khan_%281880%E2%80%931944%29%2C_Emir_of_Bukhara%2C_photographed_by_S.M._Prokudin-Gorskiy_in_1911.jpg/1280px-Alim_Khan_%281880%E2%80%931944%29%2C_Emir_of_Bukhara%2C_photographed_by_S.M._Prokudin-Gorskiy_in_1911.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alim_Khan_(1880%E2%80%931944),_Emir_of_Bukhara,_photographed_by_S.M._Prokudin-Gorskiy_in_1911.jpg',
    credit: { institution: 'Library of Congress', creator: 'Sergei Prokudin-Gorskii' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1868 the Khanate of Bukhoro signed a treaty with Russia making Bukhoro a Russian protectorate.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        },
        {
          id: 'q2',
          text: 'The treaties establishing the protectorates over Bukhoro and Khiva gave Russia control of the foreign relations of these states and gave Russian merchants important concessions in foreign trade; the khanates retained control of their own internal affairs.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'MANGHITS, self denomination of Mongol and Turkic tribes (Mangkut, Mānḡit, Manḡit, Manqit, Manqiṭ, Mangqit, Manḡut; also known as “Noḡay”) which played an eminent role in the Golden Horde, mainly nomadized in the Dašt-e Qepčāq, and from the 16th century onwards migrated partly to the Crimean Khanate and North Caucasus, and with the Shaybanid (Shibanid) dynasty partly invaded Transoxiana, and Ḵᵛārazm (see Bregel, 2000, pp.',
          lang: 'en',
          cite: { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/manghits'
          }
        },
        {
          id: 'q3',
          text: '417-18; Trepavlov, 2001, passim ).It is also the name of a Mongolian-Turkic dynasty that reigned over the Khanate of Bukhara from 1160/1747 (de jure since 1170/1756) until 1920.',
          lang: 'en',
          cite: { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/manghits'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Amir Ḥaydar practiced himself as a Sufi master, gave lessons in Islamic (Hanafite) law, compiled a book on it (Fawāʾed al-alfiya), and claimed himself amir al-moʾmenin (the prince of the faithful), that is caliph.',
          lang: 'en',
          cite: { source: 'iranica-von-kugelgen-manghits', loc: { section: 'MANGHITS', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/manghits'
          }
        },
        {
          id: 'q5',
          text: 'After 1900 the khanates continued to enjoy a certain degree of autonomy in their internal affairs. However, they ultimately were subservient to the Russian governor general in Tashkent, who ruled the region in the name of Tsar Nicholas II.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'Entering the Twentieth Century', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/uzbekistan/9.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'In 1920 Khojayev, who became first secretary of the Communist Party of Uzbekistan, assisted communist forces in the capture of Bukhoro and Khiva.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Jadidists and Basmachis', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/uzbekistan/10.htm' }
        },
        {
          id: 'q7',
          text: 'After the amir of Bukhoro had joined the Basmachi movement, Khojayev became president of the newly established Soviet Bukhoran People\'s Republic.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Jadidists and Basmachis', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/uzbekistan/10.htm' }
        }
      ]
    }
  ]
})
