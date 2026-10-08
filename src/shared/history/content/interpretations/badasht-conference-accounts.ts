import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'badasht-conference-accounts',
  about: ['event:badasht-conference'],
  topic: 'historiography',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'Accounts of the proceedings of the conference are not completely in agreement.',
    lang: 'en',
    cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
    provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/badast' }
  },
  positions: [
    {
      id: 'clash',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Moojan Momen' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'There was a clash between Bārforūšī and Ṭāhera, with the former adopting a conservative position with regard to the break with the Islamic past and the latter taking up a radical position.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q3',
          text: 'In the end, Ṭāhera won the debate but the two protagonists ended the conference amicably.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q4',
          text: 'Indeed one source states that this confrontation was pre-arranged in conjunction with Bahāʾ-Allāh so as to prepare the Babis for and mitigate the impact of the break with the Islamic Šarīʿa (see Nabīl, p. 294 n.).',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ]
    },
    {
      id: 'no-conflict',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nosrat Mohammad-Hosseini' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Contrary to the prevailing belief among historians, there was no conflict between Qoddus and Ṭāhera Qorrat-al-ʿayn (1814/1817-1852) when she dramatically unveiled herself at that gathering in announcing the abrogation of the Islamic religious law (šariʿa) by the Bābi law, “and Qoddus was in reality in full sympathy with what Ṭāhera did in that assembly” (Moḥammad-Ḥoseyni, pp. 274-75, 286).',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        },
        {
          id: 'q6',
          text: 'In the conference of Badašt in 1848—a historic assembly of more than eighty Bābis—Qoddus was among the three Bābi leaders who decided on the course of that meeting, which was a pivotal event in the Bābi history.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    },
    {
      id: 'socially-radical-speech',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'M. S. Ivanov' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The lengthy passage in the Noqṭat al-kāf (pp. 144-52) that Ivanov (pp. 80-85) considers to be a socially-radical speech (stating that property is usurpation) by Qoddūs at Badašt needs careful appraisal.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'It is more likely a digression by the author.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ]
    }
  ]
})
