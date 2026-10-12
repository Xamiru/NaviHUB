import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russo-georgian-war-responsibility',
  about: ['event:russo-georgian-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'The shelling of Tskhinvali by the Georgian armed forces during the night of 7 to 8 August 2008 marked the beginning of the large-scale armed conflict in Georgia, yet it was only the culminating point of a long period of increasing tensions, provocations and incidents.',
    lang: 'en',
    cite: {
      source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
      loc: { section: 'The Conflict in Georgia in August 2008', para: '3' }
    },
    provenance: { via: 'web', at: '2026-10-12', url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm' }
  },
  positions: [
    {
      id: 'russia-georgian-aggression-and-genocide',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russia' },
        { kind: 'participant', name: 'Dmitry Medvedev' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Last night, Georgian troops committed what amounts to an act of aggression against Russian peacekeepers and the civilian population in South Ossetia.',
          lang: 'en',
          cite: {
            source: 'medvedev-2008-08-08-statement-on-the-situation-in-south-ossetia',
            loc: { section: 'Statement on the Situation in South Ossetia', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/1042'
          }
        },
        {
          id: 'q3',
          text: 'Saakashvili opted for genocide to accomplish his political objectives.',
          lang: 'en',
          cite: {
            source: 'medvedev-2008-08-26-statement-on-the-recognition-of-south-ossetia-and-abkhazia',
            loc: { section: 'Statement by President of Russia Dmitry Medvedev', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/1222'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'After having carefully reviewed the facts in the light of the relevant law, the Mission concludes that to the best of its knowledge allegations of genocide committed by the Georgian side in the context of the August 2008 conflict and its aftermath are neither founded in law nor substantiated by factual evidence.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q5',
          text: 'Consequently, it must be concluded that the Russian military action outside South Ossetia was essentially conducted in violation of international law.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      id: 'georgia-russian-military-aggression',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Georgia' },
        { kind: 'organization', name: 'Parliament of Georgia' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The steps made by the Georgian authorities and the International Community in 2007-2008 aimed at settling the so-called frozen conflicts and providing the genuine environment for internationalization of the peace process (as approved in the Resolutions N1781 and N1752 of UN Security Council) Russia responded with the military aggression.',
          lang: 'en',
          cite: {
            source: 'parliament-of-georgia-2008-08-28-resolution-on-russian-occupation',
            loc: { section: 'Resolution of the Parliament of Georgia', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-12', url: 'https://rrc.ge/law/dadg_2008_28_08_E.htm' }
        },
        {
          id: 'q7',
          text: '1. To declare the Russian armed forces, including the so called peacekeeping forces, currently deployed on the territory of Georgia, as occupying military units.',
          lang: 'en',
          cite: {
            source: 'parliament-of-georgia-2008-08-28-resolution-on-russian-occupation',
            loc: { section: 'Resolution of the Parliament of Georgia', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-12', url: 'https://rrc.ge/law/dadg_2008_28_08_E.htm' }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The Mission is not in a position to consider as sufficiently substantiated the Georgian claim concerning a large-scale Russian military incursion into South Ossetia before 8 August 2008.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q9',
          text: 'There is the question of whether the use of force by Georgia in South Ossetia, beginning with the shelling of Tskhinvali during the night of 7/8 August 2008, was justifiable under international law. It was not.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      id: 'fact-finding-mission-legality-differentiated',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Independent International Fact-Finding Mission on the Conflict in Georgia'
        }
      ],
      statements: [
        {
          id: 'q10',
          text: 'When considering the legality of Russian military force against Georgia, the answer needs to be differentiated.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
