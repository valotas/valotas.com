type RobotsRule = { key: string; value: string };

function isSitemapRule(rule: RobotsRule) {
  return rule.key.toLowerCase() === "sitemap";
}

class Robots {
  private rules: RobotsRule[] = [];

  constructor(rules: RobotsRule[]) {
    this.rules = rules;
  }

  getSitemap() {
    const sitemap = this.rules.find(isSitemapRule);
    return sitemap?.value;
  }

  /**
   * Updates the sitemap rule of the robots
   */
  setSitemap(sitemap: string) {
    this.rules = this.rules.map((r) => {
      if (isSitemapRule(r)) {
        return { key: r.key, value: sitemap };
      }
      return r;
    });
  }

  getCode() {
    return this.rules.map((rule) => `${rule.key}: ${rule.value}`).join("\n");
  }
}

function isRobotsRule(item?: any): item is RobotsRule {
  return item && item.key && item.value;
}

export function parseRobots(content: string) {
  const rules = content
    .split("\n")
    .map((line) => {
      const [key, value] = line.split(":");
      if (key) {
        return { key: key.trim(), value: value.trim() };
      }
    })
    .filter(isRobotsRule);

  return new Robots(rules);
}
