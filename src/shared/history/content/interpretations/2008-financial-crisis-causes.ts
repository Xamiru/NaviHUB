import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2008-financial-crisis-causes',
  about: ['event:2008-financial-crisis'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'How did it come to pass that in 2008 our nation was forced to choose between two stark and painful alternatives — either risk the collapse of our financial system and economy, or commit trillions of taxpayer dollars to rescue major corporations and our financial markets, as millions of Americans still lost their jobs, their savings, and their homes?',
    lang: 'en',
    cite: {
      source: 'fcic-2011-conclusions-of-the-financial-crisis-inquiry-commission',
      loc: { section: 'Conclusions', para: '1' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://web.archive.org/web/20111211140302/http://fcic.law.stanford.edu:80/report/conclusions'
    }
  },
  positions: [
    {
      id: 'financial-crisis-inquiry-commission-avoidable',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Financial Crisis Inquiry Commission' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Commission concluded that this crisis was avoidable. It found widespread failures in financial regulation; dramatic breakdowns in corporate governance; excessive borrowing and risk-taking by households and Wall Street; policy makers who were ill prepared for the crisis; and systemic breaches in accountability and ethics at all levels.',
          lang: 'en',
          cite: {
            source: 'fcic-2011-conclusions-of-the-financial-crisis-inquiry-commission',
            loc: { section: 'Conclusions', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20111211140302/http://fcic.law.stanford.edu:80/report/conclusions'
          }
        }
      ]
    },
    {
      id: 'miller-center-housing-bubble-and-hands-off-regulation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Gary L. Gregg II', discipline: 'political-scientist' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Chairmen of the Federal Reserve, Alan Greenspan, and his successor, Ben Bernanke, had taken a hands-off approach with the market, believing that it would regulate itself.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
