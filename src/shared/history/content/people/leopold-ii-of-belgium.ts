import { definePerson } from '../../schema'

export default definePerson({
  id: 'leopold-ii-of-belgium',
  names: [
    { text: 'Leopold II of Belgium', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['europe', 'subsaharan-africa'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Congo Free State owed its existence to the ambition and force of character of a single individual.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q2',
          text: 'It dated its formal inclusion among the independent states of the world from 1885, when its founder, Leopold II., king of the Belgians, became its head.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q3',
          text: 'Nearly all the funds required in the work of founding the Free State were provided by Leopold II. out of his privy purse, and for some time after the recognition of the state this system was continued.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '67' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/King_Leopold_of_Belgium%2C_portrait_bust_LCCN2014680744.tif/lossy-page1-1280px-King_Leopold_of_Belgium%2C_portrait_bust_LCCN2014680744.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:King_Leopold_of_Belgium,_portrait_bust_LCCN2014680744.tif',
    title: 'King Leopold of Belgium, portrait bust',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
