import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const blogEntries = await getCollection("blog");
const projectEntries = await getCollection("projects");

// Helper to turn "my-post.md" into "my-post"
const cleanId = (id: string) => id.replace(/\.[^/.]+$/, "");

const heroPage = {
  index: {
    title: "knuckles_on_code",
    description:
      "Follow my developer journey and listen to my opinion on things",
    image: { src: "src/assets/hero/avatar.jpg" },
  },
};
const blogPages = Object.fromEntries(
  blogEntries.map((entry) => [`blog/${cleanId(entry.id)}`, entry.data]),
);
const projectPages = Object.fromEntries(
  projectEntries.map((entry) => [`projects/${cleanId(entry.id)}`, entry.data]),
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
    logo: { path: heroPage.index.image.src },
    bgImage: {
      // path: `src/assets/${path}/image.jpg`
      path: (path !== "index") ? `src/assets/${path}/image.jpg` : "src/assets/og-bg.png"
    }
  }),
});
