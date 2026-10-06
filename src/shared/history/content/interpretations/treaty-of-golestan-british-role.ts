import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-golestan-british-role',
  about: ['event:treaty-of-golestan', 'event:battle-of-aslanduz'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The cost-conscious Foreign Office, and the EIC, preferred mediation for peace both for the Golestān (q.v.) and later the Torkmānčāy treaties, and in both instances the English envoys pressured Persia to comply with the harsh terms imposed by Russia, Britain’s ally in 1813 against Napoleon and by 1819 an awesome contender.',
    lang: 'en',
    cite: {
      source: 'iranica-amanat-great-britain-ii',
      loc: {
        section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
        para: '8'
      }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
    }
  },
  positions: [
    {
      id: 'terms-dictated-by-russia',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elton L. Daniel', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Ouseley did little more than use his influence to keep up the momentum for an agreement (and protect British interests), as the actual terms of the settlement were essentially dictated by Rtischev (Atkin, p. 143; Pakravan, p. 156).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        }
      ]
    },
    {
      id: 'british-pressure',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hassan Javadi' },
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'After his return to Iran, Mīrzā Abu’l-Ḥasan, who received the honorary title of Khan from Fatḥ-ʿAlī Shah, worked closely with the British ambassador, who played an important part in drafting the Treaty of Golestān.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q4',
          text: 'Ouseley’s main concern was to safeguard the British and Russian interests and enable the Russians to face the Napoleonic army without being disturbed by Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q5',
          text: 'Finally, in 1813, as a result of Napoleon’s campaign in Russia and at British instigation, the peace of Golestān in Šīrvān was signed.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'anglo-russian-collusion',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jahangir Qāʾem-Maqāmī', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The attack would not have been made but for the Anglo-Russian reconciliation in Europe and the subsequent collusion of the two powers over Iran',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        }
      ]
    },
    {
      id: 'shah-diplomacy-credited',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Fatḥ-ʿAlī Shah and his ministers should be credited for their diplomatic maneuvering and for ultimately opting for British financial commitment and military assistance in the face of Russian military superiority.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '19' }
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
      id: 'tabriz-desperation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'The change in the Tabriz attitude took place mostly out of desperation than choice, while in Tehran, low morale and financial bankruptcy complemented the already existing strong pro-British sentiments',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ]
})
