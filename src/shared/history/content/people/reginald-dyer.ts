import { definePerson } from '../../schema'

export default definePerson({
  id: 'reginald-dyer',
  names: [
    { text: 'Reginald Dyer', lang: 'en', role: 'primary' },
    {
      text: 'Brigadier-General Reginald Dyer',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1864' },
        cites: [
          {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1927' },
        cites: [
          {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  roles: ['military'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Dyer had been mentioned in dispatches and made a Companion of the Order of the Bath for his heroic First World War service. He had commanded the Seistan Force of the Indian army in Eastern Persia (Iran) and was tasked with preventing German and Ottoman infiltration into Afghanistan. His celebrated methods involved “retributive actions” against the hostile populace, including starving uncooperative “tribes” by seizing their livestock and burning their villages.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/G%C3%A9n%C3%A9ral_Dyer%2C_C.N._Londres_%28clich%C3%A9_Central_News%29_-_btv1b530372528.jpg/1280px-G%C3%A9n%C3%A9ral_Dyer%2C_C.N._Londres_%28clich%C3%A9_Central_News%29_-_btv1b530372528.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:G%C3%A9n%C3%A9ral_Dyer,_C.N._Londres_(clich%C3%A9_Central_News)_-_btv1b530372528.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Agence Rol' },
    license: { id: 'public-domain' }
  }
})
