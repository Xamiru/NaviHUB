import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'bhopal-disaster-cause',
  about: ['event:bhopal-disaster'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'The 1984 gas leak in Bhopal was a terrible tragedy that continues to evoke strong emotions even decades later.',
    lang: 'en',
    cite: {
      source: 'union-carbide-overview-of-bhopal-tragedy',
      loc: { section: 'Overview of Bhopal Tragedy', para: '2' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
    }
  },
  positions: [
    {
      id: 'union-carbide-sabotage',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Union Carbide Corporation' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Some two-and-a-half years after the tragedy, UCC filed a lengthy court document in India detailing the findings of its scientific and legal investigations: The cause of the disaster was sabotage.',
          lang: 'en',
          cite: {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
          }
        },
        {
          id: 'q3',
          text: 'UCC’s investigation proved with virtual certainty that the disaster was caused by the direct entry of water into Tank 610 through a hose connected to the tank.',
          lang: 'en',
          cite: {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'It also fabricated scenarios involving sabotage by previously unknown Sikh extremist groups and disgruntled employees but this theory was impugned by numerous independent sources',
          lang: 'en',
          cite: {
            source: 'broughton-2005-bhopal-disaster-and-its-aftermath-a-review',
            loc: { section: 'The Bhopal disaster and its aftermath: a review' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC1142333/fullTextXML'
          }
        }
      ]
    },
    {
      id: 'campaign-negligence-and-cost-cutting',
      category: 'popular',
      holders: [
        { kind: 'organization', name: 'International Campaign for Justice in Bhopal' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The horrific event of December 3, 1984 was not an accident. It was the result of years of concerted effort by Union Carbide to save money by cutting safety procedures and regulations at their factory in Bhopal.',
          lang: 'en',
          cite: {
            source: 'icjb-what-triggered-the-disaster',
            loc: { section: 'What Triggered the Disaster?', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20241117172010/https://www.bhopal.net/what-happened/that-night-december-3-1984/what-triggered-the-disaster/'
          }
        },
        {
          id: 'q5',
          text: 'They made a design modification and installed a “jumper line,” which was a cheap solution to a maintenance problem. The jumper line connected a relief valve header to a pressure vent header and enabled water from routine washing operations to pass between the two headers, on through a pressure valve, and into MIC storage tank 610.',
          lang: 'en',
          cite: {
            source: 'icjb-what-triggered-the-disaster',
            loc: { section: 'What Triggered the Disaster?', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20241117172010/https://www.bhopal.net/what-happened/that-night-december-3-1984/what-triggered-the-disaster/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
