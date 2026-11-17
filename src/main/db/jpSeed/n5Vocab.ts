import type { SeedCourseDef, SeedLesson } from '../japaneseSeed'

// JLPT N5 Vocabulary II (2026-11-17): the N5 words JLPT N5 Foundations does
// not teach as cards, so the N5 word list is complete by the end of this
// course. It sits right after JLPT N5 Kanji. Lessons are grouped by word
// class (verbs, adjectives, time words and adverbs, then nouns by topic,
// question words and linking words); later batches append new lessons after
// the last one. Keys are frozen; no front repeats a card that
// another built-in course already has (tests/japaneseSeed.test.ts).

const VERBS_BASICS: SeedLesson = {
  key: 'n5vocab.verbs-basics',
  kind: 'vocab',
  title: 'Verbs: everyday basics',
  cards: [
    { front: 'ある', back: 'to be; to exist; to have (things, plants)', pos: 'verb (u)', notes: 'For things that do not move; people and animals take いる. Its plain negative is ない, never あらない.', exampleJp: '机の上に本があります。', exampleReading: 'つくえのうえにほんがあります。', exampleEn: 'There is a book on the desk.' },
    { front: 'いる', back: 'to be; to exist (people, animals)', pos: 'verb (ru)', notes: 'For living things; objects take ある.', exampleJp: '公園に子供がたくさんいます。', exampleReading: 'こうえんにこどもがたくさんいます。', exampleEn: 'There are lots of children in the park.' },
    { front: 'なる', back: 'to become', pos: 'verb (u)', notes: 'A noun or な-adjective takes に (医者になる); an い-adjective changes い to く (寒くなる).', exampleJp: '弟は医者になりたいです。', exampleReading: 'おとうとはいしゃになりたいです。', exampleEn: 'My younger brother wants to become a doctor.' },
    { front: 'できる', back: 'to be able to; to be ready', pos: 'verb (ru)', notes: 'The skill takes が: 日本語ができる "can speak Japanese".', exampleJp: '兄は中国語ができます。', exampleReading: 'あにはちゅうごくごができます。', exampleEn: 'My older brother can speak Chinese.' },
    { front: 'やる', back: 'to do (casual)', pos: 'verb (u)', notes: 'A casual する for tasks and games: 宿題をやる.', exampleJp: '週末に宿題をやります。', exampleReading: 'しゅうまつにしゅくだいをやります。', exampleEn: 'I do my homework at the weekend.' },
    { front: '言う', reading: 'いう', back: 'to say', pos: 'verb (u)', notes: 'The person spoken to takes に.', exampleJp: '名前をもう一度言ってください。', exampleReading: 'なまえをもういちどいってください。', exampleEn: 'Please say your name once more.' },
    { front: '思う', reading: 'おもう', back: 'to think', pos: 'verb (u)', notes: 'An opinion is plain form + と思います: いいと思います "I think it is good".', exampleJp: 'この本はいいと思います。', exampleReading: 'このほんはいいとおもいます。', exampleEn: 'I think this book is good.' },
    { front: '持つ', reading: 'もつ', back: 'to hold; to carry; to have', pos: 'verb (u)', notes: 'Having something on you is 持っている.', exampleJp: '傘を持っていますか。', exampleReading: 'かさをもっていますか。', exampleEn: 'Do you have an umbrella?' },
    { front: '住む', reading: 'すむ', back: 'to live (somewhere)', pos: 'verb (u)', notes: 'The place takes に, and the verb is usually in ている form: 東京に住んでいます.', exampleJp: '兄は大阪に住んでいます。', exampleReading: 'あにはおおさかにすんでいます。', exampleEn: 'My older brother lives in Osaka.' },
    { front: '違う', reading: 'ちがう', back: 'to be different; to be wrong', pos: 'verb (u)', exampleJp: 'この答えは違いますよ。', exampleReading: 'このこたえはちがいますよ。', exampleEn: 'This answer is wrong.' },
    { front: '要る', reading: 'いる', back: 'to need', pos: 'verb (u)', notes: 'Group 1 although it ends in -iru (要ります, 要らない); not the いる of existence. The thing needed takes が.', exampleJp: '旅行にはお金が要ります。', exampleReading: 'りょこうにはおかねがいります。', exampleEn: 'You need money to travel.' },
    { front: '見える', reading: 'みえる', back: 'to be visible; can be seen', pos: 'verb (ru)', notes: 'What is seen takes が: 山が見える. 見る is to look at on purpose.', exampleJp: '窓から山が見えます。', exampleReading: 'まどからやまがみえます。', exampleEn: 'You can see the mountains from the window.' },
    { front: '聞こえる', reading: 'きこえる', back: 'to be audible; can be heard', pos: 'verb (ru)', notes: 'What is heard takes が. 聞く is to listen on purpose.', exampleJp: '隣の部屋から音楽が聞こえます。', exampleReading: 'となりのへやからおんがくがきこえます。', exampleEn: 'Music can be heard from the next room.' }
  ]
}

const VERBS_ROUTINE: SeedLesson = {
  key: 'n5vocab.verbs-routine',
  kind: 'vocab',
  title: 'Verbs: getting ready and housework',
  cards: [
    { front: '浴びる', reading: 'あびる', back: 'to take (a shower); to bathe in', pos: 'verb (ru)', notes: 'シャワーを浴びる = to take a shower.', exampleJp: '毎朝シャワーを浴びます。', exampleReading: 'まいあさしゃわーをあびます。', exampleEn: 'I take a shower every morning.' },
    { front: '洗う', reading: 'あらう', back: 'to wash', pos: 'verb (u)', exampleJp: '食事の前に手を洗います。', exampleReading: 'しょくじのまえにてをあらいます。', exampleEn: 'I wash my hands before meals.' },
    { front: '磨く', reading: 'みがく', back: 'to brush (teeth); to polish', pos: 'verb (u)', exampleJp: '寝る前に歯を磨きます。', exampleReading: 'ねるまえにはをみがきます。', exampleEn: 'I brush my teeth before bed.' },
    { front: '着る', reading: 'きる', back: 'to put on; to wear (a shirt, a coat, a dress)', pos: 'verb (ru)', notes: 'Shoes and trousers take 履く, hats かぶる. Not 切る (to cut), which is also read きる.', exampleJp: '今日はコートを着ています。', exampleReading: 'きょうはこーとをきています。', exampleEn: "I'm wearing a coat today." },
    { front: '脱ぐ', reading: 'ぬぐ', back: 'to take off (clothes, shoes)', pos: 'verb (u)', exampleJp: '玄関で靴を脱いでください。', exampleReading: 'げんかんでくつをぬいでください。', exampleEn: 'Please take your shoes off at the entrance.' },
    { front: '履く', reading: 'はく', back: 'to put on; to wear (shoes, trousers, a skirt)', pos: 'verb (u)', exampleJp: '新しい靴を履いて出かけました。', exampleReading: 'あたらしいくつをはいてでかけました。', exampleEn: 'I put on my new shoes and went out.' },
    { front: 'かぶる', back: 'to put on; to wear (a hat)', pos: 'verb (u)', exampleJp: '暑い日は帽子をかぶります。', exampleReading: 'あついひはぼうしをかぶります。', exampleEn: 'On hot days I wear a hat.' },
    { front: '締める', reading: 'しめる', back: 'to tie; to fasten (a tie, a belt)', pos: 'verb (ru)', notes: 'Same reading as 閉める (to close).', exampleJp: '父は毎日ネクタイを締めます。', exampleReading: 'ちちはまいにちねくたいをしめます。', exampleEn: 'My father wears a tie every day.' },
    { front: '出かける', reading: 'でかける', back: 'to go out', pos: 'verb (ru)', exampleJp: '日曜日は家族と出かけます。', exampleReading: 'にちようびはかぞくとでかけます。', exampleEn: 'On Sundays I go out with my family.' },
    { front: '洗濯する', reading: 'せんたくする', back: 'to do the laundry', pos: 'verb (irregular)', exampleJp: '天気がいい日に洗濯します。', exampleReading: 'てんきがいいひにせんたくします。', exampleEn: 'I do the laundry on sunny days.' },
    { front: '掃除する', reading: 'そうじする', back: 'to clean', pos: 'verb (irregular)', exampleJp: '土曜日に部屋を掃除しました。', exampleReading: 'どようびにへやをそうじしました。', exampleEn: 'I cleaned my room on Saturday.' },
    { front: '料理する', reading: 'りょうりする', back: 'to cook', pos: 'verb (irregular)', exampleJp: '晩ご飯は自分で料理します。', exampleReading: 'ばんごはんはじぶんでりょうりします。', exampleEn: 'I cook dinner myself.' },
    { front: '買い物する', reading: 'かいものする', back: 'to shop; to go shopping', pos: 'verb (irregular)', exampleJp: 'デパートで買い物しました。', exampleReading: 'でぱーとでかいものしました。', exampleEn: 'I went shopping at the department store.' }
  ]
}

const VERBS_HOME: SeedLesson = {
  key: 'n5vocab.verbs-home',
  kind: 'vocab',
  title: 'Verbs: opening, starting and putting',
  cards: [
    { front: '開ける', reading: 'あける', back: 'to open (something)', pos: 'verb (ru)', notes: 'Transitive: you open it (窓を開ける). A door opening by itself is 開く.', exampleJp: '窓を開けてもいいですか。', exampleReading: 'まどをあけてもいいですか。', exampleEn: 'May I open the window?' },
    { front: '閉める', reading: 'しめる', back: 'to close; to shut (something)', pos: 'verb (ru)', notes: 'Transitive (ドアを閉める); its intransitive partner is 閉まる.', exampleJp: 'ドアを閉めてください。', exampleReading: 'どあをしめてください。', exampleEn: 'Please close the door.' },
    { front: '開く', reading: 'あく', back: 'to open; to be open (by itself)', pos: 'verb (u)', notes: 'Intransitive: the thing that opens takes が (ドアが開く). The same kanji read ひらく means "to open (a book, an event)".', exampleJp: '銀行は十時に開きます。', exampleReading: 'ぎんこうはじゅうじにあきます。', exampleEn: 'The bank opens at ten.' },
    { front: '閉まる', reading: 'しまる', back: 'to close; to be shut (by itself)', pos: 'verb (u)', notes: 'Intransitive partner of 閉める: 店が閉まる.', exampleJp: 'あの店は八時に閉まります。', exampleReading: 'あのみせははちじにしまります。', exampleEn: 'That shop closes at eight.' },
    { front: '始まる', reading: 'はじまる', back: 'to begin; to start (by itself)', pos: 'verb (u)', notes: 'Intransitive: 授業が始まる. Transitive partner 始める.', exampleJp: '映画は三時に始まります。', exampleReading: 'えいがはさんじにはじまります。', exampleEn: 'The movie starts at three.' },
    { front: '始める', reading: 'はじめる', back: 'to begin; to start (something)', pos: 'verb (ru)', notes: 'Transitive: 勉強を始める.', exampleJp: '去年、日本語の勉強を始めました。', exampleReading: 'きょねん、にほんごのべんきょうをはじめました。', exampleEn: 'I started studying Japanese last year.' },
    { front: '終わる', reading: 'おわる', back: 'to end; to finish', pos: 'verb (u)', exampleJp: '仕事は六時に終わります。', exampleReading: 'しごとはろくじにおわります。', exampleEn: 'Work finishes at six.' },
    { front: 'つける', back: 'to turn on (a light, a TV)', pos: 'verb (ru)', notes: 'Its opposite is 消す (to turn off).', exampleJp: '暗いから、電気をつけましょう。', exampleReading: 'くらいから、でんきをつけましょう。', exampleEn: "It's dark, so let's turn on the light." },
    { front: '消す', reading: 'けす', back: 'to turn off; to erase', pos: 'verb (u)', exampleJp: '寝る前に電気を消します。', exampleReading: 'ねるまえにでんきをけします。', exampleEn: 'I turn off the light before bed.' },
    { front: '消える', reading: 'きえる', back: 'to go out (a light); to disappear', pos: 'verb (ru)', notes: 'Intransitive partner of 消す: 電気が消える.', exampleJp: '急に電気が消えました。', exampleReading: 'きゅうにでんきがきえました。', exampleEn: 'The lights suddenly went out.' },
    { front: '置く', reading: 'おく', back: 'to put; to place', pos: 'verb (u)', exampleJp: 'かばんは机の上に置いてください。', exampleReading: 'かばんはつくえのうえにおいてください。', exampleEn: 'Please put your bag on the desk.' },
    { front: '入れる', reading: 'いれる', back: 'to put in', pos: 'verb (ru)', notes: 'Transitive partner of 入る (to enter).', exampleJp: 'コーヒーに砂糖を入れますか。', exampleReading: 'こーひーにさとうをいれますか。', exampleEn: 'Do you take sugar in your coffee?' },
    { front: '出す', reading: 'だす', back: 'to take out; to hand in; to send (a letter)', pos: 'verb (u)', notes: 'Transitive partner of 出る (to go out).', exampleJp: '先生に宿題を出しました。', exampleReading: 'せんせいにしゅくだいをだしました。', exampleEn: 'I handed my homework in to the teacher.' },
    { front: '並べる', reading: 'ならべる', back: 'to line up; to set out (things)', pos: 'verb (ru)', notes: 'Transitive partner of 並ぶ (to stand in line).', exampleJp: 'テーブルにお皿を並べました。', exampleReading: 'てーぶるにおさらをならべました。', exampleEn: 'I set the plates out on the table.' },
    { front: '止める', reading: 'とめる', back: 'to stop (something); to park', pos: 'verb (ru)', notes: 'Transitive partner of 止まる: 車を止める.', exampleJp: '駅の前に車を止めました。', exampleReading: 'えきのまえにくるまをとめました。', exampleEn: 'I parked the car in front of the station.' }
  ]
}

const VERBS_TRAVEL: SeedLesson = {
  key: 'n5vocab.verbs-travel',
  kind: 'vocab',
  title: 'Verbs: getting around',
  cards: [
    { front: '乗る', reading: 'のる', back: 'to ride; to get on', pos: 'verb (u)', notes: 'The vehicle takes に: 電車に乗る.', exampleJp: '毎朝八時のバスに乗ります。', exampleReading: 'まいあさはちじのばすにのります。', exampleEn: "I get the eight o'clock bus every morning." },
    { front: '降りる', reading: 'おりる', back: 'to get off; to go down', pos: 'verb (ru)', notes: 'What you get off takes を: 電車を降りる.', exampleJp: '次の駅で電車を降ります。', exampleReading: 'つぎのえきででんしゃをおります。', exampleEn: 'I get off the train at the next station.' },
    { front: '着く', reading: 'つく', back: 'to arrive', pos: 'verb (u)', notes: 'The destination takes に: 駅に着く.', exampleJp: '朝十時に空港に着きました。', exampleReading: 'あさじゅうじにくうこうにつきました。', exampleEn: 'I arrived at the airport at ten in the morning.' },
    { front: '通る', reading: 'とおる', back: 'to pass (through, by); to go along', pos: 'verb (u)', exampleJp: 'このバスは駅の前を通ります。', exampleReading: 'このばすはえきのまえをとおります。', exampleEn: 'This bus goes past the station.' },
    { front: '登る', reading: 'のぼる', back: 'to climb', pos: 'verb (u)', notes: 'The mountain takes に: 山に登る.', exampleJp: '夏休みに富士山に登りました。', exampleReading: 'なつやすみにふじさんにのぼりました。', exampleEn: 'I climbed Mount Fuji in the summer holidays.' },
    { front: '飛ぶ', reading: 'とぶ', back: 'to fly', pos: 'verb (u)', exampleJp: '空に鳥が飛んでいます。', exampleReading: 'そらにとりがとんでいます。', exampleEn: 'Birds are flying in the sky.' },
    { front: '並ぶ', reading: 'ならぶ', back: 'to stand in line; to queue', pos: 'verb (u)', notes: 'Intransitive: people line up. Transitive partner 並べる.', exampleJp: '店の前に人がたくさん並んでいます。', exampleReading: 'みせのまえにひとがたくさんならんでいます。', exampleEn: 'Lots of people are queueing in front of the shop.' },
    { front: '押す', reading: 'おす', back: 'to push; to press', pos: 'verb (u)', exampleJp: 'このボタンを押してください。', exampleReading: 'このぼたんをおしてください。', exampleEn: 'Please press this button.' },
    { front: '引く', reading: 'ひく', back: 'to pull; to catch (a cold)', pos: 'verb (u)', notes: '風邪を引く = to catch a cold.', exampleJp: 'ドアを引いて開けてください。', exampleReading: 'どあをひいてあけてください。', exampleEn: 'Please pull the door to open it.' },
    { front: 'かかる', back: 'to take (time); to cost (money)', pos: 'verb (u)', exampleJp: '学校までバスで一時間かかります。', exampleReading: 'がっこうまでばすでいちじかんかかります。', exampleEn: 'It takes an hour to get to school by bus.' },
    { front: '散歩する', reading: 'さんぽする', back: 'to take a walk', pos: 'verb (irregular)', exampleJp: '毎晩犬と公園を散歩します。', exampleReading: 'まいばんいぬとこうえんをさんぽします。', exampleEn: 'Every evening I walk the dog in the park.' },
    { front: '旅行する', reading: 'りょこうする', back: 'to travel; to take a trip', pos: 'verb (irregular)', exampleJp: '来年、京都を旅行したいです。', exampleReading: 'らいねん、きょうとをりょこうしたいです。', exampleEn: 'I want to travel around Kyoto next year.' }
  ]
}

