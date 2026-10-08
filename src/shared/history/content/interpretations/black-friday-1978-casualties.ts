import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'black-friday-1978-casualties',
  about: ['event:black-friday-1978'],
  topic: 'casualties',
  positions: [
    {
      id: 'martial-law-office-count',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Imperial State of Iran' },
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The death toll of 86 was reported by the Teheran Martial Law Office on September 10, the very day the Majlis confirmed the new government.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'For all the bloodshed and despite all the vilification heaped on our police and soldiers, I must pay tribute to the sang-froid they showed. Uncontrolled mobs who had savagely murdered their comrades in arms failed to provoke them into equally bloody revenge.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The heightened revolutionary spirit of 1978, especially after 8 September 1978 (the so-called Black Friday), when a large number of people were killed by security forces',
          lang: 'en',
          cite: {
            source: 'iranica-vahabzadeh-fadaian-e-khalq',
            loc: { section: 'FADĀʾIĀN-E ḴALQ', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/fadaian-e-khalq/'
          }
        }
      ]
    },
    {
      id: 'about-164-and-the-eight-thousand-claim',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The death toll, in what comes to be known as “Black Friday,” is estimated at 164 people. The revolutionary propaganda at the time put the number at 8,000.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      id: 'some-two-thousand-or-more',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'A mass demonstration took place on 8 September (“Black Friday”) at the Meydān-e Žāla (renamed Meydān-e Šohadāʾ after the revolution); it was attacked by government forces, resulting in the reported slaughter of some 2,000 people; more were probably killed in other parts of the city.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
