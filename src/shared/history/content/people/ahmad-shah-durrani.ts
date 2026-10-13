import { definePerson } from '../../schema'

export default definePerson({
  id: 'ahmad-shah-durrani',
  names: [
    { text: 'Ahmad Shah Durrani', lang: 'en', role: 'primary' },
    {
      text: 'Ahmad Shah Abdali',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lc-names-n84226939',
          loc: { section: 'Aḥmad Shāh Durrānī, Amir of Afghanistan, approximately 1723-1772' }
        }
      ]
    },
    {
      text: 'Ahmad Shah Baba',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '8' }
        }
      ]
    },
    {
      text: 'Aḥmad Khan',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1722' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1723', approx: true },
        cites: [
          {
            source: 'lc-names-n84226939',
            loc: { section: 'Aḥmad Shāh Durrānī, Amir of Afghanistan, approximately 1723-1772' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1772-10-16' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'King of the Afghans',
      polity: 'polity:durrani-empire',
      start: {
        alts: [
          {
            value: { d: '1747-10' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1772-10-16' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
        },
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Portrait_of_Ahmad-Shah_Durrani._Mughal_miniature._ca._1757%2C_Biblioth%C3%A8que_nationale_de_France_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Ahmad-Shah_Durrani._Mughal_miniature._ca._1757,_Biblioth%C3%A8que_nationale_de_France_(cropped).jpg',
    credit: { institution: 'Bibliothèque nationale de France' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ahmad Shah had succeeded to a remarkable degree in balancing tribal alliances and hostilities and in directing tribal energies away from rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q2',
          text: 'Even before the death of Nadir Shah, tribes in the Hindu Kush had been growing stronger and were beginning to take advantage of the waning power of their distant rulers.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Nāder’s policy towards Afghanistan was based on the support he was able to find among the Abdālīs, traditional rivals of the Ḡilzī, who had newly taken over some of the Abdālī territory; thus Aḥmad Khan (b. 1135/1722), a young Abdālī leader of the Sadōzay branch of the Pōpalzay tribe, also allied to the Alīkōzī on his mother’s side, came to be named governor of Māzandarān and then commander of the Paṣ̌tūn contingent of 4,000 men in Nāder’s army',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1747 Ahmad Shah and his Abdali horsemen joined the chiefs of the Abdali tribes and clans near Qandahar to choose a leader.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q5',
          text: 'One of Ahmad Shah\'s first acts as chief was to adopt the title "Durr-i-Durrani" ("pearl of pearls" or "pearl of the age"), which may have come from a dream or from the pearl earrings worn by the royal guard of Nadir Shah.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q6',
          text: 'Ahmad Shah began by capturing Ghazni from the Ghilzai Pashtuns, and then wresting Kabul from the local ruler.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q7',
          text: 'Ahmad Shah declared an Islamic holy war against the Marathas, and warriors from various Pashtun tribes, as well as other tribes such as the Baloch, answered his call.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q8',
          text: 'For several decades the Dorrānī empire was the dominating regional power.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'In 1772 Ahmad Shah retired to his home in the mountains east of Qandahar, where he died.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q10',
          text: 'By the time of his death, he had lost all but nominal control of the Punjab to the Sikhs, who remained in charge of the area until the British defeat in 1849.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    }
  ]
})
