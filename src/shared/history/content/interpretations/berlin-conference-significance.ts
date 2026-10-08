import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'berlin-conference-significance',
  about: ['event:berlin-conference'],
  topic: 'significance',
  researched: '2026-10-08',
  positions: [
    {
      id: 'basis-of-partition',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Deutsches Historisches Museum' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Die Kongo-Akte bildet die Grundlage für die Aufteilung Afrikas in Kolonien und bestätigt den belgischen König als Herrscher im Kongobecken.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1885.html'
          }
        }
      ]
    },
    {
      id: 'more-than-partition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John Scott Keltie' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'It will be seen that the act dealt with other matters than the political partition of Africa;',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q3',
          text: 'It is also noteworthy that the first reference in an international act to the obligations attaching to “spheres of influence” is contained in the Berlin Act.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        }
      ]
    }
  ]
})
