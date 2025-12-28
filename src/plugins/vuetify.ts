import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
// 'vuetify/styles' はレイアウトのために必須。vite-plugin-vuetify を使うとバンドルサイズは大幅に削減できる
import 'vuetify/styles';

// import { md3 } from 'vuetify/blueprints' // ← ★モダンWeb風にするなら削除推奨
// import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  directives,
  // blueprint: md3, // ← ★あえて使わず、自分でdefaultsで制御する方が今風です

  theme: {
    defaultTheme: 'dark',

    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#4F5B92',
          surfaceTint: '#4F5B92',
          onPrimary: '#FFFFFF',
          primaryContainer: '#DDE1FF',
          onPrimaryContainer: '#374379',
          secondary: '#5A5D72',
          onSecondary: '#FFFFFF',
          secondaryContainer: '#DEE1F9',
          onSecondaryContainer: '#424659',
          tertiary: '#75546E',
          onTertiary: '#FFFFFF',
          tertiaryContainer: '#FFD7F4',
          onTertiaryContainer: '#5C3D56',
          error: '#BA1A1A',
          onError: '#FFFFFF',
          errorContainer: '#FFDAD6',
          onErrorContainer: '#93000A',
          background: '#FBF8FF',

          onBackground: '#1A1B21',
          surface: '#FBF8FF',
          onSurface: '#1A1B21',
          surfaceVariant: '#E2E1EC',
          onSurfaceVariant: '#45464F',
          outline: '#767680',
          outlineVariant: '#C6C5D0',
          shadow: '#000000',
          scrim: '#000000',
          inverseSurface: '#2F3036',
          inverseOnSurface: '#F2F0F7',
          inversePrimary: '#B8C4FF',
          primaryFixed: '#DDE1FF',
          onPrimaryFixed: '#06164B',
          primaryFixedDim: '#B8C4FF',
          onPrimaryFixedVariant: '#374379',
          secondaryFixed: '#DEE1F9',
          onSecondaryFixed: '#171B2C',
          secondaryFixedDim: '#C2C5DD',
          onSecondaryFixedVariant: '#424659',
          tertiaryFixed: '#FFD7F4',
          onTertiaryFixed: '#2C1229',
          tertiaryFixedDim: '#E4BAD9',
          onTertiaryFixedVariant: '#5C3D56',
          surfaceDim: '#DBD9E0',
          surfaceBright: '#FBF8FF',
          surfaceContainerLowest: '#FFFFFF',
          surfaceContainerLow: '#F4F2FA',
          surfaceContainer: '#EFEDF4',
          surfaceContainerHigh: '#E9E7EF',
          surfaceContainerHighest: '#E3E1E9',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#B8C4FF',
          surfaceTint: '#B8C4FF',
          onPrimary: '#1F2D61',
          primaryContainer: '#374379',
          onPrimaryContainer: '#DDE1FF',
          secondary: '#C2C5DD',
          onSecondary: '#2C2F42',
          secondaryContainer: '#424659',
          onSecondaryContainer: '#DEE1F9',
          tertiary: '#E4BAD9',
          onTertiary: '#43273F',
          tertiaryContainer: '#5C3D56',
          onTertiaryContainer: '#FFD7F4',
          error: '#FFB4AB',
          onError: '#690005',
          errorContainer: '#93000A',
          onErrorContainer: '#FFDAD6',
          background: '#121318',
          onBackground: '#E3E1E9',
          // surface: '#121318',
          surface: '#1d1e25ff',
          onSurface: '#E3E1E9',
          surfaceVariant: '#45464F',
          onSurfaceVariant: '#C6C5D0',
          outline: '#90909A',
          outlineVariant: '#45464F',
          shadow: '#000000',
          scrim: '#000000',
          inverseSurface: '#E3E1E9',
          inverseOnSurface: '#2F3036',
          inversePrimary: '#4F5B92',
          primaryFixed: '#DDE1FF',
          onPrimaryFixed: '#06164B',
          primaryFixedDim: '#B8C4FF',
          onPrimaryFixedVariant: '#374379',
          secondaryFixed: '#DEE1F9',
          onSecondaryFixed: '#171B2C',
          secondaryFixedDim: '#C2C5DD',
          onSecondaryFixedVariant: '#424659',
          tertiaryFixed: '#FFD7F4',
          onTertiaryFixed: '#2C1229',
          tertiaryFixedDim: '#E4BAD9',
          onTertiaryFixedVariant: '#5C3D56',
          surfaceDim: '#121318',
          surfaceBright: '#38393F',
          surfaceContainerLowest: '#0D0E13',
          surfaceContainerLow: '#1A1B21',
          surfaceContainer: '#1F1F25',
          surfaceContainerHigh: '#292A2F',
          surfaceContainerHighest: '#34343A',
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
      rounded: 'lg', // MD3のカプセル型ではなく、美しい角丸（8-12px程度）
      elevation: 0,
      // style: 'text-transform: none;',
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
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'primary',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'primary',
    },
  },

  display: {
    mobileBreakpoint: 'sm',
  },
});
