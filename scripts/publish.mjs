import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

try {
  // 1. Publish to npm via Changeset
  execSync('npx changeset publish', { stdio: 'inherit' });

  // 2. Read version from package.json
  const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
  const versionTag = `v${pkg.version}`;

  // 3. Create and push traditional tag (e.g. v0.1.0)
  console.log(`\n🏷️  Creating traditional Git tag ${versionTag}...`);
  try {
    execSync(`git tag -a ${versionTag} -m "Release ${versionTag}"`, { stdio: 'inherit' });
    execSync(`git push origin ${versionTag}`, { stdio: 'inherit' });
    console.log(`✅ Successfully created and pushed tag ${versionTag} to GitHub!`);
  } catch (tagErr) {
    console.log(`ℹ️  Tag ${versionTag} already exists or could not be pushed.`);
  }
} catch (err) {
  console.error('❌ Release failed:', err);
  process.exit(1);
}
