import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'

//Só quando usar aquele plugin de pastas @/users
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma']
        ]
    }
});