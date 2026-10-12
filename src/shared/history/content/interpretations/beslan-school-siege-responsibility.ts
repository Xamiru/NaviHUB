import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'beslan-school-siege-responsibility',
  about: ['event:beslan-school-siege'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'The authorities had received a warning from the security services about the movements of insurgents from neighboring Ingushetia and Chechnya and their apparent plan to carry out an attack “linked to an educational institution” in North Ossetia, but did not respond with any specific security plan.',
    lang: 'en',
    cite: {
      source: 'hrw-2019-remembering-beslan-15-years-later',
      loc: { section: 'Remembering Beslan 15 Years Later', para: '6' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
    }
  },
  positions: [
    {
      id: 'russian-federation-international-terror',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russian Federation' },
        { kind: 'participant', name: 'Vladimir Putin', ref: 'person:vladimir-putin' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'What we are facing is direct intervention of international terror directed against Russia.',
          lang: 'en',
          cite: {
            source: 'putin-2004-09-04-address-to-the-nation-after-the-beslan-school-siege',
            loc: { section: 'Address by President Vladimir Putin', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/22589'
          }
        },
        {
          id: 'q3',
          text: 'Some would like to tear from us a “juicy piece of pie”.',
          lang: 'en',
          cite: {
            source: 'putin-2004-09-04-address-to-the-nation-after-the-beslan-school-siege',
            loc: { section: 'Address by President Vladimir Putin', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/22589'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The Beslan attack took place against a backdrop of five years of widespread, persistent and largely unpunished human rights violations by Russian troops against civilians in Chechnya as well as egregious human rights abuses by rebel fighters.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
            loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303134835/https://www.hrw.org/news/2004/09/07/joint-ngo-statement-beslan-hostage-tragedy'
          }
        }
      ]
    },
    {
      id: 'joint-ngo-statement-cover-up',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' },
        { kind: 'organization', name: 'Memorial Human Rights Centre' },
        { kind: 'organization', name: 'Amnesty International' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'We are also seriously concerned that the authorities have been covering up the extent of the crisis, including by providing misleading data on the number of hostages, and urge the authorities to ensure that the investigation into the full circumstances of the school hostage-taking incident encompasses an investigation into the way in which the authorities released information, both to the public and to the families of the hostages.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
            loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303134835/https://www.hrw.org/news/2004/09/07/joint-ngo-statement-beslan-hostage-tragedy'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
