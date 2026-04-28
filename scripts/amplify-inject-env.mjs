/**
 * After `DEPLOY_TARGET=amplify npm run build`, copy SSR env into the compute bundle
 * and prepend a tiny loader so `process.env` is populated on cold start.
 *
 * Amplify Console vars are available in the build shell; Nitro's Node compute
 * does not always receive the same keys at runtime unless we ship them here.
 * See: https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const computeDir = join(root, ".amplify-hosting", "compute", "default");
const serverPath = join(computeDir, "server.js");
const envSrc = join(root, ".env.production");
const envDest = join(computeDir, ".env");

if (!existsSync(serverPath)) {
  process.exit(0);
}

if (existsSync(envSrc)) {
  copyFileSync(envSrc, envDest);
}

const prelude = `import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __a_dir = dirname(fileURLToPath(import.meta.url));
const __a_env = join(__a_dir, ".env");
if (existsSync(__a_env)) {
  for (const line of readFileSync(__a_env, "utf8").split(/\\r?\\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i <= 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k) process.env[k] = v;
  }
}
`;

const orig = readFileSync(serverPath, "utf8");
if (orig.includes("__a_dir")) {
  process.exit(0);
}

writeFileSync(serverPath, prelude + orig);
console.log("[amplify-inject-env] wrote compute/.env and patched server.js");
