export const site = {
  name: "Your Name",
  tagline: "Developer & Creator",
  description: "Personal website and blog",
  url: "https://yourdomain.com",

  author: {
    name: "Your Name",
    bio: "I build things for the web. Passionate about clean code, open source, and creating tools that make a difference.",
    email: "hello@example.com",
  },

  social: [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
  ],

  nav: [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ],
} as const;

export type SiteConfig = typeof site;
