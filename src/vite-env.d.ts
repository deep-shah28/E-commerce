/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHEC_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
