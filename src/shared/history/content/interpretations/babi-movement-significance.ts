import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'babi-movement-significance',
  about: ['period:babi-movement', 'event:declaration-of-the-bab'],
  topic: 'significance',
  researched: '2026-10-08',
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
        },
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
    },
    {
      id: 'assault-on-islam',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Robert Grant Watson' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The main tenet of Babism is utter indifference to, and disbelief in the existence of, good and evil. But nothing could be less in accordance with this theory than was the practice of the followers of the Bab.',
          lang: 'en',
          cite: {
            source: 'watson-1866-history-of-persia',
            loc: { section: 'Chapter XIII. Tenets of his Followers' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/historyofpersiaf00watsrich/historyofpersiaf00watsrich_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'They asserted that the time had come when Mahomedanism must fall, and that to them had been assigned the task of bringing about the decree of fate.',
          lang: 'en',
          cite: {
            source: 'watson-1866-history-of-persia',
            loc: { section: 'Chapter XIII. Tenets of his Followers' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/historyofpersiaf00watsrich/historyofpersiaf00watsrich_djvu.txt'
          }
        }
      ]
    }
  ]
})
