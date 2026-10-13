import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-abbas-i',
  names: [
    { text: 'Death of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1629-01-19' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } },
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '45' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:qazvin',
      cites: [
        { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '3' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'head-of-state',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
      ]
    },
    {
      ref: 'person:shah-safi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '45' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:accession-of-abbas-i',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    },
    {
      ref: 'event:ottoman-safavid-war-1623-1639',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
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
          text: 'When Shah ʿAbbās I died of natural causes in early 1629, there were no sons to succeed him.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'He was therefore succeeded by his grandson Ṣafi, the son of Ṣafi Mirzā, who had been murdered by Shah ʿAbbās on suspicion of sedition.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'As his obsessive fear of assassination increased, ʿAbbās either put to death or blinded any member of his family who aroused his suspicion; in this way one of his sons was executed and two blinded.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q4',
          text: 'Consequently, because of a number of revolts and plots on behalf of his sons, he ceased to follow the traditional Safavid practice of appointing his sons to provincial governorates, with each prince in the care of a Qezelbāš amir who acted as his guardian and was responsible for his physical and moral welfare.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A (mostly female) palace faction seems to have favored Emāmqoli Khan, the son whom Shah ʿAbbās I had deprived of eyesight, as the next shah, with the argument that he was not fully blind, or even the latter’s son, Najafqoli Khan, a five-year-old child.',
          lang: 'en',
          cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Though his successors failed to maintain this balance, with ultimately disastrous results, Shah ʿAbbās placed the administration on such a sound footing that its machinery continued to function, largely under its own momentum, for nearly a century after his death.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q7',
          text: 'The Ottomans made a brief attempt to regain Iraq in 1625, and in 1629, taking advantage of Shah ʿAbbās’s death, organized a campaign led by newly appointed grand vizier Husrev/Ḵosrow Pasha.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q8',
          text: 'This time the campaign was called off following the news of Shah ʿAbbās’s death in early 1629',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
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
            value: { d: '1628' },
            cites: [
              {
                source: 'iranica-matthee-shah-safi-i',
                loc: { section: 'SHAH ṢAFI I', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Shah ʿAbbās fell ill in the summer of 1037/1628 while in Qazvin, and in the next few weeks reportedly pondered the question of his succession in discussions with the main court astrologers, Moḥammad-Šafiʿ and Moḥammad-Taqi, as well as with Morād Māzandarāni, a respected regional cleric.',
        lang: 'en',
        cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1629-01-19' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Since two other sons had predeceased him, the result was personal tragedy for Shah ʿAbbās; when he died on 19 January 1629, he had no son capable of succeeding him.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Shah_abbas_I-_L_by_Bishn_Das.jpg/1280px-Shah_abbas_I-_L_by_Bishn_Das.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_abbas_I-_L_by_Bishn_Das.jpg',
    credit: { creator: 'Bishandas' },
    license: { id: 'public-domain' }
  }
})
