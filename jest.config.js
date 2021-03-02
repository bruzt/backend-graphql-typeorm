
module.exports = {
    "transform": {
        "^.+\\.ts$": "ts-jest"
      },
      "testRegex": "\\.test\\.ts",
      "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
      ],
      "collectCoverageFrom": ["src/**", "!src/server.ts", "!src/database/migrations/*"],
      "modulePathIgnorePatterns": ["build"],
      "verbose": true,
      "maxWorkers": 1,
      "testTimeout": 10000,
      "collectCoverage": true,
      "coverageDirectory": "./coverage"
}