const VERBS_GIVING: SeedLesson = {
  key: 'n5vocab.verbs-giving',
  kind: 'vocab',
  title: 'Verbs: giving, lending and asking',
  cards: [
    { front: 'あげる', back: 'to give (to someone else)', pos: 'verb (ru)', notes: 'From you or your side outward: 友達にあげる. Giving to you is くれる.', exampleJp: '妹の誕生日に花をあげました。', exampleReading: 'いもうとのたんじょうびにはなをあげました。', exampleEn: 'I gave my younger sister flowers for her birthday.' },
    { front: 'くれる', back: 'to give (to me or my side)', pos: 'verb (ru)', notes: 'The giver takes が or は; the receiver is you or your family: 父がくれた.', exampleJp: '父が時計をくれました。', exampleReading: 'ちちがとけいをくれました。', exampleEn: 'My father gave me a watch.' },
    { front: 'もらう', back: 'to receive; to get', pos: 'verb (u)', notes: 'The giver takes に or から: 友達にもらう.', exampleJp: '母から手紙をもらいました。', exampleReading: 'ははからてがみをもらいました。', exampleEn: 'I got a letter from my mother.' },
    { front: '貸す', reading: 'かす', back: 'to lend', pos: 'verb (u)', notes: 'Lending out; borrowing is 借りる.', exampleJp: '友達に傘を貸しました。', exampleReading: 'ともだちにかさをかしました。', exampleEn: 'I lent a friend my umbrella.' },
    { front: '借りる', reading: 'かりる', back: 'to borrow; to rent', pos: 'verb (ru)', notes: 'The lender takes に or から: 友達に借りる. Lending is 貸す.', exampleJp: '図書館で本を借りました。', exampleReading: 'としょかんでほんをかりました。', exampleEn: 'I borrowed a book from the library.' },
    { front: '返す', reading: 'かえす', back: 'to return; to give back', pos: 'verb (u)', exampleJp: '明日、図書館に本を返します。', exampleReading: 'あした、としょかんにほんをかえします。', exampleEn: "I'll return the book to the library tomorrow." },
    { front: '見せる', reading: 'みせる', back: 'to show', pos: 'verb (ru)', exampleJp: '写真を見せてください。', exampleReading: 'しゃしんをみせてください。', exampleEn: 'Please show me the photos.' },
    { front: '送る', reading: 'おくる', back: 'to send', pos: 'verb (u)', exampleJp: '国の家族に荷物を送りました。', exampleReading: 'くにのかぞくににもつをおくりました。', exampleEn: 'I sent a parcel to my family back home.' },
    { front: '届く', reading: 'とどく', back: 'to arrive; to be delivered', pos: 'verb (u)', notes: 'Intransitive: 手紙が届く.', exampleJp: '昨日、母から手紙が届きました。', exampleReading: 'きのう、ははからてがみがとどきました。', exampleEn: 'A letter from my mother arrived yesterday.' },
    { front: '呼ぶ', reading: 'よぶ', back: 'to call; to invite', pos: 'verb (u)', exampleJp: 'タクシーを呼んでください。', exampleReading: 'たくしーをよんでください。', exampleEn: 'Please call a taxi.' },
    { front: '答える', reading: 'こたえる', back: 'to answer', pos: 'verb (ru)', notes: 'The question takes に: 質問に答える.', exampleJp: '先生の質問に答えました。', exampleReading: 'せんせいのしつもんにこたえました。', exampleEn: "I answered the teacher's question." },
    { front: '質問する', reading: 'しつもんする', back: 'to ask a question', pos: 'verb (irregular)', exampleJp: '分からないときは質問してください。', exampleReading: 'わからないときはしつもんしてください。', exampleEn: "Please ask when you don't understand." },
    { front: '電話する', reading: 'でんわする', back: 'to phone; to call', pos: 'verb (irregular)', notes: 'The person called takes に: 母に電話する.', exampleJp: '毎週、母に電話します。', exampleReading: 'まいしゅう、ははにでんわします。', exampleEn: 'I call my mother every week.' }
  ]
}

const VERBS_HOBBIES: SeedLesson = {
  key: 'n5vocab.verbs-hobbies',
  kind: 'vocab',
  title: 'Verbs: study, work and hobbies',
  cards: [
    { front: '習う', reading: 'ならう', back: 'to learn (from someone); to take lessons', pos: 'verb (u)', notes: 'The teacher takes に: 先生に習う. 勉強する is studying on your own.', exampleJp: '子供のとき、ピアノを習いました。', exampleReading: 'こどものとき、ぴあのをならいました。', exampleEn: 'I took piano lessons as a child.' },
    { front: '練習する', reading: 'れんしゅうする', back: 'to practise', pos: 'verb (irregular)', exampleJp: '毎日ギターを練習しています。', exampleReading: 'まいにちぎたーをれんしゅうしています。', exampleEn: 'I practise the guitar every day.' },
    { front: '歌う', reading: 'うたう', back: 'to sing', pos: 'verb (u)', exampleJp: 'カラオケで歌を歌いました。', exampleReading: 'からおけでうたをうたいました。', exampleEn: 'We sang songs at karaoke.' },
    { front: '弾く', reading: 'ひく', back: 'to play (a piano, a guitar)', pos: 'verb (u)', notes: 'For keyboard and string instruments; wind instruments take 吹く. Same reading as 引く (to pull).', exampleJp: '兄はギターを弾いています。', exampleReading: 'あにはぎたーをひいています。', exampleEn: 'My older brother plays the guitar.' },
    { front: '撮る', reading: 'とる', back: 'to take (a photo, a video)', pos: 'verb (u)', notes: 'Same reading as 取る; 撮る is only for photos and films.', exampleJp: 'ここで写真を撮ってもいいですか。', exampleReading: 'ここでしゃしんをとってもいいですか。', exampleEn: 'May I take photos here?' },
    { front: '取る', reading: 'とる', back: 'to take; to pick up; to pass (something)', pos: 'verb (u)', exampleJp: 'すみません、塩を取ってください。', exampleReading: 'すみません、しおをとってください。', exampleEn: 'Excuse me, could you pass the salt?' },
    { front: '貼る', reading: 'はる', back: 'to stick; to put up (a stamp, a poster)', pos: 'verb (u)', exampleJp: 'はがきに切手を貼りました。', exampleReading: 'はがきにきってをはりました。', exampleEn: 'I put a stamp on the postcard.' },
    { front: '切る', reading: 'きる', back: 'to cut', pos: 'verb (u)', notes: 'Group 1 although it ends in -iru (切ります, 切らない). Not 着る (to wear).', exampleJp: 'はさみで紙を切ります。', exampleReading: 'はさみでかみをきります。', exampleEn: 'I cut the paper with scissors.' },
    { front: '勤める', reading: 'つとめる', back: 'to work for (a company)', pos: 'verb (ru)', notes: 'The workplace takes に, usually in ている form: 銀行に勤めている. 働く is "to work" in general.', exampleJp: '姉は銀行に勤めています。', exampleReading: 'あねはぎんこうにつとめています。', exampleEn: 'My older sister works at a bank.' },
    { front: '払う', reading: 'はらう', back: 'to pay', pos: 'verb (u)', exampleJp: 'カードで払ってもいいですか。', exampleReading: 'かーどではらってもいいですか。', exampleEn: 'Can I pay by card?' },
    { front: '数える', reading: 'かぞえる', back: 'to count', pos: 'verb (ru)', exampleJp: '箱の中のりんごを数えました。', exampleReading: 'はこのなかのりんごをかぞえました。', exampleEn: 'I counted the apples in the box.' },
    { front: '売る', reading: 'うる', back: 'to sell', pos: 'verb (u)', exampleJp: 'あの店で古い本を売っています。', exampleReading: 'あのみせでふるいほんをうっています。', exampleEn: 'That shop sells old books.' },
    { front: '飼う', reading: 'かう', back: 'to keep (a pet)', pos: 'verb (u)', notes: 'Same reading as 買う (to buy).', exampleJp: '私は小さい犬を飼っています。', exampleReading: 'わたしはちいさいいぬをかっています。', exampleEn: 'I have a small dog.' },
    { front: '吸う', reading: 'すう', back: 'to smoke; to breathe in', pos: 'verb (u)', exampleJp: '父はたばこを吸いません。', exampleReading: 'ちちはたばこをすいません。', exampleEn: 'My father does not smoke.' }
  ]
}

const VERBS_LIFE: SeedLesson = {
  key: 'n5vocab.verbs-life',
  kind: 'vocab',
  title: 'Verbs: weather and life',
  cards: [
    { front: '晴れる', reading: 'はれる', back: 'to clear up; to be sunny', pos: 'verb (ru)', exampleJp: '明日は晴れます。', exampleReading: 'あしたははれます。', exampleEn: 'It will be sunny tomorrow.' },
    { front: '曇る', reading: 'くもる', back: 'to cloud over', pos: 'verb (u)', notes: 'Usually 曇っている, "it is cloudy".', exampleJp: '今日は朝から曇っています。', exampleReading: 'きょうはあさからくもっています。', exampleEn: "It's been cloudy since this morning." },
    { front: '降る', reading: 'ふる', back: 'to fall (rain, snow)', pos: 'verb (u)', exampleJp: '朝から雪が降っています。', exampleReading: 'あさからゆきがふっています。', exampleEn: "It's been snowing since the morning." },
    { front: '吹く', reading: 'ふく', back: 'to blow (wind); to play (a wind instrument)', pos: 'verb (u)', exampleJp: '今日は強い風が吹いています。', exampleReading: 'きょうはつよいかぜがふいています。', exampleEn: 'A strong wind is blowing today.' },
    { front: '咲く', reading: 'さく', back: 'to bloom', pos: 'verb (u)', exampleJp: '公園に桜が咲いています。', exampleReading: 'こうえんにさくらがさいています。', exampleEn: 'The cherry blossoms are out in the park.' },
    { front: '鳴く', reading: 'なく', back: 'to sing; to bark; to cry (animals, birds)', pos: 'verb (u)', notes: 'Same reading as 泣く (a person crying).', exampleJp: '朝早く鳥が鳴いています。', exampleReading: 'あさはやくとりがないています。', exampleEn: 'Birds are singing early in the morning.' },
    { front: '差す', reading: 'さす', back: 'to put up (an umbrella)', pos: 'verb (u)', notes: '傘を差す = to put up an umbrella; often written さす.', exampleJp: '雨ですから、傘を差してください。', exampleReading: 'あめですから、かさをさしてください。', exampleEn: "It's raining, so please put up your umbrella." },
    { front: '生まれる', reading: 'うまれる', back: 'to be born', pos: 'verb (ru)', exampleJp: '私は大阪で生まれました。', exampleReading: 'わたしはおおさかでうまれました。', exampleEn: 'I was born in Osaka.' },
    { front: '死ぬ', reading: 'しぬ', back: 'to die', pos: 'verb (u)', notes: 'The only common verb ending in ぬ: 死にます, 死んだ.', exampleJp: '昨日、うちの古い犬が死にました。', exampleReading: 'きのう、うちのふるいいぬがしにました。', exampleEn: 'Our old dog died yesterday.' },
    { front: '生きる', reading: 'いきる', back: 'to live; to be alive', pos: 'verb (ru)', notes: 'Being alive; living somewhere is 住む.', exampleJp: '祖母は百歳まで生きました。', exampleReading: 'そぼはひゃくさいまでいきました。', exampleEn: 'My grandmother lived to a hundred.' },
    { front: '結婚する', reading: 'けっこんする', back: 'to get married', pos: 'verb (irregular)', notes: 'The partner takes と: 田中さんと結婚する.', exampleJp: '姉は来月結婚します。', exampleReading: 'あねはらいげつけっこんします。', exampleEn: 'My older sister is getting married next month.' },
    { front: '困る', reading: 'こまる', back: 'to be in trouble; to not know what to do', pos: 'verb (u)', exampleJp: '財布を忘れて、困りました。', exampleReading: 'さいふをわすれて、こまりました。', exampleEn: 'I forgot my wallet and was stuck.' },
    { front: '太る', reading: 'ふとる', back: 'to put on weight', pos: 'verb (u)', notes: 'Being overweight is 太っている.', exampleJp: '冬は少し太りました。', exampleReading: 'ふゆはすこしふとりました。', exampleEn: 'I put on a little weight over the winter.' },
    { front: 'やせる', back: 'to lose weight; to get thin', pos: 'verb (ru)', notes: 'Kanji 痩せる, usually written in kana. Being thin is やせている.', exampleJp: '兄は背が高くて、やせています。', exampleReading: 'あにはせがたかくて、やせています。', exampleEn: 'My older brother is tall and thin.' }
  ]
}

const ADJ_SIZE: SeedLesson = {
  key: 'n5vocab.adj-size',
  kind: 'vocab',
  title: 'Adjectives: size, shape and distance',
  cards: [
    { front: '長い', reading: 'ながい', back: 'long', pos: 'i-adjective', exampleJp: '妹の髪はとても長いです。', exampleReading: 'いもうとのかみはとてもながいです。', exampleEn: "My younger sister's hair is very long." },
    { front: '短い', reading: 'みじかい', back: 'short (length, time)', pos: 'i-adjective', notes: 'Short in height is 低い.', exampleJp: '冬は日が短いですね。', exampleReading: 'ふゆはひがみじかいですね。', exampleEn: "The days are short in winter, aren't they?" },
    { front: '広い', reading: 'ひろい', back: 'wide; spacious', pos: 'i-adjective', exampleJp: '新しい部屋は広くて明るいです。', exampleReading: 'あたらしいへやはひろくてあかるいです。', exampleEn: 'The new room is spacious and bright.' },
    { front: '狭い', reading: 'せまい', back: 'narrow; small (a room, a space)', pos: 'i-adjective', exampleJp: '私の部屋はちょっと狭いです。', exampleReading: 'わたしのへやはちょっとせまいです。', exampleEn: 'My room is a bit small.' },
    { front: '重い', reading: 'おもい', back: 'heavy', pos: 'i-adjective', exampleJp: 'このかばんはとても重いです。', exampleReading: 'このかばんはとてもおもいです。', exampleEn: 'This bag is very heavy.' },
    { front: '軽い', reading: 'かるい', back: 'light (in weight)', pos: 'i-adjective', exampleJp: 'この傘は小さくて軽いです。', exampleReading: 'このかさはちいさくてかるいです。', exampleEn: 'This umbrella is small and light.' },
    { front: '太い', reading: 'ふとい', back: 'thick; fat (a line, a tree)', pos: 'i-adjective', notes: 'For a person, say 太っている.', exampleJp: 'この木はとても太いですね。', exampleReading: 'このきはとてもふといですね。', exampleEn: "This tree is really thick, isn't it?" },
    { front: '細い', reading: 'ほそい', back: 'thin; slender; narrow', pos: 'i-adjective', exampleJp: '駅までは細い道を歩きます。', exampleReading: 'えきまではほそいみちをあるきます。', exampleEn: 'I walk along a narrow road to the station.' },
    { front: '厚い', reading: 'あつい', back: 'thick (a book, a coat)', pos: 'i-adjective', notes: 'Same reading as 暑い (hot weather) and 熱い (hot to the touch).', exampleJp: 'この辞書は厚くて重いです。', exampleReading: 'このじしょはあつくておもいです。', exampleEn: 'This dictionary is thick and heavy.' },
    { front: '薄い', reading: 'うすい', back: 'thin (paper); weak (coffee); light (a colour)', pos: 'i-adjective', exampleJp: 'このコーヒーはちょっと薄いです。', exampleReading: 'このこーひーはちょっとうすいです。', exampleEn: 'This coffee is a bit weak.' },
    { front: '丸い', reading: 'まるい', back: 'round', pos: 'i-adjective', exampleJp: '丸いテーブルを買いました。', exampleReading: 'まるいてーぶるをかいました。', exampleEn: 'I bought a round table.' },
    { front: '低い', reading: 'ひくい', back: 'low; short (height)', pos: 'i-adjective', notes: 'The opposite of 高い in height only; cheap is 安い.', exampleJp: '私の弟はまだ背が低いです。', exampleReading: 'わたしのおとうとはまだせがひくいです。', exampleEn: 'My younger brother is still short.' },
    { front: '近い', reading: 'ちかい', back: 'near; close', pos: 'i-adjective', notes: 'The place takes に or から: 駅に近い.', exampleJp: '私の家は駅から近いです。', exampleReading: 'わたしのいえはえきからちかいです。', exampleEn: 'My house is close to the station.' },
    { front: '遠い', reading: 'とおい', back: 'far', pos: 'i-adjective', exampleJp: '学校は家から遠いです。', exampleReading: 'がっこうはいえからとおいです。', exampleEn: 'School is far from home.' }
  ]
}

const ADJ_SENSES: SeedLesson = {
  key: 'n5vocab.adj-senses',
  kind: 'vocab',
  title: 'Adjectives: temperature, taste and colour',
  cards: [
    { front: '冷たい', reading: 'つめたい', back: 'cold (to the touch)', pos: 'i-adjective', notes: 'Cold weather is 寒い.', exampleJp: '冷たい水を飲みたいです。', exampleReading: 'つめたいみずをのみたいです。', exampleEn: 'I want to drink some cold water.' },
    { front: '熱い', reading: 'あつい', back: 'hot (to the touch)', pos: 'i-adjective', notes: 'Hot weather is 暑い.', exampleJp: 'このスープはとても熱いです。', exampleReading: 'このすーぷはとてもあついです。', exampleEn: 'This soup is very hot.' },
    { front: '暖かい', reading: 'あたたかい', back: 'warm (weather, a room)', pos: 'i-adjective', notes: 'Warm food, drinks and people take 温かい.', exampleJp: '今日は暖かくて、いい天気です。', exampleReading: 'きょうはあたたかくて、いいてんきです。', exampleEn: "It's warm today, and the weather is nice." },
    { front: '涼しい', reading: 'すずしい', back: 'cool (pleasantly)', pos: 'i-adjective', exampleJp: '秋は涼しくて好きです。', exampleReading: 'あきはすずしくてすきです。', exampleEn: 'I like autumn because it is cool.' },
    { front: '温かい', reading: 'あたたかい', back: 'warm (food, a drink, a person)', pos: 'i-adjective', notes: 'Warm weather and rooms usually take 暖かい.', exampleJp: '温かいお茶をください。', exampleReading: 'あたたかいおちゃをください。', exampleEn: 'Some warm tea, please.' },
    { front: '甘い', reading: 'あまい', back: 'sweet', pos: 'i-adjective', exampleJp: 'このケーキはとても甘いです。', exampleReading: 'このけーきはとてもあまいです。', exampleEn: 'This cake is very sweet.' },
    { front: '辛い', reading: 'からい', back: 'spicy; hot (taste)', pos: 'i-adjective', notes: 'The same kanji read つらい means "hard to bear".', exampleJp: 'このカレーはちょっと辛いです。', exampleReading: 'このかれーはちょっとからいです。', exampleEn: 'This curry is a bit spicy.' },
    { front: '明るい', reading: 'あかるい', back: 'bright; cheerful', pos: 'i-adjective', exampleJp: 'この部屋は明るくて広いです。', exampleReading: 'このへやはあかるくてひろいです。', exampleEn: 'This room is bright and spacious.' },
    { front: '暗い', reading: 'くらい', back: 'dark; gloomy', pos: 'i-adjective', exampleJp: '冬は五時ごろ暗くなります。', exampleReading: 'ふゆはごじごろくらくなります。', exampleEn: 'In winter it gets dark around five.' },
    { front: '白い', reading: 'しろい', back: 'white', pos: 'i-adjective', exampleJp: '白いシャツを買いました。', exampleReading: 'しろいしゃつをかいました。', exampleEn: 'I bought a white shirt.' },
    { front: '黒い', reading: 'くろい', back: 'black', pos: 'i-adjective', exampleJp: '黒い猫が庭で寝ています。', exampleReading: 'くろいねこがにわでねています。', exampleEn: 'A black cat is sleeping in the garden.' },
    { front: '赤い', reading: 'あかい', back: 'red', pos: 'i-adjective', exampleJp: '赤いりんごをください。', exampleReading: 'あかいりんごをください。', exampleEn: 'Red apples, please.' },
    { front: '青い', reading: 'あおい', back: 'blue; green (a traffic light)', pos: 'i-adjective', exampleJp: '今日は空が青いですね。', exampleReading: 'きょうはそらがあおいですね。', exampleEn: "The sky is blue today, isn't it?" },
    { front: '黄色い', reading: 'きいろい', back: 'yellow', pos: 'i-adjective', exampleJp: '妹は黄色い傘を持っています。', exampleReading: 'いもうとはきいろいかさをもっています。', exampleEn: 'My younger sister has a yellow umbrella.' }
  ]
}

