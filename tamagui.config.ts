import { createTamagui } from '@tamagui/core'

export const config = createTamagui({
    tokens: {
        size: {
            sm: 8,
            md: 12,
            lg: 20,
            4: 16,
            5: 20,
            6: 24,
        },
        space: {
            '-sm': 8,
        },
        radius: {
            none: 0,
            sm: 3,
        },
        color: {
            white: '#fff',
            black: '#000',
        },
    },

    fonts: {
        body: {
            family: 'System',
            size: {
                true: 16,
                4: 16,
                5: 20,
                6: 24,
            },
            weight: {
                true: '400',
                normal: '400',
                bold: '700',
            },
            lineHeight: {
                true: 22,
                4: 22,
                5: 26,
                6: 30,
            },
            letterSpacing: {
                true: 0,
                4: 0,
                5: 0.5,
                6: 1,
            },
        },
    },

    themes: {
        light: {
            bg: '#f2f2f2',
            color: '#000',
        },
        dark: {
            bg: '#111',
            color: '#fff',
        },
    },

    media: {
        sm: { maxWidth: 860 },
        gtSm: { minWidth: 861 },
        short: { maxHeight: 820 },
        hoverNone: { hover: 'none' },
        pointerCoarse: { pointer: 'coarse' },
    },

    shorthands: {
        px: 'paddingHorizontal',
    },

    settings: {
        disableSSR: true,
        allowedStyleValues: 'somewhat-strict-web',
    },
})

type AppConfig = typeof config
declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends AppConfig { }
}
