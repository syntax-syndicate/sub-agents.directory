import slugify from "slugify";
import { coreDevelopmentRules } from "./core-development";
import { languageSpecialistsRules } from "./language-specialists";
import { infrastructureRules } from "./infrastructure";
import { qualitySecurityRules } from "./quality-security";
import { dataAiRules } from "./data-ai";
import { developerExperienceRules } from "./developer-experience";
import { specializedDomainsRules } from "./specialized-domains";
import { businessProductRules } from "./business-product";
import { metaOrchestrationRules } from "./meta-orchestration";
import { researchAnalysisRules } from "./research-analysis";

export const rules: Rule[] = [
  ...coreDevelopmentRules,
  ...languageSpecialistsRules,
  ...infrastructureRules,
  ...qualitySecurityRules,
  ...dataAiRules,
  ...developerExperienceRules,
  ...specializedDomainsRules,
  ...businessProductRules,
  ...metaOrchestrationRules,
  ...researchAnalysisRules,
].map(
  (rule): Rule => ({
    ...rule,
    libs: "libs" in rule ? rule.libs : [],
  }),
);

export function getSections() {
  const categories = Array.from(new Set(rules.flatMap((rule) => rule.tags)));

  return categories
    .map((tag) => ({
      tag,
      rules: rules.filter((rule) => rule.tags.includes(tag)),
      slug: slugify(tag, { lower: true }),
    }))
    .sort((a, b) => b.rules.length - a.rules.length);
}

export function getSectionBySlug(slug: string) {
  return getSections().find((section) => section.slug === slug);
}

export function getRuleBySlug(slug: string) {
  return rules.find((rule) => rule.slug === slug);
}

export interface Rule {
  title: string;
  slug: string;
  tags: string[];
  libs: string[];
  content: string;
}

export type Section = {
  tag: string;
  rules: Rule[];
};
