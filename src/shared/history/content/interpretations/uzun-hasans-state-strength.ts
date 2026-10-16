import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'uzun-hasans-state-strength',
  about: ['event:uzun-hasans-empire'],
  topic: 'nature',
  positions: [
    {
      id: 'large-army-without-firearms',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The total strength of Uzun Ḥasan’s army, including all the provincial contingents, may well have exceeded 100,000 men; its strike capacity was derived mainly from the cavalry, while its great weakness was its lack of firearms (V.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      id: 'power-won-by-good-fortune',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ambrogio Contarini', discipline: 'memoirist' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Persia, which Ussuncassan wrested, more by good fortune than superior power, from Iausa, whom he caused to be put to death, has Tauris for its capital and seat of government.',
          lang: 'en',
          cite: {
            source: 'hakluyt-1873-travels-to-tana-and-persia',
            loc: { section: 'BRIEF ACCOUNT OF THE DOMINIONS OF USSUNCASSAN', para: '563' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://gutenberg.org/cache/epub/75292/pg75292-images.html'
          }
        },
        {
          id: 'q3',
          text: 'Those who give the highest estimate say that he has fifty thousand horsemen, though these are not all of the best.',
          lang: 'en',
          cite: {
            source: 'hakluyt-1873-travels-to-tana-and-persia',
            loc: { section: 'BRIEF ACCOUNT OF THE DOMINIONS OF USSUNCASSAN', para: '563' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://gutenberg.org/cache/epub/75292/pg75292-images.html'
          }
        }
      ]
    },
    {
      id: 'turkmen-power-ended-by-safavids-and-ottomans',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Safavid Sufi propaganda had found staunch followers among the Turkmen tribes residing in eastern Anatolia and Azarbaijan, providing powerful support for the Safavid Shah Esmāʿil',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q5',
          text: 'He was on good terms with the Qaramanids of Anatolia (1256-1475) against the Ottomans and developed extensive relations with Venice and some other Western powers, but, despite his considerable military prowess, he proved no match for the Ottoman army and was defeated in 1473.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
