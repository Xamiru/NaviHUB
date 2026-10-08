import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'boxer-uprising-nature',
  about: ['event:boxer-uprising'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'righteous-resistance-to-foreign-aggression',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Qing dynasty' },
        { kind: 'participant', name: 'Guangxu Emperor (in the name of)' },
        { kind: 'participant', name: 'Empress Dowager Cixi' }
      ],
      statements: [
        {
          id: 'q1',
          text: '詎三十年來，恃我國仁厚，一意拊循，彼乃益肆梟張，欺淩我國家，侵佔我土地，蹂躪我民人，勒索我財物。',
          lang: 'zh',
          cite: {
            source: 'qing-1900-06-21-declaration-of-war-edict',
            loc: { section: '上諭，光緒二十六年五月二十五日' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://zh.wikisource.org/wiki/%E5%AE%A3%E6%88%B0%E8%A9%94%E6%9B%B8'
          }
        },
        {
          id: 'q2',
          text: '我國赤子，仇怨鬱結，人人欲得而甘心。此義勇焚燬教堂，屠殺教民所由來也。',
          lang: 'zh',
          cite: {
            source: 'qing-1900-06-21-declaration-of-war-edict',
            loc: { section: '上諭，光緒二十六年五月二十五日' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://zh.wikisource.org/wiki/%E5%AE%A3%E6%88%B0%E8%A9%94%E6%9B%B8'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'In 1900 Boxer bands spread over the north China countryside, burning missionary facilities and killing Chinese Christians.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    },
    {
      id: 'seditious-antiforeign-sect',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'William McKinley' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The sect, commonly styled the Boxers, developed greatly in the provinces north of the Yang-Tse, and with the collusion of many notable officials, including some in the immediate councils of the Throne itself, became alarmingly aggressive. No foreigner\'s life, outside of the protected treaty ports, was safe. No foreign interest was secure from spoliation.',
          lang: 'en',
          cite: {
            source: 'mckinley-1900-fourth-state-of-the-union',
            loc: { section: 'Fourth State of the Union Address' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/William_McKinley%27s_Fourth_State_of_the_Union_Address'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Supported by ultraconservatives and with the tacit support of the political opportunist Yuan Shikai (1859-1916), Empress Dowager Ci Xi engineered a coup d\'etat on September 21, 1898, forcing the young reform-minded Guangxu into seclusion.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    }
  ]
})
