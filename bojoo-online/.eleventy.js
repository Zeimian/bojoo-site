module.exports = function (eleventyConfig) {
  // Output directory
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "dist",
    },
    templateFormats: ["njk", "html", "md", "css", "js"],
    htmlTemplateEngine: "njk",
  };
};
