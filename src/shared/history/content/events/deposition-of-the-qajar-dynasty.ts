import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'deposition-of-the-qajar-dynasty',
  names: [
    { text: 'Deposition of the Qajar dynasty', lang: 'en', role: 'primary' },
    { text: 'انقراض قاجاریه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'dissolution',
  start: {
    alts: [
      {
        value: { d: '1925-10-31' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '180' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '181' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
        }
      ]
    },
    {
      ref: 'person:hasan-taqizadeh',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1925' }
        }
      ]
    },
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1925' }
        }
      ]
    },
    {
      name: 'Ḥosayn ʿAlā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1925' }
        }
      ]
    },
    {
      name: 'Sayyed Ḥasan Modarres',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1925' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:persian-coup-of-1921',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
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
          text: 'On 31 October 1925, the Majlis approved a bill deposing the Qajars and entrusting the provisional government to Reżā Khan. Eighty deputies voted in favor of the bill, twenty abstained, and only five opposed it.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q2',
          text: 'Thus ended the reign of Aḥmad Shah and the 130-year-old Qajar dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In November, Reżā Khan marched to Ḵūzestān where he secured Ḵaẓʿal’s submission. This greatly enhanced Reżā Khan’s standing and he began to encourage a movement for the transfer of the crown from Aḥmad Shah to himself.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q5',
          text: 'However, he did not do so; and Reżā Khan was now too powerful and the shah too discredited for the movement to depose the Qajars to be reversed.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The deposed shah subsequently took up permanent residence in France.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
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
            value: { d: '1925-12-12' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
              }
            ]
          },
          {
            value: { d: '1924-12-12' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On December 12, a special constituent assembly modified articles 36, 37, 38, and 40 of the constitution and by a vote of 257 to 3 conferred the crown on Reżā Shah and his male heirs.',
        lang: 'en',
        cite: {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1926-04-25' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'He crowned himself in a simple ceremony at Golestān Palace on 25 April 1926',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/19-3-22%2C_arriv%C3%A9e_du_Shah_de_Perse_%C3%A0_Paris_%28gare_de_Lyon%29_-_btv1b53076790t.jpg/1280px-19-3-22%2C_arriv%C3%A9e_du_Shah_de_Perse_%C3%A0_Paris_%28gare_de_Lyon%29_-_btv1b53076790t.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:19-3-22,_arriv%C3%A9e_du_Shah_de_Perse_%C3%A0_Paris_(gare_de_Lyon)_-_btv1b53076790t.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Agence Rol' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' },
    { source: 'sheikholeslami-1989-sima-ye-ahmad-shah-qajar', perspective: 'iranian' }
  ]
})