const ADJ_QUALITIES: SeedLesson = {
  key: 'n5vocab.adj-qualities',
  kind: 'vocab',
  title: 'Adjectives: speed, amount and how things feel',
  cards: [
    { front: '早い', reading: 'はやい', back: 'early', pos: 'i-adjective', notes: 'Fast in speed is 速い, read the same.', exampleJp: '今日は早く家に帰ります。', exampleReading: 'きょうははやくいえにかえります。', exampleEn: "I'm going home early today." },
    { front: '速い', reading: 'はやい', back: 'fast; quick', pos: 'i-adjective', notes: 'Early in time is 早い, read the same.', exampleJp: '新幹線はとても速いです。', exampleReading: 'しんかんせんはとてもはやいです。', exampleEn: 'The bullet train is very fast.' },
    { front: '遅い', reading: 'おそい', back: 'late; slow', pos: 'i-adjective', exampleJp: '昨日は遅くまで勉強しました。', exampleReading: 'きのうはおそくまでべんきょうしました。', exampleEn: 'I studied until late yesterday.' },
    { front: '多い', reading: 'おおい', back: 'many; a lot', pos: 'i-adjective', notes: 'Usually at the end: 人が多い "there are many people", not 多い人.', exampleJp: 'この公園は週末、人が多いです。', exampleReading: 'このこうえんはしゅうまつ、ひとがおおいです。', exampleEn: 'This park is crowded at weekends.' },
    { front: '少ない', reading: 'すくない', back: 'few; little', pos: 'i-adjective', exampleJp: '今年は雨が少ないです。', exampleReading: 'ことしはあめがすくないです。', exampleEn: 'There has been little rain this year.' },
    { front: '強い', reading: 'つよい', back: 'strong', pos: 'i-adjective', exampleJp: 'あのチームはとても強いです。', exampleReading: 'あのちーむはとてもつよいです。', exampleEn: 'That team is very strong.' },
    { front: '弱い', reading: 'よわい', back: 'weak', pos: 'i-adjective', exampleJp: '私はお酒にとても弱いです。', exampleReading: 'わたしはおさけにとてもよわいです。', exampleEn: 'I have a very low tolerance for alcohol.' },
    { front: '若い', reading: 'わかい', back: 'young', pos: 'i-adjective', exampleJp: '田中先生はまだ若いです。', exampleReading: 'たなかせんせいはまだわかいです。', exampleEn: 'Tanaka, the teacher, is still young.' },
    { front: '痛い', reading: 'いたい', back: 'painful; sore', pos: 'i-adjective', notes: 'What hurts takes が: 頭が痛い "I have a headache".', exampleJp: '昨日から頭が痛いです。', exampleReading: 'きのうからあたまがいたいです。', exampleEn: "I've had a headache since yesterday." },
    { front: '忙しい', reading: 'いそがしい', back: 'busy', pos: 'i-adjective', exampleJp: '今週は仕事が忙しいです。', exampleReading: 'こんしゅうはしごとがいそがしいです。', exampleEn: "I'm busy with work this week." },
    { front: '楽しい', reading: 'たのしい', back: 'fun; enjoyable', pos: 'i-adjective', exampleJp: '昨日のパーティーは楽しかったです。', exampleReading: 'きのうのぱーてぃーはたのしかったです。', exampleEn: "Yesterday's party was fun." },
    { front: '易しい', reading: 'やさしい', back: 'easy (a question, a book)', pos: 'i-adjective', notes: 'Same reading as 優しい (kind). The opposite of 難しい.', exampleJp: '今日のテストは易しかったです。', exampleReading: 'きょうのてすとはやさしかったです。', exampleEn: "Today's test was easy." },
    { front: '汚い', reading: 'きたない', back: 'dirty; messy', pos: 'i-adjective', exampleJp: '私の部屋は今とても汚いです。', exampleReading: 'わたしのへやはいまとてもきたないです。', exampleEn: 'My room is really messy right now.' },
    { front: '欲しい', reading: 'ほしい', back: 'wanted; to want (a thing)', pos: 'i-adjective', notes: 'The thing wanted takes が: 車が欲しい. Wanting to do something uses たい.', exampleJp: '新しいパソコンが欲しいです。', exampleReading: 'あたらしいぱそこんがほしいです。', exampleEn: 'I want a new computer.' },
    { front: 'つまらない', back: 'boring; dull', pos: 'i-adjective', exampleJp: 'あの映画はつまらなかったです。', exampleReading: 'あのえいがはつまらなかったです。', exampleEn: 'That movie was boring.' }
  ]
}

const ADJ_NA: SeedLesson = {
  key: 'n5vocab.adj-na',
  kind: 'vocab',
  title: 'Adjectives: な-adjectives',
  cards: [
    { front: 'きれい', back: 'pretty; clean', pos: 'na-adjective', notes: 'Ends in い but is a な-adjective: きれいな花, きれいじゃない. Kanji 綺麗.', exampleJp: 'この公園はきれいですね。', exampleReading: 'このこうえんはきれいですね。', exampleEn: "This park is lovely, isn't it?" },
    { front: 'にぎやか', back: 'lively; busy (a place)', pos: 'na-adjective', exampleJp: '駅の前はいつもにぎやかです。', exampleReading: 'えきのまえはいつもにぎやかです。', exampleEn: 'The area in front of the station is always lively.' },
    { front: '親切', reading: 'しんせつ', back: 'kind; helpful', pos: 'na-adjective', exampleJp: 'ホテルの人はとても親切でした。', exampleReading: 'ほてるのひとはとてもしんせつでした。', exampleEn: 'The hotel staff were very kind.' },
    { front: '暇', reading: 'ひま', back: 'free (time); not busy', pos: 'na-adjective', exampleJp: '明日の午後は暇ですか。', exampleReading: 'あしたのごごはひまですか。', exampleEn: 'Are you free tomorrow afternoon?' },
    { front: '嫌い', reading: 'きらい', back: 'disliked; to dislike', pos: 'na-adjective', notes: 'Ends in い but is a な-adjective: 嫌いな食べ物, 嫌いじゃない. What you dislike takes が.', exampleJp: '私は寒い冬が嫌いです。', exampleReading: 'わたしはさむいふゆがきらいです。', exampleEn: 'I dislike cold winters.' },
    { front: '大好き', reading: 'だいすき', back: 'much loved; to love', pos: 'na-adjective', exampleJp: '私はこの歌が大好きです。', exampleReading: 'わたしはこのうたがだいすきです。', exampleEn: 'I love this song.' },
    { front: '上手', reading: 'じょうず', back: 'good at; skilful', pos: 'na-adjective', notes: 'Praise for other people; it sounds boastful about yourself. The skill takes が: 歌が上手.', exampleJp: '田中さんは料理が上手です。', exampleReading: 'たなかさんはりょうりがじょうずです。', exampleEn: 'Tanaka is a good cook.' },
    { front: '下手', reading: 'へた', back: 'bad at; poor at', pos: 'na-adjective', exampleJp: '私はまだ字が下手です。', exampleReading: 'わたしはまだじがへたです。', exampleEn: 'My handwriting is still poor.' },
    { front: '丈夫', reading: 'じょうぶ', back: 'strong; durable; healthy', pos: 'na-adjective', exampleJp: 'このかばんは軽くて丈夫です。', exampleReading: 'このかばんはかるくてじょうぶです。', exampleEn: 'This bag is light and sturdy.' },
    { front: '大変', reading: 'たいへん', back: 'hard; tough; terrible', pos: 'na-adjective', notes: 'Also an adverb, "very": 大変おいしい.', exampleJp: '毎日の仕事は大変です。', exampleReading: 'まいにちのしごとはたいへんです。', exampleEn: 'The daily work is hard.' },
    { front: 'いろいろ', back: 'various', pos: 'na-adjective', notes: 'Before a noun: いろいろな国; as an adverb: いろいろ見ました. Kanji 色々.', exampleJp: 'いろいろな国へ行きたいです。', exampleReading: 'いろいろなくにへいきたいです。', exampleEn: 'I want to go to all sorts of countries.' },
    { front: '結構', reading: 'けっこう', back: 'fine; enough; quite', pos: 'na-adjective', notes: '結構です often means "no, thank you". As an adverb: 結構おいしい "pretty tasty".', exampleJp: 'いいえ、もう結構です。', exampleReading: 'いいえ、もうけっこうです。', exampleEn: "No, I've had enough, thank you." }
  ]
}

const TIME_DAYS: SeedLesson = {
  key: 'n5vocab.time-days',
  kind: 'vocab',
  title: 'Days of the week and times of day',
  cards: [
    { front: '月曜日', reading: 'げつようび', back: 'Monday', pos: 'noun', exampleJp: '月曜日は朝から授業があります。', exampleReading: 'げつようびはあさからじゅぎょうがあります。', exampleEn: 'On Mondays I have classes from the morning.' },
    { front: '火曜日', reading: 'かようび', back: 'Tuesday', pos: 'noun', exampleJp: '火曜日にテストがあります。', exampleReading: 'かようびにてすとがあります。', exampleEn: 'There is a test on Tuesday.' },
    { front: '水曜日', reading: 'すいようび', back: 'Wednesday', pos: 'noun', exampleJp: '水曜日は店が休みです。', exampleReading: 'すいようびはみせがやすみです。', exampleEn: 'The shop is closed on Wednesdays.' },
    { front: '木曜日', reading: 'もくようび', back: 'Thursday', pos: 'noun', exampleJp: '木曜日の午後、友達に会います。', exampleReading: 'もくようびのごご、ともだちにあいます。', exampleEn: "I'm meeting a friend on Thursday afternoon." },
    { front: '金曜日', reading: 'きんようび', back: 'Friday', pos: 'noun', exampleJp: '金曜日の晩、映画を見ました。', exampleReading: 'きんようびのばん、えいがをみました。', exampleEn: 'I watched a movie on Friday evening.' },
    { front: '土曜日', reading: 'どようび', back: 'Saturday', pos: 'noun', exampleJp: '土曜日はたいてい家にいます。', exampleReading: 'どようびはたいていいえにいます。', exampleEn: "I'm usually at home on Saturdays." },
    { front: '日曜日', reading: 'にちようび', back: 'Sunday', pos: 'noun', exampleJp: '日曜日に家族と海へ行きました。', exampleReading: 'にちようびにかぞくとうみへいきました。', exampleEn: 'I went to the sea with my family on Sunday.' },
    { front: '週末', reading: 'しゅうまつ', back: 'weekend', pos: 'noun', exampleJp: '週末、友達とテニスをしました。', exampleReading: 'しゅうまつ、ともだちとてにすをしました。', exampleEn: 'I played tennis with a friend at the weekend.' },
    { front: '午前', reading: 'ごぜん', back: 'a.m.; morning', pos: 'noun', exampleJp: '午前十時に駅で会いましょう。', exampleReading: 'ごぜんじゅうじにえきであいましょう。', exampleEn: "Let's meet at the station at 10 a.m." },
    { front: '午後', reading: 'ごご', back: 'p.m.; afternoon', pos: 'noun', exampleJp: '午後三時に会議があります。', exampleReading: 'ごごさんじにかいぎがあります。', exampleEn: 'There is a meeting at 3 p.m.' },
    { front: '夕方', reading: 'ゆうがた', back: 'early evening; late afternoon', pos: 'noun', exampleJp: '夕方から雨になりました。', exampleReading: 'ゆうがたからあめになりました。', exampleEn: 'It started raining in the early evening.' },
    { front: '晩', reading: 'ばん', back: 'evening; night', pos: 'noun', notes: '晩ご飯 = dinner; 毎晩 = every evening.', exampleJp: '昨日の晩は早く寝ました。', exampleReading: 'きのうのばんははやくねました。', exampleEn: 'I went to bed early last night.' },
    { front: '今晩', reading: 'こんばん', back: 'this evening; tonight', pos: 'noun', exampleJp: '今晩、一緒に食事をしませんか。', exampleReading: 'こんばん、いっしょにしょくじをしませんか。', exampleEn: 'Would you like to have dinner together tonight?' },
    { front: '今朝', reading: 'けさ', back: 'this morning', pos: 'noun', exampleJp: '今朝は六時に起きました。', exampleReading: 'けさはろくじにおきました。', exampleEn: 'I got up at six this morning.' }
  ]
}

const TIME_CALENDAR: SeedLesson = {
  key: 'n5vocab.time-calendar',
  kind: 'vocab',
  title: 'Weeks, months and years',
  cards: [
    { front: '今週', reading: 'こんしゅう', back: 'this week', pos: 'noun', exampleJp: '今週はとても忙しいです。', exampleReading: 'こんしゅうはとてもいそがしいです。', exampleEn: "I'm very busy this week." },
    { front: '先週', reading: 'せんしゅう', back: 'last week', pos: 'noun', exampleJp: '先週、新しい靴を買いました。', exampleReading: 'せんしゅう、あたらしいくつをかいました。', exampleEn: 'I bought new shoes last week.' },
    { front: '来週', reading: 'らいしゅう', back: 'next week', pos: 'noun', exampleJp: '来週の月曜日に試験があります。', exampleReading: 'らいしゅうのげつようびにしけんがあります。', exampleEn: 'There is an exam next Monday.' },
    { front: '毎週', reading: 'まいしゅう', back: 'every week', pos: 'noun', exampleJp: '毎週金曜日にテニスをします。', exampleReading: 'まいしゅうきんようびにてにすをします。', exampleEn: 'I play tennis every Friday.' },
    { front: '今月', reading: 'こんげつ', back: 'this month', pos: 'noun', exampleJp: '今月は雨の日が多いです。', exampleReading: 'こんげつはあめのひがおおいです。', exampleEn: 'There have been many rainy days this month.' },
    { front: '先月', reading: 'せんげつ', back: 'last month', pos: 'noun', exampleJp: '先月、京都へ行きました。', exampleReading: 'せんげつ、きょうとへいきました。', exampleEn: 'I went to Kyoto last month.' },
    { front: '来月', reading: 'らいげつ', back: 'next month', pos: 'noun', exampleJp: '来月から新しい仕事を始めます。', exampleReading: 'らいげつからあたらしいしごとをはじめます。', exampleEn: "I'm starting a new job next month." },
    { front: '毎月', reading: 'まいつき', back: 'every month', pos: 'noun', exampleJp: '毎月、国の母に手紙を書きます。', exampleReading: 'まいつき、くにのははにてがみをかきます。', exampleEn: 'Every month I write to my mother back home.' },
    { front: '今年', reading: 'ことし', back: 'this year', pos: 'noun', exampleJp: '今年の夏はとても暑いです。', exampleReading: 'ことしのなつはとてもあついです。', exampleEn: 'This summer is very hot.' },
    { front: '去年', reading: 'きょねん', back: 'last year', pos: 'noun', exampleJp: '去年の冬はあまり寒くなかったです。', exampleReading: 'きょねんのふゆはあまりさむくなかったです。', exampleEn: "Last winter wasn't very cold." },
    { front: '来年', reading: 'らいねん', back: 'next year', pos: 'noun', exampleJp: '来年、大学に入りたいです。', exampleReading: 'らいねん、だいがくにはいりたいです。', exampleEn: 'I want to get into university next year.' },
    { front: '毎年', reading: 'まいとし', back: 'every year', pos: 'noun', notes: 'Also read まいねん.', exampleJp: '毎年、夏に海へ行きます。', exampleReading: 'まいとし、なつにうみへいきます。', exampleEn: 'I go to the sea every summer.' },
    { front: '毎日', reading: 'まいにち', back: 'every day', pos: 'noun', exampleJp: '毎日、日本語を勉強しています。', exampleReading: 'まいにち、にほんごをべんきょうしています。', exampleEn: 'I study Japanese every day.' },
    { front: '毎朝', reading: 'まいあさ', back: 'every morning', pos: 'noun', exampleJp: '毎朝、犬と散歩します。', exampleReading: 'まいあさ、いぬとさんぽします。', exampleEn: 'I walk the dog every morning.' },
    { front: '毎晩', reading: 'まいばん', back: 'every evening; every night', pos: 'noun', exampleJp: '毎晩、十一時に寝ます。', exampleReading: 'まいばん、じゅういちじにねます。', exampleEn: 'I go to bed at eleven every night.' }
  ]
}

const TIME_RELATIVE: SeedLesson = {
  key: 'n5vocab.time-relative',
  kind: 'vocab',
  title: 'Days around today, holidays and firsts',
  cards: [
    { front: 'おととい', back: 'the day before yesterday', pos: 'noun', notes: 'Kanji 一昨日.', exampleJp: 'おとといは学校を休みました。', exampleReading: 'おとといはがっこうをやすみました。', exampleEn: 'I was off school the day before yesterday.' },
    { front: 'あさって', back: 'the day after tomorrow', pos: 'noun', notes: 'Kanji 明後日.', exampleJp: 'あさって、友達が来ます。', exampleReading: 'あさって、ともだちがきます。', exampleEn: 'A friend is coming the day after tomorrow.' },
    { front: 'ゆうべ', back: 'last night', pos: 'noun', notes: 'Kanji 夕べ.', exampleJp: 'ゆうべはよく寝ましたか。', exampleReading: 'ゆうべはよくねましたか。', exampleEn: 'Did you sleep well last night?' },
    { front: '誕生日', reading: 'たんじょうび', back: 'birthday', pos: 'noun', exampleJp: '明日は母の誕生日です。', exampleReading: 'あしたはははのたんじょうびです。', exampleEn: "Tomorrow is my mother's birthday." },
    { front: '休み', reading: 'やすみ', back: 'holiday; day off; break', pos: 'noun', exampleJp: '明日は会社が休みです。', exampleReading: 'あしたはかいしゃがやすみです。', exampleEn: 'Tomorrow is a day off work.' },
    { front: '夏休み', reading: 'なつやすみ', back: 'the summer holidays', pos: 'noun', exampleJp: '夏休みに国へ帰ります。', exampleReading: 'なつやすみにくにへかえります。', exampleEn: "I'm going back to my home country for the summer holidays." },
    { front: '昔', reading: 'むかし', back: 'long ago; the old days', pos: 'noun', exampleJp: '昔、ここに大きい木がありました。', exampleReading: 'むかし、ここにおおきいきがありました。', exampleEn: 'Long ago there was a big tree here.' },
    { front: '最初', reading: 'さいしょ', back: 'the first; the beginning', pos: 'noun', exampleJp: '最初は日本語が分かりませんでした。', exampleReading: 'さいしょはにほんごがわかりませんでした。', exampleEn: "At first I didn't understand Japanese." },
    { front: '最後', reading: 'さいご', back: 'the last; the end', pos: 'noun', exampleJp: '最後に部屋の電気を消してください。', exampleReading: 'さいごにへやのでんきをけしてください。', exampleEn: 'Please turn off the room light last.' },
    { front: '今度', reading: 'こんど', back: 'next time; this time', pos: 'noun', exampleJp: '今度、一緒に映画を見ましょう。', exampleReading: 'こんど、いっしょにえいがをみましょう。', exampleEn: "Let's see a movie together next time." },
    { front: 'この間', reading: 'このあいだ', back: 'the other day', pos: 'noun', exampleJp: 'この間、駅で先生に会いました。', exampleReading: 'このあいだ、えきでせんせいにあいました。', exampleEn: 'I ran into my teacher at the station the other day.' },
    { front: '初めて', reading: 'はじめて', back: 'for the first time', pos: 'adverb', notes: 'Related to はじめまして ("we are meeting for the first time"). Not 始めて, the て-form of 始める.', exampleJp: '初めて富士山を見ました。', exampleReading: 'はじめてふじさんをみました。', exampleEn: 'I saw Mount Fuji for the first time.' }
  ]
}

