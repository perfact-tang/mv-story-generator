---
name: mv-story-generator
description: Generates complete MV shooting plans, storyboards, and character designs based on lyrics, style, and user ideas. Use this skill when the user wants to create an MV proposal, screenplay, or visual design for a song.
---

# MV Story Generator

This skill acts as a professional MV director and creative producer, generating detailed shooting plans and visual designs based on song information.

## Input Requirements

The process starts with three key inputs:
1.  **LRC Lyrics File**: For timing and rhythm analysis.
2.  **Song Style**: (e.g., Rock, Folk, Electronic, City Pop).
3.  **User Ideas**: Initial concepts, emotional tone, or specific scenes.

## Reference Materials

Use these references to enhance the quality of the direction and visual styles:
- **Directing Mindset**: [The_thought_process_of_top_directors.md](references/The_thought_process_of_top_directors.md) (Visual styles like Narrative, Abstract, Atmospheric).
- **Production Workflow**: [From_Inspiration_to_Finished_Product.md](references/From_Inspiration_to_Finished_Product.md) (Camera movement, color psychology, editing rhythm).
- **Practical Guide**: [Create_High_Quality_MVs_Even_with_No_Experience.md](references/Create_High_Quality_MVs_Even_with_No_Experience.md) (Beginner-friendly tips, AI specific advice).

## Task 1: MV Proposal Generation (5 Variations)

Generate **5 distinct** MV shooting proposals. Each proposal must include:

### A. Foundation
1.  **Outline**: Overall shooting concept combining lyrics, style, and user ideas.
2.  **Shooting Method**: Camera movements, composition, lighting (refer to reference docs).
3.  **Art Style**: Visual aesthetic definition (e.g., Retro, Cyberpunk, Surreal).

### B. Storyboard (3-5 Segments)
Divide the MV into 3-5 segments based on the song structure. Each segment includes:
1.  **Narrative**: Plot or visual description for this section.
2.  **First-frame Prompt**: AI image prompt for the start of the segment.
3.  **Last-frame Prompt**: AI image prompt for the end of the segment.

## Task 2: Character Design

1.  **Analyze Roles**: Determine the number of characters from the proposals.
2.  **Styling Options (5 per character)**:
    -   **Style Name**: e.g., Gothic, Minimalist.
    -   **Art Style Description**: Detailed stylistic text.
    -   **Image Prompt**: AI prompt for generating the character's look.
    *Note: If there are 3 characters, generate 15 total styling designs.*

## Handling Long Outputs (Node.js)

Due to AI generation token limits, you may not be able to generate all 5 proposals and character designs in a single response.

**Recommended Workflow:**

1.  **Split the Generation**: Generate the content in logical parts.
    *   Part 1: `metadata` and `proposals` (e.g., 1-2 proposals).
    *   Part 2: Remaining `proposals`.
    *   Part 3: `character_designs`.
2.  **Save Temporary Files**: Save each part as a separate JSON file (e.g., `part1.json`, `part2.json`).
3.  **Merge**: Use the included Node.js script to merge them into the final `mv_plan.json`.

```bash
# Example usage
node scripts/merge_outputs.js mv_plan.json part1.json part2.json part3.json
```

## Output Format (JSON)

The individual parts AND the final output **MUST** follow this schema structure (parts can have empty arrays for missing sections).

```json
{
  "metadata": {
    "song_style": "Song Style",
    "user_ideas": "Extracted core user ideas"
  },
  "proposals": [
    {
      "proposal_id": 1,
      "direction_name": "Direction Name (e.g., Aesthetic Nostalgia)",
      "basics": {
        "outline": "Detailed shooting outline",
        "shooting_method": "Shooting techniques",
        "art_style_description": "Visual aesthetic description"
      },
      "storyboard": [
        {
          "segment_id": 1,
          "content_narrative": "Segment detailed narrative",
          "prompts": {
            "first_frame": "AI Prompt for first frame",
            "last_frame": "AI Prompt for last frame"
          }
        }
      ]
    }
  ],
  "character_designs": [
    {
      "character_id": "char_001",
      "role_name": "Role Name",
      "character_description": "Basic character description",
      "styling_variations": [
        {
          "style_name": "Style Name",
          "art_style_text": "Detailed style description",
          "image_prompt": "AI Prompt for character"
        }
      ]
    }
  ]
}
```

## Guidelines for Quality

*   **Diversity**: The 5 proposals must be visually and narratively distinct.
*   **Prompt Engineering**: Prompts should be optimized for AI generation (Qwen-Image, Z-Image, Seedream4.5), focusing on composition, lighting, texture, and mood.
*   **Consistency**: Character styles should complement the MV visuals.
*   **Rhythm**: Storyboard segments should align logically with the LRC timestamps.
