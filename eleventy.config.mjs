import { DateTime } from "luxon";
import CleanCSS from "clean-css";
import UglifyJS from "uglify-js";
import htmlmin from "html-minifier";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import implicitFigures from "markdown-it-implicit-figures";
import readingTime from "eleventy-plugin-reading-time";


export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addCollection("authors", collection => {
    const blogs = collection.getFilteredByGlob("posts/*.md");
    return blogs.reduce((coll, post) => {
      const author = post.data.author;
      if (!author) return coll;
      if (!coll.hasOwnProperty(author)) coll[author] = [];
      coll[author].push(post.data);
      return coll;
    }, {});
  });
  
  eleventyConfig.addFilter("hasTag", function(tags, tagToMatch) {
    if (!Array.isArray(tags)) return false;
    return tags.includes(tagToMatch);
  });

  eleventyConfig.addFilter("readableDate", dateObj =>
    DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy")
  );

  eleventyConfig.addFilter("machineDate", dateObj =>
    DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd")
  );

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });
  
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });
  
  eleventyConfig.addFilter("reject", function(arr, value) {
    if (!Array.isArray(arr)) return arr;
    return arr.filter(tag => tag !== value);
  });

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static/");
  eleventyConfig.addPassthroughCopy("admin/");
  eleventyConfig.addPassthroughCopy("_includes/assets/css/inline.css");
  eleventyConfig.addPassthroughCopy("static/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy("static/js/service-worker.js");

 eleventyConfig.setLibrary("md", markdownIt({
    html: true,        // Enables inline HTML like <br />
    breaks: true,      // Two-space at end of line = <br>
    linkify: true      // Auto-convert URLs to links
  })
  .use(markdownItAnchor, {
    permalink: false
  })
  .use(implicitFigures, {
    dataType: false,
    figcaption: true   // Enables <figcaption> from image titles
  }));

  return {
    templateFormats: ["md", "njk", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
