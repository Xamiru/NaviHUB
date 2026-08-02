// Transitive/intransitive verb pairs — the single most-repeated confusion on
// r/LearnJapanese. Content-as-code (the GACHA_GAMES/checklist idiom): the
// pairs, their pattern labels, and one authored example per side. The drill
// prefers a real Tatoeba sentence; the authored example is the always-present
// fallback, so the drill needs no pack gating.
//
// Conventions, enforced by tests/transitivity.test.ts:
//  · `key` is FROZEN (stored in quiz settings): '<intrans>-<trans>' kanji forms
//    (kana would collide: 直る/治る are both なおる).
//  · Every example uses the PAST form and contains `*Surface` verbatim, and
//    the surface is mechanically derivable as kanjiStem + conjugate(kana, cls,
//    'past') minus the kana stem — the derivability test catches typos.
//  · Intransitive examples show が, transitive show を — the particle IS the
//    lesson.

import { conjugate, type WordClass } from './conjugate'

export interface TransitivityPair {
  key: string // FROZEN: '<intrans>-<trans>'
  intrans: string
  intransKana: string
  intransClass: WordClass
  trans: string
  transKana: string
  transClass: WordClass
  gloss: string
  pattern: string // display label for the phonological pattern
  exampleIntrans: string
  exampleIntransSurface: string
  exampleIntransEn: string
  exampleTrans: string
  exampleTransSurface: string
  exampleTransEn: string
}

// Compact builder: derives key and past-form surfaces so each entry stays one
// screenful. `iSubj`/`tObj` are the sentence noun phrases.
function pair(
  intrans: string,
  intransKana: string,
  intransClass: WordClass,
  trans: string,
  transKana: string,
  transClass: WordClass,
  gloss: string,
  pattern: string,
  iSubj: string,
  iEn: string,
  tObj: string,
  tEn: string
): TransitivityPair {
  const surfaceOf = (kanji: string, kana: string, cls: WordClass): string => {
    // Trailing kana of the kanji form = okurigana; the kana stem is the rest.
    let okurigana = 0
    for (let i = kanji.length - 1; i >= 0; i--) {
      const c = kanji.codePointAt(i)!
      if ((c >= 0x3041 && c <= 0x309f) || c === 0x30fc) okurigana++
      else break
    }
    const kanjiPart = kanji.slice(0, kanji.length - okurigana)
    const past = conjugate(kana, cls, 'past')
    if (!past) return kanji
    return kanjiPart + past.slice(kana.length - okurigana)
  }
  const iSurf = surfaceOf(intrans, intransKana, intransClass)
  const tSurf = surfaceOf(trans, transKana, transClass)
  return {
    key: `${intrans}-${trans}`,
    intrans,
    intransKana,
    intransClass,
    trans,
    transKana,
    transClass,
    gloss,
    pattern,
    exampleIntrans: `${iSubj}が${iSurf}。`,
    exampleIntransSurface: iSurf,
    exampleIntransEn: iEn,
    exampleTrans: `${tObj}を${tSurf}。`,
    exampleTransSurface: tSurf,
    exampleTransEn: tEn
  }
}

