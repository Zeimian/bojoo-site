module.exports = function (eleventyConfig) {
  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("assets");

  // Watch CSS/JS for hot-reload during dev
  eleventyConfig.addWatchTarget("css/");
  eleventyConfig.addWatchTarget("scripts/");

  // Ignore files that should not be processed as templates
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("vercel.json");
  eleventyConfig.ignores.add("nginx.conf");
  eleventyConfig.ignores.add("deploy.sh");
  eleventyConfig.ignores.add("setup-server.sh");
  eleventyConfig.ignores.add(".eleventy.js");
  eleventyConfig.ignores.add("package-lock.json");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "dist",
    },
    templateFormats: ["njk", "html", "css", "js"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
  };
};
