module.exports = {
    preset: "ts-jest",
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.{d.ts,config.js,config.ts}',
        '!**/*assetsTransformer.js',
        '!**/node_modules/**',
        '!**/config/**',
        '!**/src/context/**',
        '!**/src/pages/_app.tsx**',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
    },
}