import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-anjoman-e-maaref',
  names: [
    { text: 'Founding of the Anjoman-e Maʿaref', lang: 'en', role: 'primary' },
    { text: 'انجمن معارف', lang: 'fa', role: 'native' },
    {
      text: 'Council on Education',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-constitutional-revolution-intellectual-background',
          loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '24' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1898-02', notAfter: '1898-03' },
        cites: [
          {
            source: 'iranica-anwar-anjoman-e-maaref',
            loc: { section: 'ANJOMAN-E MAʿĀREF', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Sayyed ʿAbd-Allāh Anwar' }
        ]
      },
      {
        value: { d: '1897' },
        cites: [
          {
            source: 'iranica-al-e-dawud-education-primary-schools',
            loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Sayyed ʿAlī Al-e Dāwūd' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-al-e-dawud-education-primary-schools',
          loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mozaffar-al-din-shah' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:amin-al-dowleh',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-anwar-anjoman-e-maaref',
          loc: { section: 'ANJOMAN-E MAʿĀREF', para: '1' }
        },
        {
          source: 'iranica-al-e-dawud-education-primary-schools',
          loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
        }
      ]
    },
    {
      name: 'Maḥmūd Khan Eḥtešām-al-salṭana',
      role: 'leader',
      cites: [
        {
          source: 'iranica-anwar-anjoman-e-maaref',
          loc: { section: 'ANJOMAN-E MAʿĀREF', para: '3' }
        }
      ]
    },
    {
      name: 'Sayyed Yaḥyā Dawlatābādī',
      role: 'participant',
      cites: [
        {
          source: 'iranica-anwar-anjoman-e-maaref',
          loc: { section: 'ANJOMAN-E MAʿĀREF', para: '3' }
        }
      ]
    },
    {
      name: 'Mīrzā Ḥasan Rošdīya',
      role: 'participant',
      cites: [
        {
          source: 'iranica-al-e-dawud-education-primary-schools',
          loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'A movement to introduce modern primary education into Persia began in 1315/1897, when the newly appointed grand vizier, Mīrzā ʿAlī Khan Amīn-al-Dawla (q.v.), initiated his modernizing reforms.',
          lang: 'en',
          cite: {
            source: 'iranica-al-e-dawud-education-primary-schools',
            loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-ix-primary-schools'
          }
        },
        {
          id: 'q2',
          text: 'Rošdīya had already established the first Persian school in Erevan in 1300/1883 and the first modern primary school in Tabrīz in 1305/1888, though in the latter city he had met with continued resistance from conservative religious authorities (ʿolamāʾ; Rošdīya, pp. 23, 31-35).',
          lang: 'en',
          cite: {
            source: 'iranica-al-e-dawud-education-primary-schools',
            loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-ix-primary-schools'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'ANJOMAN-E MAʿĀREF (the Society or Council of Education), a society founded in Šawwāl, 1315/February-March, 1898 under the patronage of the then prime minister Ḥāǰǰ Mīrzā ʿAlī Khan Amīn-al-dawla (q.v.) in order to promote the cause of Western-type education in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-anwar-anjoman-e-maaref',
            loc: { section: 'ANJOMAN-E MAʿĀREF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anjoman-e-maaref'
          }
        },
        {
          id: 'q4',
          text: 'The establishment of the quasi-governmental Council on education (Anjoman-e maʿāref) and the founding of modern schools under its auspices were among the most important measures affecting the growth of a new proconstitutional constituency (Rošdīya; Dawlatābādī, Ḥayāt-e Yaḥyā I, pp. 245-349).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Nāẓem-al-Eslām Kermānīcounted forty-nine modern elementary schools established during the period 1315-25/1897-1907 (Tārīḵ-e bīdārī, ed. Saʿīdī Sīrjānī, I, pp. 413-15).',
          lang: 'en',
          cite: {
            source: 'iranica-al-e-dawud-education-primary-schools',
            loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-ix-primary-schools'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1897' },
            cites: [
              {
                source: 'iranica-al-e-dawud-education-primary-schools',
                loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Sayyed ʿAlī Al-e Dāwūd' }
            ]
          },
          {
            value: { d: '1898' },
            cites: [
              {
                source: 'iranica-ashraf-education-general-survey',
                loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ahmad Ashraf' }
            ]
          },
          {
            value: { d: '1899-01', notAfter: '1899-02' },
            cites: [
              {
                source: 'iranica-anwar-anjoman-e-maaref',
                loc: { section: 'ANJOMAN-E MAʿĀREF', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Sayyed ʿAbd-Allāh Anwar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In that year, under his patronage, Ḥājī Mīrzā Ḥasan Rošdīya founded the first modern primary school in Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-al-e-dawud-education-primary-schools',
          loc: { section: 'EDUCATION ix. PRIMARY SCHOOLS', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/education-ix-primary-schools'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-05' },
            cites: [
              {
                source: 'iranica-anwar-anjoman-e-maaref',
                loc: { section: 'ANJOMAN-E MAʿĀREF', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'This new school, called ʿElmīya, was officially dedicated in Ḏu’l-ḥeǰǰa, 1315/May, 1898, and soon led to the opening of other schools (Dawlatābādī, op. cit., pp. 193-98).',
        lang: 'en',
        cite: {
          source: 'iranica-anwar-anjoman-e-maaref',
          loc: { section: 'ANJOMAN-E MAʿĀREF', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anjoman-e-maaref'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/19_phot._de_Perse_par_E._Pirou%2C_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:19_phot._de_Perse_par_E._Pirou,_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    credit: { creator: 'Eugène Pirou' },
    license: { id: 'public-domain' }
  }
})
