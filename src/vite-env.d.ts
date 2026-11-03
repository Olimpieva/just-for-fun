interface ImportMetaEnv {
  readonly VITE_DOGS_API_URL?: string;
  readonly VITE_FOXES_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
