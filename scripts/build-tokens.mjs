import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

StyleDictionary.registerFormat({
  name: "css/tailwind-theme",
  format: ({ dictionary }) => {
    const colorTokens = dictionary.allTokens.filter((token) => {
      return token.type === "color" || token.$type === "color";
    });

    const cssVariables = colorTokens
      .map((token) => {
        const name = token.name.startsWith("color-")
          ? token.name
          : `color-${token.name}`;

        const value = token.value ?? token.$value;

        return `  --${name}: ${value};`;
      })
      .join("\n");

    const themeVariables = colorTokens
      .map((token) => {
        const name = token.name.startsWith("color-")
          ? token.name
          : `color-${token.name}`;

        return `  --${name}: var(--${name});`;
      })
      .join("\n");

    return `/* This file is auto-generated. Do not edit manually. */

:root {
${cssVariables}
}

@theme inline {
${themeVariables}
}
`;
  },
});

const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["name/kebab"],
      buildPath: "app/styles/",
      files: [
        {
          destination: "tokens.css",
          format: "css/tailwind-theme",
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
