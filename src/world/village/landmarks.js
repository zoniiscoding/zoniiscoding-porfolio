// Clustered around the hero tree the way a real village would grow: two
// places within easy reach of the tree (cottage, bulletin board), each with
// a second place just past it (bookshelf, workspace), converging on the
// chest, with the mailbox out at the village edge next to the bridge —
// paths connect all of it (see Village.jsx's PATHS list). Not a grid, not
// an even circle. xMobile/yMobile redistribute the same six places for the
// taller mobile stage in village.css.
//
// Landmark ids double as content ids (matching src/data/portfolio.js's
// navLinks) so the navbar's fast path needs no id-translation layer.
export const LANDMARKS = {
  about: {
    label: "Cottage",
    x: 24,
    y: 38,
    xMobile: 26,
    yMobile: 20,
    artAsset: "cottage",
    width: "15vw",
    ambient: "glow",
    // How far below the landmark's own (x,y) the player stops to enter —
    // (x,y) anchors the artwork near its roofline, not its doorstep, so
    // walking straight to it would stand the player on the roof and hide
    // the "Enter X" prompt behind them. Tuned per landmark's rendered
    // height so the player lands at its base instead (re-tuned for the
    // taller 16/11 stage — a fixed vw-wide asset renders shorter as a %
    // of stage height once the stage itself gets taller).
    standOffset: 18,
    scatter: [
      { asset: "bush_2", top: "70%", left: "-14%", width: "24%" },
      { asset: "bush_3", top: "58%", left: "88%", width: "20%" },
      { asset: "rock_3", top: "82%", left: "68%", width: "16%" },
      { asset: "mushroom_1", top: "84%", left: "32%", width: "13%" },
      { asset: "rock_1", top: "78%", left: "6%", width: "13%" },
    ],
  },
  skills: {
    label: "Bulletin Board",
    x: 74,
    y: 40,
    xMobile: 74,
    yMobile: 18,
    artAsset: "board_empty",
    width: "12.5vw",
    ambient: "sway",
    standOffset: 12,
    scatter: [
      { asset: "bush_1", top: "66%", left: "72%", width: "22%" },
      { asset: "bush_4", top: "60%", left: "-16%", width: "20%" },
      { asset: "rock_1", top: "80%", left: "-4%", width: "15%" },
      { asset: "mushroom_2", top: "82%", left: "62%", width: "12%" },
    ],
  },
  education: {
    label: "Bookshelf",
    x: 18,
    y: 76,
    xMobile: 22,
    yMobile: 40,
    artAsset: "bookshelf",
    width: "11vw",
    ambient: "glow",
    standOffset: 13,
    scatter: [
      { asset: "mushroom_2", top: "80%", left: "70%", width: "13%" },
      { asset: "bush_3", top: "68%", left: "-14%", width: "20%" },
      { asset: "rock_5", top: "82%", left: "8%", width: "15%" },
      { asset: "bush_2", top: "56%", left: "80%", width: "16%", flip: true },
    ],
  },
  projects: {
    label: "Workshop",
    x: 70,
    y: 66,
    xMobile: 74,
    yMobile: 42,
    artAsset: "desk",
    width: "16vw",
    ambient: "glow",
    standOffset: 12,
    // Denser, near-enclosing scatter so this reads as a small worked
    // clearing (a workshop) rather than a desk dropped in a field —
    // bushes on three sides, a stone floor patch under the desk.
    scatter: [
      { asset: "chair", top: "54%", left: "36%", width: "12%", flip: true },
      { asset: "bush_4", top: "62%", left: "-14%", width: "22%" },
      { asset: "bush_1", top: "58%", left: "86%", width: "20%" },
      { asset: "bush_3", top: "10%", left: "40%", width: "18%" },
      { asset: "rock_2", top: "84%", left: "72%", width: "13%" },
      { asset: "rock_4", top: "82%", left: "4%", width: "16%" },
    ],
    floorTiles: [
      { asset: "path_7", left: "50%", top: "88%", width: "34%" },
    ],
  },
  resume: {
    label: "Treasure Chest",
    x: 46,
    y: 80,
    xMobile: 48,
    yMobile: 58,
    artAsset: "chest_closed",
    artAssetVisited: "chest_open",
    width: "10vw",
    ambient: "glow",
    standOffset: 9,
    scatter: [
      { asset: "rock_4", top: "72%", left: "-20%", width: "22%" },
      { asset: "bush_2", top: "66%", left: "80%", width: "18%", flip: true },
      { asset: "mushroom_3", top: "84%", left: "24%", width: "12%" },
    ],
  },
  contact: {
    label: "Mailbox",
    x: 84,
    y: 78,
    xMobile: 80,
    yMobile: 74,
    artAsset: "mailbox_closed",
    artAssetVisited: "mailbox_open",
    width: "9vw",
    ambient: "sway",
    standOffset: 9,
    scatter: [
      { asset: "mushroom_3", top: "78%", left: "-24%", width: "16%" },
      { asset: "rock_5", top: "76%", left: "70%", width: "16%" },
      { asset: "bush_1", top: "58%", left: "-10%", width: "16%" },
    ],
  },
};

// Winding trails between places — each `bulge` curves the trail (positive
// left, negative right, relative to travel direction) so nothing is a ruler
// line. See VillagePath.jsx.
export const PATHS = [
  { from: "tree", to: "about", bulge: -4 },
  { from: "tree", to: "skills", bulge: 4 },
  { from: "about", to: "education", bulge: -3 },
  { from: "skills", to: "projects", bulge: 3 },
  { from: "education", to: "resume", bulge: 3 },
  { from: "projects", to: "resume", bulge: -3 },
  { from: "resume", to: "contact", bulge: -4 },
];

export const TREE_POS = { x: 50, y: 30, xMobile: 50, yMobile: 22 };
export const PLAYER_START = { x: 48, y: 36 };
