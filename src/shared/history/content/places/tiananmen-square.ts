import { definePlace } from '../../schema'

export default definePlace({
  id: 'tiananmen-square',
  names: [
    { text: 'Tiananmen Square', lang: 'en', role: 'primary' },
    { text: '天安门广场', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
