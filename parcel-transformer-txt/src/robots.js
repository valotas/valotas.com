function isSitemapRule(rule) {
  return rule.key.toLowerCase() === "sitemap";
}

class Robots {
  /**
   *
   * @param {Array<{ key: string; value: string }>} rules
   */
  constructor(rules) {
    /** @type {Array<{ key: string; value: string }>} */
    this._rules = rules;
  }

  getSitemap() {
    return this._rules.find(isSitemapRule).value;
  }

  /**
   * Updates the sitemap rule of the robots
   *
   * @param {string} sitemap
   */
  setSitemap(sitemap) {
    this._rules = this._rules.map((r) => {
      if (isSitemapRule(r)) {
        return { key: r.key, value: sitemap };
      }
      return r;
    });
  }

  getCode() {
    return this._rules.map((rule) => `${rule.key}: ${rule.value}`).join("\n");
  }
}

exports.parseRobots = function (content) {
  const rules = content
    .split("\n")
    .map((line) => {
      const [key, value] = line.split(":");
      if (key) {
        return { key: key.trim(), value: value.trim() };
      }
    })
    .filter(Boolean);

  return new Robots(rules);
};
