import type { Rule } from "@/data/rules/types";

const BASE_URL = "https://sub-agents.directory";

interface WebSiteSchemaProps {
  name?: string;
  description?: string;
}

export function WebSiteJsonLd({ name = "Sub-Agents Directory", description }: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description:
      description || "Find the best Claude Code sub-agent prompts for your framework and language",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sub-Agents Directory",
    description: "The largest directory of Claude Code sub-agent prompts and MCP servers",
    url: BASE_URL,
    logo: `${BASE_URL}/claude-logo.svg`,
    sameAs: ["https://github.com/VoltAgent/awesome-claude-code-subagents"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface RuleJsonLdProps {
  rule: Rule;
  datePublished?: string;
  dateModified?: string;
}

export function RuleJsonLd({ rule, datePublished, dateModified }: RuleJsonLdProps) {
  const cleanDescription = (content: string): string => {
    return content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]+`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*_~>-]/g, "")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: rule.title,
    description: rule.description || cleanDescription(rule.content),
    url: `${BASE_URL}/${rule.slug}`,
    image: `${BASE_URL}/cover-image.png`,
    datePublished: datePublished || "2024-01-01T00:00:00Z",
    dateModified: dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Sub-Agents Directory",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sub-Agents Directory",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/claude-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${rule.slug}`,
    },
    keywords: rule.libs?.join(", ") || rule.tags?.join(", "),
    articleSection: rule.tags?.[0] || "Claude Code",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface McpServerJsonLdProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
}

export function McpServerJsonLd({ name, description, url, logo }: McpServerJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${BASE_URL}/mcp/${url}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    image: logo || `${BASE_URL}/cover-image.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Sub-Agents Directory",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
