import { definePolity } from '../../schema'

export default definePolity({
  id: 'qajar-iran',
  names: [
    { text: 'Qajar Iran', lang: 'en', role: 'primary' },
    {
      text: 'دولت علیّه ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Dowlat-e ʿAliyye-ye Irān'
    },
    {
      text: 'Persia',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1' } }
      ]
    },
    {
      text: 'ممالک محروسهٔ ایران',
      lang: 'fa',
      role: 'official',
      translit: 'Mamālek-e maḥrūsa-ye Īrān',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '413' } }
      ]
    },
    {
      text: 'Guarded Domains of Persia',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '36' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1786' },
        cites: [
          {
            source: 'iranica-amanat-historiography-qajar',
            loc: { section: 'HISTORIOGRAPHY viii. QAJAR PERIOD', para: '1' }
          }
        ]
      },
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1925-10-31' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'Major Cities', para: '1' } }
      ]
    }
  ],
  dynasties: ['period:qajar-dynasty'],
  cshapes: [
    { set: 'early', code: 630 },
    { set: 'world', code: 630, to: 1925.83 }
  ],
  figures: [
    {
      key: 'population',
      value: {
        alts: [
          {
            value: { min: 10000000 },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '396' } }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg/1280px-Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar,_ruler_of_Iran_from_1797_to_1834,_by_his_court_painter_Mihr_%27Ali,_Tehran,_about_1810.jpg',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Mihr \'Ali' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'PERSIA, a kingdom of western Asia, bounded on the N. by the Caspian Sea and the Russian Transcaucasian and Transcaspian territories, on the E. by Afghanistan and Baluchistan, on the S. by the Arabian Sea and the Persian Gulf, and on the W. by Turkish territory.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q2',
          text: 'Agha Mohammad Qajar defeated the last Zand ruler outside Kerman in 1794 and made himself master of the country, beginning the Qajar dynasty that was to last until 1925.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q3',
          text: 'The Qajars revived the concept of the shah as the shadow of God on earth and exercised absolute powers over the servants of the state.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The empire of Persia, officially known as Mamalik i Mahruseh i Iran, “the protected kingdoms of Persia,” is divided into a number of provinces, Which, when large, and containing important sub-provinces and districts, are called mamlikat, “kingdom,” when smaller, vilayat and ayalat, and are ruled by governors-general and governors appointed by and directly responsible to the Crown.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '413' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q5',
          text: 'They appointed royal princes to provincial governorships and, in the course of the nineteenth century, increased their power in relation to that of the tribal chiefs, who provided contingents for the shah\'s army.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q6',
          text: 'In two disastrous wars with Russia, which ended with the Treaty of Gulistan (1812) and the Treaty of Turkmanchay (1828), Iran lost all its territories in the Caucasus north of the Aras River.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q7',
          text: 'Under the Treaty of Paris in 1857, Iran surrendered to Britain all claims to Herat and territories in present-day Afghanistan.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q8',
          text: 'In 1871, with the encouragement of his new prime minister, Mirza Hosain Khan Moshir od Dowleh, the shah established a European-style cabinet with administrative responsibilities and a consultative council of senior princes and officials.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'In October 1925, a Majlis dominated by Reza Khan\'s men deposed the Qajar dynasty; in December the Majlis conferred the crown on Reza Khan and his heirs.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'shamim-2004-iran-dar-dowreh-ye-saltanat-e-qajar', perspective: 'iranian' },
    { source: 'mostowfi-1945-sharh-e-zendegani-ye-man', perspective: 'iranian' },
    { source: 'sasani-1960-siyasatgaran-e-dowreh-ye-qajar', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' },
    { source: 'ivanov-1952-ocherk-istorii-irana', perspective: 'russian-soviet' }
  ]
})
