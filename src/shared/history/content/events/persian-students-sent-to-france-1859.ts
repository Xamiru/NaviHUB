import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-students-sent-to-france-1859',
  names: [
    { text: 'Persian students sent to France (1859)', lang: 'en', role: 'primary' },
    { text: 'اعزام محصلان به فرانسه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1859-04' },
        cites: [
          {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '17' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:farrokh-khan-ghaffari',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
          loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
        }
      ]
    },
    {
      name: 'Ḥasan-ʿAlī Khan Amīr(-e) Neẓām Garrūsī',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '17' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '17' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 42 },
            cites: [
              {
                source: 'iranica-gurney-nabavi-dar-al-fonun',
                loc: { section: 'DĀR AL-FONŪN', para: '17' }
              },
              {
                source: 'iranica-matin-asgari-education-abroad',
                loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '2' }
              },
              {
                source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
                loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
              }
            ]
          },
          {
            value: { min: 60, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-hellot-bellier-france-relations',
                loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Florence Hellot-Bellier' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:founding-of-the-dar-al-fonun', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1275/1859 the government sent forty-two students, primarily drawn from the first graduating class at Dār al-fonūn, to France to study medicine and military and other modern technologies. Upon their return they received newly created government positions, particularly in the Ministry of Sciences (Wezārat-e ʿolūm).',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
          }
        },
        {
          id: 'q2',
          text: 'The success of Polak’s first students in Paris encouraged the idea of sending a much larger group abroad, and, when Ḥasan-ʿAlī Khan Amīr(-e) Neẓām Garrūsī was ap­pointed minister to Paris, a number of students were dispatched with his retinue, which left in April 1859.',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        },
        {
          id: 'q3',
          text: 'Convinced of the necessity of progress for his country, he persuaded the shah to have a group of students (forty-two in number) sent to Europe for training in technical and scientific fields under the guardianship of the well-known Iranist Alexandre Chodzko (ibid., II, p. 235; Thieury, France, pp. 30-38; Maḥbūbī Ardakānī, Tārīḵ-e moʾassasāt I, pp. 320f.).',
          lang: 'en',
          cite: {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-farrok-khan-gaffari'
          }
        },
        {
          id: 'q4',
          text: 'He was also responsible for arranging the education in Europe of over sixty Persian students, mostly graduates of Dār al-fonūn (q.v.; AMAE, CP Perse, vol. 34, p. 118; Maḥbūbī, Moʾassasāt I, pp. 320-53).',
          lang: 'en',
          cite: {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/france-iii-relations-with-persia-1789-1918/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Most stayed several years, until Nāṣer-al-Dīn Shah, who had become suspicious of the loyalty of the students abroad, abruptly ordered them to be recalled in 1284/1867. Back in Persia several taught at Dār al-fonūn and introduced, through their publications and teaching, the latest ideas and tech­niques current in Europe (for the careers of these students, see Maḥbūbī, Moʾassasāt I, pp. 321-28).',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        },
        {
          id: 'q6',
          text: 'Between 1276/1860 and 1318/1900, however, the government did not send students to Europe, as Nāṣer-al-Dīn Shah grew increasingly fearful of the subversive impact of modern education (Maḥbūbī, Moʾassasāt I, pp. 270, 321-38, 349-54; Arasteh, p. 29; Copeland, pp. 308-11).',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/A_Portrait_of_Farrokh_Khan_Amin_al-Dowleh%2C_signed_by_Abu%27l_Hasan_Ghaffari.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_Portrait_of_Farrokh_Khan_Amin_al-Dowleh,_signed_by_Abu%27l_Hasan_Ghaffari.jpg',
    credit: { creator: 'Mirza Abolhassan Khan Ghaffari' },
    license: { id: 'public-domain' }
  }
})
