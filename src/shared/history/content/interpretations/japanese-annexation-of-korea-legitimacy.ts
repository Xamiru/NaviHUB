import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'japanese-annexation-of-korea-legitimacy',
  researched: '2026-10-08',
  about: ['event:japanese-annexation-of-korea'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'japan-1910',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Government of Japan' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In order to maintain peace, and stability in Korea, to promote the prosperity and welfare of the Koreans, and at the same time to insure the safety and repose of the foreign residents, it has been made abundantly clear that fundamental changes in the actual régime of government are absolutely essential.',
          lang: 'en',
          cite: {
            source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
            loc: { section: 'Document 705' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1910/d705'
          }
        }
      ]
    },
    {
      id: 'japan-2010',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Government of Japan (Prime Minister Naoto Kan)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'As demonstrated by strong resistance such as the Samil independence movement, the Korean people of that time was deprived of their country and culture, and their ethnic pride was deeply scarred by the colonial rule which was imposed against their will under the political and military circumstances.',
          lang: 'en',
          cite: {
            source: 'kantei-2010-08-10-statement-by-prime-minister-naoto-kan',
            loc: { section: 'Statement by Prime Minister Naoto Kan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/2011/http://www.kantei.go.jp/foreign/kan/statement/201008/10danwa_e.html'
          }
        },
        {
          id: 'q3',
          text: 'To the tremendous damage and sufferings that this colonial rule caused, I express here once again my feelings of deep remorse and my heartfelt apology.',
          lang: 'en',
          cite: {
            source: 'kantei-2010-08-10-statement-by-prime-minister-naoto-kan',
            loc: { section: 'Statement by Prime Minister Naoto Kan', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/2011/http://www.kantei.go.jp/foreign/kan/statement/201008/10danwa_e.html'
          }
        }
      ]
    },
    {
      id: 'korean-experience',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Koreans never thanked the Japanese for these substitutions, did not credit Japan with creations, and instead saw Japan as snatching away the ancient regime, Korea\'s sovereignty and independence, its indigenous if incipient modernization, and above all its national dignity. Koreans never saw Japanese rule as anything but illegitimate and humiliating.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'JAPANESE COLONIALISM', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/12.htm' }
        }
      ]
    }
  ]
})
