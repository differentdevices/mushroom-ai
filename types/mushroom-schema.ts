import { z } from 'zod';

// Name (safe, uncertainty-aware)
const MushroomNameSchema = z.object({
  common_name: z.string().or(z.literal("unknown")),
  scientific_name: z.string().or(z.literal("unknown")),
  name_confidence: z.number().describe(
    "Confidence name classicication from 0.0 to 1.0."
  ),
});

export const MushroomSchema = z.object({
  is_mushroom: z.boolean(),
  name: MushroomNameSchema,
  type: z.enum([
    "agaric",
    "bolete",
    "polypore",
    "puffball",
    "morel",
    "coral_fungus",
    "cup_fungus",
    "unknown",
  ]),

  // Visual features
  cap_color: z.string(),
  cap_shape: z.enum([
    "convex",
    "flat",
    "conical",
    "round",
    "irregular",
    "unknown",
  ]),
  gill_type: z.enum([
    "gills",
    "pores",
    "spines",
    "none",
    "unknown",
  ]),
  stem_present: z.boolean(),
  habitat: z.enum(["forest", "grass", "wood", "unknown"]),

  // Safe toxicity grouping
  toxicity: z.object({
    toxicity_risk: z.enum([
      "unknown",          // not enough info
      "high_risk_group",  // this visual category contains many poisonous species
      "medium_risk_group",// mixed group – some toxic, some not
      "low_risk_group",   // group where deadly species are uncommon
    ]),
    reasoning: z.string().describe(
      "Short visual explanation of why this toxicity_risk category was chosen. No safety or edibility advice."
    ),
  }),

  confidence: z.number().describe(
    "Confidence of overall classicication from 0.0 to 1.0."
  ),
});

export type MushroomType = z.infer<typeof MushroomSchema>;

export type HistoryItem = {
  id: string;                 // uuid
  createdAt: number;          // timestamp
  photoUri: string;
  mushroom: MushroomType;
};