const ADVERBS_TIME: SeedLesson = {
  key: 'n5vocab.adverbs-time',
  kind: 'vocab',
  title: 'Adverbs: already, still, again',
  cards: [
    { front: 'まだ', back: 'still; (with a negative) not yet', pos: 'adverb', exampleJp: '宿題はまだ終わっていません。', exampleReading: 'しゅくだいはまだおわっていません。', exampleEn: "I haven't finished my homework yet." },
    { front: 'もう', back: 'already; (with a negative) no longer', pos: 'adverb', notes: 'もう一度 = once more; もう少し = a little more.', exampleJp: 'もう晩ご飯を食べましたか。', exampleReading: 'もうばんごはんをたべましたか。', exampleEn: 'Have you had dinner yet?' },
    { front: 'すぐ', back: 'right away; soon; close by', pos: 'adverb', exampleJp: 'すぐ行きますから、待ってください。', exampleReading: 'すぐいきますから、まってください。', exampleEn: "I'll be right there, so please wait." },
    { front: 'また', back: 'again; also', pos: 'adverb', exampleJp: 'また明日会いましょう。', exampleReading: 'またあしたあいましょう。', exampleEn: "Let's meet again tomorrow." },
    { front: 'よく', back: 'often; well', pos: 'adverb', notes: 'From いい: よく分かる "understand well"; よく行く "go often".', exampleJp: '父はよくこの店に来ます。', exampleReading: 'ちちはよくこのみせにきます。', exampleEn: 'My father often comes to this shop.' },
    { front: 'だんだん', back: 'gradually; little by little', pos: 'adverb', exampleJp: 'だんだん日本語が上手になりました。', exampleReading: 'だんだんにほんごがじょうずになりました。', exampleEn: 'My Japanese has gradually got better.' },
    { front: 'ちょうど', back: 'exactly; just', pos: 'adverb', exampleJp: '今、ちょうど三時です。', exampleReading: 'いま、ちょうどさんじです。', exampleEn: "It's exactly three o'clock now." },
    { front: 'まず', back: 'first (of all)', pos: 'adverb', exampleJp: 'まず手を洗ってください。', exampleReading: 'まずてをあらってください。', exampleEn: 'First, please wash your hands.' },
    { front: '先に', reading: 'さきに', back: 'ahead; first; before (others)', pos: 'adverb', exampleJp: 'すみません、先に帰ります。', exampleReading: 'すみません、さきにかえります。', exampleEn: "Sorry, I'll head home before you." },
    { front: 'そろそろ', back: "soon; it's about time", pos: 'adverb', exampleJp: 'もう遅いから、そろそろ帰りましょう。', exampleReading: 'もうおそいから、そろそろかえりましょう。', exampleEn: "It's late, so let's head home soon." },
    { front: 'いつか', back: 'someday; sometime', pos: 'adverb', exampleJp: 'いつか富士山に登りたいです。', exampleReading: 'いつかふじさんにのぼりたいです。', exampleEn: 'Someday I want to climb Mount Fuji.' },
    { front: '一緒に', reading: 'いっしょに', back: 'together', pos: 'adverb', notes: 'The other person takes と: 友達と一緒に.', exampleJp: '友達と一緒に昼ご飯を食べました。', exampleReading: 'ともだちといっしょにひるごはんをたべました。', exampleEn: 'I had lunch with a friend.' }
  ]
}

const ADVERBS_DEGREE: SeedLesson = {
  key: 'n5vocab.adverbs-degree',
  kind: 'vocab',
  title: 'Adverbs: how much and how sure',
  cards: [
    { front: 'とても', back: 'very', pos: 'adverb', exampleJp: 'このラーメンはとてもおいしいです。', exampleReading: 'このらーめんはとてもおいしいです。', exampleEn: 'This ramen is very good.' },
    { front: 'たくさん', back: 'a lot; many', pos: 'adverb', exampleJp: '昨日はたくさん歩きました。', exampleReading: 'きのうはたくさんあるきました。', exampleEn: 'I walked a lot yesterday.' },
    { front: 'もっと', back: 'more', pos: 'adverb', exampleJp: 'もっとゆっくり話してください。', exampleReading: 'もっとゆっくりはなしてください。', exampleEn: 'Please speak more slowly.' },
    { front: '少し', reading: 'すこし', back: 'a little; a few', pos: 'adverb', notes: 'ちょっと is the more casual word.', exampleJp: '砂糖を少し入れてください。', exampleReading: 'さとうをすこしいれてください。', exampleEn: 'Please put in a little sugar.' },
    { front: '一番', reading: 'いちばん', back: 'most; best; number one', pos: 'adverb', notes: 'Makes a superlative: 一番好き "like best".', exampleJp: '果物の中でりんごが一番好きです。', exampleReading: 'くだもののなかでりんごがいちばんすきです。', exampleEn: 'Of all fruit, I like apples best.' },
    { front: '全部', reading: 'ぜんぶ', back: 'all; everything', pos: 'noun', exampleJp: 'ケーキを全部食べました。', exampleReading: 'けーきをぜんぶたべました。', exampleEn: 'I ate the whole cake.' },
    { front: 'みんな', back: 'everyone; everything', pos: 'noun', notes: 'みなさん is the polite form for addressing a group.', exampleJp: 'クラスのみんなで写真を撮りました。', exampleReading: 'くらすのみんなでしゃしんをとりました。', exampleEn: 'The whole class took a photo together.' },
    { front: 'たぶん', back: 'probably; perhaps', pos: 'adverb', notes: 'Often with でしょう: たぶん雨でしょう. Kanji 多分.', exampleJp: '明日はたぶん雨でしょう。', exampleReading: 'あしたはたぶんあめでしょう。', exampleEn: 'It will probably rain tomorrow.' },
    { front: 'ほとんど', back: 'almost; (with a negative) hardly', pos: 'adverb', exampleJp: '宿題はほとんど終わりました。', exampleReading: 'しゅくだいはほとんどおわりました。', exampleEn: "I've almost finished my homework." },
    { front: 'だいたい', back: 'roughly; mostly', pos: 'adverb', notes: 'Kanji 大体.', exampleJp: 'この本はだいたい分かりました。', exampleReading: 'このほんはだいたいわかりました。', exampleEn: 'I understood most of this book.' },
    { front: 'なかなか', back: 'quite; (with a negative) not easily', pos: 'adverb', exampleJp: 'バスがなかなか来ません。', exampleReading: 'ばすがなかなかきません。', exampleEn: 'The bus is taking ages to come.' },
    { front: '本当に', reading: 'ほんとうに', back: 'really; truly', pos: 'adverb', exampleJp: '昨日は本当に楽しかったです。', exampleReading: 'きのうはほんとうにたのしかったです。', exampleEn: 'Yesterday was really fun.' }
  ]
}

// Batch 2 (2026-11-17): nouns by topic, then question words, linking words
// and the last everyday adjectives.

const NOUNS_FOOD: SeedLesson = {
  key: 'n5vocab.nouns-food',
  kind: 'vocab',
  title: 'Nouns: food and drink',
  cards: [
    { front: '牛肉', reading: 'ぎゅうにく', back: 'beef', pos: 'noun', exampleJp: '牛肉は少し高いです。', exampleReading: 'ぎゅうにくはすこしたかいです。', exampleEn: 'Beef is a little expensive.' },
    { front: '豚肉', reading: 'ぶたにく', back: 'pork', pos: 'noun', exampleJp: '今晩は豚肉を焼きます。', exampleReading: 'こんばんはぶたにくをやきます。', exampleEn: "I'm grilling pork tonight." },
    { front: '鶏肉', reading: 'とりにく', back: 'chicken (meat)', pos: 'noun', notes: 'The meat; the live bird is 鶏 (にわとり).', exampleJp: '鶏肉と野菜を焼きました。', exampleReading: 'とりにくとやさいをやきました。', exampleEn: 'I grilled chicken and vegetables.' },
    { front: '砂糖', reading: 'さとう', back: 'sugar', pos: 'noun', exampleJp: '紅茶に砂糖を入れません。', exampleReading: 'こうちゃにさとうをいれません。', exampleEn: "I don't put sugar in my tea." },
    { front: '塩', reading: 'しお', back: 'salt', pos: 'noun', exampleJp: '塩を取ってください。', exampleReading: 'しおをとってください。', exampleEn: 'Please pass the salt.' },
    { front: '醤油', reading: 'しょうゆ', back: 'soy sauce', pos: 'noun', notes: 'Often written in kana: しょうゆ.', exampleJp: '魚に醤油をかけました。', exampleReading: 'さかなにしょうゆをかけました。', exampleEn: 'I put soy sauce on the fish.' },
    { front: 'りんご', back: 'apple', pos: 'noun', notes: 'Kanji 林檎, rarely used.', exampleJp: '毎朝りんごを一つ食べます。', exampleReading: 'まいあさりんごをひとつたべます。', exampleEn: 'I eat an apple every morning.' },
    { front: 'みかん', back: 'mandarin orange', pos: 'noun', exampleJp: '冬はみかんがおいしいです。', exampleReading: 'ふゆはみかんがおいしいです。', exampleEn: 'Mandarins are good in winter.' },
    { front: 'バナナ', back: 'banana', pos: 'noun', exampleJp: 'このバナナは甘いです。', exampleReading: 'このばななはあまいです。', exampleEn: 'This banana is sweet.' },
    { front: '紅茶', reading: 'こうちゃ', back: 'black tea', pos: 'noun', notes: 'お茶 on its own usually means green tea.', exampleJp: '朝はいつも紅茶を飲みます。', exampleReading: 'あさはいつもこうちゃをのみます。', exampleEn: 'I always drink tea in the morning.' },
    { front: 'ジュース', back: 'juice; soft drink', pos: 'noun', exampleJp: '子供はジュースが好きです。', exampleReading: 'こどもはじゅーすがすきです。', exampleEn: 'Children like juice.' },
    { front: 'お菓子', reading: 'おかし', back: 'sweets; snacks', pos: 'noun', exampleJp: '母がお菓子を作りました。', exampleReading: 'ははがおかしをつくりました。', exampleEn: 'My mother made some sweets.' },
    { front: 'ケーキ', back: 'cake', pos: 'noun', exampleJp: '誕生日にケーキを食べました。', exampleReading: 'たんじょうびにけーきをたべました。', exampleEn: 'I ate cake on my birthday.' }
  ]
}

const NOUNS_KITCHEN: SeedLesson = {
  key: 'n5vocab.nouns-kitchen',
  kind: 'vocab',
  title: 'Nouns: meals and the kitchen',
  cards: [
    { front: '食べ物', reading: 'たべもの', back: 'food', pos: 'noun', exampleJp: '食べ物と飲み物を買いました。', exampleReading: 'たべものとのみものをかいました。', exampleEn: 'I bought food and drinks.' },
    { front: '飲み物', reading: 'のみもの', back: 'drink; beverage', pos: 'noun', exampleJp: '冷たい飲み物をください。', exampleReading: 'つめたいのみものをください。', exampleEn: 'A cold drink, please.' },
    { front: 'お弁当', reading: 'おべんとう', back: 'boxed lunch; packed lunch', pos: 'noun', exampleJp: '昼はお弁当を食べます。', exampleReading: 'ひるはおべんとうをたべます。', exampleEn: 'At lunchtime I eat a packed lunch.' },
    { front: '食堂', reading: 'しょくどう', back: 'dining hall; canteen; diner', pos: 'noun', exampleJp: '大学の食堂は安いです。', exampleReading: 'だいがくのしょくどうはやすいです。', exampleEn: 'The university canteen is cheap.' },
    { front: '喫茶店', reading: 'きっさてん', back: 'coffee shop; café', pos: 'noun', exampleJp: '駅の前の喫茶店で会いましょう。', exampleReading: 'えきのまえのきっさてんであいましょう。', exampleEn: "Let's meet at the café in front of the station." },
    { front: '台所', reading: 'だいどころ', back: 'kitchen', pos: 'noun', notes: 'キッチン is the loanword.', exampleJp: '母は今、台所にいます。', exampleReading: 'はははいま、だいどころにいます。', exampleEn: 'My mother is in the kitchen.' },
    { front: '冷蔵庫', reading: 'れいぞうこ', back: 'refrigerator; fridge', pos: 'noun', exampleJp: '牛乳は冷蔵庫にあります。', exampleReading: 'ぎゅうにゅうはれいぞうこにあります。', exampleEn: 'The milk is in the fridge.' },
    { front: '箸', reading: 'はし', back: 'chopsticks', pos: 'noun', notes: 'Politely お箸. Same reading as 橋 (bridge).', exampleJp: 'ご飯は箸で食べます。', exampleReading: 'ごはんははしでたべます。', exampleEn: 'I eat rice with chopsticks.' },
    { front: 'お皿', reading: 'おさら', back: 'plate; dish', pos: 'noun', exampleJp: '晩ご飯を食べてから、お皿を洗いました。', exampleReading: 'ばんごはんをたべてから、おさらをあらいました。', exampleEn: 'I washed the plates after dinner.' },
    { front: '茶碗', reading: 'ちゃわん', back: 'rice bowl; teacup', pos: 'noun', exampleJp: '茶碗にご飯を入れます。', exampleReading: 'ちゃわんにごはんをいれます。', exampleEn: 'I put rice in the bowl.' },
    { front: 'コップ', back: 'glass; tumbler', pos: 'noun', notes: 'For cold drinks; a cup with a handle is カップ.', exampleJp: 'コップに水を入れてください。', exampleReading: 'こっぷにみずをいれてください。', exampleEn: 'Please put some water in the glass.' },
    { front: 'スプーン', back: 'spoon', pos: 'noun', exampleJp: 'スプーンでスープを飲みます。', exampleReading: 'すぷーんですーぷをのみます。', exampleEn: 'I eat soup with a spoon.' },
    { front: 'フォーク', back: 'fork', pos: 'noun', exampleJp: 'すみません、フォークはありますか。', exampleReading: 'すみません、ふぉーくはありますか。', exampleEn: 'Excuse me, do you have a fork?' }
  ]
}

const NOUNS_HOUSE: SeedLesson = {
  key: 'n5vocab.nouns-house',
  kind: 'vocab',
  title: 'Nouns: house and furniture',
  cards: [
    { front: '玄関', reading: 'げんかん', back: 'entrance hall (of a home)', pos: 'noun', notes: 'Where shoes come off before stepping up into the house.', exampleJp: '玄関に靴があります。', exampleReading: 'げんかんにくつがあります。', exampleEn: 'There are shoes in the entrance hall.' },
    { front: 'ドア', back: 'door', pos: 'noun', notes: '戸 is a traditional, often sliding, door.', exampleJp: 'ドアを開けてください。', exampleReading: 'どあをあけてください。', exampleEn: 'Please open the door.' },
    { front: '階段', reading: 'かいだん', back: 'stairs; staircase', pos: 'noun', exampleJp: '階段はあちらにあります。', exampleReading: 'かいだんはあちらにあります。', exampleEn: 'The stairs are over there.' },
    { front: '廊下', reading: 'ろうか', back: 'corridor; hallway', pos: 'noun', exampleJp: '学校の廊下は長いです。', exampleReading: 'がっこうのろうかはながいです。', exampleEn: 'The school corridor is long.' },
    { front: 'お風呂', reading: 'おふろ', back: 'bath', pos: 'noun', notes: 'お風呂に入る = to take a bath.', exampleJp: '夜にお風呂に入ります。', exampleReading: 'よるにおふろにはいります。', exampleEn: 'I take a bath at night.' },
    { front: 'シャワー', back: 'shower', pos: 'noun', exampleJp: '朝はシャワーだけです。', exampleReading: 'あさはしゃわーだけです。', exampleEn: 'In the morning I just have a shower.' },
    { front: 'お手洗い', reading: 'おてあらい', back: 'toilet; restroom', pos: 'noun', notes: 'Politer than トイレ.', exampleJp: 'お手洗いを借りてもいいですか。', exampleReading: 'おてあらいをかりてもいいですか。', exampleEn: 'May I use the toilet?' },
    { front: '本棚', reading: 'ほんだな', back: 'bookshelf', pos: 'noun', exampleJp: '本棚に辞書があります。', exampleReading: 'ほんだなにじしょがあります。', exampleEn: 'There is a dictionary on the bookshelf.' },
    { front: 'ベッド', back: 'bed', pos: 'noun', exampleJp: '新しいベッドを買いました。', exampleReading: 'あたらしいべっどをかいました。', exampleEn: 'I bought a new bed.' },
    { front: 'テーブル', back: 'table', pos: 'noun', exampleJp: 'テーブルの上に花があります。', exampleReading: 'てーぶるのうえにはながあります。', exampleEn: 'There are flowers on the table.' },
    { front: '電気', reading: 'でんき', back: 'electricity; (electric) light', pos: 'noun', notes: 'The everyday word for a light: 電気をつける, 電気を消す.', exampleJp: '暗いから、電気をつけます。', exampleReading: 'くらいから、でんきをつけます。', exampleEn: "It's dark, so I'll turn on the light." },
    { front: 'テレビ', back: 'television', pos: 'noun', exampleJp: '夜は家族とテレビを見ます。', exampleReading: 'よるはかぞくとてれびをみます。', exampleEn: 'In the evening I watch TV with my family.' },
    { front: 'ラジオ', back: 'radio', pos: 'noun', exampleJp: '車でラジオを聞きます。', exampleReading: 'くるまでらじおをききます。', exampleEn: 'I listen to the radio in the car.' }
  ]
}

