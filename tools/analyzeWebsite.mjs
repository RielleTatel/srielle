// tools/analyzeWebsite.mjs
import { chromium } from "playwright";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const client = new Anthropic();

async function captureVisuals(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // let animations settle

  // Full page screenshot
  const screenshot = await page.screenshot({
    fullPage: true,
    encoding: "base64",
  });

  // Extract animation + transition CSS only
  const visualCSS = await page.evaluate(() => {
    return [...document.styleSheets]
      .flatMap(sheet => {
        try { return [...sheet.cssRules]; }
        catch { return []; }
      })
      .filter(rule =>
        rule.cssText?.includes("animation") ||
        rule.cssText?.includes("transition") ||
        rule.cssText?.includes("transform") ||
        rule instanceof CSSKeyframesRule
      )
      .map(r => r.cssText)
      .join("\n");
  });

  // Capture hover states by interacting
  const interactionScreenshots = [];
  const hoverTargets = page.locator("button, a, [class*='btn'], nav a");
  const count = await hoverTargets.count();

  for (let i = 0; i < Math.min(count, 3); i++) {
    await hoverTargets.nth(i).hover();
    await page.waitForTimeout(400);
    const hoverShot = await page.screenshot({ encoding: "base64" });
    interactionScreenshots.push(hoverShot);
  }

  await browser.close();

  return { screenshot, visualCSS, interactionScreenshots };
}

async function analyzeVisuals(url, prompt) {
  const { screenshot, visualCSS, interactionScreenshots } = await captureVisuals(url);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/png", data: screenshot },
        },
        // include hover screenshots
        ...interactionScreenshots.map(shot => ({
          type: "image",
          source: { type: "base64", media_type: "image/png", data: shot },
        })),
        {
          type: "text",
          text: `
${prompt}

## Animation & Transition CSS extracted from the page:
${visualCSS}

Analyze the visual design including:
- Layout and spacing
- Color palette and usage
- Typography
- Animations and transitions
- Hover/interactive states (see additional screenshots)
- Overall design system patterns
          `,
        },
      ],
    }],
  });

  return response.content[0].text;
}

// Run
const url = process.argv[2];
const prompt = process.argv[3] || "Analyze this website's visual design in detail.";

const result = await analyzeVisuals(url, prompt);
console.log(result);
