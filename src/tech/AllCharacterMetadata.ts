export type GameId = "ssbu";

interface CharacterMetadata {
  displayName: string;
}

// tslint wants to be consistent about whether object keys are quoted or not.
// However, Prettier quotes as-needed, and this behavior isn't configurable.
// tslint:disable:object-literal-key-quotes
export const allCharacterMetadata = {
  ssbu: {
    mario: {
      displayName: "Mario",
    },
    "donkey-kong": {
      displayName: "Donkey Kong",
    },
    link: {
      displayName: "Link",
    },
    samus: {
      displayName: "Samus",
    },
    "dark-samus": {
      displayName: "Dark Samus",
    },
    yoshi: {
      displayName: "Yoshi",
    },
    kirby: {
      displayName: "Kirby",
    },
    fox: {
      displayName: "Fox",
    },
    pikachu: {
      displayName: "Pikachu",
    },
    luigi: {
      displayName: "Luigi",
    },
    ness: {
      displayName: "Ness",
    },
    "captain-falcon": {
      displayName: "Captain Falcon",
    },
    jigglypuff: {
      displayName: "Jigglypuff",
    },
    peach: {
      displayName: "Peach",
    },
    daisy: {
      displayName: "Daisy",
    },
    bowser: {
      displayName: "Bowser",
    },
    "ice-climbers": {
      displayName: "Ice Climbers",
    },
    sheik: {
      displayName: "Sheik",
    },
    zelda: {
      displayName: "Zelda",
    },
    "dr-mario": {
      displayName: "Dr. Mario",
    },
    pichu: {
      displayName: "Pichu",
    },
    falco: {
      displayName: "Falco",
    },
    marth: {
      displayName: "Marth",
    },
    lucina: {
      displayName: "Lucina",
    },
    "young-link": {
      displayName: "Young Link",
    },
    ganondorf: {
      displayName: "Ganondorf",
    },
    mewtwo: {
      displayName: "Mewtwo",
    },
    roy: {
      displayName: "Roy",
    },
    chrom: {
      displayName: "Chrom",
    },
    "mr-game-and-watch": {
      displayName: "Mr. Game & Watch",
    },
    "zero-suit-samus": {
      displayName: "Zero Suit Samus",
    },
    wario: {
      displayName: "Wario",
    },
    snake: {
      displayName: "Snake",
    },
    ike: {
      displayName: "Ike",
    },
    squirtle: {
      displayName: "Squirtle",
    },
    ivysaur: {
      displayName: "Ivysaur",
    },
    charizard: {
      displayName: "Charizard",
    },
    "diddy-kong": {
      displayName: "Diddy Kong",
    },
    lucas: {
      displayName: "Lucas",
    },
    sonic: {
      displayName: "Sonic",
    },
    "king-dedede": {
      displayName: "King Dedede",
    },
    olimar: {
      displayName: "Olimar",
    },
    lucario: {
      displayName: "Lucario",
    },
    rob: {
      displayName: "R.O.B.",
    },
    "toon-link": {
      displayName: "Toon Link",
    },
    wolf: {
      displayName: "Wolf",
    },
    villager: {
      displayName: "Villager",
    },
    "mega-man": {
      displayName: "Mega Man",
    },
    "wii-fit-trainer": {
      displayName: "Wii Fit Trainer",
    },
    "rosalina-and-luma": {
      displayName: "Rosalina & Luma",
    },
    "little-mac": {
      displayName: "Little Mac",
    },
    greninja: {
      displayName: "Greninja",
    },
    "mii-brawler": {
      displayName: "Mii Brawler",
    },
    "mii-swordfighter": {
      displayName: "Mii Swordfighter",
    },
    "mii-gunner": {
      displayName: "Mii Gunner",
    },
    palutena: {
      displayName: "Palutena",
    },
    "pac-man": {
      displayName: "Pac-Man",
    },
    robin: {
      displayName: "Robin",
    },
    shulk: {
      displayName: "Shulk",
    },
    "bowser-jr": {
      displayName: "Bowser Jr.",
    },
    "duck-hunt": {
      displayName: "Duck Hunt",
    },
    ryu: {
      displayName: "Ryu",
    },
    ken: {
      displayName: "Ken",
    },
    cloud: {
      displayName: "Cloud",
    },
    corrin: {
      displayName: "Corrin",
    },
    bayonetta: {
      displayName: "Bayonetta",
    },
    inkling: {
      displayName: "Inkling",
    },
    ridley: {
      displayName: "Ridley",
    },
    simon: {
      displayName: "Simon",
    },
    richter: {
      displayName: "Richter",
    },
    "king-k-rool": {
      displayName: "King K. Rool",
    },
    isabelle: {
      displayName: "Isabelle",
    },
    incineroar: {
      displayName: "Incineroar",
    },
    "piranha-plant": {
      displayName: "Piranha Plant",
    },
    joker: {
      displayName: "Joker",
    },
    hero: {
      displayName: "Hero",
    },
    "banjo-and-kazooie": {
      displayName: "Banjo & Kazooie",
    },
    terry: {
      displayName: "Terry",
    },
  },
};

export type CharacterId<
  T extends GameId
> = keyof ((typeof allCharacterMetadata)[T]);

const exportedAllCharacterMetadata: {
  [game in GameId]: {
    [characterId in CharacterId<game>]: CharacterMetadata;
  };
} = allCharacterMetadata;

export type AllCharacterMetadata = typeof exportedAllCharacterMetadata;

export interface GameAndCharacterId<T extends GameId> {
  gameId: T;
  characterId: CharacterId<T>;
}
