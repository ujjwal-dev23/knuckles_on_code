import { OGImageRoute } from "astro-og-canvas";
import { getCollection, getEntry } from "astro:content";

const blogEntries = await getCollection("blog");
const projectEntries = await getCollection("projects");

// Helper to turn "my-post.md" into "my-post"
const cleanId = (id: string) => id.replace(/\.[^/.]+$/, "");

const heroPage = {
  index: {
    title: "Ujjwal - Portfolio",
    description:
      "Welcome to my little corner of the internet where I showcase my journey, my work, and my skills.",
  },
};
const blogPages = Object.fromEntries(
  blogEntries.map((entry) => [`blog/${cleanId(entry.id)}`, entry.data]),
);
const projectPages = Object.fromEntries(
  projectEntries.map((entry) => [`project/${cleanId(entry.id)}`, entry.data]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages: {
    ...heroPage,
    ...blogPages,
    ...projectPages,
  },
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
  }),
});
