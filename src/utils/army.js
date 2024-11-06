import { updateIds } from "./id";

export const getArmyData = ({ data, armyComposition }) => {
  // Remove units that don't belong to the army composition
  const characters = data.characters.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );
  const lords = data.lords.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );
  
  const heroes = data.heroes.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );
  
  const core = data.core.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );
  const special = data.special.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );
  const rare = data.rare.filter(
    (unit) =>
      (unit?.armyComposition && unit.armyComposition[armyComposition]) ||
      !unit.armyComposition
  );

  // Get units moving category
  const specialToCore = special.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "core"
  );
  const rareToCore = rare.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "core"
  );
  const rareToSpecial = rare.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "special"
  );
  const coreToSpecial = core.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "special"
  );
  const coreToRare = core.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "rare"
  );
  const specialToRare = special.filter(
    (unit) =>
      unit?.armyComposition &&
      unit.armyComposition[armyComposition].category === "rare"
  );
  const charactersToRare = characters?.length
    ? characters.filter(
        (unit) =>
          unit?.armyComposition &&
          unit.armyComposition[armyComposition].category === "rare"
      )
    : [];

  // Remove units from old category
  const allCore = [...core, ...specialToCore, ...rareToCore].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "core") ||
      !unit.armyComposition
  );
  const allSpecial = [...special, ...coreToSpecial, ...rareToSpecial].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "special") ||
      !unit.armyComposition
  );
  const allRare = [
    ...rare,
    ...specialToRare,
    ...charactersToRare,
    ...coreToRare,
  ].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "rare") ||
      !unit.armyComposition
  );
  const allCharacters = [...characters].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "characters") ||
      !unit.armyComposition
  );
  const allLords = [...lords].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "lords") ||
      !unit.armyComposition
  );
  
  const allHeroes = [...heroes].filter(
    (unit) =>
      (unit?.armyComposition &&
        unit.armyComposition[armyComposition].category === "heroes") ||
      !unit.armyComposition
  );

  return {
    lords: updateIds(allLords),
    heroes: updateIds(allHeroes),
    characters: updateIds(allCharacters),
    core: updateIds(allCore),
    special: updateIds(allSpecial),
    rare: updateIds(allRare),
    mercenaries: updateIds(data.mercenaries),
    allies: updateIds(data.allies),
  };
};