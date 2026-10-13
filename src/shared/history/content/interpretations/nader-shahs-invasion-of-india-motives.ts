import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nader-shahs-invasion-of-india-motives',
  about: ['event:nader-shahs-invasion-of-india'],
  topic: 'motives',
  framing: {
    id: 'q1',
    text: 'Nadir had sent an ambassador into Hindustan requesting the Mogul emperor to order the surrender of certain unruly Afghans who had taken refuge within Indian territory, but no satisfactory reply was given, and obstacles were thrown in the way of the return of the embassy.',
    lang: 'en',
    cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1095' } },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
    }
  },
  positions: [
    {
      id: 'pretext-and-plunder',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The pretext for Nāder Shah’s invasion of Mughal territory was the failure of the Mughal emperor Rowšan Aḵtar “Moḥammad Shah” (r. 1719-48) to make an official pledge of preventing Nāder’s Afghan adversaries from crossing over into Mughal territory in search of refuge after Nāder’s capture of Qandahār in 1738',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q3',
          text: 'However, the prospect of plundering Mughal territory was also a highly alluring temptation for the cash-strapped Persian monarch.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        }
      ]
    },
    {
      id: 'world-empire',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Nāder’s career now entered a new phase: the invasion of foreign territory to pursue dreams of a world empire',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      id: 'older',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The invasion of India had now fairly commenced, and its successful progress and consummation were mere questions of time.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1096' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
