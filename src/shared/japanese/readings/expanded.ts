import type { JpPassage, JpReadingQuestion, JpReadingQuestionKind } from '../types'

function q(
  prompt: string,
  kind: JpReadingQuestionKind,
  correct: string,
  wrong: [string, string, string],
  position: number,
  explain: string
): JpReadingQuestion {
  const options = [...wrong]
  options.splice(position, 0, correct)
  return { prompt, kind, options, correct: position, explain }
}

// Three additional connected texts at each established level. Together with
// n1.ts this raises the authored bridge from 24 to 42 passages.
export const EXPANDED_PASSAGES: JpPassage[] = [
  {
    key: 'n5-07-ame-no-asa',
    title: '雨[あめ]の朝[あさ]',
    level: 'N5',
    topic: 'Daily routine',
    text:
      '朝[あさ]、雨[あめ]がふっていました。私[わたし]は青[あお]いかさを持[も]って、駅[えき]まで歩[ある]きました。道[みち]で小[ちい]さい犬[いぬ]を見[み]ました。犬[いぬ]は店[みせ]の前[まえ]で雨[あめ]を見[み]ていました。\n' +
      '電車[でんしゃ]に乗[の]る前[まえ]に、店[みせ]であたたかいお茶[ちゃ]を買[か]いました。少[すこ]し元気[げんき]になりました。',
    questions: [
      q('What color was the umbrella?', 'detail', 'Blue', ['Red', 'White', 'Black'], 0, 'The writer says 青いかさを持って — they carried a blue umbrella.'),
      q('Where was the dog?', 'detail', 'In front of a shop', ['Inside the station', 'Under the train', 'Next to the writer’s house'], 1, 'The dog was 店の前, standing in front of a shop and watching the rain.'),
      q('What did the writer buy?', 'detail', 'Warm tea', ['A new umbrella', 'Dog food', 'A train ticket'], 2, 'Before boarding, the writer bought あたたかいお茶 — warm tea.'),
      q('Why does the writer feel better at the end?', 'inference', 'The warm drink helped', ['The rain stopped', 'The dog followed them', 'The train was empty'], 3, 'The final two sentences connect buying warm tea with becoming a little more energetic.')
    ],
    glossary: [
      { word: '雨', reading: 'あめ', gloss: 'rain' },
      { word: '駅', reading: 'えき', gloss: 'station' },
      { word: '道', reading: 'みち', gloss: 'road; path' },
      { word: '店', reading: 'みせ', gloss: 'shop' },
      { word: 'お茶', reading: 'おちゃ', gloss: 'tea' },
      { word: '元気', reading: 'げんき', gloss: 'energy; well-being' }
    ]
  },
  {
    key: 'n5-08-toshokan-no-hon',
    title: '図書館[としょかん]の本[ほん]',
    level: 'N5',
    topic: 'Library',
    text:
      '日曜日[にちようび]に図書館[としょかん]へ行[い]きました。日本語[にほんご]のやさしい本[ほん]をさがしました。でも、読[よ]みたい本[ほん]はありませんでした。図書館[としょかん]の人[ひと]に聞[き]くと、新[あたら]しい本[ほん]は二階[にかい]にあると言[い]いました。\n' +
      '二階[にかい]で猫[ねこ]の話[はなし]を見[み]つけました。家[いえ]で少[すこ]しずつ読[よ]みます。',
    questions: [
      q('When did the writer go to the library?', 'detail', 'Sunday', ['Monday', 'Friday', 'Saturday'], 0, 'The opening says 日曜日に図書館へ行きました — the visit was on Sunday.'),
      q('Why did the writer ask a staff member?', 'inference', 'The desired books were not visible', ['The library card was lost', 'The stairs were closed', 'The writer needed a computer'], 1, 'The writer could not find a book they wanted, so they asked where the new books were.'),
      q('Where were the new books?', 'detail', 'On the second floor', ['Near the entrance', 'Outside the library', 'Beside the café'], 2, 'The staff member says 新しい本は二階にある — they are on the second floor.'),
      q('What book did the writer choose?', 'detail', 'A story about a cat', ['A train timetable', 'A cooking magazine', 'A history textbook'], 3, 'The selected book is 猫の話, a story about a cat.')
    ],
    glossary: [
      { word: '図書館', reading: 'としょかん', gloss: 'library' },
      { word: '日本語', reading: 'にほんご', gloss: 'Japanese language' },
      { word: '新しい', reading: 'あたらしい', gloss: 'new' },
      { word: '二階', reading: 'にかい', gloss: 'second floor' },
      { word: '猫', reading: 'ねこ', gloss: 'cat' },
      { word: '話', reading: 'はなし', gloss: 'story; talk' }
    ]
  },
  {
    key: 'n5-09-game-no-yoru',
    title: 'ゲームの夜[よる]',
    level: 'N5',
    topic: 'Friends',
    text:
      '昨日[きのう]の夜[よる]、友達[ともだち]とゲームをしました。新[あたら]しいゲームでしたから、はじめはよく分[わ]かりませんでした。友達[ともだち]がボタンと地図[ちず]を教[おし]えてくれました。\n' +
      '一時間[いちじかん]あと、二人[ふたり]で大[おお]きいボスに勝[か]ちました。私[わたし]はうれしかったです。来週[らいしゅう]もいっしょに遊[あそ]びます。',
    questions: [
      q('Why was the game difficult at first?', 'detail', 'It was new to the writer', ['The screen was broken', 'The friend spoke quietly', 'There was no map'], 0, 'The writer says 新しいゲームでしたから — it was difficult because it was new.'),
      q('What did the friend explain?', 'detail', 'The buttons and map', ['The final story', 'The price and shop', 'The music and voices'], 1, 'The friend taught the writer ボタンと地図, the controls and map.'),
      q('What happened after one hour?', 'detail', 'They defeated a large boss', ['They stopped playing', 'They bought another game', 'They called a third friend'], 2, '一時間あと introduces the result: the two friends beat a large boss together.'),
      q('What will they probably do next week?', 'inference', 'Play together again', ['Study at the library', 'Return the game', 'Meet the game designer'], 3, 'The last sentence explicitly says they will play together again next week.')
    ],
    glossary: [
      { word: '昨日', reading: 'きのう', gloss: 'yesterday' },
      { word: '友達', reading: 'ともだち', gloss: 'friend' },
      { word: '地図', reading: 'ちず', gloss: 'map' },
      { word: '一時間', reading: 'いちじかん', gloss: 'one hour' },
      { word: '勝ちました', reading: 'かちました', gloss: 'won; defeated' },
      { word: '来週', reading: 'らいしゅう', gloss: 'next week' }
    ]
  },
  {
    key: 'n4-07-bunkasai-poster',
    title: '文化祭[ぶんかさい]のポスター',
    level: 'N4',
    topic: 'School event',
    text:
      '来月[らいげつ]、学校[がっこう]で文化祭[ぶんかさい]があります。私[わたし]たちのクラスは小[ちい]さな喫茶店[きっさてん]を開[ひら]くことになりました。私[わたし]は絵[え]が好[す]きなので、入口[いりぐち]に置[お]くポスターを作[つく]っています。\n' +
      '最初[さいしょ]は色[いろ]をたくさん使[つか]いましたが、文字[もじ]が読[よ]みにくくなってしまいました。友達[ともだち]の意見[いけん]を聞[き]いて、色[いろ]を三[みっ]つに減[へ]らすと、店[みせ]の名前[なまえ]がよく見[み]えるようになりました。',
    questions: [
      q('What will the class operate at the festival?', 'detail', 'A small café', ['A book shop', 'A music stage', 'A game tournament'], 0, 'The class decided to open 小さな喫茶店, a small café.'),
      q('Why is the writer making the poster?', 'inference', 'They enjoy drawing', ['They arrive earliest', 'They own a printer', 'They dislike cooking'], 1, 'The writer directly connects 絵が好きなので with taking responsibility for the poster.'),
      q('What problem did the first version have?', 'detail', 'The text was hard to read', ['The shop name was wrong', 'The paper was too small', 'The picture was unfinished'], 2, 'Using too many colors made 文字が読みにくい — the lettering difficult to read.'),
      q('What improved the poster?', 'main-idea', 'Reducing the number of colors', ['Adding more menu items', 'Changing the café name', 'Moving it outside'], 3, 'After the palette was reduced to three colors, the shop name became easy to see.')
    ],
    glossary: [
      { word: '文化祭', reading: 'ぶんかさい', gloss: 'school cultural festival' },
      { word: '喫茶店', reading: 'きっさてん', gloss: 'café' },
      { word: '入口', reading: 'いりぐち', gloss: 'entrance' },
      { word: '文字', reading: 'もじ', gloss: 'letters; text' },
      { word: '意見', reading: 'いけん', gloss: 'opinion' },
      { word: '減らす', reading: 'へらす', gloss: 'to reduce' }
    ]
  },
  {
    key: 'n4-08-furuhonya',
    title: '古本屋[ふるほんや]で見[み]つけた物[もの]',
    level: 'N4',
    topic: 'Second-hand books',
    text:
      '駅[えき]の近[ちか]くに古[ふる]い本屋[ほんや]があります。店[みせ]は狭[せま]くて、天井[てんじょう]まで本[ほん]が積[つ]んであります。先週[せんしゅう]、そこで子供[こども]のころに読[よ]んだ漫画[まんが]を見[み]つけました。\n' +
      '表紙[ひょうし]は少[すこ]し汚[よご]れていましたが、中[なか]には前[まえ]の持[も]ち主[ぬし]が書[か]いた短[みじか]い感想[かんそう]が残[のこ]っていました。同[おな]じ場面[ばめん]が好[す]きだったと分[わ]かり、知[し]らない人[ひと]なのに近[ちか]く感[かん]じました。',
    questions: [
      q('What did the writer find?', 'detail', 'A manga read in childhood', ['A new dictionary', 'A lost train pass', 'A signed photograph'], 0, 'The writer found a manga they had read when they were a child.'),
      q('What was unusual inside the book?', 'detail', 'A former owner’s comments', ['A store receipt', 'Several missing pages', 'A map of the city'], 1, 'The previous owner had left short written impressions inside the manga.'),
      q('Why did the writer feel close to the unknown owner?', 'inference', 'They liked the same scene', ['They attended the same school', 'They had identical handwriting', 'They bought the book together'], 2, 'The notes revealed that both readers cared about the same scene.'),
      q('What contrast carries the passage?', 'main-idea', 'A worn object created a new connection', ['A large shop had very few books', 'A cheap book became expensive', 'A childhood story was forgotten'], 3, 'The physically worn book preserved another reader’s response and connected two strangers.')
    ],
    glossary: [
      { word: '古い本屋', reading: 'ふるいほんや', gloss: 'second-hand bookshop' },
      { word: '天井', reading: 'てんじょう', gloss: 'ceiling' },
      { word: '表紙', reading: 'ひょうし', gloss: 'book cover' },
      { word: '持ち主', reading: 'もちぬし', gloss: 'owner' },
      { word: '感想', reading: 'かんそう', gloss: 'impression; reaction' },
      { word: '場面', reading: 'ばめん', gloss: 'scene' }
    ]
  },
  {
    key: 'n4-09-kasa-no-mistake',
    title: '同[おな]じかさ',
    level: 'N4',
    topic: 'Small mistake',
    text:
      '仕事[しごと]が終[お]わった時[とき]、外[そと]は強[つよ]い雨[あめ]でした。入口[いりぐち]のかさ立[た]てから黒[くろ]いかさを取[と]って帰[かえ]りました。家[いえ]に着[つ]いてから、持[も]ち手[て]に小[ちい]さな星[ほし]があることに気[き]づきました。私[わたし]のかさではありません。\n' +
      '次[つぎ]の朝[あさ]、会社[かいしゃ]へ早[はや]く行[い]き、間違[まちが]えたかさを元[もと]の場所[ばしょ]に戻[もど]しました。私[わたし]のかさも残[のこ]っていたので、持[も]ち主[ぬし]も同[おな]じ間違[まちが]いをしたのかもしれません。',
    questions: [
      q('When did the writer notice the mistake?', 'detail', 'After arriving home', ['At the office entrance', 'While buying lunch', 'On the following evening'], 0, 'The star on the handle was noticed only after the writer reached home.'),
      q('What showed that the umbrella belonged to someone else?', 'detail', 'A small star on the handle', ['Its bright red color', 'A broken metal tip', 'A name on the fabric'], 1, 'The unfamiliar 小さな星 on the handle revealed the mix-up.'),
      q('What did the writer do the next morning?', 'detail', 'Returned it before work', ['Threw it away', 'Called the police', 'Bought the owner a new one'], 2, 'The writer arrived early and put the mistaken umbrella back in its original place.'),
      q('What does the final sentence suggest?', 'inference', 'The other owner may have taken the writer’s umbrella', ['Nobody noticed the mistake', 'The office bought new umbrellas', 'The star was added overnight'], 3, 'Because the writer’s own umbrella remained, the passage suggests a mutual accidental exchange.')
    ],
    glossary: [
      { word: '入口', reading: 'いりぐち', gloss: 'entrance' },
      { word: '持ち手', reading: 'もちて', gloss: 'handle' },
      { word: '星', reading: 'ほし', gloss: 'star' },
      { word: '間違えた', reading: 'まちがえた', gloss: 'mistook; took by mistake' },
      { word: '場所', reading: 'ばしょ', gloss: 'place' },
      { word: '持ち主', reading: 'もちぬし', gloss: 'owner' }
    ]
  },
  {
    key: 'n3-07-jimaku-circle',
    title: '字幕[じまく]を作[つく]るサークル',
    level: 'N3',
    topic: 'Subtitling',
    text:
      '大学[だいがく]の日本語[にほんご]サークルでは、短[みじか]い映像[えいぞう]に字幕[じまく]を付[つ]けています。先週[せんしゅう]、私[わたし]は登場人物[とうじょうじんぶつ]が急[きゅう]に怒[おこ]る場面[ばめん]を担当[たんとう]しました。話[はな]した言葉[ことば]を全部[ぜんぶ]書[か]くと、字幕[じまく]が長[なが]すぎて読[よ]めません。\n' +
      'そこで、意味[いみ]を変[か]えずに文[ぶん]を短[みじか]くしました。言葉[ことば]を減[へ]らしても、気持[きも]ちの変化[へんか]が伝[つた]わる表現[ひょうげん]を選[えら]ぶのは難[むずか]しかったです。完成[かんせい]した映像[えいぞう]を見[み]て、字幕[じまく]は翻訳[ほんやく]だけではないと感[かん]じました。',
    questions: [
      q('サークルでは何[なに]をしていますか。', 'detail', '映像[えいぞう]に字幕[じまく]を付[つ]けています', ['映画[えいが]を撮[と]っています', '日本語[にほんご]の歌[うた]を作[つく]っています', '登場人物[とうじょうじんぶつ]を描[えが]いています'], 0, 'The opening says that the circle adds subtitles to short video clips.'),
      q('話[はな]した言葉[ことば]を全部[ぜんぶ]書[か]けなかったのはなぜですか。', 'inference', '字幕[じまく]が長[なが]すぎて読[よ]めないから', ['映像[えいぞう]に音[おと]がないから', '登場人物[とうじょうじんぶつ]が少[すく]ないから', '翻訳[ほんやく]が必要[ひつよう]ないから'], 1, 'Writing every spoken word made the subtitle too long for viewers to read.'),
      q('筆者[ひっしゃ]が難[むずか]しいと感[かん]じたことは何[なん]ですか。', 'detail', '短[みじか]くしても感情[かんじょう]を伝[つた]えること', ['映像[えいぞう]を明[あか]るくすること', '怒[おこ]る場面[ばめん]を消[け]すこと', 'サークルの人数[にんずう]を増[ふ]やすこと'], 2, 'The challenge was preserving the emotional change while reducing the words.'),
      q('この文章[ぶんしょう]で筆者[ひっしゃ]が学[まな]んだことは何[なん]ですか。', 'main-idea', '字幕[じまく]には情報[じょうほう]を選[えら]ぶ仕事[しごと]もある', ['字幕[じまく]は長[なが]いほど正確[せいかく]だ', '翻訳[ほんやく]には映像[えいぞう]が不要[ふよう]だ', '怒[おこ]る場面[ばめん]には字幕[じまく]が要[い]らない'], 3, 'The conclusion reframes subtitling as selection and expression, not only translation.')
    ],
    glossary: [
      { word: '映像', reading: 'えいぞう', gloss: 'video; visual footage' },
      { word: '字幕', reading: 'じまく', gloss: 'subtitles' },
      { word: '担当', reading: 'たんとう', gloss: 'being responsible for' },
      { word: '意味', reading: 'いみ', gloss: 'meaning' },
      { word: '表現', reading: 'ひょうげん', gloss: 'expression; wording' },
      { word: '翻訳', reading: 'ほんやく', gloss: 'translation' }
    ]
  },
  {
    key: 'n3-08-game-patch',
    title: '小[ちい]さな修正[しゅうせい]',
    level: 'N3',
    topic: 'Game design',
    text:
      '友人[ゆうじん]が作[つく]っているゲームを試[ため]した時[とき]、道具[どうぐ]を選[えら]ぶ画面[がめん]が使[つか]いにくいと感[かん]じました。決定[けってい]するたびに一覧[いちらん]の最初[さいしょ]へ戻[もど]るため、同[おな]じ場所[ばしょ]まで何度[なんど]も動[うご]かさなければなりません。\n' +
      '友人[ゆうじん]は「小[ちい]さな問題[もんだい]だ」と言[い]いましたが、選[えら]んだ位置[いち]を覚[おぼ]えるように修正[しゅうせい]しました。一回[いっかい]では数秒[すうびょう]の違[ちが]いでも、何百回[なんびゃっかい]も使[つか]う画面[がめん]では大[おお]きな差[さ]になります。完成[かんせい]後[ご]、遊[あそ]ぶ人[ひと]から操作[そうさ]が気持[きも]ちよいという感想[かんそう]が届[とど]きました。',
    questions: [
      q('最初[さいしょ]の画面[がめん]にはどんな問題[もんだい]がありましたか。', 'detail', '決定[けってい]するたび一覧[いちらん]の先頭[せんとう]へ戻[もど]った', ['道具[どうぐ]の名前[なまえ]が表示[ひょうじ]されなかった', '画面[がめん]を開[ひら]くことができなかった', '同[おな]じ道具[どうぐ]を二度[にど]選[えら]べなかった'], 0, 'The selection returned to the beginning after every confirmation.'),
      q('友人[ゆうじん]はどのように修正[しゅうせい]しましたか。', 'detail', '選[えら]んだ位置[いち]を記憶[きおく]させた', ['道具[どうぐ]を全部[ぜんぶ]削除[さくじょ]した', '画面[がめん]の色[いろ]を変[か]えた', '決定[けってい]の回数[かいすう]を増[ふ]やした'], 1, 'The patch made the interface remember the user’s previous position.'),
      q('「大[おお]きな差[さ]」になるのはなぜですか。', 'inference', '同[おな]じ操作[そうさ]を何度[なんど]も行[おこな]うから', ['ゲームの値段[ねだん]が高[たか]いから', '友人[ゆうじん]が毎日[まいにち]遊[あそ]ぶから', '道具[どうぐ]の数[かず]が減[へ]ったから'], 2, 'A tiny delay compounds because players repeat the same action hundreds of times.'),
      q('文章[ぶんしょう]の中心[ちゅうしん]となる考[かんが]えは何[なん]ですか。', 'main-idea', '小[ちい]さな使[つか]いにくさも繰[く]り返[かえ]されると重要[じゅうよう]だ', ['遊[あそ]ぶ人[ひと]は修正[しゅうせい]に気[き]づかない', 'ゲームは一人[ひとり]で作[つく]るべきだ', '道具[どうぐ]の画面[がめん]は必要[ひつよう]ない'], 3, 'The passage shows how a small repeated friction becomes a meaningful design problem.')
    ],
    glossary: [
      { word: '道具', reading: 'どうぐ', gloss: 'tool; item' },
      { word: '一覧', reading: 'いちらん', gloss: 'list; overview' },
      { word: '修正', reading: 'しゅうせい', gloss: 'correction; patch' },
      { word: '位置', reading: 'いち', gloss: 'position' },
      { word: '操作', reading: 'そうさ', gloss: 'operation; controls' },
      { word: '感想', reading: 'かんそう', gloss: 'impression; feedback' }
    ]
  },
  {
    key: 'n3-09-matsuri-volunteer',
    title: '祭[まつ]りの案内所[あんないじょ]',
    level: 'N3',
    topic: 'Community event',
    text:
      '町[まち]の祭[まつ]りで、初[はじ]めて案内所[あんないじょ]の手伝[てつだ]いをしました。始[はじ]まる前[まえ]は、地図[ちず]を渡[わた]して道[みち]を説明[せつめい]するだけだと思[おも]っていました。しかし、迷子[まいご]を家族[かぞく]の所[ところ]へ連[つ]れて行[い]ったり、急[きゅう]な雨[あめ]で予定[よてい]が変[か]わったことを伝[つた]えたりしました。\n' +
      '会場[かいじょう]の裏[うら]では、朝[あさ]から多[おお]くの人[ひと]が看板[かんばん]や電気[でんき]を準備[じゅんび]していました。客[きゃく]として来[き]た時[とき]には見[み]えなかった仕事[しごと]を知[し]り、祭[まつ]りを楽[たの]しむ気持[きも]ちも少[すこ]し変[か]わりました。',
    questions: [
      q('筆者[ひっしゃ]は最初[さいしょ]、案内所[あんないじょ]の仕事[しごと]をどう考[かんが]えていましたか。', 'detail', '地図[ちず]を渡[わた]して道[みち]を説明[せつめい]する仕事[しごと]', ['祭[まつ]りの電気[でんき]を直[なお]す仕事[しごと]', '食[た]べ物[もの]を作[つく]る仕事[しごと]', '看板[かんばん]を売[う]る仕事[しごと]'], 0, 'The writer expected only to hand out maps and explain directions.'),
      q('実際[じっさい]に起[お]きたことは何[なん]ですか。', 'detail', '雨[あめ]で予定[よてい]が変[か]わった', ['会場[かいじょう]の電気[でんき]が全部[ぜんぶ]消[き]えた', '地図[ちず]が一枚[いちまい]もなかった', '祭[まつ]りが一週間[いっしゅうかん]続[つづ]いた'], 1, 'The information desk had to communicate a schedule change caused by sudden rain.'),
      q('筆者[ひっしゃ]の気持[きも]ちが変[か]わった理由[りゆう]は何[なん]ですか。', 'inference', '見[み]えない準備[じゅんび]の仕事[しごと]を知[し]ったから', ['迷子[まいご]になったから', '祭[まつ]りの客[きゃく]が少[すく]なかったから', '地図[ちず]を持[も]って帰[かえ]ったから'], 2, 'Seeing the hidden preparation changed how the writer understood the festival.'),
      q('この文章[ぶんしょう]に最[もっと]も合[あ]うまとめはどれですか。', 'main-idea', '手伝[てつだ]うことで行事[ぎょうじ]を支[ささ]える側[がわ]が見[み]えた', ['祭[まつ]りでは雨[あめ]が一番[いちばん]危険[きけん]だ', '案内所[あんないじょ]の仕事[しごと]は簡単[かんたん]だった', '客[きゃく]は準備[じゅんび]を手伝[てつだ]うべきだ'], 3, 'Volunteering revealed the people and labor that make the public event possible.')
    ],
    glossary: [
      { word: '案内所', reading: 'あんないじょ', gloss: 'information desk' },
      { word: '迷子', reading: 'まいご', gloss: 'lost child' },
      { word: '予定', reading: 'よてい', gloss: 'schedule; plan' },
      { word: '会場', reading: 'かいじょう', gloss: 'venue' },
      { word: '看板', reading: 'かんばん', gloss: 'signboard' },
      { word: '準備', reading: 'じゅんび', gloss: 'preparation' }
    ]
  },
  {
    key: 'n2-07-library-rule',
    title: '貸出期間[かしだしきかん]を延[の]ばす条件[じょうけん]',
    level: 'N2',
    topic: 'Library policy',
    text:
      '市立図書館[しりつとしょかん]では、借[か]りた本[ほん]の返却日[へんきゃくび]を一度[いちど]だけ延長[えんちょう]できる。ただし、その本[ほん]に別[べつ]の利用者[りようしゃ]から予約[よやく]が入[はい]っている場合[ばあい]は延長[えんちょう]できない。この規則[きそく]を知[し]らず、読[よ]み終[お]わっていない本[ほん]を受付[うけつけ]へ持[も]って来[く]る人[ひと]が多[おお]かった。\n' +
      '図書館[としょかん]は案内[あんない]を増[ふ]やす代[か]わりに、貸出[かしだし]の画面[がめん]へ予約[よやく]の有無[うむ]と延長[えんちょう]できる日数[にっすう]を表示[ひょうじ]した。その結果[けっか]、受付[うけつけ]での質問[しつもん]は減[へ]ったが、予約[よやく]の多[おお]い本[ほん]ほど早[はや]く読[よ]まなければならないという不満[ふまん]は残[のこ]った。規則[きそく]そのものを変[か]えず、判断[はんだん]に必要[ひつよう]な情報[じょうほう]を先[さき]に示[しめ]したのである。',
    questions: [
      q('貸出期間[かしだしきかん]を延長[えんちょう]できないのはどのような場合[ばあい]か。', 'detail', '別[べつ]の利用者[りようしゃ]が予約[よやく]している場合[ばあい]', ['一度[いちど]も本[ほん]を開[ひら]いていない場合[ばあい]', '受付[うけつけ]へ本[ほん]を持[も]って来[き]た場合[ばあい]', '返却日[へんきゃくび]より前[まえ]に申[もう]し込[こ]んだ場合[ばあい]'], 0, 'An existing reservation blocks the one-time extension.'),
      q('図書館[としょかん]は画面[がめん]に何[なに]を加[くわ]えたか。', 'detail', '予約[よやく]の有無[うむ]と延長[えんちょう]可能[かのう]な日数[にっすう]', ['利用者[りようしゃ]全員[ぜんいん]の名前[なまえ]', '本[ほん]を読[よ]むための平均時間[へいきんじかん]', '受付[うけつけ]の質問[しつもん]の記録[きろく]'], 1, 'The screen began showing reservation status and the possible extension length.'),
      q('変更後[へんこうご]も残[のこ]った不満[ふまん]は何[なに]か。', 'detail', '人気[にんき]の本[ほん]は急[いそ]いで読[よ]む必要[ひつよう]があること', ['貸出[かしだし]の画面[がめん]が使[つか]えないこと', '延長[えんちょう]が何度[なんど]でもできること', '受付[うけつけ]の案内[あんない]が増[ふ]えたこと'], 2, 'High-demand books still cannot be kept longer, so readers feel rushed.'),
      q('この対応[たいおう]の特徴[とくちょう]として最[もっと]も適切[てきせつ]なものはどれか。', 'main-idea', '規則[きそく]ではなく情報[じょうほう]の出[だ]し方[かた]を変[か]えた', ['予約制度[よやくせいど]を完全[かんぜん]に廃止[はいし]した', '利用者[りようしゃ]の不満[ふまん]を無視[むし]した', '全[すべ]ての本[ほん]の貸出期間[かしだしきかん]を短[みじか]くした'], 3, 'The policy stayed intact; the intervention made its consequences visible earlier.')
    ],
    glossary: [
      { word: '返却日', reading: 'へんきゃくび', gloss: 'return date' },
      { word: '延長', reading: 'えんちょう', gloss: 'extension' },
      { word: '予約', reading: 'よやく', gloss: 'reservation' },
      { word: '受付', reading: 'うけつけ', gloss: 'service desk' },
      { word: '不満', reading: 'ふまん', gloss: 'dissatisfaction' },
      { word: '判断', reading: 'はんだん', gloss: 'judgment; decision' }
    ]
  },
  {
    key: 'n2-08-remote-meeting',
    title: '会議[かいぎ]を減[へ]らす試[こころ]み',
    level: 'N2',
    topic: 'Remote work',
    text:
      '在宅勤務[ざいたくきんむ]が増[ふ]えた会社[かいしゃ]で、社員[しゃいん]から「一日中[いちにちじゅう]会議[かいぎ]に追[お]われ、作業[さぎょう]する時間[じかん]がない」という声[こえ]が上[あ]がった。そこで、主催者[しゅさいしゃ]は目的[もくてき]と決[き]めたい事項[じこう]を事前[じぜん]に書[か]き、資料[しりょう]を読[よ]むだけで済[す]む報告[ほうこく]は文章[ぶんしょう]で共有[きょうゆう]することになった。\n' +
      '会議[かいぎ]の数[かず]は半分[はんぶん]になったが、全[すべ]てを文章[ぶんしょう]に変[か]えたわけではない。意見[いけん]が分[わ]かれる問題[もんだい]や、誤解[ごかい]を解[と]きながら進[すす]める必要[ひつよう]がある場合[ばあい]は、顔[かお]を合[あ]わせて話[はな]す時間[じかん]を残[のこ]した。重要[じゅうよう]なのは、会議[かいぎ]を悪[わる]いものと決[き]めつけることではなく、同[おな]じ時間[じかん]に集[あつ]まる理由[りゆう]があるかを確[たし]かめることだ。',
    questions: [
      q('社員[しゃいん]は何[なに]を問題[もんだい]にしていたか。', 'detail', '会議[かいぎ]が多[おお]く作業時間[さぎょうじかん]が不足[ふそく]すること', ['在宅勤務[ざいたくきんむ]が認[みと]められないこと', '資料[しりょう]を読[よ]む機会[きかい]が少[すく]ないこと', '会社[かいしゃ]へ行[い]く日[ひ]が短[みじか]いこと'], 0, 'Employees said meetings consumed the time needed for their actual work.'),
      q('文章[ぶんしょう]で共有[きょうゆう]することになったのは何[なに]か。', 'detail', '読[よ]むだけで理解[りかい]できる報告[ほうこく]', ['意見[いけん]が分[わ]かれる問題[もんだい]', '誤解[ごかい]を解[と]くための対話[たいわ]', '主催者[しゅさいしゃ]を決[き]める選挙[せんきょ]'], 1, 'Straightforward reports moved to asynchronous written communication.'),
      q('会議[かいぎ]として残[のこ]されたものの共通点[きょうつうてん]は何[なに]か。', 'inference', '同時[どうじ]に話[はな]すことで解決[かいけつ]しやすいこと', ['資料[しりょう]が一枚[いちまい]もないこと', '全員[ぜんいん]の意見[いけん]が同[おな]じであること', '短[みじか]い文章[ぶんしょう]で報告[ほうこく]できること'], 2, 'The retained meetings benefit from live clarification or negotiation.'),
      q('筆者[ひっしゃ]の主張[しゅちょう]に最[もっと]も近[ちか]いものはどれか。', 'main-idea', '会議[かいぎ]は目的[もくてき]に応[おう]じて使[つか]い分[わ]けるべきだ', ['会議[かいぎ]は必[かなら]ず半分[はんぶん]にすべきだ', '在宅勤務[ざいたくきんむ]では会議[かいぎ]を禁止[きんし]すべきだ', '文章[ぶんしょう]より会話[かいわ]のほうが常[つね]に優[すぐ]れている'], 3, 'The point is intentional selection based on purpose, not blanket rejection of meetings.')
    ],
    glossary: [
      { word: '在宅勤務', reading: 'ざいたくきんむ', gloss: 'working from home' },
      { word: '事項', reading: 'じこう', gloss: 'matter; item' },
      { word: '報告', reading: 'ほうこく', gloss: 'report' },
      { word: '共有', reading: 'きょうゆう', gloss: 'sharing' },
      { word: '誤解', reading: 'ごかい', gloss: 'misunderstanding' },
      { word: '理由', reading: 'りゆう', gloss: 'reason' }
    ]
  },
  {
    key: 'n2-09-local-railway',
    title: '地域[ちいき]の鉄道[てつどう]をどう残[のこ]すか',
    level: 'N2',
    topic: 'Public transport',
    text:
      '人口[じんこう]が減[へ]っている地域[ちいき]で、赤字[あかじ]の鉄道[てつどう]を残[のこ]すべきかという議論[ぎろん]が続[つづ]いている。利用者[りようしゃ]の数[かず]だけを見[み]れば、廃止[はいし]してバスに替[か]えるほうが安[やす]い。しかし、通学[つうがく]する高校生[こうこうせい]や運転[うんてん]できない高齢者[こうれいしゃ]にとって、鉄道[てつどう]は生活[せいかつ]を支[ささ]える手段[しゅだん]である。\n' +
      'ある町[まち]は、残[のこ]すか廃止[はいし]するかを決[き]める前[まえ]に、学校[がっこう]の時間[じかん]に合[あ]わせて運行[うんこう]を組[く]み直[なお]し、週末[しゅうまつ]には観光客[かんこうきゃく]向[む]けの列車[れっしゃ]を走[はし]らせた。すぐに赤字[あかじ]が消[き]えたわけではないが、誰[だれ]がどの時間[じかん]に必要[ひつよう]としているかが明[あき]らかになった。二[ふた]つの選択肢[せんたくし]を比[くら]べるだけでなく、役割[やくわり]に合[あ]わせて仕組[しく]みを作[つく]り直[なお]す視点[してん]も必要[ひつよう]だ。',
    questions: [
      q('鉄道[てつどう]の廃止[はいし]に慎重[しんちょう]な理由[りゆう]は何[なに]か。', 'detail', '移動手段[いどうしゅだん]が限[かぎ]られる住民[じゅうみん]を支[ささ]えているから', ['鉄道[てつどう]の利用者[りようしゃ]が毎年[まいとし]増[ふ]えているから', 'バスを運転[うんてん]する人[ひと]が多[おお]すぎるから', '観光客[かんこうきゃく]が平日[へいじつ]に集中[しゅうちゅう]するから'], 0, 'Students and non-driving older residents rely on the railway for daily life.'),
      q('町[まち]は最初[さいしょ]にどのような対応[たいおう]をしたか。', 'detail', '必要[ひつよう]に合[あ]わせて運行[うんこう]を組[く]み直[なお]した', ['鉄道[てつどう]を直[ただ]ちに廃止[はいし]した', '全[すべ]ての列車[れっしゃ]を無料[むりょう]にした', '高校生[こうこうせい]の利用[りよう]を禁止[きんし]した'], 1, 'The town redesigned service around school schedules and weekend tourism.'),
      q('取[と]り組[く]みによって明[あき]らかになったことは何[なに]か。', 'detail', '利用者[りようしゃ]と必要[ひつよう]な時間帯[じかんたい]', ['赤字[あかじ]を完全[かんぜん]に消[け]す方法[ほうほう]', '新[あたら]しい駅[えき]を建[た]てる場所[ばしょ]', 'バスの正確[せいかく]な値段[ねだん]'], 2, 'The experiment revealed who needed the service and when.'),
      q('文章[ぶんしょう]が示[しめ]す考[かんが]えとして最[もっと]も適切[てきせつ]なものはどれか。', 'main-idea', '二者択一[にしゃたくいつ]の前[まえ]に役割[やくわり]に合[あ]う再設計[さいせっけい]を試[ため]す', ['赤字[あかじ]なら公共交通[こうきょうこうつう]は不要[ふよう]だ', '観光客[かんこうきゃく]だけを優先[ゆうせん]すべきだ', '利用者数[りようしゃすう]だけで廃止[はいし]を決[き]めるべきだ'], 3, 'The author argues for redesigning the service before accepting a simple keep-or-close choice.')
    ],
    glossary: [
      { word: '赤字', reading: 'あかじ', gloss: 'financial deficit' },
      { word: '廃止', reading: 'はいし', gloss: 'abolition; discontinuation' },
      { word: '高齢者', reading: 'こうれいしゃ', gloss: 'older people' },
      { word: '運行', reading: 'うんこう', gloss: 'transport operation' },
      { word: '選択肢', reading: 'せんたくし', gloss: 'choice; option' },
      { word: '役割', reading: 'やくわり', gloss: 'role' }
    ]
  }
]
