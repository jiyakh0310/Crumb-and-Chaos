export const navLinks = [
  { label: "Home", to: "/" },
  { label: "The Kitchen", to: "/kitchen" },
  { label: "Recipe Vault", to: "/recipes" },
  { label: "Bake Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

export const footerLinks = [...navLinks.slice(1), { label: "Kitchen SOS", to: "/ask" }];
