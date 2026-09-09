const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const IMG = {
  // Generated cinematic assets
  ghanaHarvest: "/images/ghana-harvest.jpg",
  heroMango: "/images/hero-mango.jpg",
  pulp: "/images/mango-pulp.jpg",
  dried: "/images/dried-ingredient.jpg",
  sack: "/images/wna-sack.png",

  // Mango — WNA's current entry crop
  mangoPile: px(11450658),
  mangoMarket: px(16882398),
  mangoColor: px(30893227),

  // Ghana & West Africa — farms, harvests, people
  harvestWoman: px(31537319),
  smilingHarvester: px(31537318),
  harvestWomen: px(31537320),
  greenField: px(38025883),
  maizeHands: px(38668660),
  maizeFarmer: px(38668661),
  cacao: px(8900912),
  pineappleBasket: px(37405736),
  pineappleField: px(37405737),

  // Ghana & West Africa — markets and staples
  temaMarket: px(8613968),
  accraStreet: px(3561181),
  yamsMarket: px(14881680),
  umbrellaMarket: px(14881644),
  tomatoes: px(15170758),
  peppers: px(28344263),
  josMarket: px(33624055),
  monroviaMarket: px(28263405),
  cassavaStall: px(30893343),
  cassavaBowls: px(30893342),
  plantainPile: px(31537314),

  // Industrial / logistics (illustrative)
  factory: px(33514501),
  tanks: px(17765433),
  line: px(5532664),
  aerial: px(30255136),
  aerialDusk: px(11618703),
  patchwork: px(30255157),
  truck: px(36228061),
  truckOrange: px(37124297),
  sacks: px(21958120),
};

export const NAV_LINKS = [
  { label: "What We Do", href: "#what" },
  { label: "How It Works", href: "#how" },
  { label: "Products", href: "#product" },
  { label: "Vision", href: "#vision" },
  { label: "About", href: "#about" },
];

/** Ghana's surplus landscape — mango today, the rest in pipeline. */
export const GHANA_CROPS = [
  "MANGO",
  "PINEAPPLE",
  "CASSAVA",
  "PLANTAIN",
  "MAIZE",
  "VEGETABLES",
];
