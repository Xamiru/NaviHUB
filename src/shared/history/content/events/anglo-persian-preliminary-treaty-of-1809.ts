import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-preliminary-treaty-of-1809',
  names: [
    { text: 'Anglo-Persian Preliminary Treaty of 1809', lang: 'en', role: 'primary' },
    { text: 'Preliminary Treaty of Friendship and Alliance', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1809-03-15' },
        cites: [
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '20' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian' },
          { kind: 'scholar', name: 'Manoutchehr M. Eskandari-Qajar' }
        ]
      },
      {
        value: { d: '1809-06-17' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '13' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Stephanie Cronin' }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  participants: [
    {
      ref: 'person:harford-jones-brydges',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-perry-brydges',
          loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '2' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
          loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '12' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:gardane-mission', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Franco-Iranian alliance greatly alarmed the British government. India’s governor-general, Lord Minto, decided to send John Malcolm on a second mission to Tehran. Malcolm, who had been promoted brigadier-general, arrived in southern Iran in May, 1808, but was not permitted by the Iranian government to travel to Tehran. He was instead instructed to negotiate with the governor-general of Fārs. This he angrily refused to do and returned to India',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q2',
          text: 'By February 1809, having lost all faith in Napoleon’s good will, in a remarkable reverse of policy the shah took advantage not only of the British offer of an alliance but received in Tehran the British envoy from London, Harford Jones Brydges, only a day after General Gardane and his mission left the capital in protest',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Its leader, Sir Harford Jones, brought rich gifts and made rich promises. He offered the Shah an alliance against Russia which had declared war on Britain, and annual subsidy of 120,000 pounds sterling for as long as that war lasted, and British officers to take the place of the no longer useful French. The Shah signed the treaty in March, 1809',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q4',
          text: 'The Preliminary Treaty of Friendship and Alliance (17 June 1809) provided for a British subsidy to pay for British military stores, equipment and officers and men, in exchange for the shah’s severing his ties with the French.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        },
        {
          id: 'q5',
          text: 'Brydges, however, managed in March, 1809, to conclude the first treaty of alliance between the governments of Iran and Britain',
          lang: 'en',
          cite: {
            source: 'iranica-perry-brydges',
            loc: { section: 'BRYDGES, Sir HARFORD JONES', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/brydges-sir-harford-jones/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Persian authorities discovered before long that the treaty signed by Jones (with a definitive treaty later concluded between London and Tehran in 1814) was another unreliable British undertaking, with some of its key terms evaded by London after Britain and Russia joined forces in 1812 for a major showdown with Napoleon',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'morier-1812-journey',
      mediaKind: 'document',
      title: 'A journey through Persia, Armenia, and Asia Minor, to Constantinople 1808-09 : in which is included, some account of the proceedings of His Majesty\'s mission, under Sir Harford Jones, Bart. K.C. to the court of the King of Persia',
      date: { d: '1812' },
      url: 'https://archive.org/download/b28407027/b28407027.pdf',
      page: 'https://archive.org/details/b28407027',
      credit: {
        institution: 'Royal College of Physicians, London (Internet Archive)',
        creator: 'James Justinian Morier'
      },
      license: { id: 'public-domain' },
      bytes: 37116917
    }
  ]
})
