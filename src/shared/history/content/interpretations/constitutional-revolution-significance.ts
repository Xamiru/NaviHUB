import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'constitutional-revolution-significance',
  about: ['event:persian-constitutional-revolution'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'end-of-medieval',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ann K. S. Lambton', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'According to scholar Ann K.S. Lambton, the Constitutional Revolution marked the end of the medieval period in Iran.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    },
    {
      id: 'agenda-for-reza-shah',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The nonpolitical aims of the Constitutional Revolution—above all, secular mass education, economic development, a judiciary independent of the ʿolamāʾ, and a centralized state with a powerful army and extensive bureaucracy—set the agenda for the early reforms under Reżā Shah (1304­-20 Š./1925-41), largely at the expense of the political objectives of the revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    }
  ]
})
