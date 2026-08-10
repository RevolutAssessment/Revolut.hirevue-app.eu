import { SOPHIA_AUDIO, MATTHEW_AUDIO, MARGOT_AUDIO } from "../assets/audio.js";

export const listeningItems = [
  {
    id: "l1",
    instruction: "Listen to the interaction and verify the information below by selecting Match (✓) or Error (✗).",
    audioUrl: SOPHIA_AUDIO,
    fields: [
      { id: "l1_name", label: "Name", value: "Sophia Navarro" },
      { id: "l1_account", label: "Account number", value: "3268661719" },
      { id: "l1_email", label: "Email address", value: "s.navarro321@starmail.net" },
      { id: "l1_passcode", label: "Account passcode", value: "SNLVZ4EVR" },
    ],
  },
  {
    id: "l2",
    instruction: "Listen to the interaction and verify the information below by selecting Match (✓) or Error (✗).",
    audioUrl: MATTHEW_AUDIO,
    fields: [
      { id: "l2_name", label: "Name", value: "Matthew Kowalski" },
      { id: "l2_account", label: "Account number", value: "7185084546" },
      { id: "l2_email", label: "Email address", value: "matykow1@realmail.com" },
      { id: "l2_passcode", label: "Account passcode", value: "88988" },
    ],
  },
  {
    id: "l3",
    instruction: "Listen to the interaction and verify the information below by selecting Match (✓) or Error (✗).",
    audioUrl: MARGOT_AUDIO,
    fields: [
      { id: "l3_name", label: "Name", value: "Margot Garnier" },
      { id: "l3_account", label: "Account number", value: "7734914534" },
      { id: "l3_email", label: "Email address", value: "mzgarnier812@box.web" },
      { id: "l3_passcode", label: "Account passcode", value: "EF22630" },
    ],
  },
];
