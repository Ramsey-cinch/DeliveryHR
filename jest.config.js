module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '@Components/(.*)$': '<rootDir>/src/components/$1',
    '@Hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '@Services/(.*)$': '<rootDir>/src/services/$1',
    '@Firebase/(.*)$': '<rootDir>/firebaseConfig/$1',
    '@Firebase-api/(.*)$': '<rootDir>/src/api/$1',
    '@Context/(.*)$': '<rootDir>/src/context/$1',
    '@Provider/(.*)$': '<rootDir>/src/provider/$1',
  },
}
