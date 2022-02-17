// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "js-image-lib",
  tagline: "An image manipulation library using only pure JavaScript",
  url: "https://js-image-lib.mcfarl.in",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Josh-McFarlin",
  projectName: "js-image-lib",
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/Josh-McFarlin/js-image-lib/tree/master/docs/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        blog: false,
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "js-image-lib",
        logo: {
          alt: "js-image-lib Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          {
            type: "doc",
            docId: "tutorial/install",
            position: "left",
            label: "Tutorial",
          },
          {
            href: "https://github.com/Josh-McFarlin/js-image-lib",
            label: "GitHub",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Josh McFarlin. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: "YOUR_APP_ID",
        apiKey: "YOUR_SEARCH_API_KEY",
        indexName: "YOUR_INDEX_NAME",
      },
    }),
};

module.exports = config;