export const TRANSITIVITY_PAIRS: TransitivityPair[] = [
  // ---- 〜aru (intrans) / 〜eru (trans) ----
  pair('閉まる', 'しまる', 'v5', '閉める', 'しめる', 'v1', 'close', '〜aru / 〜eru', 'ドア', 'The door closed.', '窓', 'I closed the window.'),
  pair('始まる', 'はじまる', 'v5', '始める', 'はじめる', 'v1', 'begin', '〜aru / 〜eru', '映画', 'The movie began.', '仕事', 'I started work.'),
  pair('止まる', 'とまる', 'v5', '止める', 'とめる', 'v1', 'stop', '〜aru / 〜eru', '電車', 'The train stopped.', '車', 'I stopped the car.'),
  pair('決まる', 'きまる', 'v5', '決める', 'きめる', 'v1', 'decide', '〜aru / 〜eru', '予定', 'The plan was decided.', '日にち', 'I decided the date.'),
  pair('変わる', 'かわる', 'v5', '変える', 'かえる', 'v1', 'change', '〜aru / 〜eru', '信号', 'The light changed.', '予定', 'I changed the plan.'),
  pair('上がる', 'あがる', 'v5', '上げる', 'あげる', 'v1', 'rise / raise', '〜aru / 〜eru', '値段', 'The price went up.', '手', 'I raised my hand.'),
  pair('下がる', 'さがる', 'v5', '下げる', 'さげる', 'v1', 'fall / lower', '〜aru / 〜eru', '熱', 'The fever went down.', '頭', 'I lowered my head.'),
  pair('集まる', 'あつまる', 'v5', '集める', 'あつめる', 'v1', 'gather', '〜aru / 〜eru', '人', 'People gathered.', '切手', 'I collected stamps.'),
  pair('見つかる', 'みつかる', 'v5', '見つける', 'みつける', 'v1', 'find', '〜aru / 〜eru', '鍵', 'The key was found.', '答え', 'I found the answer.'),
  pair('掛かる', 'かかる', 'v5', '掛ける', 'かける', 'v1', 'hang', '〜aru / 〜eru', '絵', 'A picture hangs there.', 'コート', 'I hung up my coat.'),
  pair('助かる', 'たすかる', 'v5', '助ける', 'たすける', 'v1', 'be saved / save', '〜aru / 〜eru', '命', 'The life was saved.', '友だち', 'I helped my friend.'),
  pair('曲がる', 'まがる', 'v5', '曲げる', 'まげる', 'v1', 'bend', '〜aru / 〜eru', '道', 'The road curved.', 'ひざ', 'I bent my knees.'),
  pair('広がる', 'ひろがる', 'v5', '広げる', 'ひろげる', 'v1', 'spread', '〜aru / 〜eru', 'うわさ', 'The rumor spread.', '地図', 'I spread out the map.'),
  pair('伝わる', 'つたわる', 'v5', '伝える', 'つたえる', 'v1', 'be conveyed / convey', '〜aru / 〜eru', '気持ち', 'The feeling came across.', 'ニュース', 'I passed on the news.'),
  pair('加わる', 'くわわる', 'v5', '加える', 'くわえる', 'v1', 'be added / add', '〜aru / 〜eru', 'メンバー', 'A member joined.', '塩', 'I added salt.'),
  pair('温まる', 'あたたまる', 'v5', '温める', 'あたためる', 'v1', 'warm', '〜aru / 〜eru', '体', 'My body warmed up.', 'スープ', 'I warmed the soup.'),
  pair('高まる', 'たかまる', 'v5', '高める', 'たかめる', 'v1', 'heighten', '〜aru / 〜eru', '期待', 'Expectations rose.', '意識', 'I raised awareness.'),
  pair('強まる', 'つよまる', 'v5', '強める', 'つよめる', 'v1', 'strengthen', '〜aru / 〜eru', '風', 'The wind grew stronger.', '火', 'I turned up the heat.'),
  pair('深まる', 'ふかまる', 'v5', '深める', 'ふかめる', 'v1', 'deepen', '〜aru / 〜eru', '秋', 'Autumn deepened.', '理解', 'I deepened my understanding.'),
  pair('固まる', 'かたまる', 'v5', '固める', 'かためる', 'v1', 'harden', '〜aru / 〜eru', 'セメント', 'The cement hardened.', '決意', 'I firmed up my resolve.'),
  pair('泊まる', 'とまる', 'v5', '泊める', 'とめる', 'v1', 'stay / lodge', '〜aru / 〜eru', '客', 'A guest stayed over.', '友だち', 'I put up a friend.'),
  pair('埋まる', 'うまる', 'v5', '埋める', 'うめる', 'v1', 'be buried / bury', '〜aru / 〜eru', '席', 'The seats filled up.', '穴', 'I filled in the hole.'),
  pair('染まる', 'そまる', 'v5', '染める', 'そめる', 'v1', 'dye', '〜aru / 〜eru', '空', 'The sky turned red.', '髪', 'I dyed my hair.'),
  pair('捕まる', 'つかまる', 'v5', '捕まえる', 'つかまえる', 'v1', 'be caught / catch', '〜aru / 〜eru', '犯人', 'The culprit was caught.', '虫', 'I caught a bug.'),
  pair('儲かる', 'もうかる', 'v5', '儲ける', 'もうける', 'v1', 'profit', '〜aru / 〜eru', '店', 'The shop made money.', '大金', 'He made a fortune.'),
  pair('当たる', 'あたる', 'v5', '当てる', 'あてる', 'v1', 'hit', '〜aru / 〜eru', 'ボール', 'The ball hit it.', 'くじ', 'I won the lottery.'),
  pair('混ざる', 'まざる', 'v5', '混ぜる', 'まぜる', 'v1', 'mix', '〜aru / 〜eru', '色', 'The colors mixed.', '卵', 'I mixed in an egg.'),
  pair('溜まる', 'たまる', 'v5', '溜める', 'ためる', 'v1', 'accumulate', '〜aru / 〜eru', 'ストレス', 'Stress built up.', 'お金', 'I saved up money.'),
  pair('詰まる', 'つまる', 'v5', '詰める', 'つめる', 'v1', 'be packed / pack', '〜aru / 〜eru', '排水管', 'The drain clogged.', '荷物', 'I packed my bags.'),
  // ---- 〜u (intrans) / 〜eru (trans) ----
  pair('開く', 'あく', 'v5', '開ける', 'あける', 'v1', 'open', '〜u / 〜eru', 'ドア', 'The door opened.', '窓', 'I opened the window.'),
  pair('空く', 'すく', 'v5', '空ける', 'あける', 'v1', 'empty', 'irregular', 'お腹', 'I got hungry.', '席', 'I freed up a seat.'),
  pair('付く', 'つく', 'v5', '付ける', 'つける', 'v1', 'attach / turn on', '〜u / 〜eru', '電気', 'The light came on.', 'テレビ', 'I turned on the TV.'),
  pair('続く', 'つづく', 'v5', '続ける', 'つづける', 'v1', 'continue', '〜u / 〜eru', '雨', 'The rain continued.', '勉強', 'I kept studying.'),
  pair('届く', 'とどく', 'v5', '届ける', 'とどける', 'v1', 'reach / deliver', '〜u / 〜eru', '手紙', 'The letter arrived.', '荷物', 'I delivered the package.'),
  pair('片付く', 'かたづく', 'v5', '片付ける', 'かたづける', 'v1', 'tidy', '〜u / 〜eru', '部屋', 'The room got tidy.', '机', 'I tidied the desk.'),
  pair('育つ', 'そだつ', 'v5', '育てる', 'そだてる', 'v1', 'grow / raise', '〜u / 〜eru', '子ども', 'The child grew up.', '野菜', 'I grew vegetables.'),
  pair('立つ', 'たつ', 'v5', '立てる', 'たてる', 'v1', 'stand', '〜u / 〜eru', '客', 'The guest stood up.', '計画', 'I made a plan.'),
  pair('建つ', 'たつ', 'v5', '建てる', 'たてる', 'v1', 'be built / build', '〜u / 〜eru', 'ビル', 'A building went up.', '家', 'They built a house.'),
  pair('進む', 'すすむ', 'v5', '進める', 'すすめる', 'v1', 'advance', '〜u / 〜eru', '工事', 'The work progressed.', '話', 'I moved the talk forward.'),
  pair('並ぶ', 'ならぶ', 'v5', '並べる', 'ならべる', 'v1', 'line up', '〜u / 〜eru', '人', 'People lined up.', 'いす', 'I lined up the chairs.'),
  pair('揃う', 'そろう', 'v5', '揃える', 'そろえる', 'v1', 'be complete / arrange', '〜u / 〜eru', 'メンバー', 'Everyone was present.', '書類', 'I got the papers in order.'),
  pair('傷つく', 'きずつく', 'v5', '傷つける', 'きずつける', 'v1', 'be hurt / hurt', '〜u / 〜eru', '心', 'My feelings were hurt.', '相手', 'I hurt the other person.'),
  pair('繋がる', 'つながる', 'v5', '繋ぐ', 'つなぐ', 'v5', 'connect', 'irregular', '電話', 'The call went through.', '手', 'I held their hand.'),
  // ---- 〜reru (intrans) / 〜su or 〜ru (trans) ----
  pair('売れる', 'うれる', 'v1', '売る', 'うる', 'v5', 'sell', '〜reru / 〜ru', '本', 'The book sold well.', '車', 'I sold my car.'),
  pair('切れる', 'きれる', 'v1', '切る', 'きる', 'v5', 'cut', '〜reru / 〜ru', 'ひも', 'The string snapped.', '紙', 'I cut the paper.'),
  pair('割れる', 'われる', 'v1', '割る', 'わる', 'v5', 'break / split', '〜reru / 〜ru', 'ガラス', 'The glass broke.', '皿', 'I broke a plate.'),
  pair('折れる', 'おれる', 'v1', '折る', 'おる', 'v5', 'break / fold', '〜reru / 〜ru', '枝', 'The branch snapped.', '紙', 'I folded the paper.'),
  pair('破れる', 'やぶれる', 'v1', '破る', 'やぶる', 'v5', 'tear', '〜reru / 〜ru', 'シャツ', 'The shirt tore.', '約束', 'He broke the promise.'),
  pair('汚れる', 'よごれる', 'v1', '汚す', 'よごす', 'v5', 'get dirty / dirty', '〜reru / 〜su', '服', 'My clothes got dirty.', '手', 'I got my hands dirty.'),
  pair('壊れる', 'こわれる', 'v1', '壊す', 'こわす', 'v5', 'break', '〜reru / 〜su', 'テレビ', 'The TV broke.', 'おもちゃ', 'I broke the toy.'),
  pair('倒れる', 'たおれる', 'v1', '倒す', 'たおす', 'v5', 'fall over / knock down', '〜reru / 〜su', '木', 'The tree fell over.', '敵', 'I defeated the enemy.'),
  pair('離れる', 'はなれる', 'v1', '離す', 'はなす', 'v5', 'separate', '〜reru / 〜su', '船', 'The boat pulled away.', '手', 'I let go of the hand.'),
  pair('外れる', 'はずれる', 'v1', '外す', 'はずす', 'v5', 'come off / remove', '〜reru / 〜su', 'ボタン', 'The button came off.', 'めがね', 'I took off my glasses.'),
  pair('流れる', 'ながれる', 'v1', '流す', 'ながす', 'v5', 'flow', '〜reru / 〜su', '川', 'The river flowed.', '水', 'I ran the water.'),
  pair('隠れる', 'かくれる', 'v1', '隠す', 'かくす', 'v5', 'hide', '〜reru / 〜su', '月', 'The moon hid.', '秘密', 'He hid the secret.'),
  pair('現れる', 'あらわれる', 'v1', '現す', 'あらわす', 'v5', 'appear / reveal', '〜reru / 〜su', '姿', 'The figure appeared.', '本心', 'He showed his true feelings.'),
  pair('生まれる', 'うまれる', 'v1', '生む', 'うむ', 'v5', 'be born / bear', '〜reru / 〜ru', '赤ちゃん', 'A baby was born.', '記録', 'It produced a record.'),
  pair('濡れる', 'ぬれる', 'v1', '濡らす', 'ぬらす', 'v5', 'get wet / wet', '〜reru / 〜su', '服', 'My clothes got wet.', 'タオル', 'I wet the towel.'),
  // ---- 〜eru (intrans) / 〜su or 〜asu (trans) ----
  pair('出る', 'でる', 'v1', '出す', 'だす', 'v5', 'exit / take out', '〜eru / 〜su', '月', 'The moon came out.', 'ごみ', 'I took out the trash.'),
  pair('消える', 'きえる', 'v1', '消す', 'けす', 'v5', 'vanish / erase', '〜eru / 〜su', '火', 'The fire went out.', '電気', 'I turned off the light.'),
  pair('冷える', 'ひえる', 'v1', '冷やす', 'ひやす', 'v5', 'chill', '〜eru / 〜asu', 'ビール', 'The beer got cold.', 'スイカ', 'I chilled the watermelon.'),
  pair('増える', 'ふえる', 'v1', '増やす', 'ふやす', 'v5', 'increase', '〜eru / 〜asu', '人口', 'The population grew.', '語彙', 'I grew my vocabulary.'),
  pair('燃える', 'もえる', 'v1', '燃やす', 'もやす', 'v5', 'burn', '〜eru / 〜asu', '家', 'The house burned.', '落ち葉', 'I burned the fallen leaves.'),
  pair('逃げる', 'にげる', 'v1', '逃がす', 'にがす', 'v5', 'escape / let escape', '〜eru / 〜asu', '犯人', 'The culprit fled.', '魚', 'I let the fish go.'),
  pair('揺れる', 'ゆれる', 'v1', '揺らす', 'ゆらす', 'v5', 'shake', '〜eru / 〜asu', '地面', 'The ground shook.', 'ゆりかご', 'I rocked the cradle.'),
  pair('冷める', 'さめる', 'v1', '冷ます', 'さます', 'v5', 'cool down', '〜eru / 〜asu', 'スープ', 'The soup went cold.', 'お茶', 'I let the tea cool.'),
  pair('覚める', 'さめる', 'v1', '覚ます', 'さます', 'v5', 'wake', '〜eru / 〜asu', '目', 'I woke up.', '目', 'I woke myself up.'),
  pair('焦げる', 'こげる', 'v1', '焦がす', 'こがす', 'v5', 'scorch', '〜eru / 〜asu', 'パン', 'The bread burned.', 'ご飯', 'I burned the rice.'),
  pair('焼ける', 'やける', 'v1', '焼く', 'やく', 'v5', 'burn / grill', '〜eru / 〜u', '肉', 'The meat cooked.', '魚', 'I grilled the fish.'),
  pair('抜ける', 'ぬける', 'v1', '抜く', 'ぬく', 'v5', 'come out / pull out', '〜eru / 〜u', '髪', 'Hair fell out.', 'くぎ', 'I pulled out the nail.'),
  pair('解ける', 'とける', 'v1', '解く', 'とく', 'v5', 'come undone / solve', '〜eru / 〜u', 'ひも', 'The knot came undone.', '問題', 'I solved the problem.'),
  pair('溶ける', 'とける', 'v1', '溶かす', 'とかす', 'v5', 'melt', '〜eru / 〜asu', '雪', 'The snow melted.', 'バター', 'I melted the butter.'),
  pair('寝る', 'ねる', 'v1', '寝かせる', 'ねかせる', 'v1', 'sleep / put to sleep', 'irregular', '子ども', 'The child went to sleep.', '赤ちゃん', 'I put the baby to sleep.'),
  // ---- 〜iru (intrans) / 〜osu (trans) ----
  pair('落ちる', 'おちる', 'v1', '落とす', 'おとす', 'v5', 'fall / drop', '〜iru / 〜osu', '葉', 'The leaves fell.', '財布', 'I dropped my wallet.'),
  pair('起きる', 'おきる', 'v1', '起こす', 'おこす', 'v5', 'wake / cause', '〜iru / 〜osu', '子ども', 'The child woke up.', '弟', 'I woke up my brother.'),
  pair('降りる', 'おりる', 'v1', '降ろす', 'おろす', 'v5', 'get off / lower', '〜iru / 〜osu', '乗客', 'The passenger got off.', '荷物', 'I unloaded the luggage.'),
  pair('過ぎる', 'すぎる', 'v1', '過ごす', 'すごす', 'v5', 'pass (time)', '〜iru / 〜osu', '時間', 'Time passed.', '休日', 'I spent the holiday.'),
  pair('伸びる', 'のびる', 'v1', '伸ばす', 'のばす', 'v5', 'stretch / extend', '〜iru / 〜asu', '髪', 'My hair grew out.', '手', 'I reached out my hand.'),
  // ---- 〜ru (intrans) / 〜su (trans), same godan row ----
  pair('直る', 'なおる', 'v5', '直す', 'なおす', 'v5', 'be fixed / fix', '〜ru / 〜su', '故障', 'The fault was fixed.', '自転車', 'I fixed the bicycle.'),
  pair('治る', 'なおる', 'v5', '治す', 'なおす', 'v5', 'heal / cure', '〜ru / 〜su', '風邪', 'The cold got better.', '病気', 'The doctor cured the illness.'),
  pair('回る', 'まわる', 'v5', '回す', 'まわす', 'v5', 'turn / spin', '〜ru / 〜su', 'こま', 'The top spun.', 'ハンドル', 'I turned the wheel.'),
  pair('渡る', 'わたる', 'v5', '渡す', 'わたす', 'v5', 'cross / hand over', '〜ru / 〜su', '鳥', 'The birds crossed over.', 'プレゼント', 'I handed over the present.'),
  pair('戻る', 'もどる', 'v5', '戻す', 'もどす', 'v5', 'return', '〜ru / 〜su', '記憶', 'The memory came back.', '本', 'I put the book back.'),
  pair('残る', 'のこる', 'v5', '残す', 'のこす', 'v5', 'remain / leave', '〜ru / 〜su', 'ご飯', 'Some rice was left.', 'メモ', 'I left a note.'),
  pair('通る', 'とおる', 'v5', '通す', 'とおす', 'v5', 'pass through / let through', '〜ru / 〜su', 'バス', 'The bus went by.', '糸', 'I threaded the needle.'),
  pair('返る', 'かえる', 'v5', '返す', 'かえす', 'v5', 'return (things)', '〜ru / 〜su', '返事', 'A reply came back.', '本', 'I returned the book.'),
  pair('移る', 'うつる', 'v5', '移す', 'うつす', 'v5', 'move / transfer', '〜ru / 〜su', '席', 'The seat changed.', '机', 'I moved the desk.'),
  pair('映る', 'うつる', 'v5', '映す', 'うつす', 'v5', 'be reflected / project', '〜ru / 〜su', '山', 'The mountain was reflected.', '映画', 'They showed a movie.'),
  // ---- 〜ku/gu (intrans) / 〜kasu/gasu (trans) ----
  pair('沸く', 'わく', 'v5', '沸かす', 'わかす', 'v5', 'boil', '〜u / 〜asu', 'お湯', 'The water boiled.', 'お風呂', 'I heated the bath.'),
  pair('動く', 'うごく', 'v5', '動かす', 'うごかす', 'v5', 'move', '〜u / 〜asu', '機械', 'The machine moved.', '体', 'I moved my body.'),
  pair('乾く', 'かわく', 'v5', '乾かす', 'かわかす', 'v5', 'dry', '〜u / 〜asu', '洗濯物', 'The laundry dried.', '髪', 'I dried my hair.'),
  pair('驚く', 'おどろく', 'v5', '驚かす', 'おどろかす', 'v5', 'be surprised / surprise', '〜u / 〜asu', 'みんな', 'Everyone was surprised.', '友だち', 'I surprised my friend.'),
  pair('飛ぶ', 'とぶ', 'v5', '飛ばす', 'とばす', 'v5', 'fly', '〜u / 〜asu', '鳥', 'The bird flew.', '紙飛行機', 'I flew a paper plane.'),
  pair('鳴る', 'なる', 'v5', '鳴らす', 'ならす', 'v5', 'ring / sound', '〜u / 〜asu', 'ベル', 'The bell rang.', '鐘', 'I rang the bell.'),
  pair('散る', 'ちる', 'v5', '散らす', 'ちらす', 'v5', 'scatter', '〜u / 〜asu', '桜', 'The cherry blossoms fell.', '気', 'It scattered my attention.'),
  pair('減る', 'へる', 'v5', '減らす', 'へらす', 'v5', 'decrease', '〜u / 〜asu', '体重', 'My weight dropped.', 'ごみ', 'I reduced the garbage.'),
  pair('済む', 'すむ', 'v5', '済ます', 'すます', 'v5', 'be finished / finish', '〜u / 〜asu', '用事', 'The errand was done.', '食事', 'I finished my meal.'),
  pair('転がる', 'ころがる', 'v5', '転がす', 'ころがす', 'v5', 'roll', '〜aru / 〜asu', 'ボール', 'The ball rolled.', 'たる', 'I rolled the barrel.'),
  // ---- irregular / suppletive ----
  pair('入る', 'はいる', 'v5', '入れる', 'いれる', 'v1', 'enter / put in', 'irregular', '猫', 'The cat came in.', '砂糖', 'I put in sugar.'),
  pair('乗る', 'のる', 'v5', '乗せる', 'のせる', 'v1', 'ride / give a ride', 'irregular', '客', 'The passenger got on.', '子ども', 'I gave the child a ride.'),
  pair('載る', 'のる', 'v5', '載せる', 'のせる', 'v1', 'appear (in print) / publish', 'irregular', '記事', 'The article ran.', '写真', 'They printed the photo.')
]

export interface TransitivityHit {
  partner: string
  partnerKana: string
  role: 'transitive' | 'intransitive' // the role of the LOOKED-UP word
  pair: TransitivityPair
}

// Which pair does `word` belong to? Accepts kanji or kana forms of either
// member; kana forms can be ambiguous (かえる) — first table hit wins, which
// is fine for a callout chip.
export function transitivityPartner(word: string): TransitivityHit | null {
  for (const pair of TRANSITIVITY_PAIRS) {
    if (word === pair.intrans || word === pair.intransKana) {
      return { partner: pair.trans, partnerKana: pair.transKana, role: 'intransitive', pair }
    }
    if (word === pair.trans || word === pair.transKana) {
      return { partner: pair.intrans, partnerKana: pair.intransKana, role: 'transitive', pair }
    }
  }
  return null
}
