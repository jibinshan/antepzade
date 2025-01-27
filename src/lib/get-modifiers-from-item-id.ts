import type { MenuItem } from "@/types/menu";

export const GetModifiersFromItemId = (item: MenuItem, items: MenuItem[], index: number) => {
  const modifierIds = item.modifiers[index]?.items ?? [];

  const modifiers = [];

  for (const modifierId of modifierIds) {
    const modifier = items.find((item) => item._id === modifierId);
    if (modifier) {
      modifiers.push(modifier);
    }
  }

  return modifiers;
};
