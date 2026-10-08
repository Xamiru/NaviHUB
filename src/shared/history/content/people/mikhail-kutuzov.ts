import { definePerson } from '../../schema'

export default definePerson({
  id: 'mikhail-kutuzov',
  names: [
    { text: 'Mikhail Kutuzov', lang: 'en', role: 'primary' },
    { text: 'Михаил Илларионович Кутузов', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1813-04-28' },
        cites: [
          {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['military'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The defeat at Austerlitz (2 December 1805) – for which he was deemed responsible – saw him sidelined once again: he was appointed military governor of Kiev in 1806 and served in a similar position in Vilnius in 1809 before returning to military service as commander-in-chief of the Army of the Danube in March 1811. His victory at Rusçuk (modern-day Ruse, Bulgaria) and successes along the north bank of the Danube saw him given the title of Count on 10 November 1811 and in 1812 he concluded the peace treaty signed at Bucharest. His popularity with the army saw him appointed – from the end of August 1812 – commander-in-chief of Russian forces, during which he executed the scorched-earth retreat policy. After offering battle at Borodino and then retreating, he subsequently abandoned Moscow.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        },
        {
          id: 'q2',
          text: 'Promoted to general field marshal on 11 September 1812, he was successful at Tarutino, Maloiaroslavets, Viazma, and Krasnyi, and was subsequently named Prince of Smolensk.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Despite his opposition to Alexander\'s wish to pursue the war into Germany, the Russian army marched through Poland, where Kutuzov fell ill and died, on 28 April, 1813.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Kutuzov_by_Volkov.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kutuzov_by_Volkov.jpg',
    credit: { creator: 'Roman Volkov' },
    license: { id: 'public-domain' }
  }
})
