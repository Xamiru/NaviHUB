import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'jameson-raid-responsibility',
  about: ['event:jameson-raid'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'british-government-disavowal',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'Government of the United Kingdom' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'My Ministers, at the earliest possible moment, intervened to prohibit, through the High Commissioner, this hostile action, and to warn all my subjects throughout South Africa against taking part in aid thereof.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1896-02-11-queens-speech',
            loc: { section: 'HL Deb 11 February 1896 vol 37 cc3-6', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1896/feb/11/the-queens-speech'
          }
        }
      ]
    },
    {
      id: 'rhodes-without-london',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Dorlis Blume' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Unterstützt von dem britischen Premierminister der südafrikanischen Kapkolonie, Cecil Rhodes, aber ohne Billigung der Londoner Regierung, fällt Leander Starr Jameson (1853-1917) mit einer Gruppe von Freischärlern in der Burenrepublik Transvaal ein und inszeniert dort einen probritischen Aufstand.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '65' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
          }
        }
      ]
    },
    {
      id: 'rhodes-plan-and-british-denial',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Rhodes hoped that the uitlanders would rise and join the invaders to help overthrow Kruger\'s government.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q4',
          text: 'The British government denied having advance knowledge of the invasion and claimed that it had no expansionist plans of its own.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    }
  ]
})