const NOUNS_CLOTHES: SeedLesson = {
  key: 'n5vocab.nouns-clothes',
  kind: 'vocab',
  title: 'Nouns: clothes',
  cards: [
    { front: '洋服', reading: 'ようふく', back: 'clothes (Western-style)', pos: 'noun', notes: 'Contrasts with 着物; 服 is the everyday word.', exampleJp: '新しい洋服を買いたいです。', exampleReading: 'あたらしいようふくをかいたいです。', exampleEn: 'I want to buy some new clothes.' },
    { front: 'シャツ', back: 'shirt', pos: 'noun', exampleJp: '今日は白いシャツを着ています。', exampleReading: 'きょうはしろいしゃつをきています。', exampleEn: "I'm wearing a white shirt today." },
    { front: 'セーター', back: 'sweater; jumper', pos: 'noun', exampleJp: '寒いからセーターを着ます。', exampleReading: 'さむいからせーたーをきます。', exampleEn: "It's cold, so I'll wear a sweater." },
    { front: 'コート', back: 'coat', pos: 'noun', exampleJp: '黒いコートが欲しいです。', exampleReading: 'くろいこーとがほしいです。', exampleEn: 'I want a black coat.' },
    { front: 'ズボン', back: 'trousers; pants', pos: 'noun', notes: 'Worn with 履く.', exampleJp: '新しいズボンを履きました。', exampleReading: 'あたらしいずぼんをはきました。', exampleEn: 'I put on my new trousers.' },
    { front: 'スカート', back: 'skirt', pos: 'noun', exampleJp: '姉は長いスカートが好きです。', exampleReading: 'あねはながいすかーとがすきです。', exampleEn: 'My older sister likes long skirts.' },
    { front: '靴下', reading: 'くつした', back: 'socks', pos: 'noun', exampleJp: '赤い靴下を履いています。', exampleReading: 'あかいくつしたをはいています。', exampleEn: "I'm wearing red socks." },
    { front: '帽子', reading: 'ぼうし', back: 'hat; cap', pos: 'noun', exampleJp: '父の帽子は大きいです。', exampleReading: 'ちちのぼうしはおおきいです。', exampleEn: "My father's hat is big." },
    { front: '眼鏡', reading: 'めがね', back: 'glasses; spectacles', pos: 'noun', notes: 'Often written めがね; worn with かける.', exampleJp: '兄は眼鏡をかけています。', exampleReading: 'あにはめがねをかけています。', exampleEn: 'My older brother wears glasses.' },
    { front: 'ネクタイ', back: 'necktie', pos: 'noun', exampleJp: '青いネクタイを締めました。', exampleReading: 'あおいねくたいをしめました。', exampleEn: 'I put on a blue tie.' },
    { front: '背広', reading: 'せびろ', back: "suit (men's business suit)", pos: 'noun', notes: 'An older word; スーツ is more common today.', exampleJp: '父は毎日背広を着ます。', exampleReading: 'ちちはまいにちせびろをきます。', exampleEn: 'My father wears a suit every day.' },
    { front: '着物', reading: 'きもの', back: 'kimono', pos: 'noun', exampleJp: 'この着物はとても高いです。', exampleReading: 'このきものはとてもたかいです。', exampleEn: 'This kimono is very expensive.' },
    { front: 'ハンカチ', back: 'handkerchief', pos: 'noun', exampleJp: '今朝ハンカチを忘れました。', exampleReading: 'けさはんかちをわすれました。', exampleEn: 'I forgot my handkerchief this morning.' }
  ]
}

const NOUNS_BODY: SeedLesson = {
  key: 'n5vocab.nouns-body',
  kind: 'vocab',
  title: 'Nouns: body and health',
  cards: [
    { front: '鼻', reading: 'はな', back: 'nose', pos: 'noun', notes: 'Same reading as 花 (flower).', exampleJp: '今日は鼻が痛いです。', exampleReading: 'きょうははながいたいです。', exampleEn: 'My nose hurts today.' },
    { front: '歯', reading: 'は', back: 'tooth; teeth', pos: 'noun', exampleJp: '毎晩寝る前に歯を磨きます。', exampleReading: 'まいばんねるまえにはをみがきます。', exampleEn: 'I brush my teeth every night before bed.' },
    { front: 'お腹', reading: 'おなか', back: 'stomach; belly', pos: 'noun', notes: 'お腹が空く = to get hungry; お腹が痛い = to have a stomach ache.', exampleJp: 'もうお腹がいっぱいです。', exampleReading: 'もうおなかがいっぱいです。', exampleEn: "I'm already full." },
    { front: '喉', reading: 'のど', back: 'throat', pos: 'noun', notes: 'Often written のど. 喉が渇く = to be thirsty.', exampleJp: '喉が痛いから、薬を飲みます。', exampleReading: 'のどがいたいから、くすりをのみます。', exampleEn: 'My throat hurts, so I will take some medicine.' },
    { front: '背中', reading: 'せなか', back: 'back (of the body)', pos: 'noun', exampleJp: '背中が少し痛いです。', exampleReading: 'せなかがすこしいたいです。', exampleEn: 'My back hurts a little.' },
    { front: '胸', reading: 'むね', back: 'chest; breast', pos: 'noun', exampleJp: '走ってから、胸が痛くなりました。', exampleReading: 'はしってから、むねがいたくなりました。', exampleEn: 'My chest started hurting after I ran.' },
    { front: '病気', reading: 'びょうき', back: 'illness; sickness', pos: 'noun', exampleJp: '祖父は病気で寝ています。', exampleReading: 'そふはびょうきでねています。', exampleEn: 'My grandfather is ill in bed.' },
    { front: '風邪', reading: 'かぜ', back: 'a cold', pos: 'noun', notes: '風邪をひく = to catch a cold. Same reading as 風 (wind).', exampleJp: '風邪をひいて学校を休みました。', exampleReading: 'かぜをひいてがっこうをやすみました。', exampleEn: 'I caught a cold and stayed off school.' },
    { front: '医者', reading: 'いしゃ', back: 'doctor', pos: 'noun', notes: 'A doctor is addressed as 先生; お医者さん is politer.', exampleJp: '昨日、医者に行きました。', exampleReading: 'きのう、いしゃにいきました。', exampleEn: 'I went to the doctor yesterday.' },
    { front: '歯医者', reading: 'はいしゃ', back: 'dentist', pos: 'noun', exampleJp: '歯が痛いから歯医者に行きます。', exampleReading: 'はがいたいからはいしゃにいきます。', exampleEn: "I have toothache, so I'm going to the dentist." },
    { front: '看護師', reading: 'かんごし', back: 'nurse', pos: 'noun', exampleJp: '姉は病院の看護師です。', exampleReading: 'あねはびょういんのかんごしです。', exampleEn: 'My older sister is a hospital nurse.' },
    { front: '入院', reading: 'にゅういん', back: 'hospital stay; being admitted to hospital', pos: 'noun (suru-verb)', notes: '入院する = to go into hospital; leaving is 退院.', exampleJp: '父は先週入院しました。', exampleReading: 'ちちはせんしゅうにゅういんしました。', exampleEn: 'My father went into hospital last week.' },
    { front: '注射', reading: 'ちゅうしゃ', back: 'injection; shot', pos: 'noun (suru-verb)', notes: 'Same reading as 駐車 (parking).', exampleJp: '注射はあまり好きじゃないです。', exampleReading: 'ちゅうしゃはあまりすきじゃないです。', exampleEn: "I don't really like injections." }
  ]
}

const NOUNS_FAMILY: SeedLesson = {
  key: 'n5vocab.nouns-family',
  kind: 'vocab',
  title: 'Nouns: family',
  cards: [
    { front: 'お兄さん', reading: 'おにいさん', back: 'older brother (polite)', pos: 'noun', notes: "For someone else's older brother, or to address your own; to others, your own is 兄.", exampleJp: 'お兄さんは大学生ですか。', exampleReading: 'おにいさんはだいがくせいですか。', exampleEn: 'Is your older brother a university student?' },
    { front: 'お姉さん', reading: 'おねえさん', back: 'older sister (polite)', pos: 'noun', notes: "For someone else's older sister, or to address your own; to others, your own is 姉.", exampleJp: 'お姉さんはどこに住んでいますか。', exampleReading: 'おねえさんはどこにすんでいますか。', exampleEn: 'Where does your older sister live?' },
    { front: '兄弟', reading: 'きょうだい', back: 'siblings; brothers', pos: 'noun', notes: 'Asking 兄弟はいますか covers sisters too.', exampleJp: '兄弟はみんな東京にいます。', exampleReading: 'きょうだいはみんなとうきょうにいます。', exampleEn: 'All my siblings are in Tokyo.' },
    { front: '両親', reading: 'りょうしん', back: '(my) parents', pos: 'noun', notes: "Someone else's parents are ご両親.", exampleJp: '両親は大阪に住んでいます。', exampleReading: 'りょうしんはおおさかにすんでいます。', exampleEn: 'My parents live in Osaka.' },
    { front: '祖父', reading: 'そふ', back: '(my) grandfather', pos: 'noun', notes: "Plain, for your own; someone else's is おじいさん.", exampleJp: '祖父は毎朝散歩します。', exampleReading: 'そふはまいあささんぽします。', exampleEn: 'My grandfather goes for a walk every morning.' },
    { front: '祖母', reading: 'そぼ', back: '(my) grandmother', pos: 'noun', notes: "Plain, for your own; someone else's is おばあさん.", exampleJp: '祖母は料理が上手です。', exampleReading: 'そぼはりょうりがじょうずです。', exampleEn: 'My grandmother is a good cook.' },
    { front: 'おじいさん', back: 'grandfather (polite); old man', pos: 'noun', notes: 'Also any elderly man. Not おじさん (uncle), which has no long い.', exampleJp: '公園におじいさんがいます。', exampleReading: 'こうえんにおじいさんがいます。', exampleEn: 'There is an old man in the park.' },
    { front: 'おばあさん', back: 'grandmother (polite); old woman', pos: 'noun', notes: 'Also any elderly woman. Not おばさん (aunt), which has no long あ.', exampleJp: 'あのおばあさんはとても元気です。', exampleReading: 'あのおばあさんはとてもげんきです。', exampleEn: 'That old woman is very lively.' },
    { front: 'おじさん', back: 'uncle; middle-aged man', pos: 'noun', notes: 'Kanji 伯父 or 叔父 for an uncle.', exampleJp: 'おじさんは銀行員です。', exampleReading: 'おじさんはぎんこういんです。', exampleEn: 'My uncle works at a bank.' },
    { front: 'おばさん', back: 'aunt; middle-aged woman', pos: 'noun', notes: 'Kanji 伯母 or 叔母 for an aunt.', exampleJp: 'おばさんから手紙が来ました。', exampleReading: 'おばさんからてがみがきました。', exampleEn: 'A letter came from my aunt.' },
    { front: '奥さん', reading: 'おくさん', back: "(someone else's) wife", pos: 'noun', notes: 'Your own wife, to others, is 妻 or 家内.', exampleJp: '奥さんはお元気ですか。', exampleReading: 'おくさんはおげんきですか。', exampleEn: 'How is your wife?' },
    { front: '主人', reading: 'しゅじん', back: '(my) husband', pos: 'noun', notes: "Your own husband: 主人 or 夫; someone else's: ご主人.", exampleJp: '主人は東京の会社員です。', exampleReading: 'しゅじんはとうきょうのかいしゃいんです。', exampleEn: 'My husband is an office worker in Tokyo.' },
    { front: '赤ちゃん', reading: 'あかちゃん', back: 'baby', pos: 'noun', exampleJp: '赤ちゃんが静かに寝ています。', exampleReading: 'あかちゃんがしずかにねています。', exampleEn: 'The baby is sleeping quietly.' }
  ]
}

const NOUNS_SCHOOL: SeedLesson = {
  key: 'n5vocab.nouns-school',
  kind: 'vocab',
  title: 'Nouns: school',
  cards: [
    { front: '大学', reading: 'だいがく', back: 'university; college', pos: 'noun', exampleJp: '兄は東京の大学に行っています。', exampleReading: 'あにはとうきょうのだいがくにいっています。', exampleEn: 'My older brother goes to university in Tokyo.' },
    { front: '大学生', reading: 'だいがくせい', back: 'university student', pos: 'noun', exampleJp: '姉は来年大学生になります。', exampleReading: 'あねはらいねんだいがくせいになります。', exampleEn: 'My older sister starts university next year.' },
    { front: '生徒', reading: 'せいと', back: 'pupil; school student', pos: 'noun', notes: 'For school pupils; university students are 学生.', exampleJp: 'このクラスには生徒が多いです。', exampleReading: 'このくらすにはせいとがおおいです。', exampleEn: 'There are a lot of pupils in this class.' },
    { front: '留学生', reading: 'りゅうがくせい', back: 'international student', pos: 'noun', exampleJp: '私のクラスに留学生がいます。', exampleReading: 'わたしのくらすにりゅうがくせいがいます。', exampleEn: 'There is an international student in my class.' },
    { front: '教室', reading: 'きょうしつ', back: 'classroom', pos: 'noun', exampleJp: '教室はとても静かです。', exampleReading: 'きょうしつはとてもしずかです。', exampleEn: 'The classroom is very quiet.' },
    { front: 'クラス', back: 'class (a group of students)', pos: 'noun', exampleJp: 'クラスに友達がたくさんいます。', exampleReading: 'くらすにともだちがたくさんいます。', exampleEn: 'I have lots of friends in my class.' },
    { front: '授業', reading: 'じゅぎょう', back: 'lesson; class (teaching)', pos: 'noun', exampleJp: '今日の授業は楽しかったです。', exampleReading: 'きょうのじゅぎょうはたのしかったです。', exampleEn: "Today's lesson was fun." },
    { front: '宿題', reading: 'しゅくだい', back: 'homework', pos: 'noun', exampleJp: '今日は宿題がたくさんあります。', exampleReading: 'きょうはしゅくだいがたくさんあります。', exampleEn: 'I have a lot of homework today.' },
    { front: '試験', reading: 'しけん', back: 'exam', pos: 'noun', exampleJp: '明日、漢字の試験があります。', exampleReading: 'あした、かんじのしけんがあります。', exampleEn: "There's a kanji exam tomorrow." },
    { front: 'テスト', back: 'test; quiz', pos: 'noun', exampleJp: 'テストは難しくなかったです。', exampleReading: 'てすとはむずかしくなかったです。', exampleEn: "The test wasn't difficult." },
    { front: '問題', reading: 'もんだい', back: 'question (on a test); problem', pos: 'noun', notes: 'Also "problem": 問題ありません "no problem".', exampleJp: 'この問題は簡単です。', exampleReading: 'このもんだいはかんたんです。', exampleEn: 'This question is easy.' },
    { front: '答え', reading: 'こたえ', back: 'answer', pos: 'noun', notes: 'The noun of 答える (to answer).', exampleJp: '答えを紙に書いてください。', exampleReading: 'こたえをかみにかいてください。', exampleEn: 'Please write your answer on the paper.' },
    { front: '作文', reading: 'さくぶん', back: 'essay; composition', pos: 'noun', exampleJp: '日本語で作文を書きました。', exampleReading: 'にほんごでさくぶんをかきました。', exampleEn: 'I wrote an essay in Japanese.' }
  ]
}

const NOUNS_STUDY: SeedLesson = {
  key: 'n5vocab.nouns-study',
  kind: 'vocab',
  title: 'Nouns: study and writing',
  cards: [
    { front: '辞書', reading: 'じしょ', back: 'dictionary', pos: 'noun', exampleJp: '辞書を借りてもいいですか。', exampleReading: 'じしょをかりてもいいですか。', exampleEn: 'May I borrow your dictionary?' },
    { front: '鉛筆', reading: 'えんぴつ', back: 'pencil', pos: 'noun', exampleJp: '鉛筆で名前を書きます。', exampleReading: 'えんぴつでなまえをかきます。', exampleEn: 'I write my name in pencil.' },
    { front: 'ボールペン', back: 'ballpoint pen', pos: 'noun', exampleJp: 'ボールペンで書いてください。', exampleReading: 'ぼーるぺんでかいてください。', exampleEn: 'Please write in ballpoint pen.' },
    { front: 'ノート', back: 'notebook', pos: 'noun', notes: 'A notebook, not a short message (メモ).', exampleJp: 'このノートは誰のですか。', exampleReading: 'こののーとはだれのですか。', exampleEn: 'Whose notebook is this?' },
    { front: '消しゴム', reading: 'けしゴム', back: 'eraser; rubber', pos: 'noun', exampleJp: '消しゴムを貸してください。', exampleReading: 'けしごむをかしてください。', exampleEn: 'Please lend me an eraser.' },
    { front: '黒板', reading: 'こくばん', back: 'blackboard', pos: 'noun', exampleJp: '先生が黒板に字を書きました。', exampleReading: 'せんせいがこくばんにじをかきました。', exampleEn: 'The teacher wrote on the blackboard.' },
    { front: '漢字', reading: 'かんじ', back: 'kanji; Chinese characters', pos: 'noun', exampleJp: '漢字は難しいですが、面白いです。', exampleReading: 'かんじはむずかしいですが、おもしろいです。', exampleEn: 'Kanji are difficult, but interesting.' },
    { front: '平仮名', reading: 'ひらがな', back: 'hiragana', pos: 'noun', notes: 'Usually written ひらがな.', exampleJp: '平仮名で名前を書きました。', exampleReading: 'ひらがなでなまえをかきました。', exampleEn: 'I wrote my name in hiragana.' },
    { front: '片仮名', reading: 'かたかな', back: 'katakana', pos: 'noun', notes: 'Usually written カタカナ; used for loanwords and foreign names.', exampleJp: '外国の名前は片仮名で書きます。', exampleReading: 'がいこくのなまえはかたかなでかきます。', exampleEn: 'Foreign names are written in katakana.' },
    { front: '言葉', reading: 'ことば', back: 'word; language', pos: 'noun', exampleJp: '新しい言葉を毎日覚えます。', exampleReading: 'あたらしいことばをまいにちおぼえます。', exampleEn: 'I learn new words every day.' },
    { front: '意味', reading: 'いみ', back: 'meaning', pos: 'noun', exampleJp: 'その言葉はどういう意味ですか。', exampleReading: 'そのことばはどういういみですか。', exampleEn: 'What does that word mean?' },
    { front: '文章', reading: 'ぶんしょう', back: 'text; piece of writing', pos: 'noun', exampleJp: 'この文章は短いです。', exampleReading: 'このぶんしょうはみじかいです。', exampleEn: 'This text is short.' }
  ]
}

