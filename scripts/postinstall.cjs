const { execSync } = require('node:child_process')
const fs = require('node:fs')

if (fs.existsSync('.git')) {
  try {
    execSync('npx simple-git-hooks', { stdio: 'inherit' })
  } catch (error) {
    console.warn('Failed to set up git hooks:', error.message)
  }
} else {
  console.log('No .git directory found, skipping git hooks setup.')
}
