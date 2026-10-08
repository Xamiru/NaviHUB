import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-printing-press-in-tabriz',
  names: [
    { text: 'First printing press in Tabriz', lang: 'en', role: 'primary' },
    { text: 'نخستین چاپخانه تبریز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1816', approx: true, notAfter: '1817' },
        cites: [
          { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } },
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'organizer',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } }
      ]
    },
    {
      name: 'Mīrzā Zayn-al-ʿĀbedīn b. Malek-Moḥammad Tabrīzī',
      role: 'participant',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'On the other hand, John Malcolm wrote in 1231/1815 that “the art of printing is unknown in Persia” (p. 582),',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Browne believed that the first printing press with movable type in Iran was the one established at Tabrīz in about 1232/1816-17, under the patronage of the crown prince ʿAbbās Mīrzā (Browne, p. 7); the printer was Mīrzā Zayn-al-ʿĀbedīn b. Malek-Moḥammad Tabrīzī.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        },
        {
          id: 'q3',
          text: 'About 1816, Armenians from Istanbul founded a printing house in Tabrīz (Browne, Lit. Hist. Persia IV, p. 155).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q4',
          text: 'At about the same time Mīrzā ʿAbd-al-Wahhāb Moʿtamed-al-Dawla spon­sored a second press, in Tehran.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In 1240/1824-25 Fatḥ-ʿAlī Shah summoned Zayn-al-ʿĀbedīn from Tabrīz to Tehran, where he settled and printed a number of books, mostly on religious subjects, under the direction of Manūčehr Khan Moʿtamed-al-­Dawla',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Manuscript_of_the_Jih%C4%81d%C4%AByyah_%28%22Treatise_on_holy_war%22%29_by_Abu_al-Qasim_ibn_%27Is%C3%A1_Qa%27im%27maqam_Farahani%2C_Persian_manuscript%2C_printed_in_Tabriz%2C_Iran%2C_dated_1817.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Manuscript_of_the_Jih%C4%81d%C4%AByyah_(%22Treatise_on_holy_war%22)_by_Abu_al-Qasim_ibn_%27Is%C3%A1_Qa%27im%27maqam_Farahani,_Persian_manuscript,_printed_in_Tabriz,_Iran,_dated_1817.jpg',
    credit: { institution: 'Library of Congress, World Digital Library' },
    license: { id: 'cc0' }
  }
})
