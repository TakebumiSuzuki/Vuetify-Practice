// @ts-check

// VS Code の TypeScript 言語サーバーが @ts-check を見つけると、裏でこっそり ts として扱い、
// 下記 @type ... の型定義を使ってリアルタイムに監視する。
// node_modules の中にある prettier パッケージを見に行き、そこにある Config という型定義を取得。
// それを、直下の export default { ... } オブジェクトに「これはこういう型ですよ」と当てはめる。

/** @type {import("prettier").Config} */
export default {
  // 行の最大文字数。デフォルトは 80
  printWidth: 80,

  // タブの幅。やっていることは、{ が何回開かれたかを解析して今のネストの深さを割り出し、
  // それにこの値、2 をかけてそれをスペースに変換する。デフォルトは 2
  // つまり、この項目は「1階層あたりのインデントのスペース数」と読み替えるのが正解
  tabWidth: 2,

  // 環境による表示崩れがなく、一貫したインデントを保証できるため、スペースが圧倒的に好まれます。
  // デフォルトは false
  useTabs: false,

  // セミコロンを常に付ける。デフォルトは true
  semi: true,

  // シングルクォートを使用。デフォルトは false
  singleQuote: true,

  // オブジェクトのキーを引用符で囲むタイミング
  // as-needed: 必要なときだけ囲む (デフォルト)
  // consistent: ひとつでも囲む必要があるキーがあれば、すべて囲む
  // preserve: 入力どおりにする
  quoteProps: 'as-needed',

  // 配列やオブジェクトの末尾にカンマを付ける
  // es5: ES5で有効な末尾カンマを付ける (オブジェクト、配列など)。関数の引数の末尾には付けない
  // all: 可能な限りすべての場所に末尾カンマを追加（関数の引数の末尾にも付ける）。デフォルト
  // none: 付けない
  trailingComma: 'all',

  // オブジェクトリテラルの括弧の内側にスペースを追加。デフォルトは true
  bracketSpacing: true,

  // 複数行のHTML、Vue、JSX要素の末尾の `>` を次の行に配置しない。デフォルトは false
  //例: <div
  //      className="foo"
  //    >
  bracketSameLine: false,

  // アロー関数の引数が1つの場合も括弧を付ける。デフォルトは always
  arrowParens: 'always',

  // 各行末の改行コード。これを統一することで、gitの差分表示が真っ赤になることを防げる
  // lf: Line Feed (LF) - Unix系OSで一般的、Chromebookも。デフォルト。
  // crlf: Carriage Return + Line Feed (CRLF) - Windowsで一般的
  // auto: ファイルごとに既存の改行コードを維持する
  endOfLine: 'lf',

  // Markdownのテキストを折り返すかどうか。printWidth の設定は Markdown と別設定ということ。
  // always: printWidthに合わせて折り返す
  // never: 折り返さない。つまり、強制的に改行を削除して、パラグラフを1行につなげる設定。
  // preserve: そのままにする (デフォルト)
  proseWrap: 'preserve',

  // HTML内のホワイトスペースの扱い
  // css: CSSの display プロパティのデフォルト値に従う。デフォルト。
  // strict: スペースを厳密に扱う
  // ignore: 無視する
  htmlWhitespaceSensitivity: 'css',

  // Vueファイルの <script> タグと <style> タグ内のコードをインデントする
  // Prettier本体に組み込まれているVue.jsのサポート機能の一部で追加プラグインは必要なし。
  // デフォルトは false
  vueIndentScriptAndStyle: true,

  // 1行の文字数に収まる場合でも、元がすでに改行されている場合、属性が複数ある場合は強制的に改行する
  // 属性が2つ以下でprintWidthに収まる場合は1行になることがあります。
  singleAttributePerLine: true,

  // prettierのプラグインとしては、tailwindcss用や、tomlファイル用のものなどがある。
};