const NOUNS_COUNTRIES: SeedLesson = {
  key: 'n5vocab.nouns-countries',
  kind: 'vocab',
  title: 'Nouns: countries and languages',
  cards: [
    { front: '外国', reading: 'がいこく', back: 'foreign country; abroad', pos: 'noun', notes: 'A foreigner is 外国人.', exampleJp: '来年、外国に行きたいです。', exampleReading: 'らいねん、がいこくにいきたいです。', exampleEn: 'I want to go abroad next year.' },
    { front: '日本', reading: 'にほん', back: 'Japan', pos: 'noun', notes: 'Also read にっぽん, as on stamps and banknotes.', exampleJp: '日本の夏は暑いです。', exampleReading: 'にほんのなつはあついです。', exampleEn: 'Summer in Japan is hot.' },
    { front: '日本語', reading: 'にほんご', back: 'Japanese (language)', pos: 'noun', notes: 'A language is the country + 語.', exampleJp: '毎日日本語を勉強しています。', exampleReading: 'まいにちにほんごをべんきょうしています。', exampleEn: "I'm studying Japanese every day." },
    { front: '英語', reading: 'えいご', back: 'English (language)', pos: 'noun', exampleJp: '英語の先生はアメリカ人です。', exampleReading: 'えいごのせんせいはあめりかじんです。', exampleEn: 'The English teacher is American.' },
    { front: '中国', reading: 'ちゅうごく', back: 'China', pos: 'noun', exampleJp: '中国はとても大きい国です。', exampleReading: 'ちゅうごくはとてもおおきいくにです。', exampleEn: 'China is a very big country.' },
    { front: '中国語', reading: 'ちゅうごくご', back: 'Chinese (language)', pos: 'noun', exampleJp: '友達は中国語が上手です。', exampleReading: 'ともだちはちゅうごくごがじょうずです。', exampleEn: 'My friend speaks good Chinese.' },
    { front: '韓国', reading: 'かんこく', back: 'South Korea', pos: 'noun', exampleJp: '夏休みに韓国へ行きました。', exampleReading: 'なつやすみにかんこくへいきました。', exampleEn: 'I went to Korea in the summer holidays.' },
    { front: '韓国語', reading: 'かんこくご', back: 'Korean (language)', pos: 'noun', exampleJp: '韓国語の歌が好きです。', exampleReading: 'かんこくごのうたがすきです。', exampleEn: 'I like songs in Korean.' },
    { front: 'アメリカ', back: 'America; the United States', pos: 'noun', notes: 'Country names are katakana; a person from there is アメリカ人.', exampleJp: 'アメリカから友達が来ました。', exampleReading: 'あめりかからともだちがきました。', exampleEn: 'A friend came from America.' },
    { front: 'イギリス', back: 'the United Kingdom; Britain', pos: 'noun', exampleJp: 'イギリスの紅茶はおいしいです。', exampleReading: 'いぎりすのこうちゃはおいしいです。', exampleEn: 'British tea is good.' },
    { front: 'フランス', back: 'France', pos: 'noun', exampleJp: 'フランスでおいしいパンを食べました。', exampleReading: 'ふらんすでおいしいぱんをたべました。', exampleEn: 'I ate delicious bread in France.' },
    { front: 'ドイツ', back: 'Germany', pos: 'noun', exampleJp: 'ドイツの車は高いです。', exampleReading: 'どいつのくるまはたかいです。', exampleEn: 'German cars are expensive.' }
  ]
}

const NOUNS_WORK: SeedLesson = {
  key: 'n5vocab.nouns-work',
  kind: 'vocab',
  title: 'Nouns: work and jobs',
  cards: [
    { front: '仕事', reading: 'しごと', back: 'work; job', pos: 'noun', exampleJp: '今日は仕事が忙しいです。', exampleReading: 'きょうはしごとがいそがしいです。', exampleEn: "I'm busy at work today." },
    { front: '会社', reading: 'かいしゃ', back: 'company; office', pos: 'noun', exampleJp: '父の会社は駅の近くです。', exampleReading: 'ちちのかいしゃはえきのちかくです。', exampleEn: "My father's company is near the station." },
    { front: '会社員', reading: 'かいしゃいん', back: 'office worker; company employee', pos: 'noun', exampleJp: '兄は東京で会社員をしています。', exampleReading: 'あにはとうきょうでかいしゃいんをしています。', exampleEn: 'My older brother is an office worker in Tokyo.' },
    { front: '社員', reading: 'しゃいん', back: 'employee; member of staff', pos: 'noun', exampleJp: 'この会社には社員が多いです。', exampleReading: 'このかいしゃにはしゃいんがおおいです。', exampleEn: 'This company has a lot of employees.' },
    { front: '社長', reading: 'しゃちょう', back: 'company president', pos: 'noun', exampleJp: '社長は毎朝早く来ます。', exampleReading: 'しゃちょうはまいあさはやくきます。', exampleEn: 'The company president comes in early every morning.' },
    { front: '店員', reading: 'てんいん', back: 'shop assistant; clerk', pos: 'noun', exampleJp: 'この店の店員は親切です。', exampleReading: 'このみせのてんいんはしんせつです。', exampleEn: 'The staff at this shop are kind.' },
    { front: '銀行員', reading: 'ぎんこういん', back: 'bank employee', pos: 'noun', exampleJp: '姉は銀行員になりたいです。', exampleReading: 'あねはぎんこういんになりたいです。', exampleEn: 'My older sister wants to work at a bank.' },
    { front: '警官', reading: 'けいかん', back: 'police officer', pos: 'noun', notes: 'Everyday speech says お巡りさん.', exampleJp: '駅の前に警官がいます。', exampleReading: 'えきのまえにけいかんがいます。', exampleEn: 'There is a police officer in front of the station.' },
    { front: 'お巡りさん', reading: 'おまわりさん', back: 'police officer (friendly)', pos: 'noun', notes: 'The friendly everyday word; a 交番 is the police box where they work.', exampleJp: 'お巡りさんに道を聞きました。', exampleReading: 'おまわりさんにみちをききました。', exampleEn: 'I asked a police officer the way.' },
    { front: '運転手', reading: 'うんてんしゅ', back: 'driver (as a job)', pos: 'noun', exampleJp: 'タクシーの運転手は親切でした。', exampleReading: 'たくしーのうんてんしゅはしんせつでした。', exampleEn: 'The taxi driver was kind.' },
    { front: '歌手', reading: 'かしゅ', back: 'singer', pos: 'noun', exampleJp: 'あの歌手の歌が大好きです。', exampleReading: 'あのかしゅのうたがだいすきです。', exampleEn: "I love that singer's songs." },
    { front: '事務所', reading: 'じむしょ', back: 'office', pos: 'noun', exampleJp: '事務所に電話してください。', exampleReading: 'じむしょにでんわしてください。', exampleEn: 'Please call the office.' }
  ]
}

const NOUNS_TOWN: SeedLesson = {
  key: 'n5vocab.nouns-town',
  kind: 'vocab',
  title: 'Nouns: town, shops and buildings',
  cards: [
    { front: '郵便局', reading: 'ゆうびんきょく', back: 'post office', pos: 'noun', exampleJp: '郵便局は駅の隣にあります。', exampleReading: 'ゆうびんきょくはえきのとなりにあります。', exampleEn: 'The post office is next to the station.' },
    { front: '映画館', reading: 'えいがかん', back: 'cinema; movie theater', pos: 'noun', exampleJp: '週末に映画館へ行きました。', exampleReading: 'しゅうまつにえいがかんへいきました。', exampleEn: 'I went to the cinema at the weekend.' },
    { front: '大使館', reading: 'たいしかん', back: 'embassy', pos: 'noun', exampleJp: '大使館は駅から遠いです。', exampleReading: 'たいしかんはえきからとおいです。', exampleEn: 'The embassy is far from the station.' },
    { front: '交番', reading: 'こうばん', back: 'police box', pos: 'noun', notes: 'A small neighbourhood police post, a good place to ask the way.', exampleJp: '交番で道を聞きましょう。', exampleReading: 'こうばんでみちをききましょう。', exampleEn: "Let's ask the way at the police box." },
    { front: '動物園', reading: 'どうぶつえん', back: 'zoo', pos: 'noun', exampleJp: '日曜日に動物園へ行きました。', exampleReading: 'にちようびにどうぶつえんへいきました。', exampleEn: 'I went to the zoo on Sunday.' },
    { front: '建物', reading: 'たてもの', back: 'building', pos: 'noun', exampleJp: 'あの白い建物は病院です。', exampleReading: 'あのしろいたてものはびょういんです。', exampleEn: 'That white building is a hospital.' },
    { front: '本屋', reading: 'ほんや', back: 'bookshop', pos: 'noun', notes: '-屋 marks a shop, and informally its owner.', exampleJp: '本屋で雑誌を買いました。', exampleReading: 'ほんやでざっしをかいました。', exampleEn: 'I bought a magazine at the bookshop.' },
    { front: '八百屋', reading: 'やおや', back: 'greengrocer', pos: 'noun', exampleJp: '八百屋で野菜を買います。', exampleReading: 'やおやでやさいをかいます。', exampleEn: 'I buy vegetables at the greengrocer.' },
    { front: '肉屋', reading: 'にくや', back: 'butcher', pos: 'noun', exampleJp: '肉屋で牛肉を買いました。', exampleReading: 'にくやでぎゅうにくをかいました。', exampleEn: 'I bought beef at the butcher.' },
    { front: 'パン屋', reading: 'パンや', back: 'bakery', pos: 'noun', exampleJp: '駅の近くにパン屋があります。', exampleReading: 'えきのちかくにぱんやがあります。', exampleEn: "There's a bakery near the station." },
    { front: '花屋', reading: 'はなや', back: 'florist', pos: 'noun', exampleJp: '花屋で母に花を買いました。', exampleReading: 'はなやでははにはなをかいました。', exampleEn: 'I bought flowers for my mother at the florist.' },
    { front: 'デパート', back: 'department store', pos: 'noun', exampleJp: 'デパートで靴を買いました。', exampleReading: 'でぱーとでくつをかいました。', exampleEn: 'I bought shoes at the department store.' },
    { front: 'スーパー', back: 'supermarket', pos: 'noun', notes: 'Short for スーパーマーケット.', exampleJp: 'スーパーで卵を買いました。', exampleReading: 'すーぱーでたまごをかいました。', exampleEn: 'I bought eggs at the supermarket.' }
  ]
}

const NOUNS_TRANSPORT: SeedLesson = {
  key: 'n5vocab.nouns-transport',
  kind: 'vocab',
  title: 'Nouns: transport',
  cards: [
    { front: '地下鉄', reading: 'ちかてつ', back: 'subway; underground', pos: 'noun', exampleJp: '地下鉄で会社に行きます。', exampleReading: 'ちかてつでかいしゃにいきます。', exampleEn: 'I go to work by subway.' },
    { front: 'バス', back: 'bus', pos: 'noun', exampleJp: 'このバスは駅まで行きますか。', exampleReading: 'このばすはえきまでいきますか。', exampleEn: 'Does this bus go to the station?' },
    { front: 'タクシー', back: 'taxi', pos: 'noun', exampleJp: '雨だからタクシーで帰りましょう。', exampleReading: 'あめだからたくしーでかえりましょう。', exampleEn: "It's raining, so let's take a taxi home." },
    { front: '飛行機', reading: 'ひこうき', back: 'aeroplane; airplane', pos: 'noun', exampleJp: '飛行機で北海道へ行きました。', exampleReading: 'ひこうきでほっかいどうへいきました。', exampleEn: 'I flew to Hokkaido.' },
    { front: '船', reading: 'ふね', back: 'ship; boat', pos: 'noun', exampleJp: '船で小さい島に行きました。', exampleReading: 'ふねでちいさいしまにいきました。', exampleEn: 'I went to a small island by boat.' },
    { front: '自動車', reading: 'じどうしゃ', back: 'car; automobile', pos: 'noun', notes: 'Formal; 車 is the everyday word.', exampleJp: 'この町には自動車の会社があります。', exampleReading: 'このまちにはじどうしゃのかいしゃがあります。', exampleEn: 'There is a car company in this town.' },
    { front: 'オートバイ', back: 'motorbike', pos: 'noun', notes: 'バイク is the more common word today.', exampleJp: '兄はオートバイが好きです。', exampleReading: 'あにはおーとばいがすきです。', exampleEn: 'My older brother likes motorbikes.' },
    { front: '新幹線', reading: 'しんかんせん', back: 'Shinkansen; bullet train', pos: 'noun', exampleJp: '新幹線で大阪へ行きます。', exampleReading: 'しんかんせんでおおさかへいきます。', exampleEn: "I'm going to Osaka by bullet train." },
    { front: '切符', reading: 'きっぷ', back: 'ticket (for a train or bus)', pos: 'noun', exampleJp: '駅で切符を買いました。', exampleReading: 'えきできっぷをかいました。', exampleEn: 'I bought a ticket at the station.' },
    { front: '空港', reading: 'くうこう', back: 'airport', pos: 'noun', exampleJp: '空港までバスで行きます。', exampleReading: 'くうこうまでばすでいきます。', exampleEn: 'I go to the airport by bus.' },
    { front: '港', reading: 'みなと', back: 'harbour; port', pos: 'noun', exampleJp: '港に大きい船があります。', exampleReading: 'みなとにおおきいふねがあります。', exampleEn: "There's a big ship in the harbour." },
    { front: '道路', reading: 'どうろ', back: 'road (for traffic)', pos: 'noun', notes: '道 is the everyday word for a road or way.', exampleJp: 'この道路はいつも車が多いです。', exampleReading: 'このどうろはいつもくるまがおおいです。', exampleEn: 'This road always has a lot of cars.' }
  ]
}

const NOUNS_NATURE: SeedLesson = {
  key: 'n5vocab.nouns-nature',
  kind: 'vocab',
  title: 'Nouns: nature and weather',
  cards: [
    { front: '雲', reading: 'くも', back: 'cloud', pos: 'noun', exampleJp: '空に白い雲があります。', exampleReading: 'そらにしろいくもがあります。', exampleEn: 'There are white clouds in the sky.' },
    { front: '晴れ', reading: 'はれ', back: 'fine weather; sunny', pos: 'noun', notes: 'The noun of 晴れる (to clear up).', exampleJp: '明日はたぶん晴れでしょう。', exampleReading: 'あしたはたぶんはれでしょう。', exampleEn: 'It will probably be sunny tomorrow.' },
    { front: '曇り', reading: 'くもり', back: 'cloudy weather', pos: 'noun', notes: 'The noun of 曇る (to cloud over).', exampleJp: '今朝は曇りでしたが、午後は晴れました。', exampleReading: 'けさはくもりでしたが、ごごははれました。', exampleEn: 'It was cloudy this morning, but it cleared up in the afternoon.' },
    { front: '台風', reading: 'たいふう', back: 'typhoon', pos: 'noun', exampleJp: '台風で電車が止まりました。', exampleReading: 'たいふうででんしゃがとまりました。', exampleEn: 'The trains stopped because of the typhoon.' },
    { front: '天気予報', reading: 'てんきよほう', back: 'weather forecast', pos: 'noun', exampleJp: '天気予報を見てから出かけます。', exampleReading: 'てんきよほうをみてからでかけます。', exampleEn: 'I check the weather forecast before I go out.' },
    { front: '太陽', reading: 'たいよう', back: 'the sun', pos: 'noun', exampleJp: '夏は太陽が強いです。', exampleReading: 'なつはたいようがつよいです。', exampleEn: 'The sun is strong in summer.' },
    { front: '空気', reading: 'くうき', back: 'air', pos: 'noun', exampleJp: '山の空気はきれいです。', exampleReading: 'やまのくうきはきれいです。', exampleEn: 'The mountain air is clean.' },
    { front: '景色', reading: 'けしき', back: 'scenery; view', pos: 'noun', exampleJp: 'ここから景色がよく見えます。', exampleReading: 'ここからけしきがよくみえます。', exampleEn: 'You get a good view from here.' },
    { front: '季節', reading: 'きせつ', back: 'season', pos: 'noun', exampleJp: '一番好きな季節は秋です。', exampleReading: 'いちばんすきなきせつはあきです。', exampleEn: 'My favourite season is autumn.' },
    { front: '植物', reading: 'しょくぶつ', back: 'plant', pos: 'noun', exampleJp: '部屋に植物を置きました。', exampleReading: 'へやにしょくぶつをおきました。', exampleEn: 'I put a plant in my room.' },
    { front: '湖', reading: 'みずうみ', back: 'lake', pos: 'noun', exampleJp: '夏に湖で泳ぎました。', exampleReading: 'なつにみずうみでおよぎました。', exampleEn: 'I swam in a lake in the summer.' },
    { front: '地震', reading: 'じしん', back: 'earthquake', pos: 'noun', exampleJp: '昨日の夜、地震がありました。', exampleReading: 'きのうのよる、じしんがありました。', exampleEn: 'There was an earthquake last night.' }
  ]
}

const NOUNS_ANIMALS: SeedLesson = {
  key: 'n5vocab.nouns-animals',
  kind: 'vocab',
  title: 'Nouns: animals',
  cards: [
    { front: '動物', reading: 'どうぶつ', back: 'animal', pos: 'noun', exampleJp: '妹は動物がとても好きです。', exampleReading: 'いもうとはどうぶつがとてもすきです。', exampleEn: 'My younger sister really loves animals.' },
    { front: 'ペット', back: 'pet', pos: 'noun', exampleJp: 'このアパートはペットがだめです。', exampleReading: 'このあぱーとはぺっとがだめです。', exampleEn: 'Pets are not allowed in this apartment.' },
    { front: '猫', reading: 'ねこ', back: 'cat', pos: 'noun', exampleJp: '猫がベッドの上で寝ています。', exampleReading: 'ねこがべっどのうえでねています。', exampleEn: 'The cat is sleeping on the bed.' },
    { front: '豚', reading: 'ぶた', back: 'pig', pos: 'noun', notes: 'Its meat is 豚肉.', exampleJp: '豚はとても頭がいいです。', exampleReading: 'ぶたはとてもあたまがいいです。', exampleEn: 'Pigs are very clever.' },
    { front: '鶏', reading: 'にわとり', back: 'chicken (the bird)', pos: 'noun', notes: 'Its meat is 鶏肉 (とりにく).', exampleJp: '祖父は鶏を飼っています。', exampleReading: 'そふはにわとりをかっています。', exampleEn: 'My grandfather keeps chickens.' },
    { front: '猿', reading: 'さる', back: 'monkey', pos: 'noun', exampleJp: '山に猿がたくさんいます。', exampleReading: 'やまにさるがたくさんいます。', exampleEn: 'There are lots of monkeys in the mountains.' },
    { front: '熊', reading: 'くま', back: 'bear', pos: 'noun', exampleJp: 'この森には熊がいますよ。', exampleReading: 'このもりにはくまがいますよ。', exampleEn: 'There are bears in this forest.' },
    { front: '虎', reading: 'とら', back: 'tiger', pos: 'noun', exampleJp: '動物園で虎を見ました。', exampleReading: 'どうぶつえんでとらをみました。', exampleEn: 'I saw a tiger at the zoo.' },
    { front: 'うさぎ', back: 'rabbit', pos: 'noun', notes: 'Kanji 兎, rarely used.', exampleJp: 'うさぎは野菜が好きです。', exampleReading: 'うさぎはやさいがすきです。', exampleEn: 'Rabbits like vegetables.' },
    { front: 'ねずみ', back: 'mouse; rat', pos: 'noun', exampleJp: '台所にねずみがいました。', exampleReading: 'だいどころにねずみがいました。', exampleEn: 'There was a mouse in the kitchen.' },
    { front: 'パンダ', back: 'panda', pos: 'noun', exampleJp: 'パンダを見に行きたいです。', exampleReading: 'ぱんだをみにいきたいです。', exampleEn: 'I want to go and see the pandas.' },
    { front: 'ライオン', back: 'lion', pos: 'noun', exampleJp: 'ライオンは強い動物です。', exampleReading: 'らいおんはつよいどうぶつです。', exampleEn: 'Lions are strong animals.' }
  ]
}

