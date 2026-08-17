import type { JpPassage } from '../types'

// N3 graded reading passages. Keys FROZEN. Rules in ../types.ts and
// tests/jpReadings.test.ts — every kanji run carries a reading, 4 questions,
// 3-6 glossary entries whose words occur in the stripped text.
export const N3_PASSAGES: JpPassage[] = [
  {
    key: 'n3-01-jimaku',
    title: '字幕[じまく]と吹[ふ]き替[か]え',
    level: 'N3',
    topic: 'Essay',
    text:
      '字幕[じまく]で見[み]るか、吹[ふ]き替[か]えで見[み]るか。これは映画[えいが]やアニメが好[す]きな人[ひと]の間[あいだ]で、いつまでも終[お]わらない話題[わだい]だ。\n' +
      '私[わたし]は昔[むかし]、字幕[じまく]のほうが正[ただ]しいと思[おも]っていた。しかし、字幕[じまく]を読[よ]んでいる間[あいだ]は、画面[がめん]の下[した]に目[め]が集[あつ]まってしまう。つまり、絵[え]を見[み]る時間[じかん]が減[へ]るわけだ。\n' +
      'ただし、吹[ふ]き替[か]えがいつも楽[らく]だというわけではない。声[こえ]が変[か]わると、登場人物[とうじょうじんぶつ]の印象[いんしょう]まで変[か]えられてしまうことがある。作品[さくひん]によって選[えら]ぶようになってから、私[わたし]はどちらも楽[たの]しめるようになった。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]は昔[むかし]、どう思[おも]っていましたか。',
        kind: 'detail',
        options: [
          '字幕[じまく]のほうが正[ただ]しい',
          '吹[ふ]き替[か]えのほうが正[ただ]しい',
          'どちらでもいい',
          'アニメは見[み]ないほうがいい'
        ],
        correct: 0,
        explain:
          'The second paragraph opens with 私は昔、字幕のほうが正しいと思っていた — past tense, so it reports a belief he has since moved away from.'
      },
      {
        prompt: '字幕[じまく]を読[よ]んでいるとき、何[なに]が起[お]こると筆者[ひっしゃ]は言[い]っていますか。',
        kind: 'detail',
        options: [
          '声[こえ]が聞[き]こえなくなる',
          '絵[え]を見[み]る時間[じかん]が減[へ]る',
          '話[はなし]が分[わ]からなくなる',
          '画面[がめん]が暗[くら]くなる'
        ],
        correct: 1,
        explain:
          'つまり、絵を見る時間が減るわけだ restates the sentence before it about the eyes gathering at the bottom of the screen.'
      },
      {
        prompt: 'この文章[ぶんしょう]で筆者[ひっしゃ]が一番[いちばん]言[い]いたいことは何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '字幕[じまく]は絶対[ぜったい]に使[つか]うべきだ',
          '吹[ふ]き替[か]えは楽[らく]だから初心者[しょしんしゃ]向[む]きだ',
          '作品[さくひん]に合[あ]わせて選[えら]べばいい',
          '声[こえ]が変[か]わると作品[さくひん]が悪[わる]くなる'
        ],
        correct: 2,
        explain:
          'The closing sentence — 作品によって選ぶようになってから、私はどちらも楽しめるようになった — makes choosing per work, rather than one fixed side, the conclusion.'
      },
      {
        prompt: '本文[ほんぶん]の「楽[らく]だ」に一番[いちばん]近[ちか]い意味[いみ]はどれですか。',
        kind: 'vocab',
        options: [
          '音[おと]がとても大[おお]きい',
          '楽[たの]しくて笑[わら]ってしまう',
          '意味[いみ]が分[わ]かりにくい',
          '見[み]るのに力[ちから]がいらない'
        ],
        correct: 3,
        explain:
          'In 吹き替えがいつも楽だ the kanji is read らく (easy, effortless), not たのしい — the paragraph is weighing effort, not enjoyment.'
      }
    ],
    glossary: [
      { word: '字幕', reading: 'じまく', gloss: 'subtitles' },
      { word: '吹き替え', reading: 'ふきかえ', gloss: 'dubbing' },
      { word: '話題', reading: 'わだい', gloss: 'topic of conversation' },
      { word: '登場人物', reading: 'とうじょうじんぶつ', gloss: 'a character in a story' },
      { word: '印象', reading: 'いんしょう', gloss: 'impression' }
    ]
  },
  {
    key: 'n3-02-nekodo-oshirase',
    title: '「ねこ堂[どう]」営業時間[えいぎょうじかん]変更[へんこう]のお知[し]らせ',
    level: 'N3',
    topic: 'Shop notice',
    text:
      'いつもねこ堂[どう]をご利用[りよう]いただき、ありがとうございます。四月[しがつ]一日[ついたち]より、平日[へいじつ]の開店時間[かいてんじかん]を十時[じゅうじ]から十二時[じゅうにじ]に変[か]えさせていただきます。閉店[へいてん]は今[いま]までどおり二十二時[にじゅうにじ]です。土曜日[どようび]と日曜日[にちようび]は変[か]わりません。\n' +
      '朝[あさ]は静[しず]かに本[ほん]を読[よ]まれるお客様[きゃくさま]が多[おお]かったのですが、店員[てんいん]が足[た]りず、開[あ]けられない日[ひ]が増[ふ]えてしまいました。ご不便[ふべん]をおかけしますが、ご理解[りかい]いただければ幸[さいわ]いです。なお、会員[かいいん]カードの有効期限[ゆうこうきげん]は変[か]わりません。',
    questions: [
      {
        prompt: '四月[しがつ]一日[ついたち]から、平日[へいじつ]の店[みせ]は何時[なんじ]に開[あ]きますか。',
        kind: 'detail',
        options: ['十時[じゅうじ]', '二十二時[にじゅうにじ]', '十二時[じゅうにじ]', '朝[あさ]の八時[はちじ]'],
        correct: 2,
        explain:
          '開店時間を十時から十二時に変えさせていただきます — から marks the old opening time and に the new one.'
      },
      {
        prompt: '土曜日[どようび]と日曜日[にちようび]の営業[えいぎょう]はどうなりますか。',
        kind: 'detail',
        options: [
          '今[いま]までと同[おな]じ',
          '二時間[にじかん]遅[おそ]くなる',
          '休[やす]みになる',
          '朝[あさ]だけ開[あ]く'
        ],
        correct: 0,
        explain:
          '土曜日と日曜日は変わりません says plainly that the weekend hours are untouched by this notice.'
      },
      {
        prompt: 'この店[みせ]が開店[かいてん]を遅[おそ]くした理由[りゆう]は何[なん]だと考[かんが]えられますか。',
        kind: 'inference',
        options: [
          '朝[あさ]のお客様[きゃくさま]が来[こ]なくなったから',
          '家賃[やちん]が高[たか]くなったから',
          '本[ほん]が売[う]れなくなったから',
          '働[はたら]く人[ひと]が少[すく]ないから'
        ],
        correct: 3,
        explain:
          '店員が足りず、開けられない日が増えてしまいました names staffing as the cause; the notice even says morning customers were many.'
      },
      {
        prompt: '本文[ほんぶん]の「なお」はどんな意味[いみ]で使[つか]われていますか。',
        kind: 'vocab',
        options: [
          'しかし、反対[はんたい]に',
          'つけ加[くわ]えて言[い]うと',
          'すぐに、急[いそ]いで',
          'だから、その結果[けっか]'
        ],
        correct: 1,
        explain:
          'なお opens a separate added note — here the membership card line, which is neither a contrast with nor a result of what came before.'
      }
    ],
    glossary: [
      { word: '利用', reading: 'りよう', gloss: 'use, patronage' },
      { word: '閉店', reading: 'へいてん', gloss: 'closing time; shop closing' },
      { word: '店員', reading: 'てんいん', gloss: 'shop staff' },
      { word: '不便', reading: 'ふべん', gloss: 'inconvenience' },
      { word: '有効期限', reading: 'ゆうこうきげん', gloss: 'expiry date' }
    ]
  },
  {
    key: 'n3-03-muzukashii-game',
    title: '難[むずか]しいゲームが好[す]きな理由[りゆう]',
    level: 'N3',
    topic: 'Games blog',
    text:
      '先週[せんしゅう]から遊[あそ]んでいるアクションゲームが、とにかく難[むずか]しい。最初[さいしょ]のボスに二十回[にじゅっかい]以上[いじょう]負[ま]けて、一度[いちど]はコントローラーを置[お]いてしまった。\n' +
      'しかし、やめようとは思[おも]わなかった。死[し]ぬたびに、敵[てき]の動[うご]きが少[すこ]しずつ読[よ]めるようになるからだ。難[むずか]しいゲームは、プレイヤーを苦[くる]しめるために作[つく]られているわけではない。上手[じょうず]になっていく自分[じぶん]を見[み]せるために作[つく]られているのだと思[おも]う。\n' +
      'ただし、時間[じかん]がない人[ひと]にはすすめにくい。私[わたし]も、平日[へいじつ]は一時間[いちじかん]だけ遊[あそ]ぶことにしている。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]は最初[さいしょ]のボスに何回[なんかい]ぐらい負[ま]けましたか。',
        kind: 'detail',
        options: [
          '一度[いちど]だけ',
          '十回[じゅっかい]ぐらい',
          '一度[いちど]も負[ま]けていない',
          '二十回[にじゅっかい]以上[いじょう]'
        ],
        correct: 3,
        explain:
          '最初のボスに二十回以上負けて — 以上 means twenty or more, so anything smaller than twenty is wrong.'
      },
      {
        prompt: '筆者[ひっしゃ]は難[むずか]しいゲームをどう考[かんが]えていますか。',
        kind: 'main-idea',
        options: [
          'プレイヤーを苦[くる]しめるために作[つく]られている',
          '時間[じかん]がある人[ひと]だけのものだ',
          '成長[せいちょう]を見[み]せるために作[つく]られている',
          'もっと簡単[かんたん]にするべきだ'
        ],
        correct: 2,
        explain:
          'He rejects 苦しめるために with ～わけではない and then gives his own answer: 上手になっていく自分を見せるために作られている.'
      },
      {
        prompt: '筆者[ひっしゃ]が平日[へいじつ]は一時間[いちじかん]だけ遊[あそ]ぶことにしているのはなぜですか。',
        kind: 'inference',
        options: [
          'ゲームに飽[あ]きたから',
          '平日[へいじつ]は自由[じゆう]な時間[じかん]が少[すく]ないから',
          '一時間[いちじかん]で必[かなら]ず勝[か]てるから',
          '目[め]が疲[つか]れると医者[いしゃ]に言[い]われたから'
        ],
        correct: 1,
        explain:
          '時間がない人にはすすめにくい is followed by 私も, which places the writer himself among the people short of time.'
      },
      {
        prompt: '本文[ほんぶん]の「たびに」に一番[いちばん]近[ちか]い言[い]い方[かた]はどれですか。',
        kind: 'vocab',
        options: [
          'するときはいつも',
          'したあとで一度[いちど]だけ',
          'する前[まえ]に必[かなら]ず',
          'することはめったにない'
        ],
        correct: 0,
        explain:
          '死ぬたびに means every single time he dies — a repeated trigger, not a one-off event or a rare one.'
      }
    ],
    glossary: [
      { word: '最初', reading: 'さいしょ', gloss: 'the first; the beginning' },
      { word: '敵', reading: 'てき', gloss: 'enemy' },
      { word: '動き', reading: 'うごき', gloss: 'movement' },
      { word: '上手', reading: 'じょうず', gloss: 'skilled, good at' },
      { word: '平日', reading: 'へいじつ', gloss: 'weekday' }
    ]
  },
  {
    key: 'n3-04-tegami-tomodachi',
    title: '遠[とお]くの町[まち]からの手紙[てがみ]',
    level: 'N3',
    topic: 'Letter',
    text:
      'お元気[げんき]ですか。こちらに引[ひ]っ越[こ]してから、もう半年[はんとし]がたちました。\n' +
      '新[あたら]しい町[まち]は、駅[えき]の前[まえ]に大[おお]きな本屋[ほんや]があるほかは、静[しず]かなところです。最初[さいしょ]は知[し]り合[あ]いが一人[ひとり]もいなくて、部屋[へや]でゲームばかりしていました。しかし、隣[となり]の人[ひと]に犬[いぬ]の散歩[さんぽ]にさそわれてから、少[すこ]しずつ話[はな]せるようになりました。\n' +
      'そちらの様子[ようす]も知[し]らせてください。夏休[なつやす]みには帰[かえ]るつもりですから、その時[とき]はまたいっしょにラーメンを食[た]べに行[い]きましょう。返事[へんじ]を待[ま]っています。',
    questions: [
      {
        prompt: 'この人[ひと]が引[ひ]っ越[こ]してから、どのくらいたちましたか。',
        kind: 'detail',
        options: ['一年[いちねん]', '六[ろっ]か月[げつ]', '一[いっ]か月[げつ]', '三年[さんねん]'],
        correct: 1,
        explain:
          'もう半年がたちました — 半年 is half a year, which is the same span as six months.'
      },
      {
        prompt: '新[あたら]しい町[まち]について、正[ただ]しいものはどれですか。',
        kind: 'detail',
        options: [
          '夜[よる]までにぎやかで、少[すこ]しうるさい',
          '駅[えき]から遠[とお]くて、買[か]い物[もの]が不便[ふべん]だ',
          '大[おお]きな本屋[ほんや]があるが、静[しず]かだ',
          '店[みせ]も駅[えき]もない小[ちい]さな村[むら]だ'
        ],
        correct: 2,
        explain:
          '駅の前に大きな本屋があるほかは、静かなところです — ～ほかは marks the bookshop as the single exception to the quiet.'
      },
      {
        prompt: '隣[となり]の人[ひと]について、どんなことが分[わ]かりますか。',
        kind: 'inference',
        options: [
          '犬[いぬ]がきらいだ',
          'この人[ひと]と同[おな]じゲームをしている',
          '前[まえ]から知[し]り合[あ]いだった',
          'この人[ひと]に声[こえ]をかけてくれた'
        ],
        correct: 3,
        explain:
          '犬の散歩にさそわれて is passive, so the neighbour is the one who did the inviting and made the first move.'
      },
      {
        prompt: 'この手紙[てがみ]を書[か]いた一番[いちばん]の目的[もくてき]は何[なん]ですか。',
        kind: 'main-idea',
        options: [
          '様子[ようす]を知[し]らせ、返事[へんじ]を頼[たの]むこと',
          '新[あたら]しい町[まち]に引[ひ]っ越[こ]すようにすすめること',
          'ラーメンの店[みせ]を教[おし]えてほしいと頼[たの]むこと',
          '仕事[しごと]が忙[いそが]しいことをあやまること'
        ],
        correct: 0,
        explain:
          'The closing lines そちらの様子も知らせてください and 返事を待っています are what the letter actually asks for.'
      }
    ],
    glossary: [
      { word: '半年', reading: 'はんとし', gloss: 'half a year' },
      { word: '知り合い', reading: 'しりあい', gloss: 'acquaintance' },
      { word: '散歩', reading: 'さんぽ', gloss: 'a walk' },
      { word: '様子', reading: 'ようす', gloss: 'how things are, state' },
      { word: '返事', reading: 'へんじ', gloss: 'reply' }
    ]
  },
  {
    key: 'n3-05-machi-no-neko',
    title: '駅[えき]の裏[うら]の猫[ねこ]たち',
    level: 'N3',
    topic: 'Neighbourhood',
    text:
      'この町[まち]の駅[えき]の裏[うら]には、昔[むかし]から猫[ねこ]がたくさん住[す]んでいる。えさをやる人[ひと]がいる一方[いっぽう]で、ごみが増[ふ]えると困[こま]っている人[ひと]もいた。\n' +
      '三年前[さんねんまえ]、近所[きんじょ]の人[ひと]たちが集[あつ]まって、猫[ねこ]の数[かず]を増[ふ]やさないための会[かい]を作[つく]った。医者[いしゃ]に見[み]てもらった猫[ねこ]には、耳[みみ]に小[ちい]さな印[しるし]が付[つ]けられる。つまり、その印[しるし]を見[み]れば、世話[せわ]をされている猫[ねこ]かどうかが分[わ]かるわけだ。\n' +
      '今[いま]では苦情[くじょう]がほとんどなくなったという。ただし、会[かい]のお金[かね]は寄付[きふ]だけで、活動[かつどう]を続[つづ]けるのは楽[らく]ではないそうだ。',
    questions: [
      {
        prompt: '耳[みみ]に印[しるし]が付[つ]いている猫[ねこ]は、どんな猫[ねこ]ですか。',
        kind: 'detail',
        options: [
          'まだ子[こ]どもの猫[ねこ]',
          '家[いえ]の中[なか]で飼[か]われている猫[ねこ]',
          '医者[いしゃ]に見[み]てもらった猫[ねこ]',
          '会[かい]に寄付[きふ]をした人[ひと]の猫[ねこ]'
        ],
        correct: 2,
        explain:
          '医者に見てもらった猫には、耳に小さな印が付けられる — the mark records a visit to the vet, not age or ownership.'
      },
      {
        prompt: 'この文章[ぶんしょう]は主[おも]に何[なに]について書[か]かれていますか。',
        kind: 'main-idea',
        options: [
          '猫[ねこ]の病気[びょうき]の治[なお]し方[かた]',
          '町[まち]の人[ひと]たちの猫[ねこ]への取[と]り組[く]み',
          '駅[えき]の裏[うら]にごみが増[ふ]えた理由[りゆう]',
          '猫[ねこ]を飼[か]うときに必要[ひつよう]になるお金[かね]'
        ],
        correct: 1,
        explain:
          'The article follows one neighbourhood group from its founding to its funding worries; the vet mark is a step inside that story.'
      },
      {
        prompt: '会[かい]の活動[かつどう]について、これからの心配[しんぱい]は何[なん]ですか。',
        kind: 'inference',
        options: [
          'お金[かね]が足[た]りなくなること',
          '猫[ねこ]の数[かず]が急[きゅう]に減[へ]ること',
          '苦情[くじょう]がまた増[ふ]えること',
          '医者[いしゃ]が町[まち]からいなくなること'
        ],
        correct: 0,
        explain:
          '会のお金は寄付だけで、活動を続けるのは楽ではない points at funding as the fragile part; complaints have already dropped.'
      },
      {
        prompt: '本文[ほんぶん]の「一方[いっぽう]で」はどんな働[はたら]きをしていますか。',
        kind: 'vocab',
        options: [
          '前[まえ]の文[ぶん]の理由[りゆう]を説明[せつめい]する',
          '話[はなし]の順番[じゅんばん]を表[あらわ]す',
          '例[れい]をいくつか挙[あ]げる',
          '反対[はんたい]の立場[たちば]を並[なら]べる'
        ],
        correct: 3,
        explain:
          'えさをやる人がいる一方で、ごみが増えると困っている人もいた sets two opposing groups of residents side by side.'
      }
    ],
    glossary: [
      { word: '一方', reading: 'いっぽう', gloss: 'on the other hand' },
      { word: '世話', reading: 'せわ', gloss: 'care, looking after' },
      { word: '苦情', reading: 'くじょう', gloss: 'complaint' },
      { word: '寄付', reading: 'きふ', gloss: 'donation' },
      { word: '活動', reading: 'かつどう', gloss: 'activity, campaign' }
    ]
  },
  {
    key: 'n3-06-yoru-no-toshokan',
    title: '小説[しょうせつ]「夜[よる]の図書館[としょかん]」の感想[かんそう]',
    level: 'N3',
    topic: 'Book review',
    text:
      '先月[せんげつ]、友[とも]だちにすすめられて「夜[よる]の図書館[としょかん]」という小説[しょうせつ]を読[よ]んだ。\n' +
      '主人公[しゅじんこう]は、母[はは]を亡[な]くしたばかりの少年[しょうねん]である。彼[かれ]は毎晩[まいばん]、閉[し]まったはずの図書館[としょかん]に入[はい]ってしまう。そこで会[あ]う老人[ろうじん]が本[ほん]を読[よ]んで聞[き]かせるたびに、少年[しょうねん]は少[すこ]しずつ話[はな]せるようになる。\n' +
      '前半[ぜんはん]は同[おな]じような場面[ばめん]が続[つづ]き、少[すこ]し長[なが]く感[かん]じた。しかし、最後[さいご]まで読[よ]めば、その繰[く]り返[かえ]しが必要[ひつよう]だったことが分[わ]かる。泣[な]ける話[はなし]というわけではないが、読[よ]み終[お]わったあと、しばらく本[ほん]を閉[と]じられなかった。',
    questions: [
      {
        prompt: '少年[しょうねん]が話[はな]せるようになったのは、何[なに]がきっかけですか。',
        kind: 'detail',
        options: [
          '学校[がっこう]の先生[せんせい]に何度[なんど]も注意[ちゅうい]されたこと',
          '母[はは]が元気[げんき]になって帰[かえ]ってきたこと',
          '自分[じぶん]で毎晩[まいばん]小説[しょうせつ]を書[か]いたこと',
          '老人[ろうじん]が本[ほん]を読[よ]んでくれたこと'
        ],
        correct: 3,
        explain:
          '老人が本を読んで聞かせるたびに、少年は少しずつ話せるようになる ties the change directly to the readings.'
      },
      {
        prompt: '筆者[ひっしゃ]は前半[ぜんはん]をどう感[かん]じましたか。',
        kind: 'detail',
        options: [
          '少[すこ]し長[なが]いと感[かん]じた',
          '一番[いちばん]おもしろいと感[かん]じた',
          '短[みじか]すぎると感[かん]じた',
          '全[まった]く読[よ]めないと感[かん]じた'
        ],
        correct: 0,
        explain:
          '前半は同じような場面が続き、少し長く感じた is the one complaint he makes about the book.'
      },
      {
        prompt: 'この文章[ぶんしょう]から分[わ]かる、筆者[ひっしゃ]のこの小説[しょうせつ]への考[かんが]えはどれですか。',
        kind: 'main-idea',
        options: [
          '前半[ぜんはん]が退屈[たいくつ]なので、すすめない',
          '泣[な]ける話[はなし]なので、泣[な]きたい人[ひと]に合[あ]う',
          '気[き]になる点[てん]はあるが、いい作品[さくひん]だ',
          '短[みじか]くて読[よ]みやすいので、初心者[しょしんしゃ]向[む]きだ'
        ],
        correct: 2,
        explain:
          'He admits 少し長く感じた, then says the repetition turned out to be necessary and that he could not close the book afterwards.'
      },
      {
        prompt: '本文[ほんぶん]の「泣[な]ける話[はなし]というわけではない」はどんな意味[いみ]ですか。',
        kind: 'vocab',
        options: [
          '泣[な]く人[ひと]は一人[ひとり]もいないはずだ',
          '泣[な]かせることが目的[もくてき]の話[はなし]ではない',
          '泣[な]くほど悲[かな]しい話[はなし]だ',
          '泣[な]いてはいけないという決[き]まりがある'
        ],
        correct: 1,
        explain:
          '～というわけではない softly denies the conclusion a reader might jump to: it is not that this is a tear-jerker, though it can still move you.'
      }
    ],
    glossary: [
      { word: '主人公', reading: 'しゅじんこう', gloss: 'protagonist' },
      { word: '老人', reading: 'ろうじん', gloss: 'an old person' },
      { word: '前半', reading: 'ぜんはん', gloss: 'the first half' },
      { word: '場面', reading: 'ばめん', gloss: 'scene' },
      { word: '繰り返し', reading: 'くりかえし', gloss: 'repetition' }
    ]
  }
]
