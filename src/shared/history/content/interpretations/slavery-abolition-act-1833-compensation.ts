import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'slavery-abolition-act-1833-compensation',
  about: ['event:slavery-abolition-act-1833'],
  topic: 'legacy',
  researched: '2026-10-08',
  positions: [
    {
      id: 'cruel-irony',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Its main purpose was to prevent the immediate large-scale abandonment of estates by the workers, although, with cruel irony, it was the masters and not the slaves who were awarded compensation for the loss of their "property."',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'The Post-Emancipation Societies', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/9.htm'
          }
        }
      ]
    },
    {
      id: 'inflated-claims',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'The National Archives' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'A month before the Act had even passed, John Peterson, President of the governing council of St Vincent, complained about the compensation offered to slave owners. He wrote that it would be inadequate to cover estates held under mortgage, or for the future costs of owners as employers of labourers.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: { section: 'Slave owners’ complaints about the compensation process' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q2',
          text: 'One complaint asked, ’is it just that the unfortunate proprietor should be the only sufferer’ in the compensation process.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: { section: 'Slave owners’ complaints about the compensation process' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q4',
          text: 'This was a process to secure money from the government, so the difference between what was stated in claims and the reality on estates may have been huge.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: { section: 'Forms for slave owners to claim compensation' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q5',
          text: 'The ways in which these debts were calculated and transferred to different government bonds and funds meant that the residue of these slavery payments was not cleared until 2015.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: { section: 'Registers of compensation payments to slave owners' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        }
      ]
    }
  ]
})