const NOUNS_COLOURS: SeedLesson = {
  key: 'n5vocab.nouns-colours',
  kind: 'vocab',
  title: 'Nouns: colours and shapes',
  cards: [
    { front: '黄色', reading: 'きいろ', back: 'yellow', pos: 'noun', notes: 'The noun; the adjective is 黄色い. Before a noun use 黄色い or 黄色の.', exampleJp: '黄色が一番好きな色です。', exampleReading: 'きいろがいちばんすきないろです。', exampleEn: 'Yellow is my favourite colour.' },
    { front: '緑', reading: 'みどり', back: 'green', pos: 'noun', notes: 'For leaves and plants; a green traffic light is called 青.', exampleJp: 'この公園は緑が多いです。', exampleReading: 'このこうえんはみどりがおおいです。', exampleEn: 'This park has a lot of greenery.' },
    { front: '茶色', reading: 'ちゃいろ', back: 'brown', pos: 'noun', notes: 'The adjective is 茶色い.', exampleJp: '茶色の靴を買いました。', exampleReading: 'ちゃいろのくつをかいました。', exampleEn: 'I bought brown shoes.' },
    { front: '紫', reading: 'むらさき', back: 'purple', pos: 'noun', exampleJp: '紫のセーターを着ています。', exampleReading: 'むらさきのせーたーをきています。', exampleEn: "I'm wearing a purple sweater." },
    { front: '灰色', reading: 'はいいろ', back: 'grey', pos: 'noun', notes: 'グレー is also common.', exampleJp: '今日の空は灰色です。', exampleReading: 'きょうのそらははいいろです。', exampleEn: 'The sky is grey today.' },
    { front: '水色', reading: 'みずいろ', back: 'light blue', pos: 'noun', exampleJp: '水色のシャツが好きです。', exampleReading: 'みずいろのしゃつがすきです。', exampleEn: 'I like light blue shirts.' },
    { front: '金色', reading: 'きんいろ', back: 'gold (colour)', pos: 'noun', exampleJp: '金色の時計をもらいました。', exampleReading: 'きんいろのとけいをもらいました。', exampleEn: 'I was given a gold watch.' },
    { front: '銀色', reading: 'ぎんいろ', back: 'silver (colour)', pos: 'noun', exampleJp: '銀色の車を買いました。', exampleReading: 'ぎんいろのくるまをかいました。', exampleEn: 'I bought a silver car.' },
    { front: 'ピンク', back: 'pink', pos: 'noun', exampleJp: 'ピンクの帽子をかぶっています。', exampleReading: 'ぴんくのぼうしをかぶっています。', exampleEn: "I'm wearing a pink hat." },
    { front: 'オレンジ', back: 'orange (the colour and the fruit)', pos: 'noun', exampleJp: 'オレンジのかばんを持っています。', exampleReading: 'おれんじのかばんをもっています。', exampleEn: 'I have an orange bag.' },
    { front: '形', reading: 'かたち', back: 'shape; form', pos: 'noun', exampleJp: 'この石は面白い形ですね。', exampleReading: 'このいしはおもしろいかたちですね。', exampleEn: 'This stone has an interesting shape.' },
    { front: '丸', reading: 'まる', back: 'circle', pos: 'noun', notes: 'On a test a 丸 marks a right answer. The adjective is 丸い (round).', exampleJp: '先生が答えに丸をつけました。', exampleReading: 'せんせいがこたえにまるをつけました。', exampleEn: 'The teacher circled the answer.' }
  ]
}

const NOUNS_OBJECTS: SeedLesson = {
  key: 'n5vocab.nouns-objects',
  kind: 'vocab',
  title: 'Nouns: post, paper and small things',
  cards: [
    { front: '切手', reading: 'きって', back: 'postage stamp', pos: 'noun', exampleJp: '郵便局で切手を買いました。', exampleReading: 'ゆうびんきょくできってをかいました。', exampleEn: 'I bought stamps at the post office.' },
    { front: '葉書', reading: 'はがき', back: 'postcard', pos: 'noun', notes: 'Often written はがき.', exampleJp: '友達に葉書を書きました。', exampleReading: 'ともだちにはがきをかきました。', exampleEn: 'I wrote a postcard to a friend.' },
    { front: '手紙', reading: 'てがみ', back: 'letter (mail)', pos: 'noun', exampleJp: '祖母に手紙を出しました。', exampleReading: 'そぼにてがみをだしました。', exampleEn: 'I sent a letter to my grandmother.' },
    { front: '封筒', reading: 'ふうとう', back: 'envelope', pos: 'noun', exampleJp: '封筒に写真を入れました。', exampleReading: 'ふうとうにしゃしんをいれました。', exampleEn: 'I put the photos in an envelope.' },
    { front: '写真', reading: 'しゃしん', back: 'photograph', pos: 'noun', notes: '写真を撮る = to take a photo.', exampleJp: '写真を撮ってもいいですか。', exampleReading: 'しゃしんをとってもいいですか。', exampleEn: 'May I take a photo?' },
    { front: 'カメラ', back: 'camera', pos: 'noun', exampleJp: '新しいカメラが欲しいです。', exampleReading: 'あたらしいかめらがほしいです。', exampleEn: 'I want a new camera.' },
    { front: '新聞', reading: 'しんぶん', back: 'newspaper', pos: 'noun', exampleJp: '父は毎朝新聞を読みます。', exampleReading: 'ちちはまいあさしんぶんをよみます。', exampleEn: 'My father reads the newspaper every morning.' },
    { front: '雑誌', reading: 'ざっし', back: 'magazine', pos: 'noun', exampleJp: '電車で雑誌を読みました。', exampleReading: 'でんしゃでざっしをよみました。', exampleEn: 'I read a magazine on the train.' },
    { front: '荷物', reading: 'にもつ', back: 'luggage; baggage; parcel', pos: 'noun', exampleJp: '荷物が重いから、タクシーで行きます。', exampleReading: 'にもつがおもいから、たくしーでいきます。', exampleEn: 'My luggage is heavy, so I will take a taxi.' },
    { front: 'たばこ', back: 'cigarettes; tobacco', pos: 'noun', notes: 'Kanji 煙草. たばこを吸う = to smoke.', exampleJp: 'たばこは体によくないです。', exampleReading: 'たばこはからだによくないです。', exampleEn: 'Cigarettes are not good for your body.' },
    { front: '灰皿', reading: 'はいざら', back: 'ashtray', pos: 'noun', exampleJp: 'テーブルに灰皿がありません。', exampleReading: 'てーぶるにはいざらがありません。', exampleEn: "There's no ashtray on the table." },
    { front: '石鹸', reading: 'せっけん', back: 'soap', pos: 'noun', notes: 'Often written せっけん.', exampleJp: '石鹸で手を洗いましょう。', exampleReading: 'せっけんでてをあらいましょう。', exampleEn: "Let's wash our hands with soap." },
    { front: 'タオル', back: 'towel', pos: 'noun', exampleJp: '新しいタオルを使ってください。', exampleReading: 'あたらしいたおるをつかってください。', exampleEn: 'Please use a new towel.' }
  ]
}

const NOUNS_POSITIONS: SeedLesson = {
  key: 'n5vocab.nouns-positions',
  kind: 'vocab',
  title: 'Nouns: positions and sides',
  cards: [
    { front: '後ろ', reading: 'うしろ', back: 'behind; the back', pos: 'noun', notes: 'Takes の: 先生の後ろ "behind the teacher".', exampleJp: '先生の後ろに立ってください。', exampleReading: 'せんせいのうしろにたってください。', exampleEn: 'Please stand behind the teacher.' },
    { front: '向こう', reading: 'むこう', back: 'over there; the other side', pos: 'noun', exampleJp: '川の向こうに村があります。', exampleReading: 'かわのむこうにむらがあります。', exampleEn: "There's a village on the other side of the river." },
    { front: '真ん中', reading: 'まんなか', back: 'the middle; the centre', pos: 'noun', exampleJp: '部屋の真ん中にテーブルがあります。', exampleReading: 'へやのまんなかにてーぶるがあります。', exampleEn: "There's a table in the middle of the room." },
    { front: '奥', reading: 'おく', back: 'the back; the inner part', pos: 'noun', notes: 'The far end, deep inside: 店の奥.', exampleJp: '店の奥にトイレがあります。', exampleReading: 'みせのおくにといれがあります。', exampleEn: 'The toilet is at the back of the shop.' },
    { front: '裏', reading: 'うら', back: 'the back; the reverse side', pos: 'noun', notes: 'Opposite of 表 (the front side).', exampleJp: '紙の裏に名前を書いてください。', exampleReading: 'かみのうらになまえをかいてください。', exampleEn: 'Please write your name on the back of the paper.' },
    { front: '手前', reading: 'てまえ', back: 'this side (of); just before', pos: 'noun', exampleJp: '駅の手前で降りてください。', exampleReading: 'えきのてまえでおりてください。', exampleEn: 'Please get off just before the station.' },
    { front: '周り', reading: 'まわり', back: 'around; the surroundings', pos: 'noun', exampleJp: '池の周りを歩きました。', exampleReading: 'いけのまわりをあるきました。', exampleEn: 'I walked around the pond.' },
    { front: '右側', reading: 'みぎがわ', back: 'the right-hand side', pos: 'noun', exampleJp: 'エレベーターは右側にあります。', exampleReading: 'えれべーたーはみぎがわにあります。', exampleEn: 'The lift is on the right.' },
    { front: '左側', reading: 'ひだりがわ', back: 'the left-hand side', pos: 'noun', exampleJp: '道の左側を歩いてください。', exampleReading: 'みちのひだりがわをあるいてください。', exampleEn: 'Please walk on the left side of the road.' },
    { front: '外側', reading: 'そとがわ', back: 'the outside', pos: 'noun', exampleJp: '箱の外側に名前を書きました。', exampleReading: 'はこのそとがわになまえをかきました。', exampleEn: 'I wrote my name on the outside of the box.' },
    { front: '内側', reading: 'うちがわ', back: 'the inside', pos: 'noun', exampleJp: 'かばんの内側にポケットがあります。', exampleReading: 'かばんのうちがわにぽけっとがあります。', exampleEn: "There's a pocket on the inside of the bag." },
    { front: '角', reading: 'かど', back: 'corner (of a street or building)', pos: 'noun', notes: 'An outside corner; the corner inside a room is 隅 (すみ).', exampleJp: 'あの角を右に曲がってください。', exampleReading: 'あのかどをみぎにまがってください。', exampleEn: 'Please turn right at that corner.' }
  ]
}

const QUESTION_WORDS: SeedLesson = {
  key: 'n5vocab.question-words',
  kind: 'vocab',
  title: 'Question words',
  cards: [
    { front: '誰', reading: 'だれ', back: 'who', pos: 'question', notes: 'どなた is the polite form. Often written in kana: だれ.', exampleJp: 'あの人は誰ですか。', exampleReading: 'あのひとはだれですか。', exampleEn: 'Who is that person?' },
    { front: 'どこ', back: 'where', pos: 'question', exampleJp: 'トイレはどこにありますか。', exampleReading: 'といれはどこにありますか。', exampleEn: 'Where is the toilet?' },
    { front: 'いつ', back: 'when', pos: 'question', exampleJp: '誕生日はいつですか。', exampleReading: 'たんじょうびはいつですか。', exampleEn: 'When is your birthday?' },
    { front: 'どう', back: 'how; what about', pos: 'question', notes: 'どうですか asks how something is; the polite form is いかが.', exampleJp: '新しい仕事はどうですか。', exampleReading: 'あたらしいしごとはどうですか。', exampleEn: 'How is your new job?' },
    { front: 'どうして', back: 'why', pos: 'question', notes: 'Answered with から. なぜ is a little more formal.', exampleJp: 'どうして学校を休みましたか。', exampleReading: 'どうしてがっこうをやすみましたか。', exampleEn: 'Why were you off school?' },
    { front: 'なぜ', back: 'why', pos: 'question', notes: 'Slightly more formal than どうして.', exampleJp: 'なぜ日本語を勉強していますか。', exampleReading: 'なぜにほんごをべんきょうしていますか。', exampleEn: 'Why are you studying Japanese?' },
    { front: 'いくら', back: 'how much (money)', pos: 'question', exampleJp: 'このりんごはいくらですか。', exampleReading: 'このりんごはいくらですか。', exampleEn: 'How much is this apple?' },
    { front: 'どれ', back: 'which one (of three or more)', pos: 'question', notes: 'Stands alone; before a noun use どの.', exampleJp: 'あなたの傘はどれですか。', exampleReading: 'あなたのかさはどれですか。', exampleEn: 'Which one is your umbrella?' },
    { front: 'どの', back: 'which (before a noun)', pos: 'question', notes: 'Always followed by a noun: どの電車.', exampleJp: 'どの電車に乗りますか。', exampleReading: 'どのでんしゃにのりますか。', exampleEn: 'Which train will you take?' },
    { front: 'どちら', back: 'which (of two); where (polite)', pos: 'question', notes: 'The polite form of both どっち and どこ.', exampleJp: 'コーヒーと紅茶とどちらがいいですか。', exampleReading: 'こーひーとこうちゃとどちらがいいですか。', exampleEn: 'Which would you like, coffee or tea?' },
    { front: 'どっち', back: 'which (of two, casual)', pos: 'question', exampleJp: 'どっちのかばんが大きいですか。', exampleReading: 'どっちのかばんがおおきいですか。', exampleEn: 'Which bag is bigger?' },
    { front: 'どなた', back: 'who (polite)', pos: 'question', exampleJp: 'すみません、どなたですか。', exampleReading: 'すみません、どなたですか。', exampleEn: 'Excuse me, who is this?' },
    { front: 'どんな', back: 'what kind of', pos: 'question', notes: 'Always followed by a noun.', exampleJp: 'どんな音楽が好きですか。', exampleReading: 'どんなおんがくがすきですか。', exampleEn: 'What kind of music do you like?' },
    { front: 'どのくらい', back: 'how long; how much; how far', pos: 'question', notes: 'Also どれくらい.', exampleJp: '駅までどのくらいかかりますか。', exampleReading: 'えきまでどのくらいかかりますか。', exampleEn: 'How long does it take to the station?' }
  ]
}

const LINKING_WORDS: SeedLesson = {
  key: 'n5vocab.linking-words',
  kind: 'vocab',
  title: 'Linking words',
  cards: [
    { front: 'それから', back: 'and then; after that', pos: 'conjunction', exampleJp: '宿題をしました。それから寝ました。', exampleReading: 'しゅくだいをしました。それからねました。', exampleEn: 'I did my homework. Then I went to bed.' },
    { front: 'でも', back: 'but (at the start of a sentence)', pos: 'conjunction', notes: 'Starts a sentence; inside one sentence use が or けど.', exampleJp: '高いです。でも、買いたいです。', exampleReading: 'たかいです。でも、かいたいです。', exampleEn: "It's expensive. But I want to buy it." },
    { front: 'しかし', back: 'however', pos: 'conjunction', notes: 'Written or formal; conversation uses でも.', exampleJp: 'この町は小さいです。しかし、便利です。', exampleReading: 'このまちはちいさいです。しかし、べんりです。', exampleEn: 'This town is small. However, it is convenient.' },
    { front: 'だから', back: 'so; that is why', pos: 'conjunction', notes: 'The polite form is ですから.', exampleJp: '明日は試験です。だから、勉強します。', exampleReading: 'あしたはしけんです。だから、べんきょうします。', exampleEn: "I have an exam tomorrow. So I'm going to study." },
    { front: 'ですから', back: 'so; therefore (polite)', pos: 'conjunction', exampleJp: '今日は日曜日です。ですから、銀行は休みです。', exampleReading: 'きょうはにちようびです。ですから、ぎんこうはやすみです。', exampleEn: 'Today is Sunday, so the bank is closed.' },
    { front: 'じゃあ', back: 'well then; in that case', pos: 'conjunction', notes: 'Casual では; also shortened to じゃ.', exampleJp: 'じゃあ、駅で会いましょう。', exampleReading: 'じゃあ、えきであいましょう。', exampleEn: "Well then, let's meet at the station." },
    { front: 'そして', back: 'and; and then', pos: 'conjunction', exampleJp: '部屋は広いです。そして、明るいです。', exampleReading: 'へやはひろいです。そして、あかるいです。', exampleEn: 'The room is spacious. And it is bright.' },
    { front: 'それでは', back: 'well then (polite)', pos: 'conjunction', notes: 'Opens or closes something: それでは、始めましょう.', exampleJp: 'それでは、授業を始めましょう。', exampleReading: 'それでは、じゅぎょうをはじめましょう。', exampleEn: "Well then, let's start the lesson." },
    { front: 'けれども', back: 'but; however', pos: 'conjunction', notes: 'A politer, fuller けど; it can also join two clauses.', exampleJp: '少し寒いです。けれども、外で遊びます。', exampleReading: 'すこしさむいです。けれども、そとであそびます。', exampleEn: "It's a little cold. But we will play outside." },
    { front: 'それに', back: 'besides; on top of that', pos: 'conjunction', exampleJp: 'この店は安いです。それに、おいしいです。', exampleReading: 'このみせはやすいです。それに、おいしいです。', exampleEn: 'This place is cheap. On top of that, it is good.' },
    { front: 'それとも', back: 'or (in a question)', pos: 'conjunction', notes: 'Joins two questions offering a choice.', exampleJp: 'コーヒーですか。それとも、紅茶ですか。', exampleReading: 'こーひーですか。それとも、こうちゃですか。', exampleEn: 'Is it coffee? Or tea?' },
    { front: 'それで', back: 'and so; because of that', pos: 'conjunction', notes: 'Gives the result of what was just said.', exampleJp: '風邪をひきました。それで、休みました。', exampleReading: 'かぜをひきました。それで、やすみました。', exampleEn: 'I caught a cold. So I took the day off.' }
  ]
}

