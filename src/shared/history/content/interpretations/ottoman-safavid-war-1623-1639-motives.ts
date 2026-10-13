import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'ottoman-safavid-war-1623-1639-motives',
  about: ['event:ottoman-safavid-war-1623-1639'],
  topic: 'motives',
  positions: [
    {
      id: 'a-pilgrimage-and-a-conquest',
      category: 'official',
      holders: [
        {
          kind: 'state',
          name: 'Safavid court (chroniclers Eskandar Beg and Ḥosayni Estrābādi)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Their emphasis is on what they call a longstanding wish of the monarch to visit the ʿatabāt, and they thus relate military action to religious fervor.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Yet, despite the strong, religiously inspired, ideological grounds they evince, even the later authors make it quite clear that the Safavid desire to control Baghdad and central Mesopotamia was motivated, above all, by irredentist territorial claims',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      id: 'ottoman-chronicles-and-murad-iv',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ottoman chroniclers and Sultan Morād IV' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Whereas Ottoman chronicles speak of the devastation suffered by the people of Baghdad, Safavid narratives are silent about this aspect of the shah’s invasion',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'Sultan Morād IV, angered at reports of Safavid destruction of Sunnite property in Iraq, personally led a campaign to retake Baghdad.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      id: 'trade-and-the-gulf',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Shah ʿAbbās’s intent to add southern Iraq to his possessions was clearly motivated by the realization that Basra had siphoned off trade from Bandar ʿAbbās.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '19' }
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
  researched: '2026-10-13'
})
