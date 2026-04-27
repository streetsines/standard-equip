// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact, tailwindcss, etc.
// For AWS Amplify SSR we use Nitro's aws_amplify preset and disable the Cloudflare build plugin.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const useAmplify =
  process.env.DEPLOY_TARGET === "amplify" ||
  Boolean(process.env.AWS_APP_ID);

export default defineConfig({
  cloudflare: useAmplify ? false : undefined,
  plugins: useAmplify ? [nitro({ preset: "aws_amplify" })] : [],
});
