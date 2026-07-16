export type PlayerProfile = {
  readonly name: string;
  readonly avatarColor: string;
};

const playerProfiles = [
  { name: "Aさん", avatarColor: "#38bdf8" },
  { name: "Bさん", avatarColor: "#f43f5e" },
  { name: "Cさん", avatarColor: "#10b981" },
  { name: "Dさん", avatarColor: "#f59e0b" },
] as const satisfies readonly PlayerProfile[];

export function createPlayerProfileLookup(
  orderedPlayerIndexes: number[],
): (playerIndex: number) => PlayerProfile {
  const profileByPlayerIndex = new Map(
    orderedPlayerIndexes.map((playerIndex, profileIndex) => [
      playerIndex,
      playerProfiles[profileIndex],
    ]),
  );

  return (playerIndex: number) =>
    profileByPlayerIndex.get(playerIndex) ?? playerProfiles[0];
}
