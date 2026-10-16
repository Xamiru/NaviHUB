import { definePolity } from '../../schema'

export default definePolity({
  id: 'shirvan',
  names: [
    { text: 'Shirvan', lang: 'en', role: 'primary' },
    {
      text: 'Šervānšāhs',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '1' } }
      ]
    },
    {
      text: 'Shirvanshahs',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-azerbaijan-country-study-1995',
          loc: { section: 'The Introduction of Islam and the Turkish Language', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '0799' },
        cites: [
          { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '3' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1538' },
        cites: [
          { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '9' } }
        ]
      }
    ]
  },
  regions: ['mena', 'russia-central-asia'],
  prominence: 3,
  cshapes: [
    { set: 'early', code: 638064 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'By the end of this 8th century, Šervān came within the extensive governorship, comprising Azarbaijan, Arrān, Armenia and the eastern Caucasus, granted by Hārun-al-Rašid in 183/799 to the Arab commander Yazid b. Mazyad, and this marks the beginning of the line of Yazidi Šervānšāhs which was to endure until Timurid times and the end of the 14th century',
          lang: 'en',
          cite: { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/servansahs'
          }
        },
        {
          id: 'q2',
          text: 'The history of Šervānšāhs was clearly closely bound up with that of another Arab military family, the Hāšemis of Bāb al-abwāb/Darband',
          lang: 'en',
          cite: { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/servansahs'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In the 13th century, Šervān fell under the control first of the Khwarazmshah Jalāl-al-Din Mengüberti after the latter appeared in Azarbaijan; according to Nasawi',
          lang: 'en',
          cite: { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/servansahs'
          }
        },
        {
          id: 'q4',
          text: 'Shirvan shah Ibrahim I ibn Sultan Muhammad briefly accepted Timur as his overlord.',
          lang: 'en',
          cite: {
            source: 'loc-azerbaijan-country-study-1995',
            loc: { section: 'The Introduction of Islam and the Turkish Language', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/azerbaijan/5.htm' }
        },
        {
          id: 'q5',
          text: 'The 15th century was one of peace and prosperity for Šervān, with many fine buildings erected in Šammāḵa/Šemāḵa and Baku',
          lang: 'en',
          cite: { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/servansahs'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Shahs remained as tributaries, and continued to mint their own coins, until in 945/1538 Ṭahmāsp I’s troops invaded Šervān, toppled Šāhroḵ b. Farroḵ, and made the region a mere governorship of the Safavid empire.',
          lang: 'en',
          cite: { source: 'iranica-bosworth-servansahs', loc: { section: 'ŠERVĀNŠAHS', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/servansahs'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Shirvanshahs_Palace_Mosque_01.jpg/1280px-Shirvanshahs_Palace_Mosque_01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shirvanshahs_Palace_Mosque_01.jpg',
    credit: { creator: 'Bernard Gagnon' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
