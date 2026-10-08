import { definePerson } from '../../schema'

export default definePerson({
  id: 'hossein-fatemi',
  names: [
    { text: 'Hossein Fatemi', lang: 'en', role: 'primary' },
    { text: 'حسین فاطمی', lang: 'fa', role: 'native' },
    { text: 'Ḥosayn Fāṭemī', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1917' },
        cites: [
          {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1954' },
        cites: [
          {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:nain',
    cites: [
      { source: 'iranica-azimi-fatemi-hosayn', loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '1' } }
    ]
  },
  regions: ['iran'],
  roles: ['journalist', 'politician'],
  offices: [
    {
      title: 'minister of foreign affairs',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1952-10-11' },
            cites: [
              {
                source: 'iranica-azimi-fatemi-hosayn',
                loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-fatemi-hosayn',
          loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Hossein_Fatemi_circa_1952.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hossein_Fatemi_circa_1952.jpg',
    credit: { institution: 'United Press International' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'FĀṬEMĪ, ḤOSAYN (1296-1333 Š./1917-54; Figure 1), journalist, a leader of the National Front, and the minister of foreign affairs under Moḥammad Moṣaddeq.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Fāṭemī broached the issue of protesting against the government rigging of the elections for the Sixteenth Majles with Moṣaddeq (Moṣaddeq, pp. 245-46), helped to mobilize support, and in Mehr 1928 Š./October 1949 was one of a delegation selected to accompany Moṣaddeq in a sit-in (bast) at the royal palace protesting the conduct of the elections. On Faṭemī’s suggestion, this group came to formalize itself as Jabha-ye mellī(National Front, Malekī, p. 56). Bāḵtar-e emrūz became its chief vehicle, promoting objectives such as electoral and press freedom, opposition to martial law or to the government of Ḥājī-ʿAlī Razmārā and, eventually, the nationalization of the oil industry, an initiative proposed by Fāṭemī to Moṣaddeq and the National Front (Moṣaddeq, pp. 229-30).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        },
        {
          id: 'q3',
          text: 'An admirer of the controversial, anti-establishment journalist Moḥammad Masʿūd, Fāṭemī narrowly escaped an attempt on his life carried out by a member of the Fedāʾīān-e Eslām (q.v.), while attending the fourth anniversary commemoration of Masʿūd’s assassination (5 Bahman 1330 Š./15 February 1952). The Fedāʾīān blamed the firmness of Moṣaddeq’s government towards them on Fāṭemī and his “resolute and uncompromising” stand (ʿErāqī, pp. 116-20).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        },
        {
          id: 'q4',
          text: 'His ailing health forced Fāṭemī to seek treatment abroad, returning a few days before the first stage of the coup of Mordād 1332 Š./August 1953 (see COUP D’ETAT OF 1332 Š./1953) after an absence of almost six weeks.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'With the overthrow of Moṣaddeq’s government, Fāṭemī went into hiding but was arrested on 6 Esfand 1332 Š./25 February 1954. While under police escort, he was attacked by a knife-wielding gang in front of police headquarters, seriously injured and hospitalized',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Fāṭemī was a skilled and bold journalist (Šīfta, pp. 43-44); as a colleague he was praised by Moṣaddeq and others for his “loyalty and sincerity,” his “bravery and bluntness,” and his “crucial” role in the national movement (Bozorgmehr, 1984, II, p. 289; idem, 1986, p. 594; Moṣaddeq, p. 289; Sanjābī, pp. 172-73; Amīr ʿAlāʾī, pp. 151-54).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        }
      ]
    }
  ]
})
