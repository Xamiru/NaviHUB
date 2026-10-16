import { definePerson } from '../../schema'

export default definePerson({
  id: 'sher-ali-khan',
  names: [
    { text: 'Sher Ali Khan', lang: 'en', role: 'primary' },
    { text: 'شیر علی خان', lang: 'fa', role: 'native' },
    {
      text: 'Šēr ʿAlī',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1879-02-21' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'amir',
      polity: 'polity:emirate-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1869' },
            cites: [
              {
                source: 'iranica-adamec-norris-anglo-afghan-wars',
                loc: {
                  section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)',
                  para: '1'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ludwig W. Adamec' },
              { kind: 'scholar', name: 'James Alfred Norris' }
            ]
          },
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Second Anglo-Afghan War', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1879-02-21' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '1' }
        },
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'SHERE ALI KHAN (1825–1879), Amir of Afghanistan, was born in 1825, one of the younger sons of the amir Dost Mahommed, whom he succeeded in 1863.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-shere-ali-khan',
            loc: { section: 'SHERE ALI KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Shere_Ali_Khan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Four years later, he was on good terms with the British in India, having being assured that he could count on their friendship and support; the viceroy (Lord Mayo) had given him two batteries of artillery and some thousands of sets of weapons for his soldiers.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q2',
          text: 'Šēr ʿAlī was disappointed, since he wanted assurances of help without interference in his internal affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'An alarmed Sher Ali attempted to appeal in person to the tsar for assistance, but unable to do so, he returned to Mazar-e-Sharif, where he died the following February.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Sher_Ali_Khan_and_company_of_Afghanistan_in_1869.jpg/1280px-Sher_Ali_Khan_and_company_of_Afghanistan_in_1869.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sher_Ali_Khan_and_company_of_Afghanistan_in_1869.jpg',
    credit: { institution: 'The British Library', creator: 'John Burke' },
    license: { id: 'public-domain' }
  },
  born: {
    alts: [
      {
        value: { d: '1825' },
        cites: [
          {
            source: 'loc-name-authority-sher-ali-khan',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  }
})
