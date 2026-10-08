import { definePerson } from '../../schema'

export default definePerson({
  id: 'abdul-rahman-ghassemlou',
  names: [
    { text: 'Abdul Rahman Ghassemlou', lang: 'en', role: 'primary' },
    {
      text: 'Qāsemlu, ʿAbd-al-Raḥmān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
        }
      ]
    },
    {
      text: 'عبدالرحمن قاسملو',
      lang: 'fa',
      role: 'native',
      translit: 'ʿAbd-al-Raḥmān Qāsemlu'
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1930-12-22' },
        cites: [
          {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1989-07-13' },
        cites: [
          {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:urmia',
    cites: [
      {
        source: 'iranica-prunhuber-qasemlu',
        loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:vienna',
    cites: [
      {
        source: 'iranica-prunhuber-qasemlu',
        loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'revolutionary'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Portrait_of_Abdul_Rahman_Ghassemlou_1940s.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Abdul_Rahman_Ghassemlou_1940s.jpg',
    credit: { institution: 'Tudeh Party of Iran (youth membership card, 1948)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Kurdish political leader, who as secretary general of the Kurdistan Democratic Party of Iran (KDPI), led the Kurdish nationalist struggle for autonomy and democracy in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q7',
          text: 'Qāsemlu returned to Iran in 1952 when he graduated from the School of Economics and Political Science (Krulich, p. 27). He started his clandestine political activities in the country by revitalizing the Democratic Party of Kurdistan (KDP), which was then an appendage of the Tudeh party',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        },
        {
          id: 'q2',
          text: 'In March 1979, the KDP (Iran) officially announced the resumption of its political activities, putting an end to thirty years of clandestine functions. At the end of that month, Qāsemlu held his first political meeting in Mahabad. During this first celebratory political demonstration of the KDP (Iran), Qāsemlu “declared that his party was ready to cooperate with the new regime if the rights of the Kurds were guaranteed” (Ahmadzadeh and Stansfield, p. 17). He announced the political agenda of the KDP (Iran) and asked the Tehran government to accept the Kurds’ autonomy demands, thus emerging as the political leader of the Kurds.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        },
        {
          id: 'q3',
          text: 'Elections for the Assembly of Experts (Majles-e ḵobragān) were held on 3 August 1979 with the goal of drafting a new constitution for the Islamic Republic. The Kurds participated in this election, and Qāsemlu was elected with more than 80 percent of the votes as the representative of the city of Urmia. He was one of two secular politicians elected to the Assembly who did not belong to an Islamic current',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        },
        {
          id: 'q4',
          text: 'A few days prior to the opening session of the Assembly of Experts, armed Kurds defeated the regime’s troops in Kurdistan. Ḵomeyni threatened to punish “in a truly revolutionary way the incompetent and corrupt government forces” (Le Monde, 1 July 1979), if they did not crush the Kurdish revolt. Qāsemlu did not attend the opening session of the Assembly of Experts, during which Ḵomeyni publicly condemned Qāsemlu (Schriazi, p. 32) and banned the KDP (Iran) as “the party of Satan, corrupt and the agent of foreigners”',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Qāsemlu and Abdullah Gadheri-Azar KDPI’s representative in Europe, attended the first meeting in an apartment in Vienna on 12 July 1989 with Fāżel Rasul.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        },
        {
          id: 'q6',
          text: 'On 13 July, during a second meeting with the Iranians, Qāsemlu, Ghaderi-Azar, and Rasul were mortally shot and Ṣaḥrārudi was hit in the arm by a stray bullet.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        }
      ]
    }
  ]
})
