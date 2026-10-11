/* =====================================================================
   ÉDITIONS PASSÉES — fichier à alimenter
   ---------------------------------------------------------------------
   Pour ajouter des photos / vidéos :
   1. Déposer les fichiers dans  assets/events/<dossier-de-l-edition>/
      (photos en .jpg ou .webp, idéalement 1600 px de large max, < 500 Ko)
   2. Les ajouter dans la liste "media" de l'édition ci-dessous.

   Types de média acceptés :
     { type: "photo",   src: "assets/events/.../photo-01.jpg", alt: "Description" }
     { type: "video",   src: "assets/events/.../video.mp4", poster: "assets/events/.../cover.jpg", alt: "..." }
     { type: "youtube", id: "dQw4w9WgXcQ", alt: "Aftermovie" }   (id = code après v= dans l'URL YouTube)

   Les éditions sont triées automatiquement par date (la plus récente en haut).
   Source des infos : billetterie Eventbrite « Power Night Events ».
   ===================================================================== */

window.POWER_NIGHT_EVENTS = [
  {
    slug: "invest-power-night-2026",
    title: "Invest Power Night",
    date: "2026-10-01",
    time: "18h30",
    place: "Now Smart Parc — 11 avenue Dubonnet, Courbevoie",
    theme: "Investissement & levée de fonds",
    summary:
      "Soirée investissement et levée de fonds : startups IA, immobilier, restauration, gouvernance de l’IA et développement personnel, avec une session de pitch face à un panel d’experts (family office, finance, droit des sociétés, expertise comptable, crowdfunding).",
    attendees: 59,
    partners: ["My Pitch Academy", "SPIDR"],
    media: [
      { type: "photo", src: "assets/events/invest-power-night-2026/affiche-1.jpg", alt: "Affiche — panel d’experts" },
    ],
  },
  {
    slug: "ai-power-night-2-2026",
    title: "AI Power Night II",
    date: "2026-05-28",
    time: "18h30",
    place: "Now Smart Parc — 11 avenue Dubonnet, Courbevoie",
    theme: "Intelligence artificielle",
    summary:
      "Une soirée dédiée à l’intelligence artificielle : masterclasses, table ronde et networking, avec Mohamed Senhadji, Isabelle Hilali, Hadj Khelil, Samah Ghalloussi et Nasri Badaoui.",
    attendees: 79,
    partners: ["My Pitch Academy", "SPIDR"],
    media: [
      { type: "youtube", id: "SrYLGJA30C0", alt: "Vidéo de l’AI Power Night II" },
      { type: "photo", src: "assets/events/ai-power-night-2-2026/affiche-1.jpg", alt: "Affiche — intervenants" },
    ],
  },
  {
    slug: "freelance-power-night-2026",
    title: "Freelance Power Night",
    date: "2026-02-12",
    time: "19h00",
    place: "2 rue Ambroise Thomas, Paris 9e",
    theme: "Freelance",
    summary:
      "L’événement qui réunit freelances, ESN et founders pour structurer, scaler et pérenniser les projets indépendants.",
    attendees: 57,
    partners: ["My Pitch Academy", "SPIDR", "Café Crème", "Shreds", "Gasowl", "Geonexia ESN", "Skill Trust"],
    media: [
      { type: "photo", src: "assets/events/freelance-power-night-2026/affiche-1.jpg", alt: "Affiche — intervenants" },
      { type: "photo", src: "assets/events/freelance-power-night-2026/affiche-2.jpg", alt: "Partenaires de la soirée" },
    ],
  },
  {
    slug: "ai-power-night-2025",
    title: "AI Power Night : Pitch & Connect",
    date: "2025-06-12",
    time: "19h00",
    place: "Now Smart Parc — 11 avenue Dubonnet, Courbevoie",
    theme: "Intelligence artificielle",
    summary:
      "Une soirée dédiée à l’innovation, à l’intelligence artificielle et à l’entrepreneuriat, avec un panel d’experts (IA, freelance, marketing, investisseurs) pour écouter les pitchs et échanger avec les participants.",
    attendees: 50,
    partners: ["My Pitch Academy", "SPIDR", "Phoneside"],
    media: [
      { type: "photo", src: "assets/events/ai-power-night-2025/affiche-1.jpg", alt: "Affiche — panel d’experts" },
    ],
  },
];
