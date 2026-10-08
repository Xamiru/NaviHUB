import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dismissal-of-malkom-khan',
  names: [
    { text: 'Dismissal of Malkom Khan', lang: 'en', role: 'primary' },
    { text: 'عزل میرزا ملکم خان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1889-12' },
        cites: [
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:london',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:malkom-khan',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
        }
      ]
    },
    {
      name: 'Sir Henry Drummond Wolff',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
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
          text: 'But new difficulties arose after Mīrzā Malkom Khan Nāẓem-al-dawla, the Iranian ambassador in London (1873-89), was revoked for his dealings in the business of a lottery concession and shadowy corporations. Objections to this concession had been formulated by Wolff and the Russian charge d’affaires. Amīn-al-solṭān obtained its condemnation from the ʿolamāʾ. Malkom refused to accept this cancellation and, for financial and other reasons, the shah preferred to dismiss him (December, 1889).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q2',
          text: 'While the Russians continued their plots to unseat him, he was threatened internally by Kāmrān Mīrzā (in contact with Russians; Wolff believed he led the opposition to Amīn-al-solṭān) and abroad by Malkom’s Qānūn (July-August, 1890).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q3',
          text: 'A number of periodicals published abroad, but filtered into Persia, such as Aḵtar (q.v.) in Istanbul, Qānun in London, and Ḥabl al-matin (q.v.) in Calcutta, served as sources of encouragement for changing the arbitrary rule of the Qajar government.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Mirza_Malkam_Khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Malkam_Khan.jpg',
    credit: { institution: 'E. G. Browne, The Press and Poetry of Modern Persia (1914)' },
    license: { id: 'public-domain' }
  }
})