const ADJ_MORE: SeedLesson = {
  key: 'n5vocab.adj-more',
  kind: 'vocab',
  title: 'Adjectives: taste, looks and feel',
  cards: [
    { front: '苦い', reading: 'にがい', back: 'bitter', pos: 'i-adjective', exampleJp: 'この薬はとても苦いです。', exampleReading: 'このくすりはとてもにがいです。', exampleEn: 'This medicine is very bitter.' },
    { front: 'まずい', back: 'bad-tasting; awful', pos: 'i-adjective', notes: 'Blunt; おいしくない is softer.', exampleJp: 'この店のコーヒーはまずいです。', exampleReading: 'このみせのこーひーはまずいです。', exampleEn: 'The coffee at this place is awful.' },
    { front: '可愛い', reading: 'かわいい', back: 'cute; sweet', pos: 'i-adjective', notes: 'Usually written かわいい.', exampleJp: 'あの犬はとても可愛いです。', exampleReading: 'あのいぬはとてもかわいいです。', exampleEn: 'That dog is really cute.' },
    { front: '茶色い', reading: 'ちゃいろい', back: 'brown', pos: 'i-adjective', notes: 'The noun is 茶色 (茶色の靴).', exampleJp: '茶色い犬が走っています。', exampleReading: 'ちゃいろいいぬがはしっています。', exampleEn: 'A brown dog is running.' },
    { front: 'すごい', back: 'amazing; tremendous', pos: 'i-adjective', notes: 'Good or bad: すごい雨 is a downpour.', exampleJp: 'わあ、すごい景色ですね。', exampleReading: 'わあ、すごいけしきですね。', exampleEn: 'Wow, what an amazing view.' },
    { front: '四角い', reading: 'しかくい', back: 'square', pos: 'i-adjective', exampleJp: '四角い箱に入れてください。', exampleReading: 'しかくいはこにいれてください。', exampleEn: 'Please put it in the square box.' },
    { front: '立派', reading: 'りっぱ', back: 'splendid; fine; impressive', pos: 'na-adjective', exampleJp: '駅の前に立派な建物があります。', exampleReading: 'えきのまえにりっぱなたてものがあります。', exampleEn: "There's an impressive building in front of the station." },
    { front: '素敵', reading: 'すてき', back: 'lovely; wonderful', pos: 'na-adjective', exampleJp: 'その帽子、とても素敵ですね。', exampleReading: 'そのぼうし、とてもすてきですね。', exampleEn: 'That hat is really lovely.' },
    { front: '珍しい', reading: 'めずらしい', back: 'rare; unusual', pos: 'i-adjective', exampleJp: 'これは珍しい花ですね。', exampleReading: 'これはめずらしいはなですね。', exampleEn: 'This is an unusual flower.' },
    { front: '酸っぱい', reading: 'すっぱい', back: 'sour', pos: 'i-adjective', exampleJp: 'このみかんは酸っぱいです。', exampleReading: 'このみかんはすっぱいです。', exampleEn: 'This mandarin is sour.' },
    { front: '柔らかい', reading: 'やわらかい', back: 'soft; tender', pos: 'i-adjective', exampleJp: 'このパンはとても柔らかいです。', exampleReading: 'このぱんはとてもやわらかいです。', exampleEn: 'This bread is very soft.' },
    { front: '硬い', reading: 'かたい', back: 'hard; tough', pos: 'i-adjective', notes: 'Also written 固い; the opposite of 柔らかい.', exampleJp: 'このお肉は少し硬いです。', exampleReading: 'このおにくはすこしかたいです。', exampleEn: 'This meat is a little tough.' }
  ]
}

const NOUNS_PEOPLE: SeedLesson = {
  key: 'n5vocab.nouns-people',
  kind: 'vocab',
  title: 'Nouns: people',
  cards: [
    { front: '大人', reading: 'おとな', back: 'adult; grown-up', pos: 'noun', exampleJp: '大人は千円、子供は五百円です。', exampleReading: 'おとなはせんえん、こどもはごひゃくえんです。', exampleEn: "It's 1,000 yen for adults and 500 yen for children." },
    { front: '男の人', reading: 'おとこのひと', back: 'man', pos: 'noun', notes: 'More polite than 男 on its own; the formal word is 男性.', exampleJp: '入口に男の人が立っています。', exampleReading: 'いりぐちにおとこのひとがたっています。', exampleEn: 'A man is standing at the entrance.' },
    { front: '女の人', reading: 'おんなのひと', back: 'woman', pos: 'noun', notes: 'More polite than 女 on its own; the formal word is 女性.', exampleJp: 'あの女の人は私の先生です。', exampleReading: 'あのおんなのひとはわたしのせんせいです。', exampleEn: 'That woman is my teacher.' },
    { front: '男の子', reading: 'おとこのこ', back: 'boy', pos: 'noun', exampleJp: '公園で男の子が遊んでいます。', exampleReading: 'こうえんでおとこのこがあそんでいます。', exampleEn: 'A boy is playing in the park.' },
    { front: '女の子', reading: 'おんなのこ', back: 'girl', pos: 'noun', exampleJp: 'あの女の子は五歳です。', exampleReading: 'あのおんなのこはごさいです。', exampleEn: 'That girl is five years old.' },
    { front: '皆さん', reading: 'みなさん', back: 'everyone (polite address)', pos: 'noun', notes: 'For speaking to a group; みんな is the everyday word.', exampleJp: '皆さん、おはようございます。', exampleReading: 'みなさん、おはようございます。', exampleEn: 'Good morning, everyone.' },
    { front: 'お客さん', reading: 'おきゃくさん', back: 'customer; guest; visitor', pos: 'noun', notes: 'The polite form of 客; お客様 is politer still, used by shop staff.', exampleJp: '店にお客さんがたくさん来ました。', exampleReading: 'みせにおきゃくさんがたくさんきました。', exampleEn: 'Lots of customers came to the shop.' },
    { front: '外国人', reading: 'がいこくじん', back: 'foreigner; person from abroad', pos: 'noun', exampleJp: 'この町には外国人が多いです。', exampleReading: 'このまちにはがいこくじんがおおいです。', exampleEn: 'There are many foreign people in this town.' },
    { front: '息子', reading: 'むすこ', back: 'son (one\'s own)', pos: 'noun', notes: 'Someone else\'s son is 息子さん.', exampleJp: '息子は今年大学生になりました。', exampleReading: 'むすこはことしだいがくせいになりました。', exampleEn: 'My son started university this year.' },
    { front: '娘', reading: 'むすめ', back: 'daughter (one\'s own)', pos: 'noun', notes: 'Someone else\'s daughter is 娘さん or お嬢さん.', exampleJp: '娘は毎日ピアノを練習します。', exampleReading: 'むすめはまいにちぴあのをれんしゅうします。', exampleEn: 'My daughter practises the piano every day.' },
    { front: '彼女', reading: 'かのじょ', back: 'she; her; girlfriend', pos: 'pronoun', notes: 'Japanese often uses the name instead; 彼 is "he; boyfriend".', exampleJp: '彼女は私の大学の友達です。', exampleReading: 'かのじょはわたしのだいがくのともだちです。', exampleEn: 'She is a friend from my university.' },
    { front: 'お子さん', reading: 'おこさん', back: 'child (someone else\'s)', pos: 'noun', notes: 'Polite, for another person\'s child; your own is 子供.', exampleJp: 'お子さんは何歳ですか。', exampleReading: 'おこさんはなんさいですか。', exampleEn: 'How old is your child?' }
  ]
}

const NOUNS_MEALS: SeedLesson = {
  key: 'n5vocab.nouns-meals',
  kind: 'vocab',
  title: 'Nouns: dishes and drinks',
  cards: [
    { front: 'ビール', back: 'beer', pos: 'noun', exampleJp: '冷たいビールを一杯ください。', exampleReading: 'つめたいびーるをいっぱいください。', exampleEn: 'One cold beer, please.' },
    { front: 'ワイン', back: 'wine', pos: 'noun', exampleJp: '赤いワインと白いワインがあります。', exampleReading: 'あかいわいんとしろいわいんがあります。', exampleEn: 'There is red wine and white wine.' },
    { front: '天ぷら', reading: 'てんぷら', back: 'tempura (battered, deep-fried food)', pos: 'noun', exampleJp: '母の天ぷらはとてもおいしいです。', exampleReading: 'ははのてんぷらはとてもおいしいです。', exampleEn: "My mother's tempura is really good." },
    { front: 'カレー', back: 'curry', pos: 'noun', notes: 'The dish with rice is カレーライス.', exampleJp: '昼ご飯にカレーを食べました。', exampleReading: 'ひるごはんにかれーをたべました。', exampleEn: 'I had curry for lunch.' },
    { front: 'ラーメン', back: 'ramen (noodles in soup)', pos: 'noun', exampleJp: 'この店のラーメンは安くておいしいです。', exampleReading: 'このみせのらーめんはやすくておいしいです。', exampleEn: 'The ramen here is cheap and good.' },
    { front: '味噌汁', reading: 'みそしる', back: 'miso soup', pos: 'noun', notes: 'Often written みそ汁.', exampleJp: '朝はご飯と味噌汁を食べます。', exampleReading: 'あさはごはんとみそしるをたべます。', exampleEn: 'In the morning I have rice and miso soup.' },
    { front: 'うどん', back: 'udon (thick wheat noodles)', pos: 'noun', exampleJp: '寒い日は温かいうどんがいいです。', exampleReading: 'さむいひはあたたかいうどんがいいです。', exampleEn: 'Hot udon is nice on a cold day.' },
    { front: 'そば', back: 'soba (buckwheat noodles)', pos: 'noun', notes: 'Kanji 蕎麦. A different word from そば "near; beside" (駅のそば).', exampleJp: '駅の前のそば屋で昼ご飯を食べました。', exampleReading: 'えきのまえのそばやでひるごはんをたべました。', exampleEn: 'I had lunch at the soba shop in front of the station.' },
    { front: 'おにぎり', back: 'rice ball', pos: 'noun', exampleJp: 'コンビニでおにぎりを二つ買いました。', exampleReading: 'こんびにでおにぎりをふたつかいました。', exampleEn: 'I bought two rice balls at the convenience store.' },
    { front: 'サンドイッチ', back: 'sandwich', pos: 'noun', exampleJp: '公園でサンドイッチを食べましょう。', exampleReading: 'こうえんでさんどいっちをたべましょう。', exampleEn: "Let's eat sandwiches in the park." },
    { front: 'バター', back: 'butter', pos: 'noun', exampleJp: 'このケーキにはバターがたくさん入っています。', exampleReading: 'このけーきにはばたーがたくさんはいっています。', exampleEn: 'There is a lot of butter in this cake.' }
  ]
}

const NOUNS_THINGS: SeedLesson = {
  key: 'n5vocab.nouns-things',
  kind: 'vocab',
  title: 'Nouns: tools and everyday things',
  cards: [
    { front: 'ナイフ', back: 'knife', pos: 'noun', notes: 'A kitchen knife is 包丁.', exampleJp: 'ナイフでりんごを切りました。', exampleReading: 'ないふでりんごをきりました。', exampleEn: 'I cut the apple with a knife.' },
    { front: 'カップ', back: 'cup; mug', pos: 'noun', notes: 'コップ is a glass or tumbler without a handle.', exampleJp: 'このカップでお茶を飲んでください。', exampleReading: 'このかっぷでおちゃをのんでください。', exampleEn: 'Please drink your tea from this cup.' },
    { front: 'ボタン', back: 'button (on clothes or a machine)', pos: 'noun', exampleJp: 'シャツのボタンが一つありません。', exampleReading: 'しゃつのぼたんがひとつありません。', exampleEn: 'One button is missing from the shirt.' },
    { front: 'ポケット', back: 'pocket', pos: 'noun', exampleJp: 'ポケットに鍵が入っています。', exampleReading: 'ぽけっとにかぎがはいっています。', exampleEn: 'The key is in my pocket.' },
    { front: '地図', reading: 'ちず', back: 'map', pos: 'noun', exampleJp: '駅までの地図を書きましょう。', exampleReading: 'えきまでのちずをかきましょう。', exampleEn: "I'll draw you a map to the station." },
    { front: '電池', reading: 'でんち', back: 'battery', pos: 'noun', exampleJp: 'カメラの電池を買いました。', exampleReading: 'かめらのでんちをかいました。', exampleEn: 'I bought a battery for the camera.' },
    { front: '歯ブラシ', reading: 'はぶらし', back: 'toothbrush', pos: 'noun', exampleJp: '新しい歯ブラシを買いました。', exampleReading: 'あたらしいはぶらしをかいました。', exampleEn: 'I bought a new toothbrush.' },
    { front: '教科書', reading: 'きょうかしょ', back: 'textbook', pos: 'noun', exampleJp: '明日は教科書を忘れないでください。', exampleReading: 'あしたはきょうかしょをわすれないでください。', exampleEn: "Please don't forget your textbook tomorrow." },
    { front: 'はさみ', back: 'scissors', pos: 'noun', notes: 'Kanji 鋏.', exampleJp: 'はさみで紙を切ります。', exampleReading: 'はさみでかみをきります。', exampleEn: 'I cut the paper with scissors.' },
    { front: 'ストーブ', back: 'heater; stove (for warmth)', pos: 'noun', notes: 'A room heater, not a cooker.', exampleJp: '寒いので、ストーブをつけました。', exampleReading: 'さむいので、すとーぶをつけました。', exampleEn: 'It was cold, so I turned on the heater.' },
    { front: 'パソコン', back: 'personal computer', pos: 'noun', exampleJp: '毎晩パソコンで映画を見ます。', exampleReading: 'まいばんぱそこんでえいがをみます。', exampleEn: 'I watch films on my computer every night.' }
  ]
}

const COUNTING_WORDS: SeedLesson = {
  key: 'n5vocab.counting-words',
  kind: 'vocab',
  title: 'Counting: how many, which and how much',
  cards: [
    { front: '何時', reading: 'なんじ', back: 'what time', pos: 'question', notes: 'The counter 〜時 (o\'clock): 四時 is よじ, 七時 しちじ, 九時 くじ.', exampleJp: '明日は何時に起きますか。', exampleReading: 'あしたはなんじにおきますか。', exampleEn: 'What time will you get up tomorrow?' },
    { front: '何曜日', reading: 'なんようび', back: 'what day of the week', pos: 'question', exampleJp: '今日は何曜日ですか。', exampleReading: 'きょうはなんようびですか。', exampleEn: 'What day is it today?' },
    { front: '何日', reading: 'なんにち', back: 'what date; how many days', pos: 'question', notes: 'Answered with the date words: 一日 (ついたち), 二日 (ふつか), 十日 (とおか).', exampleJp: '夏休みは何日からですか。', exampleReading: 'なつやすみはなんにちからですか。', exampleEn: 'What date do the summer holidays start?' },
    { front: '何歳', reading: 'なんさい', back: 'how old', pos: 'question', notes: 'The counter 〜歳: 一歳 いっさい, 八歳 はっさい, 二十歳 はたち. The politer question is おいくつですか.', exampleJp: 'おじいさんは何歳ですか。', exampleReading: 'おじいさんはなんさいですか。', exampleEn: 'How old is your grandfather?' },
    { front: '何回', reading: 'なんかい', back: 'how many times', pos: 'question', notes: 'The counter 〜回: 一回 いっかい, 六回 ろっかい, 十回 じゅっかい.', exampleJp: '京都へ何回行きましたか。', exampleReading: 'きょうとへなんかいいきましたか。', exampleEn: 'How many times have you been to Kyoto?' },
    { front: '何階', reading: 'なんがい', back: 'which floor; how many floors', pos: 'question', notes: 'The counter 〜階 (floors): 一階 いっかい, 二階 にかい, 三階 さんがい. なんかい is also heard.', exampleJp: '靴売り場は何階ですか。', exampleReading: 'くつうりばはなんがいですか。', exampleEn: 'Which floor is the shoe department on?' },
    { front: '何枚', reading: 'なんまい', back: 'how many (flat things)', pos: 'question', notes: 'The counter 〜枚 for paper, tickets, stamps, shirts and plates.', exampleJp: '切手は何枚要りますか。', exampleReading: 'きってはなんまいいりますか。', exampleEn: 'How many stamps do you need?' },
    { front: '何本', reading: 'なんぼん', back: 'how many (long, thin things)', pos: 'question', notes: 'The counter 〜本 for bottles, pens and umbrellas: いっぽん, にほん, さんぼん.', exampleJp: 'ビールは何本買いましたか。', exampleReading: 'びーるはなんぼんかいましたか。', exampleEn: 'How many bottles of beer did you buy?' },
    { front: '何番', reading: 'なんばん', back: 'what number', pos: 'question', notes: 'The counter 〜番 for numbers in a series and ranks; 一番 is also "the most".', exampleJp: '次のバスは何番ですか。', exampleReading: 'つぎのばすはなんばんですか。', exampleEn: 'What number is the next bus?' },
    { front: '番号', reading: 'ばんごう', back: 'number (for a phone, room or seat)', pos: 'noun', exampleJp: '電話番号を教えてください。', exampleReading: 'でんわばんごうをおしえてください。', exampleEn: 'Please tell me your phone number.' },
    { front: '半分', reading: 'はんぶん', back: 'half', pos: 'noun', notes: '半 alone follows a number: 三時半 (half past three).', exampleJp: 'このりんごを半分ください。', exampleReading: 'このりんごをはんぶんください。', exampleEn: 'Please give me half of this apple.' },
    { front: 'ページ', back: 'page', pos: 'counter', notes: 'Counts pages directly: 十ページ "page ten; ten pages".', exampleJp: '教科書の二十ページを見てください。', exampleReading: 'きょうかしょのにじゅうぺーじをみてください。', exampleEn: 'Please look at page twenty of the textbook.' },
    { front: 'メートル', back: 'metre', pos: 'counter', notes: 'キロ is short for a kilometre or a kilogram, depending on context.', exampleJp: '家から駅まで五百メートルです。', exampleReading: 'いえからえきまでごひゃくめーとるです。', exampleEn: "It's 500 metres from my house to the station." }
  ]
}

export const N5_VOCAB_COURSE: SeedCourseDef = {
  title: 'JLPT N5 Vocabulary II',
  description:
    'Completes the JLPT N5 word list after JLPT N5 Foundations: the everyday verbs, adjectives, ' +
    'time words, adverbs, nouns, question words and linking words the first course does not ' +
    'teach as cards, each with an example sentence that uses only N5 grammar.',
  level: 'N5',
  lessons: [
    VERBS_BASICS,
    VERBS_ROUTINE,
    VERBS_HOME,
    VERBS_TRAVEL,
    VERBS_GIVING,
    VERBS_HOBBIES,
    VERBS_LIFE,
    ADJ_SIZE,
    ADJ_SENSES,
    ADJ_QUALITIES,
    ADJ_NA,
    TIME_DAYS,
    TIME_CALENDAR,
    TIME_RELATIVE,
    ADVERBS_TIME,
    ADVERBS_DEGREE,
    NOUNS_FOOD,
    NOUNS_KITCHEN,
    NOUNS_HOUSE,
    NOUNS_CLOTHES,
    NOUNS_BODY,
    NOUNS_FAMILY,
    NOUNS_SCHOOL,
    NOUNS_STUDY,
    NOUNS_COUNTRIES,
    NOUNS_WORK,
    NOUNS_TOWN,
    NOUNS_TRANSPORT,
    NOUNS_NATURE,
    NOUNS_ANIMALS,
    NOUNS_COLOURS,
    NOUNS_OBJECTS,
    NOUNS_POSITIONS,
    QUESTION_WORDS,
    LINKING_WORDS,
    ADJ_MORE,
    NOUNS_PEOPLE,
    NOUNS_MEALS,
    NOUNS_THINGS,
    COUNTING_WORDS
  ]
}
