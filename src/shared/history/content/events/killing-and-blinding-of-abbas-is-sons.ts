import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'killing-and-blinding-of-abbas-is-sons',
  names: [
    { text: 'Killing and blinding of the sons of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1615' },
        cites: [
          { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '2' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } }
      ]
    },
    {
      name: 'Ṣafi Mirzā',
      role: 'victim',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '45' }
        }
      ]
    },
    {
      name: 'Emāmqoli Mirzā',
      role: 'victim',
      cites: [
        { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '4' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:death-of-abbas-i',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '45' }
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
          text: 'As his obsessive fear of assassination increased, ʿAbbās either put to death or blinded any member of his family who aroused his suspicion; in this way one of his sons was executed and two blinded.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'For ʿAbbās, the path to the throne was anything but smooth; indeed, the experiences of his early years accounted in large part for the morbidly suspicious side of his nature, which poisoned his relationships with his own sons.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q3',
          text: 'The young shah had seen the way in which rival amirs had used him and his three brothers as pawns in the furtherance of their own ambitions.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q4',
          text: 'Instead, in order to forestall rebellion and premature claims to the throne, he killed one of his sons and blinded two more.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '32' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
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
          id: 'q6',
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
        },
        {
          id: 'q7',
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
          id: 'q8',
          text: 'Consequently, because of a number of revolts and plots on behalf of his sons, he ceased to follow the traditional Safavid practice of appointing his sons to provincial governorates, with each prince in the care of a Qezelbāš amir who acted as his guardian and was responsible for his physical and moral welfare.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q9',
          text: 'This system was open to a number of serious objections: It gave rise to harem intrigues far surpassing in scale the occasional revolt of a provincial governor; it denied the royal princes the opportunity of gaining experience of government and administration, with the result that, when called to the throne, they proved incompetent; and it caused psychological deterioration and physical degeneration of the royal stock.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Shah_abbas_I_by_Bishn_Das.jpg/1280px-Shah_abbas_I_by_Bishn_Das.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_abbas_I_by_Bishn_Das.jpg',
    credit: { creator: 'Bishandas', institution: 'British Museum' },
    license: { id: 'public-domain' }
  }
})
