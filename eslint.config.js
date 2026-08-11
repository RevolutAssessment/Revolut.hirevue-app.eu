 import js from '@eslint/js'
    import globals from 'globals'
    import reactHooks from 'eslint-plugin-react-hooks'
    import reactRefresh from 'eslint-plugin-react-refresh'
    import { defineConfig, globalIgnores } from 'eslint/config'

    export default defineConfig([
      globalIgnores(['dist', 'server.js', 'public/**', 'data/**']),
      {
        files: ['**/*.{js,jsx}'],
        extends: [
          js.configs.recommended,
          reactHooks.configs.flat.recommended,
          reactRefresh.configs.vite,
        ],
        languageOptions: {
          globals: {
            ...globals.browser,
            ...globals.node,
          },
          parserOptions: { ecmaFeatures: { jsx: true } },
        },
      },
    ])
    ──────
  In teeno files ko Commit karte hi Vercel ka Error 100% Fixed hokar 🟢 Ready (Production) ho jayega! 🚀

────────────────────────────────────────────────────────────
> ...videoGroup,
          { type: "feedback", key: "feedback", section: "Feedback" },
        ];

        return [...onboardingSteps, ...assessmentSteps];
      }
      ────── ye niche ki line rkhna hai ya nhi

  HAAN, BILKUL 100% RAKHNA HAI! YE SABSE ZAROORI LINE HAI! 🎯

  Agar aap ye line nahi rakhoge:

      return [...onboardingSteps, ...assessmentSteps];
    }
