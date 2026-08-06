module.exports = function (eleventyConfig) {
  // Kopiera CSS och bilder rakt igenom till den färdiga sajten
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/bilder");

  // Gör datum läsbara i mallarna: 2026-08-06 -> 6 augusti 2026
  eleventyConfig.addFilter("datum", (value) =>
    new Date(value).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Datumformat för sitemap och RSS-flöde
  eleventyConfig.addFilter("htmlDateString", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());

  eleventyConfig.addFilter("rssDate", (post) =>
    new Date(post ? post.date : Date.now()).toISOString()
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
  };
};
