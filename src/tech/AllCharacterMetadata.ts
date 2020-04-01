export type GameId = "ssbu";

export interface CharacterMetadata {
  idNumber: number;
  isEchoFighter: boolean;
  displayName: string;
  title: string;
}

// tslint wants to be consistent about whether object keys are quoted or not.
// However, Prettier quotes as-needed, and this behavior isn't configurable.
// tslint:disable:object-literal-key-quotes
const allCharacterMetadataInternal = {
  ssbu: {
    mario: {
      idNumber: 1,
      isEchoFighter: false,
      displayName: "Mario",
      title: "Mr. Video Game Himself",
    },
    "donkey-kong": {
      idNumber: 2,
      isEchoFighter: false,
      displayName: "Donkey Kong",
      title: "King of the Jungle",
    },
    link: {
      idNumber: 3,
      isEchoFighter: false,
      displayName: "Link",
      title: "Champion of Hyrule",
    },
    samus: {
      idNumber: 4,
      isEchoFighter: false,
      displayName: "Samus",
      title: "Bounty Hunter Extraordinaire",
    },
    "dark-samus": {
      idNumber: 4,
      isEchoFighter: true,
      displayName: "Dark Samus",
      title: "Phazon Incarnate",
    },
    yoshi: {
      idNumber: 5,
      isEchoFighter: false,
      displayName: "Yoshi",
      title: "Omnivore of the Year",
    },
    kirby: {
      idNumber: 6,
      isEchoFighter: false,
      displayName: "Kirby",
      title: "The Pink Demon",
    },
    fox: {
      idNumber: 7,
      isEchoFighter: false,
      displayName: "Fox",
      title: "Leader of Star Fox",
    },
    pikachu: {
      idNumber: 8,
      isEchoFighter: false,
      displayName: "Pikachu",
      title: "Pika Pika!",
    },
    luigi: {
      idNumber: 9,
      isEchoFighter: false,
      displayName: "Luigi",
      title: "The Eternal Understudy",
    },
    ness: {
      idNumber: 10,
      isEchoFighter: false,
      displayName: "Ness",
      title: "The PSI Powerhouse",
    },
    "captain-falcon": {
      idNumber: 11,
      isEchoFighter: false,
      displayName: "Captain Falcon",
      title: "The Supersonic Slugger",
    },
    jigglypuff: {
      idNumber: 12,
      isEchoFighter: false,
      displayName: "Jigglypuff",
      title: "The Sleepy Singer",
    },
    peach: {
      idNumber: 13,
      isEchoFighter: false,
      displayName: "Peach",
      title: "Princess of Toadstools",
    },
    daisy: {
      idNumber: 13,
      isEchoFighter: true,
      displayName: "Daisy",
      title: "Sarasaland's Chipper Princess",
    },
    bowser: {
      idNumber: 14,
      isEchoFighter: false,
      displayName: "Bowser",
      title: "King of the Koopas",
    },
    "ice-climbers": {
      idNumber: 15,
      isEchoFighter: false,
      displayName: "Ice Climbers",
      title: "Bone-Chilling Duo",
    },
    sheik: {
      idNumber: 16,
      isEchoFighter: false,
      displayName: "Sheik",
      title: "The Illusive Sheikah",
    },
    zelda: {
      idNumber: 17,
      isEchoFighter: false,
      displayName: "Zelda",
      title: "Hyrule's Wise Princess",
    },
    "dr-mario": {
      idNumber: 18,
      isEchoFighter: false,
      displayName: "Dr. Mario",
      title: "The Prescriber",
    },
    pichu: {
      idNumber: 19,
      isEchoFighter: false,
      displayName: "Pichu",
      title: "Shockingly Adorable",
    },
    falco: {
      idNumber: 20,
      isEchoFighter: false,
      displayName: "Falco",
      title: "Proud Space Ace",
    },
    marth: {
      idNumber: 21,
      isEchoFighter: false,
      displayName: "Marth",
      title: "The Hero-King",
    },
    lucina: {
      idNumber: 21,
      isEchoFighter: true,
      displayName: "Lucina",
      title: "Warrior from a Doomed Future",
    },
    "young-link": {
      idNumber: 22,
      isEchoFighter: false,
      displayName: "Young Link",
      title: "Master of the Ocarina",
    },
    ganondorf: {
      idNumber: 23,
      isEchoFighter: false,
      displayName: "Ganondorf",
      title: "The King of Darkness",
    },
    mewtwo: {
      idNumber: 24,
      isEchoFighter: false,
      displayName: "Mewtwo",
      title: "A Legend Reawakens",
    },
    roy: {
      idNumber: 25,
      isEchoFighter: false,
      displayName: "Roy",
      title: "The Young Lion",
    },
    chrom: {
      idNumber: 25,
      isEchoFighter: true,
      displayName: "Chrom",
      title: "Prince of Ylisse",
    },
    "mr-game-and-watch": {
      idNumber: 26,
      isEchoFighter: false,
      displayName: "Mr. Game & Watch",
      title: "Master of Two Dimensions",
    },
    "meta-knight": {
      idNumber: 27,
      isEchoFighter: false,
      displayName: "Meta Knight",
      title: "The Masked Swordsman",
    },
    pit: {
      idNumber: 28,
      isEchoFighter: false,
      displayName: "Pit",
      title: "Captain of Lady Palutena's Guard",
    },
    "dark-pit": {
      idNumber: 28,
      isEchoFighter: true,
      displayName: "Dark Pit",
      title: "Dark-Winged Doppelgänger",
    },
    "zero-suit-samus": {
      idNumber: 29,
      isEchoFighter: false,
      displayName: "Zero Suit Samus",
      title: "The Warrior Within",
    },
    wario: {
      idNumber: 30,
      isEchoFighter: false,
      displayName: "Wario",
      title: "Scoundrel with a Fart of Gold",
    },
    snake: {
      idNumber: 31,
      isEchoFighter: false,
      displayName: "Snake",
      title: "The Legendary Mercenary",
    },
    ike: {
      idNumber: 32,
      isEchoFighter: false,
      displayName: "Ike",
      title: "The Radiant Hero of Legend",
    },
    squirtle: {
      idNumber: 33,
      isEchoFighter: false,
      displayName: "Squirtle",
      title: "Wants to Be the Very Best",
    },
    ivysaur: {
      idNumber: 34,
      isEchoFighter: false,
      displayName: "Ivysaur",
      title: "Wants to Be the Very Best",
    },
    charizard: {
      idNumber: 35,
      isEchoFighter: false,
      displayName: "Charizard",
      title: "Wants to Be the Very Best",
    },
    "diddy-kong": {
      idNumber: 36,
      isEchoFighter: false,
      displayName: "Diddy Kong",
      title: "The Acrobat",
    },
    lucas: {
      idNumber: 37,
      isEchoFighter: false,
      displayName: "Lucas",
      title: "Boy from Nowhere",
    },
    sonic: {
      idNumber: 38,
      isEchoFighter: false,
      displayName: "Sonic",
      title: "The Blue Blur",
    },
    "king-dedede": {
      idNumber: 39,
      isEchoFighter: false,
      displayName: "King Dedede",
      title: "Self-Made King",
    },
    olimar: {
      idNumber: 40,
      isEchoFighter: false,
      displayName: "Olimar",
      title: "Veteran Astronaut",
    },
    lucario: {
      idNumber: 41,
      isEchoFighter: false,
      displayName: "Lucario",
      title: "Master of Aura",
    },
    rob: {
      idNumber: 42,
      isEchoFighter: false,
      displayName: "R.O.B.",
      title: "The Last of His Kind",
    },
    "toon-link": {
      idNumber: 43,
      isEchoFighter: false,
      displayName: "Toon Link",
      title: "Wind-Waking Warrior",
    },
    wolf: {
      idNumber: 44,
      isEchoFighter: false,
      displayName: "Wolf",
      title: "The Silver Space Wolf",
    },
    villager: {
      idNumber: 45,
      isEchoFighter: false,
      displayName: "Villager",
      title: "Mayor of Smashville",
    },
    "mega-man": {
      idNumber: 46,
      isEchoFighter: false,
      displayName: "Mega Man",
      title: "The Blue Bomber",
    },
    "wii-fit-trainer": {
      idNumber: 47,
      isEchoFighter: false,
      displayName: "Wii Fit Trainer",
      title: "Yoga Warrior",
    },
    "rosalina-and-luma": {
      idNumber: 48,
      isEchoFighter: false,
      displayName: "Rosalina & Luma",
      title: "The Cosmic Travelers",
    },
    "little-mac": {
      idNumber: 49,
      isEchoFighter: false,
      displayName: "Little Mac",
      title: "Bruiser from the Bronx",
    },
    greninja: {
      idNumber: 50,
      isEchoFighter: false,
      displayName: "Greninja",
      title: "Master of Stealth",
    },
    "mii-brawler": {
      idNumber: 51,
      isEchoFighter: false,
      displayName: "Mii Brawler",
      title: "The Brawler of Many Faces",
    },
    "mii-swordfighter": {
      idNumber: 52,
      isEchoFighter: false,
      displayName: "Mii Swordfighter",
      title: "The Gunner of Many Faces",
    },
    "mii-gunner": {
      idNumber: 53,
      isEchoFighter: false,
      displayName: "Mii Gunner",
      title: "The Swordfighter of Many Faces",
    },
    palutena: {
      idNumber: 54,
      isEchoFighter: false,
      displayName: "Palutena",
      title: "Goddess of Light",
    },
    "pac-man": {
      idNumber: 55,
      isEchoFighter: false,
      displayName: "Pac-Man",
      title: "The Yellow Bane of Ghosts",
    },
    robin: {
      idNumber: 56,
      isEchoFighter: false,
      displayName: "Robin",
      title: "The Tactician Magician",
    },
    shulk: {
      idNumber: 57,
      isEchoFighter: false,
      displayName: "Shulk",
      title: "The Visionary",
    },
    "bowser-jr": {
      idNumber: 58,
      isEchoFighter: false,
      displayName: "Bowser Jr.",
      title: "Prince of the Koopas",
    },
    "duck-hunt": {
      idNumber: 59,
      isEchoFighter: false,
      displayName: "Duck Hunt",
      title: "Bark, Quack, Boom!",
    },
    ryu: {
      idNumber: 60,
      isEchoFighter: false,
      displayName: "Ryu",
      title: "Eternal Wanderer",
    },
    ken: {
      idNumber: 60,
      isEchoFighter: true,
      displayName: "Ken",
      title: "The Fire-Breathing Fist",
    },
    cloud: {
      idNumber: 61,
      isEchoFighter: false,
      displayName: "Cloud",
      title: "SOLDIER 1st Class",
    },
    corrin: {
      idNumber: 62,
      isEchoFighter: false,
      displayName: "Corrin",
      title: "Blood of Dragons",
    },
    bayonetta: {
      idNumber: 63,
      isEchoFighter: false,
      displayName: "Bayonetta",
      title: "Umbra Witch",
    },
    inkling: {
      idNumber: 64,
      isEchoFighter: false,
      displayName: "Inkling",
      title: "Part Kid, Part Squid",
    },
    ridley: {
      idNumber: 65,
      isEchoFighter: false,
      displayName: "Ridley",
      title: "Cunning God of Death",
    },
    simon: {
      idNumber: 66,
      isEchoFighter: false,
      displayName: "Simon",
      title: "Evil's Whip-Wielding Bane",
    },
    richter: {
      idNumber: 66,
      isEchoFighter: true,
      displayName: "Richter",
      title: "Azure Vampire Assassin",
    },
    "king-k-rool": {
      idNumber: 67,
      isEchoFighter: false,
      displayName: "King K. Rool",
      title: "The Kremling Commander",
    },
    isabelle: {
      idNumber: 68,
      isEchoFighter: false,
      displayName: "Isabelle",
      title: "The Mayor's Assistant",
    },
    incineroar: {
      idNumber: 69,
      isEchoFighter: false,
      displayName: "Incineroar",
      title: "The Ring's Raging Flame",
    },
    "piranha-plant": {
      idNumber: 70,
      isEchoFighter: false,
      displayName: "Piranha Plant",
      title: "Bloom of Your Doom",
    },
    joker: {
      idNumber: 71,
      isEchoFighter: false,
      displayName: "Joker",
      title: "The Great Phantom Thief",
    },
    hero: {
      idNumber: 72,
      isEchoFighter: false,
      displayName: "Hero",
      title: "The Legendary Hero",
    },
    "banjo-and-kazooie": {
      idNumber: 73,
      isEchoFighter: false,
      displayName: "Banjo & Kazooie",
      title: "Laid-Back Animals",
    },
    terry: {
      idNumber: 74,
      isEchoFighter: false,
      displayName: "Terry",
      title: "The Legendary Wolf",
    },
  },
};

export type CharacterId<_T extends GameId> = string;

export const allCharacterMetadata: {
  [game in GameId]: {
    [x: string]: CharacterMetadata;
  };
} = allCharacterMetadataInternal;

export type AllCharacterMetadata = typeof allCharacterMetadata;

export interface GameAndCharacterId<T extends GameId> {
  gameId: T;
  characterId: CharacterId<T>;
}
