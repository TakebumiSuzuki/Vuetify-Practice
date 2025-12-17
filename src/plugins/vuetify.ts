import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
// import { md3 } from 'vuetify/blueprints' // ← ★モダンWeb風にするなら削除推奨
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';


export default createVuetify({
  directives,
  // blueprint: md3, // ← ★あえて使わず、自分でdefaultsで制御する方が今風です

  theme: {
    defaultTheme: 'dark',

    // themes: {
    //   light: {
    //     dark: false,
    //     colors: {
    //       primary: '#4F46E5',   // Indigo-600: 信頼感のある鮮やかな青紫
    //       secondary: '#06B6D4', // Cyan-500
    //       background: '#F9FAFB', // Gray-50: 完全な白より目に優しい
    //       surface: '#FFFFFF',
    //       error: '#EF4444',
    //     },
    //   },

    //   dark: {
    //     dark: true,
    //     colors: {
    //       primary: '#818CF8',    // Indigo-400: ダークモード用に少し明るく
    //       secondary: '#22D3EE',  // Cyan-400

    //       // ★ここが最大の修正ポイント
    //       // 背景(Slate-900) より カード(Slate-800) を少し明るくして浮き上がらせる
    //       background: '#0F172A',
    //       surface: '#1E293B',

    //       error: '#F87171',
    //     },
    //   },
    // },

    themes: {
      // ----------------------------------------------------------------
      // ライトモード
      // ----------------------------------------------------------------
      light: {
        dark: false,
        colors: {
          // ■ メインカラー (濃いインディゴブルー)
          // Tailwind Indigo-800: 知的で落ち着いた深い青
          primary: '#564aa8ff',

          // ■ サブカラー (少し青緑がかった色でアクセント)
          // Tailwind Teal-600: プライマリーと相性が良く、かつ区別しやすい
          secondary: '#0D9488',

          // ■ 背景・表面色
          // Tailwind Zinc-50: 真っ白すぎない、目に優しいごく薄いグレー
          background: '#FAFAFA',
          // カードなどは純白で浮き立たせる
          surface: '#FFFFFF',
          'surface-variant': '#f4f4f8ff',

          // ■ セマンティックカラー (視認性重視で濃いめ)
          error: '#DC2626', // Red-600
          success: '#059669', // Emerald-600
          warning: '#D97706', // Amber-600
          info: '#0284C7', // Sky-600
        },
      },

      // ----------------------------------------------------------------
      // ダークモード
      // ----------------------------------------------------------------
      dark: {
        dark: true,
        colors: {
          // ■ メインカラー (ライトより明るくして視認性を確保)
          // Tailwind Indigo-400: 暗い背景でも発光して見える明るめのインディゴ
          primary: '#818CF8',

          // ■ サブカラー
          // Tailwind Teal-400
          secondary: '#2DD4BF',

          // ■ 背景・表面色 (Zinc系: 青みがかったダークグレー)
          // Tailwind Zinc-950: ほぼ黒に近いが、温かみより冷たさのあるダークグレー
          background: '#09090B',
          // Tailwind Zinc-900: 背景より一段階明るくしてカードの境界を作る
          surface: '#18181B',
          'surface-variant': '#27272A',

          // ■ セマンティックカラー (パステル寄りで明るく調整)
          error: '#F87171', // Red-400
          success: '#34D399', // Emerald-400
          warning: '#FBBF24', // Amber-400
          info: '#38BDF8', // Sky-400
        },
      },
    },
  },

  defaults: {
    // グローバルなリップル(波紋)無効化
    global: {
      ripple: false,
    },

    VBtn: {
      variant: 'flat',
      // color: 'primary', // デフォルトをプライマリにしたい場合
      height: 44, // 少し高さを出して押しやすく（スマホ対応）
      rounded: 'lg', // MD3のカプセル型ではなく、美しい角丸（8-12px程度）
      elevation: 0,
      ripple: false,
    },
    VCard: {
      elevation: 0,
      rounded: 'lg',
      border: true, // ★ダークモードで境界をはっきりさせるため薄い線を入れるのがトレンド
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary', // フォーカス時にPrimary色にする
      hideDetails: 'auto',
      rounded: 'lg', // 入力欄も角丸を合わせる
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      rounded: 'lg',
    },
    // その他の入力系も統一
    VTextarea: { variant: 'outlined', density: 'comfortable', rounded: 'lg', color: 'primary' },
    VAutocomplete: { variant: 'outlined', density: 'comfortable', rounded: 'lg', color: 'primary' },
  },

  display: {
    mobileBreakpoint: 'sm',
  },
});
