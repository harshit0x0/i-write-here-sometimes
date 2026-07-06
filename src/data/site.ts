export const site = {
  name: "Harshit Pandey",
  tagline: "Developer & Engineer",
  description: "Personal website and blog",
  url: "https://harshitlabs.xyz",

  author: {
    name: "Harshit",
    bio: "I build things for the web. Passionate about code, problem solving, and creating tools that make a difference. When I'm not coding, you'll find me exploring new tech or diving into a good problem to solve.",
    email: "hpandey8888@gmail.com",
  },

  social: [
    { name: "GitHub", url: "https://github.com/harshit0x0" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/harshit-pandey-032aa6221" },
  ],

  nav: [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ],
} as const;

export type SiteConfig = typeof site;
