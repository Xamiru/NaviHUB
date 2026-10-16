import type { JpPassage } from '../types'

// N3 graded reading, second set (2026-10-16): passages 10-25 — more stories,
// notices, letters and reviews before N2. Keys FROZEN. Same rules as ./n3.ts
// and tests/jpReadings.test.ts (Japanese prompts and options from N3 up).
export const N3_MORE_PASSAGES: JpPassage[] = [
  {
    key: 'n3-10-seiyuu-event',
    title: '声優[せいゆう]イベントに行[い]ってきた',
    level: 'N3',
    topic: 'Event report',
    text:
      '先週[せんしゅう]の日曜日[にちようび]、好[す]きなアニメの声優[せいゆう]イベントに行[い]ってきた。チケットは発売[はつばい]から五分[ごふん]で売[う]り切[き]れたそうで、取[と]れたのは本当[ほんとう]に運[うん]がよかったと思[おも]う。\n' +
      'イベントでは、声優[せいゆう]さんたちが番組[ばんぐみ]の裏話[うらばなし]をしたり、その場[ば]で短[みじか]いシーンを演[えん]じたりした。画面[がめん]の中[なか]のキャラクターの声[こえ]が目[め]の前[まえ]で聞[き]こえて、不思議[ふしぎ]な気持[きも]ちになった。\n' +
      '最後[さいご]に主人公[しゅじんこう]役[やく]の人[ひと]が「皆[みな]さんのおかげで続[つづ]けられました」と言[い]った時[とき]、会場[かいじょう]中[じゅう]が拍手[はくしゅ]に包[つつ]まれた。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]は、なぜ運[うん]がよかったと思[おも]っていますか。',
        kind: 'detail',
        options: [
          'チケットがすぐに売[う]り切[き]れたのに取[と]れたから',
          '声優[せいゆう]さんと話[はな]すことができたから',
          '会場[かいじょう]が家[いえ]から近[ちか]かったから',
          'チケットが無料[むりょう]だったから'
        ],
        correct: 0,
        explain: 'The tickets sold out in five minutes (五分で売り切れたそうで), so getting one at all was luck.'
      },
      {
        prompt: 'イベントで声優[せいゆう]さんたちがしなかったことはどれですか。',
        kind: 'detail',
        options: [
          '番組[ばんぐみ]の裏話[うらばなし]をした',
          '短[みじか]いシーンを演[えん]じた',
          'ファンにサインを書[か]いた',
          '最後[さいご]にあいさつをした'
        ],
        correct: 2,
        explain: 'The text mentions behind-the-scenes stories, a live scene and the closing words, but no autographs.'
      },
      {
        prompt: '「不思議[ふしぎ]な気持[きも]ち」になったのはなぜですか。',
        kind: 'inference',
        options: [
          'キャラクターの声[こえ]が前[まえ]と変[か]わっていたから',
          '会場[かいじょう]がとても暗[くら]かったから',
          '知[し]らないアニメの話[はなし]ばかりだったから',
          '画面[がめん]の中[なか]の声[こえ]が目[め]の前[まえ]で聞[き]こえたから'
        ],
        correct: 3,
        explain: 'Hearing a voice that normally lives inside the screen coming from real people in front of you is what felt strange.'
      },
      {
        prompt: '「会場中[かいじょうじゅう]が拍手[はくしゅ]に包[つつ]まれた」とは、どういう意味[いみ]ですか。',
        kind: 'vocab',
        options: [
          '会場[かいじょう]の人[ひと]が帰[かえ]り始[はじ]めた',
          '会場[かいじょう]全体[ぜんたい]で大[おお]きな拍手[はくしゅ]が起[お]こった',
          '会場[かいじょう]が静[しず]かになった',
          '会場[かいじょう]の電気[でんき]が消[き]えた'
        ],
        correct: 1,
        explain: '包まれる means to be wrapped in: the whole hall was filled with applause.'
      }
    ],
    glossary: [
      { word: '声優', reading: 'せいゆう', gloss: 'voice actor' },
      { word: '売り切れた', reading: 'うりきれた', gloss: 'sold out' },
      { word: '裏話', reading: 'うらばなし', gloss: 'behind-the-scenes story' },
      { word: '演じたり', reading: 'えんじたり', gloss: 'performing (among other things)' },
      { word: '包まれた', reading: 'つつまれた', gloss: 'was wrapped in, was filled with' }
    ]
  },
  {
    key: 'n3-11-gomi-no-dashikata',
    title: 'ごみの出[だ]し方[かた]が変[か]わります',
    level: 'N3',
    topic: 'City notice',
    text:
      '来月[らいげつ]一日[ついたち]から、さくら町[ちょう]のごみの出[だ]し方[かた]が一部[いちぶ]変[か]わります。\n' +
      'これまで燃[も]えるごみと一緒[いっしょ]に出[だ]していたプラスチックの容器[ようき]は、水曜日[すいようび]の「プラスチックの日[ひ]」に出[だ]してください。汚[よご]れている物[もの]は、軽[かる]く洗[あら]ってから出[だ]すようにお願[ねが]いします。\n' +
      'また、ごみは朝[あさ]八時[はちじ]までに出[だ]すことになっています。前[まえ]の日[ひ]の夜[よる]に出[だ]すと、カラスに荒[あ]らされることがあるので、ご注意[ちゅうい]ください。',
    questions: [
      {
        prompt: 'プラスチックの容器[ようき]は、これからいつ出[だ]しますか。',
        kind: 'detail',
        options: [
          '燃[も]えるごみの日[ひ]',
          '毎朝[まいあさ]八時[はちじ]まで',
          '水曜日[すいようび]',
          '毎月[まいつき]一日[ついたち]'
        ],
        correct: 2,
        explain: 'プラスチックの容器は、水曜日の「プラスチックの日」に出してください: plastic containers move to Wednesday.'
      },
      {
        prompt: '汚[よご]れているプラスチックはどうすればいいですか。',
        kind: 'detail',
        options: [
          '軽[かる]く洗[あら]ってから出[だ]す',
          '燃[も]えるごみとして出[だ]す',
          '袋[ふくろ]を二枚[にまい]にして出[だ]す',
          '町[まち]の事務所[じむしょ]に持[も]っていく'
        ],
        correct: 0,
        explain: '汚れている物は、軽く洗ってから出すようにお願いします: rinse it lightly first.'
      },
      {
        prompt: '前[まえ]の日[ひ]の夜[よる]にごみを出[だ]してはいけないのはなぜですか。',
        kind: 'inference',
        options: [
          '夜[よる]は収集車[しゅうしゅうしゃ]が来[こ]ないから',
          '近所[きんじょ]の人[ひと]がうるさいと言[い]うから',
          '雨[あめ]でごみがぬれるから',
          'カラスがごみを散[ち]らかすことがあるから'
        ],
        correct: 3,
        explain: 'カラスに荒らされることがある: crows can tear the bags apart overnight.'
      },
      {
        prompt: '「出[だ]すことになっています」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '出[だ]すかどうか自由[じゆう]に決[き]めていい',
          '出[だ]すのがルールとして決[き]まっている',
          '出[だ]すのはもうやめることにした',
          '出[だ]したほうがいいと思[おも]う人[ひと]が多[おお]い'
        ],
        correct: 1,
        explain: 'ことになっている describes an established rule: rubbish has to be out by eight.'
      }
    ],
    glossary: [
      { word: '一部', reading: 'いちぶ', gloss: 'in part, partly' },
      { word: '容器', reading: 'ようき', gloss: 'container' },
      { word: '汚れている', reading: 'よごれている', gloss: 'dirty' },
      { word: '荒らされる', reading: 'あらされる', gloss: 'to be ransacked' }
    ]
  },
  {
    key: 'n3-12-dorama-kansou',
    title: 'ドラマ「明日[あした]の天気[てんき]」の感想[かんそう]',
    level: 'N3',
    topic: 'Review',
    text:
      '話題[わだい]のドラマ「明日[あした]の天気[てんき]」を最終回[さいしゅうかい]まで見[み]た。お天気[てんき]キャスターの女性[じょせい]が、仕事[しごと]と家族[かぞく]の間[あいだ]で悩[なや]む話[はなし]だ。\n' +
      '正直[しょうじき]に言[い]うと、最初[さいしょ]の三話[さんわ]は少[すこ]し退屈[たいくつ]で、途中[とちゅう]でやめようかと思[おも]った。ところが、主人公[しゅじんこう]が予報[よほう]を外[はず]して町[まち]の人[ひと]に責[せ]められる第四話[だいよんわ]から、急[きゅう]に面白[おもしろ]くなった。\n' +
      '派手[はで]な事件[じけん]は起[お]きないが、人[ひと]の気持[きも]ちの描[えが]き方[かた]が丁寧[ていねい]で、見[み]終[お]わった後[あと]も心[こころ]に残[のこ]る作品[さくひん]だった。',
    questions: [
      {
        prompt: 'このドラマの主人公[しゅじんこう]は、どんな人[ひと]ですか。',
        kind: 'detail',
        options: [
          '家族[かぞく]と仕事[しごと]の間[あいだ]で悩[なや]むお天気[てんき]キャスター',
          '町[まち]で事件[じけん]を調[しら]べる警察官[けいさつかん]',
          '天気[てんき]を研究[けんきゅう]する大学生[だいがくせい]',
          'ドラマを作[つく]る監督[かんとく]'
        ],
        correct: 0,
        explain: 'お天気キャスターの女性が、仕事と家族の間で悩む話だ: a TV weather presenter torn between work and family.'
      },
      {
        prompt: '筆者[ひっしゃ]は、いつから面白[おもしろ]くなったと言[い]っていますか。',
        kind: 'detail',
        options: [
          '第一話[だいいちわ]から',
          '第三話[だいさんわ]から',
          '最終回[さいしゅうかい]だけ',
          '第四話[だいよんわ]から'
        ],
        correct: 3,
        explain: 'ところが … 第四話から、急に面白くなった: the turn comes with episode four.'
      },
      {
        prompt: '「予報[よほう]を外[はず]して」とは、どういう意味[いみ]ですか。',
        kind: 'vocab',
        options: [
          '予報[よほう]をする仕事[しごと]をやめて',
          '予報[よほう]を他[ほか]の人[ひと]に頼[たの]んで',
          '予報[よほう]が当[あ]たらなくて',
          '予報[よほう]をテレビで発表[はっぴょう]して'
        ],
        correct: 2,
        explain: '外す here means to miss: her forecast turned out wrong, and the town blames her.'
      },
      {
        prompt: '筆者[ひっしゃ]はこのドラマのどこを一番[いちばん]評価[ひょうか]していますか。',
        kind: 'main-idea',
        options: [
          '大[おお]きな事件[じけん]がたくさん起[お]きるところ',
          '人[ひと]の気持[きも]ちを丁寧[ていねい]に描[えが]いているところ',
          '最初[さいしょ]から最後[さいご]まで退屈[たいくつ]しないところ',
          '天気[てんき]について詳[くわ]しく学[まな]べるところ'
        ],
        correct: 1,
        explain: '人の気持ちの描き方が丁寧で: the careful portrayal of feelings is the praise; the review even admits the slow start.'
      }
    ],
    glossary: [
      { word: '最終回', reading: 'さいしゅうかい', gloss: 'final episode' },
      { word: '退屈', reading: 'たいくつ', gloss: 'boring' },
      { word: '責められる', reading: 'せめられる', gloss: 'to be blamed' },
      { word: '丁寧', reading: 'ていねい', gloss: 'careful, thorough' },
      { word: '派手', reading: 'はで', gloss: 'flashy, showy' }
    ]
  },
  {
    key: 'n3-13-oshi',
    title: '「推[お]し」がいる生活[せいかつ]',
    level: 'N3',
    topic: 'Blog',
    text:
      '私[わたし]には「推[お]し」がいる。小[ちい]さな劇団[げきだん]で活動[かつどう]している役者[やくしゃ]さんだ。三年前[さんねんまえ]、友[とも]だちに誘[さそ]われて見[み]に行[い]った舞台[ぶたい]で、その人[ひと]の演技[えんぎ]に感動[かんどう]したのがきっかけだった。\n' +
      'それ以来[いらい]、公演[こうえん]があるたびに見[み]に行[い]っている。チケット代[だい]のために、昼[ひる]ご飯[はん]をお弁当[べんとう]にしたり、服[ふく]を買[か]うのを我慢[がまん]したりしている。\n' +
      '周[まわ]りからはお金[かね]の使[つか]い方[かた]を心配[しんぱい]されるが、推[お]しのおかげで毎日[まいにち]の仕事[しごと]も頑張[がんば]れるのだ。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]が推[お]しを好[す]きになったきっかけは何[なん]ですか。',
        kind: 'detail',
        options: [
          'テレビドラマで見[み]たこと',
          '友[とも]だちに誘[さそ]われて見[み]た舞台[ぶたい]',
          '劇団[げきだん]に入[はい]ったこと',
          'インターネットの動画[どうが]'
        ],
        correct: 1,
        explain: '友だちに誘われて見に行った舞台で … 感動したのがきっかけだった: a play a friend took them to.'
      },
      {
        prompt: '筆者[ひっしゃ]がチケット代[だい]のためにしていることはどれですか。',
        kind: 'detail',
        options: [
          '仕事[しごと]を二[ふた]つ掛[か]け持[も]ちしている',
          '家族[かぞく]からお金[かね]を借[か]りている',
          '昼[ひる]ご飯[はん]をお弁当[べんとう]にしている',
          '公演[こうえん]を一回[いっかい]おきに見[み]に行[い]っている'
        ],
        correct: 2,
        explain: '昼ご飯をお弁当にしたり、服を買うのを我慢したり: packed lunches and no new clothes.'
      },
      {
        prompt: '「公演[こうえん]があるたびに」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '公演[こうえん]がある時[とき]は毎回[まいかい]',
          '公演[こうえん]がない時[とき]だけ',
          '公演[こうえん]が終[お]わった後[あと]に',
          '公演[こうえん]が始[はじ]まる前[まえ]に'
        ],
        correct: 0,
        explain: 'たびに means every time: the writer goes to every single run.'
      },
      {
        prompt: 'この文章[ぶんしょう]で筆者[ひっしゃ]が一番[いちばん]言[い]いたいことは何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '推[お]しにお金[かね]を使[つか]いすぎるのはよくない',
          '劇団[げきだん]の役者[やくしゃ]は生活[せいかつ]が大変[たいへん]だ',
          '友[とも]だちと舞台[ぶたい]を見[み]るのは楽[たの]しい',
          '推[お]しがいることで毎日[まいにち]が頑張[がんば]れる'
        ],
        correct: 3,
        explain: 'The closing のだ sentence gives the point: whatever others worry about, the oshi keeps them going.'
      }
    ],
    glossary: [
      { word: '推し', reading: 'おし', gloss: 'favourite performer you support' },
      { word: '劇団', reading: 'げきだん', gloss: 'theatre company' },
      { word: '舞台', reading: 'ぶたい', gloss: 'stage play' },
      { word: '我慢', reading: 'がまん', gloss: 'putting up with, going without' }
    ]
  },
  {
    key: 'n3-14-kasa',
    title: '一本[いっぽん]の傘[かさ]',
    level: 'N3',
    topic: 'Story',
    text:
      '突然[とつぜん]の雨[あめ]に、駅[えき]の出口[でぐち]で立[た]ち止[ど]まっていた。すると、知[し]らない高校生[こうこうせい]が「これ、使[つか]ってください」と傘[かさ]を差[さ]し出[だ]した。\n' +
      '「でも、あなたがぬれてしまう」と言[い]うと、彼[かれ]は「家[いえ]がすぐそこなので」と笑[わら]って、雨[あめ]の中[なか]を走[はし]っていった。\n' +
      '返[かえ]そうにも、名前[なまえ]も知[し]らない。それから一[いっ]か月[げつ]、私[わたし]は毎朝[まいあさ]その傘[かさ]を持[も]って駅[えき]に行[い]っているが、まだ彼[かれ]には会[あ]えていない。',
    questions: [
      {
        prompt: '高校生[こうこうせい]は、なぜ傘[かさ]を貸[か]してくれたのですか。',
        kind: 'inference',
        options: [
          '自分[じぶん]の家[いえ]が近[ちか]く、ぬれてもかまわなかったから',
          '傘[かさ]を二本[にほん]持[も]っていたから',
          '筆者[ひっしゃ]の知[し]り合[あ]いだったから',
          '駅[えき]で傘[かさ]を売[う]る仕事[しごと]をしていたから'
        ],
        correct: 0,
        explain: '家がすぐそこなので: home was close, so getting wet did not matter to him.'
      },
      {
        prompt: '「返[かえ]そうにも、名前[なまえ]も知[し]らない」とは、どういうことですか。',
        kind: 'vocab',
        options: [
          '名前[なまえ]を聞[き]いたが忘[わす]れてしまった',
          '返[かえ]す必要[ひつよう]がないと言[い]われた',
          '返[かえ]したくても、相手[あいて]が誰[だれ]か分[わ]からない',
          '返[かえ]すつもりがない'
        ],
        correct: 2,
        explain: 'ようにも + negative: the writer wants to return it but cannot, because they do not know who he is.'
      },
      {
        prompt: '筆者[ひっしゃ]は毎朝[まいあさ]何[なに]をしていますか。',
        kind: 'detail',
        options: [
          '高校[こうこう]に電話[でんわ]をかけている',
          '新[あたら]しい傘[かさ]を探[さが]している',
          '駅[えき]の人[ひと]に高校生[こうこうせい]のことを聞[き]いている',
          '借[か]りた傘[かさ]を持[も]って駅[えき]に行[い]っている'
        ],
        correct: 3,
        explain: '毎朝その傘を持って駅に行っている: carrying the borrowed umbrella each morning in hope of meeting him.'
      },
      {
        prompt: 'この話[はなし]のテーマとして最[もっと]も合[あ]うのはどれですか。',
        kind: 'main-idea',
        options: [
          '雨[あめ]の日[ひ]の通勤[つうきん]の大変[たいへん]さ',
          '知[し]らない人[ひと]から受[う]けた親切[しんせつ]と、そのお礼[れい]',
          '高校生[こうこうせい]のマナーの悪[わる]さ',
          '傘[かさ]をなくさないための工夫[くふう]'
        ],
        correct: 1,
        explain: 'A stranger\'s kindness and the writer\'s month of trying to return it: kindness and the wish to repay it.'
      }
    ],
    glossary: [
      { word: '突然', reading: 'とつぜん', gloss: 'sudden(ly)' },
      { word: '立ち止まって', reading: 'たちどまって', gloss: 'stopping (on foot)' },
      { word: '差し出した', reading: 'さしだした', gloss: 'held out, offered' },
      { word: '返そうにも', reading: 'かえそうにも', gloss: 'even if (I) wanted to return it' }
    ]
  },
  {
    key: 'n3-15-mensetsu',
    title: 'アルバイトの面接[めんせつ]',
    level: 'N3',
    topic: 'Work',
    text:
      '昨日[きのう]、本屋[ほんや]のアルバイトの面接[めんせつ]を受[う]けた。前[まえ]の晩[ばん]、聞[き]かれそうな質問[しつもん]の答[こた]えを全部[ぜんぶ]紙[かみ]に書[か]いて覚[おぼ]えていった。\n' +
      'ところが、店長[てんちょう]が最初[さいしょ]に聞[き]いたのは「最近[さいきん]読[よ]んで面白[おもしろ]かった本[ほん]は何[なん]ですか」という質問[しつもん]だった。準備[じゅんび]していなかったので慌[あわ]てたが、好[す]きな推理[すいり]小説[しょうせつ]について夢中[むちゅう]で話[はな]した。\n' +
      '帰[かえ]り道[みち]、店長[てんちょう]から電話[でんわ]があり、「来週[らいしゅう]から来[き]てください」と言[い]われた。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]は面接[めんせつ]の前[まえ]にどんな準備[じゅんび]をしましたか。',
        kind: 'detail',
        options: [
          '店[みせ]で売[う]っている本[ほん]を全部[ぜんぶ]調[しら]べた',
          '友[とも]だちと面接[めんせつ]の練習[れんしゅう]をした',
          '推理[すいり]小説[しょうせつ]を何冊[なんさつ]も読[よ]んだ',
          '聞[き]かれそうな質問[しつもん]の答[こた]えを覚[おぼ]えた'
        ],
        correct: 3,
        explain: '聞かれそうな質問の答えを全部紙に書いて覚えていった: written-out answers, memorised.'
      },
      {
        prompt: '筆者[ひっしゃ]が慌[あわ]てたのはなぜですか。',
        kind: 'detail',
        options: [
          '面接[めんせつ]に遅[おく]れてしまったから',
          '準備[じゅんび]していない質問[しつもん]をされたから',
          '店長[てんちょう]がとても怖[こわ]かったから',
          '書[か]いた紙[かみ]をなくしたから'
        ],
        correct: 1,
        explain: '準備していなかったので慌てた: the first question was not one the writer had prepared.'
      },
      {
        prompt: '「夢中[むちゅう]で話[はな]した」に近[ちか]い意味[いみ]はどれですか。',
        kind: 'vocab',
        options: [
          '他[ほか]のことを忘[わす]れるほど熱心[ねっしん]に話[はな]した',
          '小[ちい]さい声[こえ]でゆっくり話[はな]した',
          '夢[ゆめ]の話[はなし]をした',
          '短[みじか]く話[はな]して終[お]わらせた'
        ],
        correct: 0,
        explain: '夢中で means absorbed, carried away: the writer forgot the nerves and talked eagerly.'
      },
      {
        prompt: 'この話[はなし]から分[わ]かることはどれですか。',
        kind: 'inference',
        options: [
          '準備[じゅんび]した答[こた]えが一番[いちばん]役[やく]に立[た]った',
          '店長[てんちょう]は筆者[ひっしゃ]を採用[さいよう]しなかった',
          '本[ほん]が好[す]きな気持[きも]ちが伝[つた]わったのかもしれない',
          '筆者[ひっしゃ]は推理[すいり]小説[しょうせつ]が嫌[きら]いだ'
        ],
        correct: 2,
        explain: 'The writer talks eagerly about books and gets the offer the same day; the best-supported reading is that this enthusiasm helped, not the memorised answers.'
      }
    ],
    glossary: [
      { word: '面接', reading: 'めんせつ', gloss: 'interview' },
      { word: '慌てた', reading: 'あわてた', gloss: 'panicked, got flustered' },
      { word: '推理', reading: 'すいり', gloss: 'mystery (genre), deduction' },
      { word: '夢中', reading: 'むちゅう', gloss: 'absorbed, carried away' }
    ]
  },
  {
    key: 'n3-16-kissaten',
    title: '商店街[しょうてんがい]の喫茶店[きっさてん]',
    level: 'N3',
    topic: 'Essay',
    text:
      '家[いえ]の近[ちか]くの商店街[しょうてんがい]に、四十年[よんじゅうねん]続[つづ]いている喫茶店[きっさてん]がある。店[みせ]のマスターは七十歳[ななじゅっさい]を過[す]ぎているが、今[いま]でも毎朝[まいあさ]六時[ろくじ]に店[みせ]を開[あ]ける。\n' +
      '最近[さいきん]は駅前[えきまえ]に新[あたら]しいカフェがいくつもできて、お客[きゃく]さんは減[へ]ったそうだ。それでもマスターは「この店[みせ]を待[ま]っている人[ひと]がいる限[かぎ]り、続[つづ]けるよ」と言[い]う。\n' +
      '実際[じっさい]、朝[あさ]の店[みせ]には、新聞[しんぶん]を読[よ]みながら同[おな]じコーヒーを頼[たの]む常連[じょうれん]さんが必[かなら]ずいる。',
    questions: [
      {
        prompt: 'マスターについて正[ただ]しいのはどれですか。',
        kind: 'detail',
        options: [
          '最近[さいきん]、店[みせ]を開[ひら]いたばかりだ',
          '駅前[えきまえ]のカフェでも働[はたら]いている',
          '七十歳[ななじゅっさい]を過[す]ぎても毎朝[まいあさ]六時[ろくじ]に店[みせ]を開[あ]ける',
          '店[みせ]を閉[し]めることに決[き]めた'
        ],
        correct: 2,
        explain: '七十歳を過ぎているが、今でも毎朝六時に店を開ける.'
      },
      {
        prompt: 'お客[きゃく]さんが減[へ]った理由[りゆう]は何[なん]ですか。',
        kind: 'detail',
        options: [
          '駅前[えきまえ]に新[あたら]しいカフェができたから',
          'コーヒーの値段[ねだん]が上[あ]がったから',
          '商店街[しょうてんがい]が工事[こうじ]をしているから',
          'マスターが病気[びょうき]になったから'
        ],
        correct: 0,
        explain: '駅前に新しいカフェがいくつもできて、お客さんは減ったそうだ.'
      },
      {
        prompt: '「待[ま]っている人[ひと]がいる限[かぎ]り」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '待[ま]っている人[ひと]がいなくても',
          '待[ま]っている人[ひと]が少[すく]ないので',
          '待[ま]っている人[ひと]に頼[たの]まれたら',
          '待[ま]っている人[ひと]がいる間[あいだ]は'
        ],
        correct: 3,
        explain: '限り means "as long as": the master will keep going while there are people who need the café.'
      },
      {
        prompt: '最後[さいご]の段落[だんらく]は、何[なに]を伝[つた]えていますか。',
        kind: 'main-idea',
        options: [
          'マスターの考[かんが]えはもう古[ふる]い',
          'マスターの言葉[ことば]どおり、店[みせ]を待[ま]つ人[ひと]が本当[ほんとう]にいる',
          '新聞[しんぶん]を読[よ]む人[ひと]が減[へ]っている',
          '常連[じょうれん]さんは毎日[まいにち]違[ちが]うものを頼[たの]む'
        ],
        correct: 1,
        explain: '実際 introduces proof: the regulars who come every morning show the master is right.'
      }
    ],
    glossary: [
      { word: '商店街', reading: 'しょうてんがい', gloss: 'shopping street' },
      { word: '喫茶店', reading: 'きっさてん', gloss: 'coffee shop (old-style)' },
      { word: '減った', reading: 'へった', gloss: 'decreased' },
      { word: '常連', reading: 'じょうれん', gloss: 'regular customer' }
    ]
  },
  {
    key: 'n3-17-kekkonshiki-henji',
    title: '結婚式[けっこんしき]の招待状[しょうたいじょう]への返事[へんじ]',
    level: 'N3',
    topic: 'Letter',
    text:
      '美咲[みさき]さん、ご結婚[けっこん]おめでとうございます。招待状[しょうたいじょう]を受[う]け取[と]って、思[おも]わず声[こえ]を上[あ]げてしまいました。\n' +
      '本当[ほんとう]は喜[よろこ]んで出席[しゅっせき]したいのですが、その日[ひ]は仕事[しごと]でどうしても海外[かいがい]に行[い]かなければなりません。せっかく招待[しょうたい]してくれたのに、ごめんなさい。\n' +
      '代[か]わりに、お祝[いわ]いの品[しな]を送[おく]りました。帰国[きこく]したら、ぜひ二人[ふたり]の話[はなし]を聞[き]かせてください。末永[すえなが]くお幸[しあわ]せに。',
    questions: [
      {
        prompt: 'この手紙[てがみ]の目的[もくてき]は何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '結婚式[けっこんしき]に出席[しゅっせき]すると伝[つた]えること',
          '結婚式[けっこんしき]の日[ひ]を変[か]えてほしいと頼[たの]むこと',
          '海外[かいがい]旅行[りょこう]に誘[さそ]うこと',
          'お祝[いわ]いを伝[つた]え、欠席[けっせき]をわびること'
        ],
        correct: 3,
        explain: 'Congratulations, an apology for not attending, and a gift instead: the letter declines warmly.'
      },
      {
        prompt: '筆者[ひっしゃ]が結婚式[けっこんしき]に行[い]けないのはなぜですか。',
        kind: 'detail',
        options: [
          '仕事[しごと]で海外[かいがい]に行[い]くから',
          '病気[びょうき]で入院[にゅういん]しているから',
          '招待状[しょうたいじょう]が届[とど]くのが遅[おそ]かったから',
          '美咲[みさき]さんと喧嘩[けんか]をしたから'
        ],
        correct: 0,
        explain: '仕事でどうしても海外に行かなければなりません: an unavoidable business trip abroad.'
      },
      {
        prompt: '「せっかく招待[しょうたい]してくれたのに」から分[わ]かる気持[きも]ちはどれですか。',
        kind: 'vocab',
        options: [
          '招待[しょうたい]されて迷惑[めいわく]だった',
          '招待[しょうたい]してくれたことに感謝[かんしゃ]しつつ、断[ことわ]るのを残念[ざんねん]に思[おも]う',
          '招待[しょうたい]されるとは思[おも]わなかったので驚[おどろ]いた',
          'もっと早[はや]く招待[しょうたい]してほしかった'
        ],
        correct: 1,
        explain: 'せっかく … のに values the invitation and regrets wasting it.'
      },
      {
        prompt: '筆者[ひっしゃ]は帰国[きこく]した後[あと]、何[なに]をしたいと言[い]っていますか。',
        kind: 'detail',
        options: [
          'もう一度[いちど]結婚式[けっこんしき]をしてもらう',
          'お祝[いわ]いの品[しな]を直接[ちょくせつ]渡[わた]す',
          '二人[ふたり]の話[はなし]を聞[き]く',
          '海外[かいがい]のお土産[みやげ]を渡[わた]す'
        ],
        correct: 2,
        explain: '帰国したら、ぜひ二人の話を聞かせてください: hear all about the two of them.'
      }
    ],
    glossary: [
      { word: '招待状', reading: 'しょうたいじょう', gloss: 'invitation' },
      { word: '出席', reading: 'しゅっせき', gloss: 'attendance' },
      { word: 'せっかく', reading: 'せっかく', gloss: 'kindly, with trouble taken' },
      { word: '末永く', reading: 'すえながく', gloss: 'for ever, for many years' }
    ]
  },
  {
    key: 'n3-18-seichi-junrei',
    title: 'アニメの舞台[ぶたい]を歩[ある]く',
    level: 'N3',
    topic: 'Travel',
    text:
      '好[す]きなアニメの舞台[ぶたい]になった海辺[うみべ]の町[まち]に行[い]ってきた。いわゆる「聖地巡礼[せいちじゅんれい]」だ。\n' +
      '駅[えき]を降[お]りると、主人公[しゅじんこう]たちが毎朝[まいあさ]通[とお]っていた坂道[さかみち]が、アニメとまったく同[おな]じ形[かたち]で目[め]の前[まえ]に広[ひろ]がっていた。思[おも]わず同[おな]じ場所[ばしょ]から写真[しゃしん]を撮[と]った。\n' +
      '町[まち]の人[ひと]たちもファンを歓迎[かんげい]していて、商店街[しょうてんがい]にはキャラクターのポスターが貼[は]ってあった。ただ、住宅地[じゅうたくち]で大声[おおごえ]を出[だ]すファンもいるそうで、マナーには気[き]をつけたいと思[おも]った。',
    questions: [
      {
        prompt: '「聖地巡礼[せいちじゅんれい]」とは、この文章[ぶんしょう]ではどういう意味[いみ]ですか。',
        kind: 'vocab',
        options: [
          '有名[ゆうめい]な神社[じんじゃ]やお寺[てら]を回[まわ]ること',
          'アニメの舞台[ぶたい]になった場所[ばしょ]を訪[おとず]れること',
          'アニメのイベントに参加[さんか]すること',
          '海[うみ]で泳[およ]ぐために旅行[りょこう]すること'
        ],
        correct: 1,
        explain: 'Here 聖地巡礼 means visiting places that appear in an anime, as the first sentence explains with いわゆる.'
      },
      {
        prompt: '筆者[ひっしゃ]が駅[えき]を降[お]りて最初[さいしょ]に見[み]たものは何[なん]ですか。',
        kind: 'detail',
        options: [
          'キャラクターのポスター',
          '主人公[しゅじんこう]の家[いえ]',
          '海辺[うみべ]の神社[じんじゃ]',
          'アニメと同[おな]じ坂道[さかみち]'
        ],
        correct: 3,
        explain: '主人公たちが毎朝通っていた坂道が、アニメとまったく同じ形で目の前に広がっていた.'
      },
      {
        prompt: '町[まち]の人[ひと]たちはファンをどう思[おも]っていますか。',
        kind: 'detail',
        options: [
          '歓迎[かんげい]している',
          '来[き]てほしくないと思[おも]っている',
          '気[き]がついていない',
          'お金[かね]のことしか考[かんが]えていない'
        ],
        correct: 0,
        explain: '町の人たちもファンを歓迎していて: the town welcomes fans, posters and all.'
      },
      {
        prompt: '筆者[ひっしゃ]が最後[さいご]に気[き]をつけたいと思[おも]ったのはなぜですか。',
        kind: 'inference',
        options: [
          '写真[しゃしん]を撮[と]ることが禁止[きんし]されていたから',
          '町[まち]の人[ひと]に注意[ちゅうい]されたから',
          '住宅地[じゅうたくち]で騒[さわ]ぐファンがいると聞[き]いたから',
          '坂道[さかみち]が危[あぶ]なかったから'
        ],
        correct: 2,
        explain: '住宅地で大声を出すファンもいるそうで: hearing of noisy fans makes the writer resolve to behave.'
      }
    ],
    glossary: [
      { word: '舞台', reading: 'ぶたい', gloss: 'setting (of a story)' },
      { word: '聖地巡礼', reading: 'せいちじゅんれい', gloss: 'visiting places from an anime ("pilgrimage")' },
      { word: 'いわゆる', reading: 'いわゆる', gloss: 'so-called' },
      { word: '坂道', reading: 'さかみち', gloss: 'slope, hill road' },
      { word: '歓迎', reading: 'かんげい', gloss: 'welcome' },
      { word: '住宅地', reading: 'じゅうたくち', gloss: 'residential area' }
    ]
  },
  {
    key: 'n3-19-wasuremono',
    title: '新幹線[しんかんせん]の忘[わす]れ物[もの]',
    level: 'N3',
    topic: 'Story',
    text:
      '出張[しゅっちょう]から帰[かえ]る新幹線[しんかんせん]で、うとうとしているうちに東京[とうきょう]に着[つ]いた。慌[あわ]てて降[お]りて、改札[かいさつ]を出[で]た時[とき]、パソコンの入[はい]ったかばんを棚[たな]に置[お]いたままだと気[き]がついた。\n' +
      'すぐに駅員[えきいん]さんに伝[つた]えると、列車[れっしゃ]の番号[ばんごう]と座席[ざせき]を聞[き]かれ、二十分[にじゅっぷん]ほどで「見[み]つかりました」と連絡[れんらく]が来[き]た。\n' +
      '中[なか]のものは何[なに]もなくなっていなかった。それ以来[いらい]、降[お]りる前[まえ]には必[かなら]ず棚[たな]を確認[かくにん]するようにしている。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]がかばんを忘[わす]れた理由[りゆう]は何[なん]ですか。',
        kind: 'inference',
        options: [
          '新幹線[しんかんせん]が混[こ]んでいて、取[と]れなかったから',
          '眠[ねむ]っていて慌[あわ]てて降[お]りたから',
          'かばんを他[ほか]の人[ひと]に預[あず]けていたから',
          '電話[でんわ]をしながら降[お]りたから'
        ],
        correct: 1,
        explain: 'うとうとしているうちに着いた、慌てて降りて: dozing, then a rushed exit, left the bag behind.'
      },
      {
        prompt: '駅員[えきいん]さんに聞[き]かれたことは何[なん]ですか。',
        kind: 'detail',
        options: [
          'かばんの色[いろ]と大[おお]きさ',
          '筆者[ひっしゃ]の住所[じゅうしょ]と電話番号[でんわばんごう]',
          '列車[れっしゃ]の番号[ばんごう]と座席[ざせき]',
          'パソコンの値段[ねだん]'
        ],
        correct: 2,
        explain: '列車の番号と座席を聞かれ: the train number and seat.'
      },
      {
        prompt: '「置[お]いたままだ」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '置[お]いた状態[じょうたい]で、持[も]ってこなかった',
          '置[お]く場所[ばしょ]を間違[まちが]えた',
          '置[お]いたかどうか覚[おぼ]えていない',
          '置[お]こうとしてやめた'
        ],
        correct: 0,
        explain: 'まま marks a state left unchanged: the bag stayed on the rack.'
      },
      {
        prompt: 'この経験[けいけん]の後[あと]、筆者[ひっしゃ]はどう変[か]わりましたか。',
        kind: 'detail',
        options: [
          'パソコンを持[も]ち歩[ある]かなくなった',
          '新幹線[しんかんせん]に乗[の]らなくなった',
          '寝[ね]ないように音楽[おんがく]を聞[き]くようになった',
          '降[お]りる前[まえ]に棚[たな]を確認[かくにん]するようになった'
        ],
        correct: 3,
        explain: '降りる前には必ず棚を確認するようにしている: a new habit of checking the rack.'
      }
    ],
    glossary: [
      { word: '出張', reading: 'しゅっちょう', gloss: 'business trip' },
      { word: 'うとうと', reading: 'うとうと', gloss: 'dozing' },
      { word: '改札', reading: 'かいさつ', gloss: 'ticket gate' },
      { word: '棚', reading: 'たな', gloss: 'shelf, luggage rack' }
    ]
  },
  {
    key: 'n3-20-bukatsu',
    title: '吹奏楽部[すいそうがくぶ]の三年間[さんねんかん]',
    level: 'N3',
    topic: 'Memoir',
    text:
      '中学[ちゅうがく]の三年間[さんねんかん]、吹奏楽部[すいそうがくぶ]でトランペットを吹[ふ]いていた。最初[さいしょ]は音[おと]がまったく出[で]ず、先輩[せんぱい]に笑[わら]われて悔[くや]しい思[おも]いをした。\n' +
      'それでも毎朝[まいあさ]一人[ひとり]で練習[れんしゅう]を続[つづ]けた結果[けっか]、二年[にねん]の秋[あき]にはソロを任[まか]されるようになった。\n' +
      '最後[さいご]のコンクールでは賞[しょう]を取[と]れなかったが、演奏[えんそう]が終[お]わった瞬間[しゅんかん]、みんなで泣[な]きながら笑[わら]った。あの時[とき]の気持[きも]ちは、今[いま]でもはっきり覚[おぼ]えている。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]が入部[にゅうぶ]したばかりの頃[ころ]、どんなことがありましたか。',
        kind: 'detail',
        options: [
          'すぐにソロを任[まか]された',
          '音[おと]が出[で]なくて先輩[せんぱい]に笑[わら]われた',
          'コンクールで賞[しょう]を取[と]った',
          '先輩[せんぱい]とけんかしてやめそうになった'
        ],
        correct: 1,
        explain: '最初は音がまったく出ず、先輩に笑われて悔しい思いをした.'
      },
      {
        prompt: '筆者[ひっしゃ]がソロを任[まか]されるようになったのはなぜですか。',
        kind: 'inference',
        options: [
          '毎朝[まいあさ]一人[ひとり]で練習[れんしゅう]を続[つづ]けたから',
          '先輩[せんぱい]が部活[ぶかつ]をやめたから',
          '新[あたら]しいトランペットを買[か]ったから',
          '先生[せんせい]と仲[なか]がよかったから'
        ],
        correct: 0,
        explain: '毎朝一人で練習を続けた結果: the solo came from daily practice.'
      },
      {
        prompt: '「悔[くや]しい思[おも]いをした」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          'うれしくて楽[たの]しかった',
          '怖[こわ]くて逃[に]げたかった',
          '負[ま]けたようで残念[ざんねん]で腹[はら]が立[た]った',
          '恥[は]ずかしくて何[なに]も言[い]えなかった'
        ],
        correct: 2,
        explain: '悔しい is the sting of being laughed at or beaten: frustrated and galled.'
      },
      {
        prompt: '最後[さいご]のコンクールについて、筆者[ひっしゃ]はどう感[かん]じていますか。',
        kind: 'main-idea',
        options: [
          '賞[しょう]を取[と]れなかったことを今[いま]も後悔[こうかい]している',
          '演奏[えんそう]がうまくいかず、すぐに忘[わす]れたい',
          '部活[ぶかつ]をやめればよかったと思[おも]っている',
          '賞[しょう]はなくても、忘[わす]れられない大切[たいせつ]な思[おも]い出[で]だ'
        ],
        correct: 3,
        explain: 'No prize, but crying and laughing together, remembered clearly to this day: a treasured memory.'
      }
    ],
    glossary: [
      { word: '吹奏楽部', reading: 'すいそうがくぶ', gloss: 'school brass band club' },
      { word: '先輩', reading: 'せんぱい', gloss: 'senior student' },
      { word: '悔しい', reading: 'くやしい', gloss: 'frustrating, galling' },
      { word: '任される', reading: 'まかされる', gloss: 'to be entrusted with' },
      { word: '瞬間', reading: 'しゅんかん', gloss: 'moment, instant' }
    ]
  },
  {
    key: 'n3-21-taifuu-yohou',
    title: '台風[たいふう]十号[じゅうごう]の予報[よほう]',
    level: 'N3',
    topic: 'News',
    text:
      '大型[おおがた]で強[つよ]い台風[たいふう]十号[じゅうごう]は、あすの夕方[ゆうがた]から夜[よる]にかけて、九州[きゅうしゅう]に最[もっと]も近[ちか]づく見込[みこ]みです。\n' +
      '気象庁[きしょうちょう]によりますと、海[うみ]は大[おお]きくしけ、一時間[いちじかん]に八十[はちじゅう]ミリを超[こ]える激[はげ]しい雨[あめ]が降[ふ]るおそれがあります。\n' +
      '交通機関[こうつうきかん]にも影響[えいきょう]が出[で]る可能性[かのうせい]があり、鉄道[てつどう]会社[がいしゃ]は、あすの午後[ごご]から一部[いちぶ]の列車[れっしゃ]を運休[うんきゅう]すると発表[はっぴょう]しました。不要[ふよう]な外出[がいしゅつ]は控[ひか]えるようにしてください。',
    questions: [
      {
        prompt: '台風[たいふう]が九州[きゅうしゅう]に最[もっと]も近[ちか]づくのはいつですか。',
        kind: 'detail',
        options: [
          '今日[きょう]の夜[よる]',
          'あすの朝[あさ]',
          'あさっての昼[ひる]',
          'あすの夕方[ゆうがた]から夜[よる]'
        ],
        correct: 3,
        explain: 'あすの夕方から夜にかけて: from tomorrow evening into the night.'
      },
      {
        prompt: '「降[ふ]るおそれがあります」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '降[ふ]る心配[しんぱい]がある',
          '降[ふ]らないと言[い]われている',
          '降[ふ]るのが楽[たの]しみだ',
          'もう降[ふ]りやんだ'
        ],
        correct: 0,
        explain: 'おそれがある warns of a risk: heavy rain may well fall.'
      },
      {
        prompt: '鉄道[てつどう]会社[がいしゃ]は何[なに]を発表[はっぴょう]しましたか。',
        kind: 'detail',
        options: [
          'すべての列車[れっしゃ]を一週間[いっしゅうかん]止[と]める',
          '臨時[りんじ]の列車[れっしゃ]を走[はし]らせる',
          'あすの午後[ごご]から一部[いちぶ]の列車[れっしゃ]を運休[うんきゅう]する',
          '料金[りょうきん]を無料[むりょう]にする'
        ],
        correct: 2,
        explain: 'あすの午後から一部の列車を運休すると発表しました: some trains cancelled from tomorrow afternoon.'
      },
      {
        prompt: 'このニュースが最後[さいご]に伝[つた]えていることは何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '台風[たいふう]はもう弱[よわ]くなった',
          '必要[ひつよう]のない外出[がいしゅつ]はしないでほしい',
          '海[うみ]で遊[あそ]ぶのにいい天気[てんき]になる',
          '新[あたら]しい台風[たいふう]が生[う]まれた'
        ],
        correct: 1,
        explain: '不要な外出は控えるようにしてください: avoid going out unless you must.'
      }
    ],
    glossary: [
      { word: '見込み', reading: 'みこみ', gloss: 'expectation, forecast' },
      { word: '気象庁', reading: 'きしょうちょう', gloss: 'Japan Meteorological Agency' },
      { word: 'しけ', reading: 'しけ', gloss: 'rough seas' },
      { word: '運休', reading: 'うんきゅう', gloss: 'cancellation of service' },
      { word: '控える', reading: 'ひかえる', gloss: 'to refrain from' }
    ]
  },
  {
    key: 'n3-22-onigiri-no-tsukurikata',
    title: 'おいしいおにぎりの作[つく]り方[かた]',
    level: 'N3',
    topic: 'Instructions',
    text:
      'まず、ご飯[はん]は炊[た]きたてを使[つか]うのがいちばんです。冷[つめ]たいご飯[はん]だと、米[こめ]がくっつきにくく、形[かたち]が崩[くず]れやすくなります。\n' +
      '次[つぎ]に、手[て]を水[みず]でぬらしてから、塩[しお]を少[すこ]しつけます。手[て]がぬれていないと、ご飯[はん]が手[て]にくっついてしまいます。\n' +
      'ご飯[はん]を手[て]にのせたら、真[ま]ん中[なか]に梅干[うめぼ]しなどの具[ぐ]を入[い]れ、三角[さんかく]になるように軽[かる]く握[にぎ]ります。強[つよ]く握[にぎ]りすぎると、固[かた]くなっておいしくないので気[き]をつけましょう。',
    questions: [
      {
        prompt: '冷[つめ]たいご飯[はん]を使[つか]うと、どうなりますか。',
        kind: 'detail',
        options: [
          '塩[しお]の味[あじ]がしなくなる',
          '形[かたち]が崩[くず]れやすくなる',
          '手[て]にくっついてしまう',
          '具[ぐ]が入[い]れにくくなる'
        ],
        correct: 1,
        explain: '冷たいご飯だと、米がくっつきにくく、形が崩れやすくなります.'
      },
      {
        prompt: '手[て]を水[みず]でぬらすのは、なぜですか。',
        kind: 'detail',
        options: [
          'ご飯[はん]が手[て]にくっつかないようにするため',
          'ご飯[はん]を冷[ひ]やすため',
          '塩[しお]を溶[と]かすため',
          '手[て]をきれいにするため'
        ],
        correct: 0,
        explain: '手がぬれていないと、ご飯が手にくっついてしまいます: wet hands stop the rice sticking.'
      },
      {
        prompt: '「握[にぎ]りすぎる」とは、どういうことですか。',
        kind: 'vocab',
        options: [
          '握[にぎ]る回数[かいすう]が少[すく]ない',
          '握[にぎ]るのが遅[おそ]い',
          '握[にぎ]る力[ちから]が強[つよ]すぎる',
          'おにぎりを作[つく]りすぎる'
        ],
        correct: 2,
        explain: 'すぎる means too much: squeezing too hard makes the rice ball hard.'
      },
      {
        prompt: 'この文章[ぶんしょう]は、何[なに]のために書[か]かれていますか。',
        kind: 'main-idea',
        options: [
          '梅干[うめぼ]しの作[つく]り方[かた]を紹介[しょうかい]するため',
          'ご飯[はん]の炊[た]き方[かた]を説明[せつめい]するため',
          'おにぎり屋[や]を宣伝[せんでん]するため',
          'おにぎりをおいしく作[つく]るコツを伝[つた]えるため'
        ],
        correct: 3,
        explain: 'Step by step with the reason for each step: tips for making good onigiri.'
      }
    ],
    glossary: [
      { word: '炊きたて', reading: 'たきたて', gloss: 'freshly cooked (rice)' },
      { word: '崩れ', reading: 'くずれ', gloss: 'falling apart' },
      { word: '具', reading: 'ぐ', gloss: 'filling' },
      { word: '握ります', reading: 'にぎります', gloss: 'to press, to grip' }
    ]
  },
  {
    key: 'n3-23-tsuuhan-toraburu',
    title: '注文[ちゅうもん]した商品[しょうひん]について',
    level: 'N3',
    topic: 'Customer email',
    text:
      'ご担当者様[たんとうしゃさま]\n' +
      '先週[せんしゅう]、そちらのサイトで黒[くろ]いリュックを注文[ちゅうもん]しましたが、昨日[きのう]届[とど]いたのは青[あお]いリュックでした。箱[はこ]を開[あ]けて驚[おどろ]きました。注文[ちゅうもん]番号[ばんごう]は45301です。\n' +
      '来週[らいしゅう]から旅行[りょこう]に行[い]くので、それまでに黒[くろ]いものと交換[こうかん]していただけないでしょうか。届[とど]いた商品[しょうひん]は、まだ一度[いちど]も使[つか]っていません。\n' +
      'お手数[てすう]をおかけしますが、よろしくお願[ねが]いいたします。\n' +
      '佐藤[さとう]',
    questions: [
      {
        prompt: '佐藤[さとう]さんは、なぜこのメールを書[か]きましたか。',
        kind: 'main-idea',
        options: [
          '商品[しょうひん]が届[とど]かなかったから',
          '注文[ちゅうもん]を取[と]り消[け]したいから',
          '注文[ちゅうもん]と違[ちが]う色[いろ]の商品[しょうひん]が届[とど]いたから',
          'リュックが壊[こわ]れていたから'
        ],
        correct: 2,
        explain: 'Ordered black, received blue: the wrong colour arrived.'
      },
      {
        prompt: '佐藤[さとう]さんは、店[みせ]に何[なに]をしてほしいと頼[たの]んでいますか。',
        kind: 'detail',
        options: [
          '旅行[りょこう]の前[まえ]に黒[くろ]いリュックと交換[こうかん]してほしい',
          'お金[かね]を返[かえ]してほしい',
          '青[あお]いリュックを安[やす]くしてほしい',
          '新[あたら]しいリュックを無料[むりょう]でもう一[ひと]つ送[おく]ってほしい'
        ],
        correct: 0,
        explain: 'それまでに黒いものと交換していただけないでしょうか: exchange it for a black one before the trip.'
      },
      {
        prompt: '「届[とど]いた商品[しょうひん]は、まだ一度[いちど]も使[つか]っていません」と書[か]いたのはなぜだと考[かんが]えられますか。',
        kind: 'inference',
        options: [
          'リュックが気[き]に入[い]らなかったと伝[つた]えるため',
          '旅行[りょこう]をやめたことを伝[つた]えるため',
          '商品[しょうひん]が届[とど]くのが遅[おそ]かったと伝[つた]えるため',
          '交換[こうかん]できる状態[じょうたい]だと伝[つた]えるため'
        ],
        correct: 3,
        explain: 'Saying it is unused tells the shop it can still be exchanged.'
      },
      {
        prompt: '「お手数[てすう]をおかけしますが」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          'すぐに返事[へんじ]をください',
          '面倒[めんどう]なことを頼[たの]んで申[もう]し訳[わけ]ありませんが',
          'お金[かね]はこちらが払[はら]いますが',
          'もう二度[にど]と注文[ちゅうもん]しませんが'
        ],
        correct: 1,
        explain: 'お手数をおかけしますが apologises for the trouble the request causes.'
      }
    ],
    glossary: [
      { word: 'ご担当者様', reading: 'ごたんとうしゃさま', gloss: 'Dear sir or madam (to the person in charge)' },
      { word: '注文', reading: 'ちゅうもん', gloss: 'order' },
      { word: '交換', reading: 'こうかん', gloss: 'exchange' },
      { word: 'お手数', reading: 'おてすう', gloss: 'trouble, bother' }
    ]
  },
  {
    key: 'n3-24-gakkou-no-uwasa',
    title: '音楽室[おんがくしつ]のうわさ',
    level: 'N3',
    topic: 'Story',
    text:
      '私[わたし]の学校[がっこう]には、「夜[よる]になると音楽室[おんがくしつ]のピアノがひとりでに鳴[な]る」といううわさがある。\n' +
      'ある日[ひ]、忘[わす]れ物[もの]を取[と]りに夜[よる]の学校[がっこう]に戻[もど]ると、本当[ほんとう]に音楽室[おんがくしつ]からピアノの音[おと]が聞[き]こえてきた。足[あし]が震[ふる]えたが、勇気[ゆうき]を出[だ]してドアを開[あ]けた。\n' +
      'そこにいたのは、ピアノを弾[ひ]いている用務員[ようむいん]のおじさんだった。「昔[むかし]、ピアニストになりたかったんだ」と、おじさんは少[すこ]し恥[は]ずかしそうに笑[わら]った。',
    questions: [
      {
        prompt: '学校[がっこう]のうわさは、どんな内容[ないよう]ですか。',
        kind: 'detail',
        options: [
          '夜[よる]に音楽室[おんがくしつ]のピアノがひとりでに鳴[な]る',
          '音楽室[おんがくしつ]に幽霊[ゆうれい]の先生[せんせい]がいる',
          '夜[よる]になると学校[がっこう]のドアが開[ひら]かない',
          '音楽室[おんがくしつ]のピアノが壊[こわ]れている'
        ],
        correct: 0,
        explain: '夜になると音楽室のピアノがひとりでに鳴る: the piano plays by itself at night.'
      },
      {
        prompt: '「ひとりでに」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '一人[ひとり]で練習[れんしゅう]して',
          '誰[だれ]も触[さわ]らないのに自然[しぜん]に',
          'とても大[おお]きな音[おと]で',
          '一回[いっかい]だけ'
        ],
        correct: 1,
        explain: 'ひとりでに means by itself, with nobody doing it.'
      },
      {
        prompt: '筆者[ひっしゃ]がドアを開[あ]けたとき、どんな気持[きも]ちでしたか。',
        kind: 'inference',
        options: [
          'うわさを全然[ぜんぜん]信[しん]じていなかった',
          'ピアノを弾[ひ]きたくてわくわくしていた',
          '怖[こわ]かったが、勇気[ゆうき]を出[だ]した',
          '忘[わす]れ物[もの]のことしか考[かんが]えていなかった'
        ],
        correct: 2,
        explain: '足が震えたが、勇気を出して: legs shaking, the writer still opened the door.'
      },
      {
        prompt: 'ピアノを弾[ひ]いていたのは誰[だれ]でしたか。',
        kind: 'detail',
        options: [
          '音楽[おんがく]の先生[せんせい]',
          '筆者[ひっしゃ]の友[とも]だち',
          'プロのピアニスト',
          '用務員[ようむいん]のおじさん'
        ],
        correct: 3,
        explain: 'そこにいたのは、ピアノを弾いている用務員のおじさんだった: the school caretaker.'
      }
    ],
    glossary: [
      { word: 'うわさ', reading: 'うわさ', gloss: 'rumour' },
      { word: 'ひとりでに', reading: 'ひとりでに', gloss: 'by itself' },
      { word: '震えた', reading: 'ふるえた', gloss: 'shook, trembled' },
      { word: '用務員', reading: 'ようむいん', gloss: 'school caretaker' }
    ]
  },
  {
    key: 'n3-25-e-wo-kaku',
    title: '大人[おとな]になってから絵[え]を描[か]き始[はじ]めた',
    level: 'N3',
    topic: 'Essay',
    text:
      '三十歳[さんじゅっさい]を過[す]ぎてから、絵[え]を描[か]き始[はじ]めた。子[こ]どもの頃[ころ]は好[す]きだったのに、中学生[ちゅうがくせい]の時[とき]、友[とも]だちに下手[へた]だと言[い]われてから、ずっと描[か]かなくなっていた。\n' +
      'きっかけは、仕事[しごと]で疲[つか]れていた時[とき]に見[み]た、初心者[しょしんしゃ]向[む]けの動画[どうが]だった。「うまく描[か]こうとしなくていい」という言葉[ことば]に、心[こころ]が軽[かる]くなったのだ。\n' +
      '今[いま]は毎晩[まいばん]十分[じゅっぷん]だけ、机[つくえ]の上[うえ]のコップや窓[まど]の外[そと]の木[き]を描[か]いている。上手[じょうず]かどうかより、描[か]いている時間[じかん]そのものが楽[たの]しい。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]が長[なが]い間[あいだ]絵[え]を描[か]かなかったのは、なぜですか。',
        kind: 'detail',
        options: [
          '仕事[しごと]が忙[いそが]しかったから',
          '絵[え]の道具[どうぐ]が高[たか]かったから',
          '中学生[ちゅうがくせい]の時[とき]、友[とも]だちに下手[へた]だと言[い]われたから',
          '子[こ]どもの頃[ころ]から絵[え]が嫌[きら]いだったから'
        ],
        correct: 2,
        explain: '友だちに下手だと言われてから、ずっと描かなくなっていた.'
      },
      {
        prompt: '筆者[ひっしゃ]が描[か]き始[はじ]めたきっかけは何[なん]ですか。',
        kind: 'detail',
        options: [
          '初心者[しょしんしゃ]向[む]けの動画[どうが]の言葉[ことば]',
          '友[とも]だちからのプレゼント',
          '会社[かいしゃ]の絵[え]の教室[きょうしつ]',
          '子[こ]どもの頃[ころ]の絵[え]を見[み]つけたこと'
        ],
        correct: 0,
        explain: 'きっかけは … 初心者向けの動画だった: a beginners\' video and its line about not trying to draw well.'
      },
      {
        prompt: '「心[こころ]が軽[かる]くなった」の意味[いみ]に近[ちか]いのはどれですか。',
        kind: 'vocab',
        options: [
          '体重[たいじゅう]が減[へ]った',
          '気持[きも]ちが楽[らく]になった',
          '絵[え]がうまくなった',
          'やる気[き]がなくなった'
        ],
        correct: 1,
        explain: '心が軽くなる means a weight off your mind: the pressure to draw well lifted.'
      },
      {
        prompt: '筆者[ひっしゃ]が今[いま]、一番[いちばん]大切[たいせつ]にしていることは何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '毎晩[まいばん]たくさんの絵[え]を描[か]くこと',
          'いつか絵[え]を売[う]れるようになること',
          '友[とも]だちに上手[じょうず]だと言[い]われること',
          'うまさより描[か]く時間[じかん]を楽[たの]しむこと'
        ],
        correct: 3,
        explain: '上手かどうかより、描いている時間そのものが楽しい: the time spent drawing matters more than skill.'
      }
    ],
    glossary: [
      { word: '描き始めた', reading: 'かきはじめた', gloss: 'started drawing' },
      { word: '下手', reading: 'へた', gloss: 'bad at' },
      { word: '初心者向け', reading: 'しょしんしゃむけ', gloss: 'for beginners' },
      { word: 'そのもの', reading: 'そのもの', gloss: 'itself' }
    ]
  }
]
