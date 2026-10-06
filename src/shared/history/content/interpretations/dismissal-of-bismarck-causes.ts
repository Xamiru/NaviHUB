import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'dismissal-of-bismarck-causes',
  about: ['event:dismissal-of-bismarck'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'antisocialist-legislation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1890 Bismarck was dismissed by young Kaiser Wilhelm over a dispute about antisocialist legislation.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    },
    {
      id: 'kaisers-power-ambitions',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Gabriel Eikenberg' },
        { kind: 'scholar', name: 'Rupert Platz' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Aufgrund von innenpolitischen Differenzen und eigenen machtpolitischen Ambitionen verlangt Wilhelm II. den Rücktritt des Reichskanzlers Fürst Otto von Bismarck, den dieser am folgenden Tag einreicht.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-ii' }
        }
      ]
    },
    {
      id: 'bismarcks-high-handedness',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Dorlis Blume' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Wilhelm II. macht Bismarck insbesondere seine Eigenmächtigkeiten zum Vorwurf.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
          }
        },
        {
          id: 'q4',
          text: 'Nach weiteren Meinungsverschiedenheiten - neben der Sozialpolitik kommt auch Bismarcks Festhalten an einer Kabinettsordre von 1852, die den Verkehr der einzelnen Minister mit der Krone unter die Kontrolle des Ministerpräsidenten stellt, ins Spiel, - kommt es zum Bruch zwischen Kaiser Wilhelm II. und Bismarck. In einer Unterredung fordert Wilhelm II. Bismarck unmissverständlich zum Rücktritt auf.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '109' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
          }
        }
      ]
    }
  ]
})
