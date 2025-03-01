import type { NextSeoProps } from "next-seo";

export const SEO: NextSeoProps = {
  title: "Conscia | Transform your data into interactive graphs",
  description:
    "Conscia JSON Visualiser is a tool for visualizing into graphs, analyzing, editing, formatting, querying, transforming and validating JSON, CSV, YAML, XML, and more.",
  themeColor: "#36393E",
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://conscia.com/wp-content/uploads/2023/01/conscia-logo-featured-image-1600x900.jpg",
        width: 1200,
        height: 627,
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "icon",
      href: "https://conscia.com/wp-content/uploads/2018/11/conscia-favicon-43x43.png",
      sizes: "48x48",
    },
  ],
};
