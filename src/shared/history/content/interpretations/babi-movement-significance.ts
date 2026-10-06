import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'babi-movement-significance',
  about: ['period:babi-movement', 'event:declaration-of-the-bab'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'vital-response',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Careful retrospection will show not only that Babism came close to upsetting the balance of Qajar political life but that it owed its ability to shake the foundations of society so forcefully and in such a short period less to a chance concatenation of events and more to its character as a vital response to deep-rooted expectations and needs of the Iranian people of the time.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q2',
          text: 'It may, indeed, be argued that many later developments within the orthodox establishment (including the wide rejection of reformism) were reactions against Babism and the dangers it showed to be inherent in an extreme insistence on charismatic authority, in a situation where the religious hierarchy was engaged in a process of intensifying such authority (see further MacEoin, “Changes in Charismatic Authority”).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      id: 'aberration',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'To see Babism as an aberration or side issue in Qajar Shiʿism (as does Algar, Religion and State, p. 151) is to ignore its original orthodoxy and the role within it of religious motifs central to the Shiʿite tradition.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    }
  ]
})
