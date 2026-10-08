import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nationalization-of-the-iranian-oil-industry-legitimacy',
  about: ['event:nationalization-of-the-iranian-oil-industry'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'the-nation-will-not-submit',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mohammad Mosaddegh' },
        { kind: 'party', name: 'National Front' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'ملت ایران هیچ وقت حاضر نیست که زیر بار این حرفها برود خصوصاً با وضعیاتی که امروز در مصالح عمومی هست اطاعت کند و زیر بار این زور برود',
          lang: 'fa',
          cite: {
            source: 'majles-16-session-128-1951-03-15',
            loc: { section: 'مذاکرات مجلس شورای ملی، دورهٔ ۱۶، جلسهٔ ۱۲۸ (۲۴ اسفند ۱۳۲۹)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://fa.wikisource.org/wiki/%D9%85%D8%B0%D8%A7%DA%A9%D8%B1%D8%A7%D8%AA_%D9%85%D8%AC%D9%84%D8%B3_%D8%B4%D9%88%D8%B1%D8%A7%DB%8C_%D9%85%D9%84%DB%8C_%DB%B2%DB%B4_%D8%A7%D8%B3%D9%81%D9%86%D8%AF_%DB%B1%DB%B3%DB%B2%DB%B9_%D9%86%D8%B4%D8%B3%D8%AA_%DB%B1%DB%B2%DB%B8'
          }
        }
      ]
    },
    {
      id: 'no-unilateral-action',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' },
        { kind: 'participant', name: 'Herbert Morrison' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'We are still most anxious to settle this matter by negotiation; but we cannot negotiate under duress. We do not, of course, dispute the right of a Government to acquire property in their own country, but we cannot accept that the Company\'s whole position in Persia should be radically altered by unilateral action, when the Agreement into which the Persian Government freely entered with the Company itself provides against such action.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1951-05-01-persia-anglo-iranian-oil-company',
            loc: { section: 'HC Deb 01 May 1951 vol 487 cc1008-14', page: '1012' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1951/may/01/persia-anglo-iranian-oil-company'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'It challenged the legality of the oil nationalization and took its case against Iran to the International Court of Justice at The Hague. The court found in Iran\'s favor, but the dispute between Iran and the AIOC remained unsettled.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      id: 'company-indifference',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Imperial State of Iran' },
        { kind: 'participant', name: 'Mohammad Reza Pahlavi' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In the years leading up to nationalization of oil, the Anglo-Iranian Oil Company showed an amazing indifference to the trend of Iranian public opinion. As events were to prove, the company thus worked against its own interests, just as Mossadegh as Prime Minister later worked against his own interests and those of the country.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Subsequent negotiations with the AIOC were unsuccessful, partly because General Ali Razmara, who became prime minister in June 1950, failed to persuade the oil company of the strength of nationalist feeling in the country and in the Majlis.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      id: 'sovereignty-over-natural-wealth',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Fakhreddin Azimi' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The primary objective of Moṣaddeq and his colleagues was to lend substance to Persia’s independence by asserting her sovereign rights over her natural sources of wealth, particularly oil. They shared the widely held belief in the extensive and insidious influence of Britain and considered the termination or radical reduction of such influence as essential to the affirmation of Persian national sovereignty.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    }
  ]
})
