import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'impeachment-of-abolhassan-banisadr-legitimacy',
  about: ['event:impeachment-of-abolhassan-banisadr', 'person:abolhassan-banisadr'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'khomeinis-decree',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'that Mr. Abolhassan Bani-Sadr is not politically competent for the presidency',
          lang: 'en',
          cite: {
            source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
            loc: { section: 'Dismissal of Bani-Sadr', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://oral-history.ir/?page=post&id=11289' }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The power struggle between him and Behešti was settled in the latter’s favor because Khomeini withdrew his support of Bani Ṣadr.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
          }
        }
      ]
    },
    {
      id: 'irp-deputies-account',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ayatollah Mojtahedi Tabrizi' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Bani-Sadr published a newspaper called “Islamic Revolution”, in which he regularly wrote articles against leaders of the Islamic Republican Party.',
          lang: 'en',
          cite: {
            source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
            loc: { section: 'Dismissal of Bani-Sadr', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://oral-history.ir/?page=post&id=11289' }
        },
        {
          id: 'q3',
          text: 'But when it became clear that advices of Imam had no effect, the representatives of the Islamic Consultative Assembly (Iranian Parliament) decided to vote for political incompetence of Bani-Sadr.',
          lang: 'en',
          cite: {
            source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
            loc: { section: 'Dismissal of Bani-Sadr', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://oral-history.ir/?page=post&id=11289' }
        }
      ]
    },
    {
      id: 'banisadrs-own-account',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Abolhassan Banisadr', ref: 'person:abolhassan-banisadr' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'People have told me this. They say that the June 1981 coup against me was organized by Fardust, together with Beheshti, Ayat and Baqai, among others.',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        },
        {
          id: 'q5',
          text: 'I sacrificed the presidency -- which meant nothing to me -- in order to win in three wars I was fighting. One was against Iraq and another was against the American blockade: I did not win either of these completely, but neither was I defeated. In the third war, I defeated the ideology of the regime.',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        }
      ]
    },
    {
      id: 'scholarly-assessments',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' },
        { kind: 'scholar', name: 'Saïd Amir Arjomand' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'He seemed to assume that the presidency entitled him to supremacy in all affairs, overlooking the principle of welāyat-e faqih enshrined in the constitution according to the provisions of which he had been elected president',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q7',
          text: 'In June 1981, therefore, the Majles exceeded its constitutional authority and passed a law requiring the president to sign legislation within five days (two days for urgent matters) or permit it to become law without his signature.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
