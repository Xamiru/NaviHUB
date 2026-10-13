import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-durrani-empire',
  names: [
    { text: 'Founding of the Durrani Empire', lang: 'en', role: 'primary' },
    {
      text: 'Election of Ahmad Shah',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'founding',
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
  regions: ['south-asia', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:kandahar',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:durrani-empire',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
        }
      ]
    },
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ahmad-shah-durrani',
      role: 'leader',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:assassination-of-nader-shah',
      rel: 'caused-by',
      cites: [
        { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } }
      ]
    },
    {
      ref: 'event:third-battle-of-panipat',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
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
          text: 'In 1747 Ahmad Shah and his Abdali horsemen joined the chiefs of the Abdali tribes and clans near Qandahar to choose a leader.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q2',
          text: 'Aḥmad Khan was thus elected king of the Afghans by a ǰerga or tribal council of Paṣ̌tūn chiefs; in October of the same year he was crowned at a location not far from Qandahār, the city that became his capital.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Even before the death of Nadir Shah, tribes in the Hindu Kush had been growing stronger and were beginning to take advantage of the waning power of their distant rulers.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q4',
          text: 'Nāder Shah managed to bring them under control, however, and raised from their ranks a contingent of 12,000 cavalry under the command of an ʿAlīzay chief',
          lang: 'en',
          cite: { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/dorrani-1'
          }
        },
        {
          id: 'q5',
          text: 'Nāder’s policy towards Afghanistan was based on the support he was able to find among the Abdālīs, traditional rivals of the Ḡilzī, who had newly taken over some of the Abdālī territory; thus Aḥmad Khan (b. 1135/1722), a young Abdālī leader of the Sadōzay branch of the Pōpalzay tribe, also allied to the Alīkōzī on his mother’s side, came to be named governor of Māzandarān and then commander of the Paṣ̌tūn contingent of 4,000 men in Nāder’s army.',
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Primarily with the support of the Paṣ̌tūn tribes, whose members made up the greater part of his army and whose aristocracy formed the hereditary royal officer corps, Aḥmad Shah was able to take advantage of the disintegration of the Persian and Mughal empires and pursue a boldly expansionist policy, thus contributing decisively to the emergence of a pan-Paṣ̌tūn national sentiment.',
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
        },
        {
          id: 'q7',
          text: 'From that time on the history of the Dorrānī effectively coincides with the history of the Afghan state.',
          lang: 'en',
          cite: { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/dorrani-1'
          }
        },
        {
          id: 'q8',
          text: 'Afterward, even prior to his death, the empire began to unravel.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1747' },
            cites: [
              { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'At Nāder Shah’s death they felt strong enough to proclaim their independence.',
        lang: 'en',
        cite: { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/dorrani-1'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1747' },
            cites: [
              { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } },
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'One of Ahmad Shah\'s first acts as chief was to adopt the title "Durr-i-Durrani" ("pearl of pearls" or "pearl of the age"), which may have come from a dream or from the pearl earrings worn by the royal guard of Nadir Shah.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1749' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1749 the Mughal ruler ceded sovereignty over Sindh Province and the areas of northern India west of the Indus to Ahmad Shah in order to save his capital from Afghan attack.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1750' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Herat fell to Ahmad after almost a year of siege and bloody conflict, as did Mashhad (in present-day Iran).',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1757' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Early in 1757, he sacked Delhi, but permitted the Mughal Dynasty to remain in nominal control as long as the ruler acknowledged Ahmad\'s suzerainty over the Punjab, Sindh, and Kashmir.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Portrait_miniature_of_Ahmad_Shah_Durrani-cropped.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_miniature_of_Ahmad_Shah_Durrani-cropped.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Colonel Gentil' },
    license: { id: 'public-domain' }
  }
})
