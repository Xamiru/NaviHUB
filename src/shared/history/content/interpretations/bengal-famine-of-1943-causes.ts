import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'bengal-famine-of-1943-causes',
  about: ['event:bengal-famine-of-1943'],
  topic: 'causes',
  researched: '2026-10-09',
  positions: [
    {
      id: 'shortage-and-price-rise',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Famine Inquiry Commission' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'There is no doubt that shortage of supplies was a basic cause of the famine. We can put this in another way by saying that, if the aman crop had been a good one, the famine would not have occurred.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '78' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'The rise of prices, which we hold to be the second basic cause of the famine, was something more than the natural result of the shortage of supply which had occurred.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '81' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'government-of-bengal-failures',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Famine Inquiry Commission' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The measures taken by the Government of Bengal to achieve control of supplies and prices during 1943 were inadequate and, in some instances wrong in principle.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '105' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'war-policies-and-calcutta-priority',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Manilal B. Nanavati' },
        { kind: 'participant', name: 'S. V. Ramamurty' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Consciously or unconsciously, the Bengal Government allowed the needs of the rural areas to be outweighed by those of Calcutta and particularly its big business interests.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '102' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'inflation-and-purchasing-power',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Frederick Pethick-Lawrence' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The main cause is that there are large numbers of people in certain Provinces in India who have not the purchasing power to enable them to buy such food grain as will keep them alive. That has not arisen because the particular people who were already on the subsistence level have had their incomes reduced. It has arisen for the simple reason that the price of the food grain which they used to buy with their very meagre incomes has risen so high that they are not able to buy. The main cause of this increase in price is inflation, and for that inflation the Government of India, and nobody else, can be held responsible.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1943-11-04-india-food-situation',
            loc: { section: 'HC Deb 04 November 1943 vol 393 cc886-970', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1943/nov/04/india-food-situation'
          }
        }
      ]
    },
    {
      id: 'population-pressure-and-war',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' },
        { kind: 'participant', name: 'Leopold Amery' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'This Bengal famine is something more than an isolated incident. It is a danger-signal, warning us of long-range measures which are needed as well as to meet the immediate need.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1943-11-04-india-food-situation',
            loc: { section: 'HC Deb 04 November 1943 vol 393 cc886-970', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1943/nov/04/india-food-situation'
          }
        },
        {
          id: 'q7',
          text: 'These measures, coupled with other factors, such as improved health conditions, have only contributed to that unexampled pressure of population against the means of subsistence, which is the gravest long-range problem which India has to face.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1943-11-04-india-food-situation',
            loc: { section: 'HC Deb 04 November 1943 vol 393 cc886-970', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1943/nov/04/india-food-situation'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'centering round the question whether responsibility for the calamity should be ascribed to God or man.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    }
  ]
})
