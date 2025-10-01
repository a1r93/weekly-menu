import { tanstackConfig } from "@tanstack/eslint-config";
import perfectionist from "eslint-plugin-perfectionist";

export default [
  ...tanstackConfig,
  customizePerfectionist(perfectionist.configs["recommended-natural"]),
  {
    rules: {
      "@typescript-eslint/array-type": "off",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/order": "off",
      "sort-imports": "off",
    },
  },
];

function customizePerfectionist(config) {
  return {
    ...config,
    rules: {
      ...config.rules,
      ...customizeRule(config, "perfectionist/sort-imports", {
        groups: ["external", "internal"],
        newlinesBetween: "never",
      }),
      ...customizeRule(config, "perfectionist/sort-union-types", {
        groups: ["unknown", "nullish"],
      }),
    },
  };
}

function customizeRule(config, ruleName, adaptation) {
  const rule = config.rules[ruleName];

  if (!rule) {
    throw new Error(`Cannot find rule: '${ruleName}'`);
  }

  return {
    [ruleName]: [rule[0], { ...rule[1], ...adaptation }],
  };
}
