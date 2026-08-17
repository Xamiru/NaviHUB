import type { JpPassage } from '../types'

// N2 graded reading passages. Keys FROZEN. Rules in ../types.ts and
// tests/jpReadings.test.ts — every kanji run carries a reading, 4 questions,
// 3-6 glossary entries whose words occur in the stripped text.
export const N2_PASSAGES: JpPassage[] = [
  {
    key: 'n2-01-zaitaku-kinmu',
    title: '在宅勤務[ざいたくきんむ]と通勤[つうきん]のこれから',
    level: 'N2',
    topic: 'Work',
    text:
      '新[あたら]しい技術[ぎじゅつ]の普及[ふきゅう]に伴[ともな]って、在宅勤務[ざいたくきんむ]を認[みと]める企業[きぎょう]が急速[きゅうそく]に増[ふ]えている。ある調査[ちょうさ]によれば、週[しゅう]の半分[はんぶん]以上[いじょう]を自宅[じたく]で働[はたら]く人[ひと]は、五年前[ごねんまえ]の三倍[さんばい]に達[たっ]したという。\n' +
      '通勤[つうきん]に費[つい]やしていた時間[じかん]がなくなったことに対[たい]して、多[おお]くの人[ひと]は肯定的[こうていてき]である。しかし、同僚[どうりょう]との何気[なにげ]ない会話[かいわ]が減[へ]ったため、仕事[しごと]の進[すす]め方[かた]について相談[そうだん]しにくくなったという声[こえ]も少[すく]なくない。\n' +
      '在宅勤務[ざいたくきんむ]を制度[せいど]として定[さだ]めた以上[いじょう]、企業[きぎょう]は働[はたら]く場所[ばしょ]を選[えら]べる自由[じゆう]と、人[ひと]と人[ひと]とのつながりの両方[りょうほう]を守[まも]る工夫[くふう]をせざるを得[え]ないだろう。',
    questions: [
      {
        prompt: '調査[ちょうさ]によると、自宅[じたく]で働[はたら]く人[ひと]の数[かず]はどうなったか。',
        kind: 'detail',
        options: [
          '五年前[ごねんまえ]の半分[はんぶん]に減[へ]った',
          '五年前[ごねんまえ]の三倍[さんばい]になった',
          '五年前[ごねんまえ]とほとんど変[か]わらない',
          '調査[ちょうさ]では分[わ]からなかった'
        ],
        correct: 1,
        explain:
          'The first paragraph ends with go-nen-mae no san-bai ni tasshita, so the figure tripled rather than halved.'
      },
      {
        prompt: '「せざるを得[え]ない」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          'するしかないということ',
          'しなくてもかまわないということ',
          'してはいけないということ',
          'しないほうがよいということ'
        ],
        correct: 0,
        explain:
          'The pattern sezaru o enai marks an unavoidable obligation, so in the last sentence the firms have no choice but to act.'
      },
      {
        prompt: '在宅勤務[ざいたくきんむ]が広[ひろ]がったことで、企業[きぎょう]が新[あら]たに向[む]き合[あ]う課題[かだい]は何[なに]か。',
        kind: 'inference',
        options: [
          '通勤[つうきん]の時間[じかん]をどう短[みじか]くするか',
          '新[あたら]しい技術[ぎじゅつ]をどこから買[か]うか',
          '社員[しゃいん]同士[どうし]のつながりをどう保[たも]つか',
          '調査[ちょうさ]の結果[けっか]をどう公表[こうひょう]するか'
        ],
        correct: 2,
        explain:
          'The second paragraph reports that casual talk with colleagues has thinned out, and the last sentence names tsunagari as the thing firms must protect.'
      },
      {
        prompt: 'この文章[ぶんしょう]で筆者[ひっしゃ]が最[もっと]も言[い]いたいことは何[なに]か。',
        kind: 'main-idea',
        options: [
          '在宅勤務[ざいたくきんむ]はできるだけやめたほうがよい',
          '通勤[つうきん]の時間[じかん]は無駄[むだ]ではない',
          '企業[きぎょう]は調査[ちょうさ]を続[つづ]けるべきだ',
          '自由[じゆう]とつながりの両立[りょうりつ]が課題[かだい]だ'
        ],
        correct: 3,
        explain:
          'The closing sentence puts basho o eraberu jiyuu and hito to hito to no tsunagari side by side as the two things to be kept together.'
      }
    ],
    glossary: [
      { word: '普及', reading: 'ふきゅう', gloss: 'spread, diffusion' },
      { word: '在宅勤務', reading: 'ざいたくきんむ', gloss: 'working from home' },
      { word: '肯定的', reading: 'こうていてき', gloss: 'positive, affirmative' },
      { word: '同僚', reading: 'どうりょう', gloss: 'colleague' },
      { word: '工夫', reading: 'くふう', gloss: 'a device, a way of managing something' }
    ]
  },
  {
    key: 'n2-02-toshokan-kashidashi',
    title: '貸出[かしだし]規則[きそく]の変更[へんこう]について',
    level: 'N2',
    topic: 'Notice',
    text:
      '当[とう]図書館[としょかん]では、来月[らいげつ]から貸出[かしだし]の規則[きそく]を一部[いちぶ]変更[へんこう]いたします。利用者[りようしゃ]お一人[ひとり]につき、一度[いちど]に借[か]りられる本[ほん]は十冊[じっさつ]までとし、貸出[かしだし]期間[きかん]は二週間[にしゅうかん]といたします。\n' +
      '返却[へんきゃく]が遅[おく]れた場合[ばあい]、遅[おく]れた日数[にっすう]に応[おう]じて、新[あたら]たな貸出[かしだし]を停止[ていし]させていただきます。なお、他[た]の利用者[りようしゃ]の予約[よやく]が入[はい]っている資料[しりょう]については、期間[きかん]の延長[えんちょう]をお受[う]けできません。\n' +
      '限[かぎ]られた資料[しりょう]を多[おお]くの方[かた]に利用[りよう]していただくための変更[へんこう]ですので、ご理解[りかい]とご協力[きょうりょく]をお願[ねが]いいたします。',
    questions: [
      {
        prompt: '一度[いちど]に借[か]りられる本[ほん]は何冊[なんさつ]までか。',
        kind: 'detail',
        options: ['五冊[ごさつ]まで', '七冊[ななさつ]まで', '十冊[じっさつ]まで', '冊数[さっすう]の制限[せいげん]はない'],
        correct: 2,
        explain:
          'The first paragraph states hon wa jissatsu made to shi, so ten volumes is the ceiling per user.'
      },
      {
        prompt: '予約[よやく]が入[はい]っている資料[しりょう]について、正[ただ]しいものはどれか。',
        kind: 'detail',
        options: [
          '貸出[かしだし]期間[きかん]を延[の]ばすことができる',
          '借[か]りることができない',
          '二週間[にしゅうかん]より長[なが]く借[か]りられる',
          '予約[よやく]が終[お]わるまで期間[きかん]を延[の]ばせない'
        ],
        correct: 3,
        explain:
          'The nao sentence says kikan no enchou o o-uke dekimasen for reserved material; it is still lendable, only not extendable.'
      },
      {
        prompt: '「日数[にっすう]に応[おう]じて」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          '遅[おく]れた日数[にっすう]に合[あ]わせて',
          '遅[おく]れた日数[にっすう]に関係[かんけい]なく',
          '日数[にっすう]を数[かぞ]えないで',
          '日数[にっすう]が決[き]まっていないので'
        ],
        correct: 0,
        explain:
          'The pattern ni oujite means in proportion to, so the suspension is measured against how many days the return was late.'
      },
      {
        prompt: 'この知[し]らせが最[もっと]も伝[つた]えたいことは何[なに]か。',
        kind: 'main-idea',
        options: [
          '図書館[としょかん]が来月[らいげつ]で閉[と]じられること',
          '貸出[かしだし]の規則[きそく]が変[か]わること',
          '新[あたら]しい資料[しりょう]が増[ふ]えること',
          '利用者[りようしゃ]の数[かず]が減[へ]っていること'
        ],
        correct: 1,
        explain:
          'The opening sentence announces kashidashi no kisoku o ichibu henkou, and every later line spells that change out.'
      }
    ],
    glossary: [
      { word: '貸出', reading: 'かしだし', gloss: 'lending, loan' },
      { word: '返却', reading: 'へんきゃく', gloss: 'return of an item' },
      { word: '延長', reading: 'えんちょう', gloss: 'extension' },
      { word: '資料', reading: 'しりょう', gloss: 'material, library holdings' },
      { word: '停止', reading: 'ていし', gloss: 'suspension, halt' }
    ]
  },
  {
    key: 'n2-03-matsuri-chushi',
    title: '祭[まつ]りはなぜ中止[ちゅうし]されたのか',
    level: 'N2',
    topic: 'Community',
    text:
      '今年[ことし]の夏[なつ]、この町[まち]で四十年[よんじゅうねん]続[つづ]いてきた祭[まつ]りが中止[ちゅうし]された。理由[りゆう]は資金[しきん]の不足[ふそく]ではなく、当日[とうじつ]の運営[うんえい]を担[にな]う人手[ひとで]が集[あつ]まらなかったことにある。\n' +
      '中心[ちゅうしん]となって準備[じゅんび]を進[すす]めてきた世代[せだい]は高齢化[こうれいか]し、若[わか]い住民[じゅうみん]の多[おお]くは町[まち]の外[そと]で働[はたら]いている。準備[じゅんび]に何[なん]か月[げつ]もかかる行事[ぎょうじ]を、限[かぎ]られた人数[にんずう]で支[ささ]えるわけにはいかなかった。\n' +
      '実行[じっこう]委員会[いいんかい]は、来年[らいねん]は規模[きぼ]を小[ちい]さくしてでも再開[さいかい]したいとしている。伝統[でんとう]を守[まも]ることは、形[かたち]をそのまま残[のこ]すことと必[かなら]ずしも同[おな]じではない。',
    questions: [
      {
        prompt: '祭[まつ]りが中止[ちゅうし]された理由[りゆう]は何[なに]か。',
        kind: 'detail',
        options: [
          'お金[かね]が足[た]りなかったから',
          '参加[さんか]する客[きゃく]が減[へ]ったから',
          '町[まち]から許可[きょか]が下[お]りなかったから',
          '人手[ひとで]が足[た]りなかったから'
        ],
        correct: 3,
        explain:
          'The second sentence says riyuu wa shikin no fusoku de wa naku and names hitode ga atsumaranakatta instead.'
      },
      {
        prompt: '実行[じっこう]委員会[いいんかい]の考[かんが]えに最[もっと]も近[ちか]いものはどれか。',
        kind: 'inference',
        options: [
          '祭[まつ]りは二度[にど]と行[おこな]わないほうがよい',
          '昔[むかし]と同[おな]じ形[かたち]でなければ意味[いみ]がない',
          '形[かたち]を変[か]えてでも続[つづ]けたい',
          '若[わか]い住民[じゅうみん]に責任[せきにん]がある'
        ],
        correct: 2,
        explain:
          'Kibo o chiisaku shite demo saikai shitai concedes the scale in order to keep the festival alive at all.'
      },
      {
        prompt: '「支[ささ]えるわけにはいかなかった」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          '支[ささ]える必要[ひつよう]がなかった',
          '支[ささ]えることはできなかった',
          '支[ささ]えないことに決[き]めたわけではない',
          '支[ささ]えたくないと思[おも]っていた'
        ],
        correct: 1,
        explain:
          'Wake ni wa ikanai denies practical possibility, not desire: too few people were left to carry a months-long preparation.'
      },
      {
        prompt: '最後[さいご]の段落[だんらく]で筆者[ひっしゃ]が述[の]べていることは何[なに]か。',
        kind: 'main-idea',
        options: [
          '伝統[でんとう]は形[かたち]を変[か]えながら受[う]け継[つ]ぐこともできる',
          '伝統[でんとう]は昔[むかし]のままの形[かたち]で残[のこ]すべきだ',
          '祭[まつ]りより仕事[しごと]のほうが大切[たいせつ]だ',
          '町[まち]の人口[じんこう]を増[ふ]やすべきだ'
        ],
        correct: 0,
        explain:
          'The final sentence separates dentou o mamoru from katachi o sono mama nokosu, so keeping a tradition need not mean freezing its shape.'
      }
    ],
    glossary: [
      { word: '人手', reading: 'ひとで', gloss: 'hands, available workers' },
      { word: '高齢化', reading: 'こうれいか', gloss: 'ageing of a population' },
      { word: '行事', reading: 'ぎょうじ', gloss: 'an event on the calendar' },
      { word: '規模', reading: 'きぼ', gloss: 'scale, size' },
      { word: '伝統', reading: 'でんとう', gloss: 'tradition' }
    ]
  },
  {
    key: 'n2-04-kikai-honyaku',
    title: '機械翻訳[きかいほんやく]と語学[ごがく]学習[がくしゅう]',
    level: 'N2',
    topic: 'Language',
    text:
      '機械翻訳[きかいほんやく]の精度[せいど]は、この数年[すうねん]で目[め]を見張[みは]るほど向上[こうじょう]した。旅行[りょこう]や簡単[かんたん]なやり取[と]りに関[かん]して言[い]えば、外国語[がいこくご]を学[まな]ばなくても困[こま]らない場面[ばめん]が確[たし]かに増[ふ]えている。\n' +
      'しかし、翻訳[ほんやく]された文[ぶん]が正[ただ]しいかどうかを判断[はんだん]するには、結局[けっきょく]その言語[げんご]についての知識[ちしき]が必要[ひつよう]になる。相手[あいて]の言[い]い方[かた]に含[ふく]まれる微妙[びみょう]な感情[かんじょう]は、機械[きかい]には訳[やく]しきれないからである。\n' +
      '道具[どうぐ]が進歩[しんぽ]したからこそ、それを使[つか]う側[がわ]の力[ちから]がこれまで以上[いじょう]に問[と]われているのではないか。',
    questions: [
      {
        prompt: '機械翻訳[きかいほんやく]について、本文[ほんぶん]で述[の]べられていることはどれか。',
        kind: 'detail',
        options: [
          '精度[せいど]が大[おお]きく上[あ]がった',
          '精度[せいど]はほとんど変[か]わっていない',
          '旅行[りょこう]では役[やく]に立[た]たない',
          '感情[かんじょう]まで正確[せいかく]に訳[やく]せる'
        ],
        correct: 0,
        explain:
          'The opening sentence says me o miharu hodo koujou shita, which is a strong statement of improvement.'
      },
      {
        prompt: '機械翻訳[きかいほんやく]だけに頼[たよ]ると、どのような問題[もんだい]が起[お]きるか。',
        kind: 'inference',
        options: [
          '言葉[ことば]を学[まな]ぶ必要[ひつよう]は全[まった]くなくなる',
          '訳[やく]の正[ただ]しさを確[たし]かめられない',
          '旅行[りょこう]でも役[やく]に立[た]たなくなる',
          '翻訳[ほんやく]の仕事[しごと]がすべてなくなる'
        ],
        correct: 1,
        explain:
          'The second paragraph says judging whether the output is right still needs knowledge of the language itself.'
      },
      {
        prompt: '「訳[やく]しきれない」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          '訳[やく]す必要[ひつよう]がない',
          '最後[さいご]まで訳[やく]し終[お]えた',
          '訳[やく]してはいけない',
          '完全[かんぜん]には訳[やく]せない'
        ],
        correct: 3,
        explain:
          'The suffix kirenai on a verb means unable to do it fully, so subtle feeling escapes the machine rather than being forbidden.'
      },
      {
        prompt: '筆者[ひっしゃ]の主張[しゅちょう]に最[もっと]も近[ちか]いものはどれか。',
        kind: 'main-idea',
        options: [
          '機械翻訳[きかいほんやく]があれば語学[ごがく]学習[がくしゅう]は要[い]らない',
          '機械翻訳[きかいほんやく]は使[つか]わないほうがよい',
          '道具[どうぐ]を生[い]かす人[ひと]の力[ちから]が重要[じゅうよう]だ',
          '翻訳[ほんやく]の精度[せいど]はもう上[あ]がらない'
        ],
        correct: 2,
        explain:
          'The last sentence turns the argument around: because the tool improved, tsukau gawa no chikara is what is now being tested.'
      }
    ],
    glossary: [
      { word: '精度', reading: 'せいど', gloss: 'accuracy' },
      { word: '向上', reading: 'こうじょう', gloss: 'improvement' },
      { word: '判断', reading: 'はんだん', gloss: 'judgement' },
      { word: '微妙', reading: 'びみょう', gloss: 'subtle, delicate' },
      { word: '結局', reading: 'けっきょく', gloss: 'in the end, after all' }
    ]
  },
  {
    key: 'n2-05-furuhonya',
    title: '古本屋[ふるほんや]という場所[ばしょ]',
    level: 'N2',
    topic: 'Essay',
    text:
      '駅[えき]から少[すこ]し離[はな]れた通[とお]りに、古[ふる]くからの古本屋[ふるほんや]が一軒[いっけん]だけ残[のこ]っている。店主[てんしゅ]によれば、売[う]り上[あ]げは十年前[じゅうねんまえ]の半分[はんぶん]以下[いか]になったという。\n' +
      '欲[ほ]しい本[ほん]が題名[だいめい]さえ分[わ]かればすぐに届[とど]く時代[じだい]において、わざわざ狭[せま]い店内[てんない]を歩[ある]き回[まわ]る人[ひと]は多[おお]くない。それでも、探[さが]していなかった本[ほん]と出会[であ]えるという点[てん]に関[かん]しては、古本屋[ふるほんや]に及[およ]ぶものはないだろう。\n' +
      '棚[たな]の並[なら]び方[かた]そのものが、店主[てんしゅ]の考[かんが]えを表[あらわ]している。本[ほん]を買[か]うだけなら画面[がめん]で足[た]りるが、選[えら]び方[かた]を学[まな]ぶには、やはりあの棚[たな]の前[まえ]に立[た]つ必要[ひつよう]がある。',
    questions: [
      {
        prompt: '店主[てんしゅ]の話[はなし]によると、店[みせ]の売[う]り上[あ]げはどうなったか。',
        kind: 'detail',
        options: [
          '十年前[じゅうねんまえ]より少[すこ]し増[ふ]えた',
          '十年前[じゅうねんまえ]とほぼ同[おな]じである',
          '十年前[じゅうねんまえ]の半分[はんぶん]以下[いか]になった',
          '十年前[じゅうねんまえ]の記録[きろく]が残[のこ]っていない'
        ],
        correct: 2,
        explain:
          'The first paragraph quotes the owner: uriage wa juu-nen-mae no hanbun ika ni natta.'
      },
      {
        prompt: '筆者[ひっしゃ]が古本屋[ふるほんや]の価値[かち]として挙[あ]げているのは何[なに]か。',
        kind: 'main-idea',
        options: [
          '探[さが]していなかった本[ほん]に出会[であ]えること',
          '注文[ちゅうもん]した本[ほん]がすぐに届[とど]くこと',
          'どの店[みせ]よりも値段[ねだん]が安[やす]いこと',
          '店内[てんない]が広[ひろ]くて歩[ある]きやすいこと'
        ],
        correct: 0,
        explain:
          'The sore demo sentence says nothing rivals a second-hand shop for meeting a book you were not looking for.'
      },
      {
        prompt: '「棚[たな]の並[なら]び方[かた]そのものが、店主[てんしゅ]の考[かんが]えを表[あらわ]している」とあるが、どういうことか。',
        kind: 'inference',
        options: [
          '棚[たな]を毎日[まいにち]ていねいに掃除[そうじ]している',
          '本[ほん]の値段[ねだん]が棚[たな]ごとに決[き]まっている',
          '棚[たな]が古[ふる]くなって直[なお]せなくなっている',
          '並[なら]べ方[かた]に店主[てんしゅ]の判断[はんだん]が表[あらわ]れている'
        ],
        correct: 3,
        explain:
          'Sono mono ga points at the arrangement itself, and the next sentence ties it to erabikata, the owner choices about what goes where.'
      },
      {
        prompt: '「及[およ]ぶものはない」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          'ほかの店[みせ]のほうが優[すぐ]れている',
          'これ以上[いじょう]のものはない',
          '同[おな]じような店[みせ]がたくさんある',
          'だれも近[ちか]づこうとしない'
        ],
        correct: 1,
        explain:
          'Oyobu mono wa nai means nothing reaches that level, so the shop is unmatched on this one point.'
      }
    ],
    glossary: [
      { word: '店主', reading: 'てんしゅ', gloss: 'shop owner' },
      { word: '売り上げ', reading: 'うりあげ', gloss: 'sales, takings' },
      { word: '題名', reading: 'だいめい', gloss: 'title of a work' },
      { word: '店内', reading: 'てんない', gloss: 'inside the shop' },
      { word: '棚', reading: 'たな', gloss: 'shelf' }
    ]
  },
  {
    key: 'n2-06-densha-sumaho',
    title: '車内[しゃない]の画面[がめん]をめぐって',
    level: 'N2',
    topic: 'Opinion',
    text:
      '朝[あさ]の電車[でんしゃ]に乗[の]ると、ほとんどの乗客[じょうきゃく]が小[ちい]さな画面[がめん]に目[め]を落[お]としている。この光景[こうけい]に対[たい]して、人[ひと]と人[ひと]との関[かか]わりが失[うしな]われたと嘆[なげ]く声[こえ]は根強[ねづよ]い。\n' +
      'しかし、かつての車内[しゃない]で人々[ひとびと]が語[かた]り合[あ]っていたかといえば、そうとも限[かぎ]らない。新聞[しんぶん]や文庫本[ぶんこぼん]に顔[かお]を向[む]けていた点[てん]において、今[いま]と大[おお]きな違[ちが]いはないのではないか。\n' +
      '問題[もんだい]は道具[どうぐ]そのものではなく、音[おと]や姿勢[しせい]が周[まわ]りに与[あた]える影響[えいきょう]に気[き]づけるかどうかである。他人[たにん]への想像力[そうぞうりょく]を欠[か]いたまま、道具[どうぐ]だけを責[せ]めるわけにはいかないだろう。',
    questions: [
      {
        prompt: '筆者[ひっしゃ]は昔[むかし]の車内[しゃない]の様子[ようす]をどのように見[み]ているか。',
        kind: 'detail',
        options: [
          '乗客[じょうきゃく]は互[たが]いによく話[はな]していた',
          '今[いま]と同[おな]じように何[なに]かを見[み]ていた',
          '新聞[しんぶん]を読[よ]む人[ひと]はほとんどいなかった',
          '車内[しゃない]はいつも静[しず]かで誰[だれ]も本[ほん]を読[よ]まなかった'
        ],
        correct: 1,
        explain:
          'The second paragraph says people used to face newspapers and paperbacks, and calls that no great difference from today.'
      },
      {
        prompt: '「そうとも限[かぎ]らない」とは、どういう意味[いみ]か。',
        kind: 'vocab',
        options: [
          '昔[むかし]も今[いま]も全[まった]く同[おな]じである',
          '昔[むかし]は必[かなら]ず話[はな]し合[あ]っていた',
          '昔[むかし]について何[なに]も分[わ]からないということだ',
          '昔[むかし]もそうだったとは言[い]えない'
        ],
        correct: 3,
        explain:
          'To mo kagiranai denies that something always holds, so the writer doubts the picture of a chatty carriage in the past.'
      },
      {
        prompt: 'この文章[ぶんしょう]で筆者[ひっしゃ]が最[もっと]も伝[つた]えたいことは何[なに]か。',
        kind: 'main-idea',
        options: [
          '問題[もんだい]は道具[どうぐ]ではなく使[つか]い方[かた]だ',
          '車内[しゃない]では画面[がめん]を見[み]るべきではない',
          '昔[むかし]の車内[しゃない]のほうが快適[かいてき]であった',
          '電車[でんしゃ]の中[なか]では新聞[しんぶん]を読[よ]むほうがよい'
        ],
        correct: 0,
        explain:
          'The last paragraph opens with mondai wa dougu sono mono de wa naku and moves the blame to how people use it.'
      },
      {
        prompt: '周[まわ]りへの配慮[はいりょ]について、筆者[ひっしゃ]は何[なに]が大切[たいせつ]だと考[かんが]えているか。',
        kind: 'inference',
        options: [
          '音[おと]を完全[かんぜん]に消[け]すこと',
          '車内[しゃない]で画面[がめん]を使[つか]わないこと',
          '自分[じぶん]の音[おと]や姿勢[しせい]が周[まわ]りに与[あた]える影響[えいきょう]に気[き]づくこと',
          '便利[べんり]な道具[どうぐ]の使用[しよう]をやめてしまうこと'
        ],
        correct: 2,
        explain:
          'The closing sentence blames the lack of souzouryoku toward others rather than the device, so imagination is what the writer asks for.'
      }
    ],
    glossary: [
      { word: '乗客', reading: 'じょうきゃく', gloss: 'passenger' },
      { word: '光景', reading: 'こうけい', gloss: 'scene, sight' },
      { word: '根強い', reading: 'ねづよい', gloss: 'deep-rooted, persistent' },
      { word: '姿勢', reading: 'しせい', gloss: 'posture, stance' },
      { word: '想像力', reading: 'そうぞうりょく', gloss: 'imagination' }
    ]
  }
]
