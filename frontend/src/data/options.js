export const LEVELS = [
  {
    id: "middle-school",
    title: "Middle School",
    tagline: "First steps in ensemble playing",
    description:
      "Young players building fundamentals — simple keys, straightforward rhythms, and comfortable ranges for developing hands and embouchures.",
  },
  {
    id: "high-school",
    title: "High School",
    tagline: "3–6 years of experience",
    description:
      "Standard school-orchestra repertoire. Moderate technical demand, with room for a few divisi and modest tempo changes.",
  },
  {
    id: "hobby",
    title: "Hobby / Community",
    tagline: "Amateurs playing for the love of it",
    description:
      "Mixed-experience adult players rehearsing evenings and weekends. Forgiving tempos and ranges, written for consistency over virtuosity.",
  },
  {
    id: "college",
    title: "College / Conservatory",
    tagline: "Majors in serious daily training",
    description:
      "Pre-professional musicians with years of focused study. Advanced technique, extended ranges, and greater rhythmic complexity.",
  },
  {
    id: "professional",
    title: "Professional",
    tagline: "Full-time performing musicians",
    description:
      "Virtuosic technical demand with no accommodation required — the full vocabulary of the instrument is available.",
  },
];

export const MOODS = [
  { id: "joyful", title: "Joyful", example: 'Beethoven — Symphony No. 9, "Ode to Joy"' },
  { id: "triumphant", title: "Triumphant", example: "Beethoven — Symphony No. 5, IV. Allegro" },
  { id: "melancholic", title: "Melancholic", example: "Barber — Adagio for Strings" },
  { id: "serene", title: "Serene", example: "Vaughan Williams — The Lark Ascending" },
  { id: "mysterious", title: "Mysterious", example: "Mussorgsky — Night on Bald Mountain" },
  { id: "playful", title: "Playful", example: "Prokofiev — Peter and the Wolf" },
  { id: "nostalgic", title: "Nostalgic", example: 'Elgar — "Nimrod," Enigma Variations' },
  { id: "passionate", title: "Passionate", example: "Tchaikovsky — Romeo and Juliet Overture" },
  { id: "turbulent", title: "Turbulent", example: "Shostakovich — Symphony No. 5, I. Moderato" },
  { id: "majestic", title: "Majestic", example: 'Holst — "Jupiter," The Planets' },
];

export const PERIODS = [
  {
    id: "baroque",
    title: "Baroque",
    range: "1600–1750",
    voice: "in the voice of Bach",
    detail: "Contrapuntal clarity, terraced dynamics, dance-form structure.",
  },
  {
    id: "classical",
    title: "Classical",
    range: "1750–1820",
    voice: "in the voice of Haydn & early Beethoven",
    detail: "Balanced phrases, clear harmonic function, elegant restraint.",
  },
  {
    id: "romantic",
    title: "Romantic",
    range: "1820–1880",
    voice: "in the voice of Tchaikovsky",
    detail: "Sweeping melody, expanded harmony, dramatic contrast.",
  },
  {
    id: "late-romantic",
    title: "Late Romantic",
    range: "1880–1910",
    voice: "in the voice of Mahler & Rachmaninoff",
    detail: "Enormous orchestral canvases, chromatic yearning, extremes of scale.",
  },
  {
    id: "modern",
    title: "Modern",
    range: "1900–1950",
    voice: "in the voice of Stravinsky & Prokofiev",
    detail: "Rhythmic drive, angular melody, bold orchestral color.",
  },
  {
    id: "atonal",
    title: "Atonal / Contemporary",
    range: "1908–present",
    voice: "in the voice of Schoenberg and beyond",
    detail: "Freed from a home key — tension and color take the place of resolution.",
  },
];

export const WOODWIND_INSTRUMENTS = [
  { id: "piccolo", label: "Piccolo" },
  { id: "flute", label: "Flute" },
  { id: "oboe", label: "Oboe" },
  { id: "englishHorn", label: "English Horn" },
  { id: "clarinet", label: "Clarinet" },
  { id: "bassClarinet", label: "Bass Clarinet" },
  { id: "bassoon", label: "Bassoon" },
  { id: "contrabassoon", label: "Contrabassoon" },
];

export const BRASS_INSTRUMENTS = [
  { id: "horn", label: "Horn" },
  { id: "trumpet", label: "Trumpet" },
  { id: "trombone", label: "Trombone" },
  { id: "bassTrombone", label: "Bass Trombone" },
  { id: "tuba", label: "Tuba" },
];

export const PERCUSSION_INSTRUMENTS = [
  { id: "timpani", label: "Timpani" },
  { id: "snareDrum", label: "Snare Drum" },
  { id: "bassDrum", label: "Bass Drum" },
  { id: "cymbals", label: "Cymbals" },
  { id: "malletPercussion", label: "Mallet Percussion" },
  { id: "auxPercussion", label: "Auxiliary" },
];

export const SEATING_SECTIONS = [
  { id: "violin1", label: "1st Violin", ring: "strings", start: 180, end: 126, kind: "simple" },
  { id: "violin2", label: "2nd Violin", ring: "strings", start: 126, end: 98, kind: "simple" },
  { id: "viola", label: "Viola", ring: "strings", start: 98, end: 82, kind: "simple" },
  { id: "cello", label: "Cello", ring: "strings", start: 82, end: 54, kind: "simple" },
  { id: "bass", label: "Double Bass", ring: "strings", start: 54, end: 0, kind: "simple" },
  {
    id: "woodwinds",
    label: "Woodwinds",
    ring: "winds",
    start: 155,
    end: 90,
    kind: "group",
    instruments: WOODWIND_INSTRUMENTS,
  },
  {
    id: "brass",
    label: "Brass",
    ring: "winds",
    start: 90,
    end: 25,
    kind: "group",
    instruments: BRASS_INSTRUMENTS,
  },
  {
    id: "percussion",
    label: "Percussion",
    ring: "percussion",
    start: 165,
    end: 15,
    kind: "group",
    instruments: PERCUSSION_INSTRUMENTS,
  },
];

export function emptySeating() {
  const seating = {};
  for (const section of SEATING_SECTIONS) {
    seating[section.id] =
      section.kind === "group"
        ? Object.fromEntries(section.instruments.map((i) => [i.id, ""]))
        : "";
  }
  return seating;
}

export function sectionTotal(section, value) {
  if (section.kind === "group") {
    return Object.values(value || {}).reduce((sum, v) => sum + (Number(v) || 0), 0);
  }
  return Number(value) || 0;
}
