import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-hawaii',
  names: [
    { text: 'Kingdom of Hawaii', lang: 'en', role: 'primary' },
    { text: 'Ke Aupuni Hawaiʻi', lang: 'haw', role: 'native' },
    {
      text: 'Hawaiian Kingdom',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-countries-hawaii',
          loc: { section: 'Hawaii: Summary', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1795' },
        cites: [
          { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '37' } }
        ]
      },
      {
        value: { d: '1810' },
        cites: [
          {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '3'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1893-01-17' },
        cites: [
          {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '8'
            }
          },
          { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '43' } }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:lahaina',
      end: {
        alts: [
          {
            value: { d: '1845' },
            cites: [
              {
                source: 'state-dept-countries-hawaii',
                loc: { section: 'Hawaii: Summary', para: '17' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-countries-hawaii',
          loc: { section: 'Hawaii: Summary', para: '17' }
        }
      ]
    },
    {
      ref: 'place:honolulu',
      start: {
        alts: [
          {
            value: { d: '1845' },
            cites: [
              {
                source: 'state-dept-countries-hawaii',
                loc: { section: 'Hawaii: Summary', para: '17' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '1' } }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kamehameha_I%2C_lithograph_by_D._Veelward_%28PP-97-5-005%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kamehameha_I,_lithograph_by_D._Veelward_(PP-97-5-005).jpg',
    credit: { institution: 'Hawaii State Archives', creator: 'D. Veelward' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1810, King Kamehameha had unified all of the Hawaiian Islands into one royal kingdom. Later, the traditional Hawaiian monarchy was overthrown in favor of a constitutional monarchy. Eventually, the monarchy itself was abandoned in favor of a government elected by a small group of enfranchised voters, although the Hawaiian monarch was retained as the ceremonial head of the government.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Having encouraged a warlike spirit in his people and having introduced firearms, Kamehameha attacked and overcame the chiefs of the other kingdoms one after another, until (in 1795) he became undisputed master of the whole group.',
          lang: 'en',
          cite: { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '37' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hawaii'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1839 Kamehameha III. signed a Bill of Rights and in 1840 he promulgated the first constitution of the realm; in 1842 a code of laws was proclaimed; by 1848 the feudal system of land tenure was completely abolished; the first legislature met in 1845 and full suffrage was granted in 1852, but in 1864 suffrage was restricted.',
          lang: 'en',
          cite: { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '39' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hawaii'
          }
        },
        {
          id: 'q4',
          text: 'Great Britain issued a formal joint declaration with France on November 28, 1843, guaranteeing Hawaiian independence.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-hawaii',
            loc: { section: 'Hawaii: Summary', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/hawaii' }
        },
        {
          id: 'q5',
          text: 'On July 6, 1887, a militia affiliated with the Hawaiian League, a non-native mostly U.S. businessmen\'s political party opposed to the king, under the leadership of Lorrin Thurston, threatened King Kalākaua. He was forced to sign a new constitution stripping him of his power and many native Hawaiians of their rights. It also replaced the cabinet with non-native politicians and businessmen. The new constitution came to be known as the "Bayonet Constitution" because Kalākaua signed it under duress.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Supported by John Stevens, the U.S. Minister to Hawaii, and a contingent of Marines from the warship, U.S.S. Boston, the Committee overthrew Queen Lili\'uokalani in a bloodless coup on January 17, 1893. The Committee of Safety proclaimed itself to be the Provisional Government. Without permission from the U.S. State Department, Minister Stevens recognized the new government and proclaimed Hawaii a U.S. protectorate.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        },
        {
          id: 'q7',
          text: 'The Blount Commission found that Lili’uokalani had been overthrown illegally, and ordered that the American flag be lowered from Hawaiian government buildings. Lili\'uokalani never regained power, however.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'silva-2004-aloha-betrayed', perspective: 'pacific' },
    { source: 'liliuokalani-1898-hawaiis-story', perspective: 'pacific' }
  ]
})
