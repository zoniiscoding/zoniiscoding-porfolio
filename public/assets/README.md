# Pixel Portfolio Assets

This folder contains all custom pixel-art assets used throughout the portfolio.

## Folder Structure

```text
assets/
├── player/
├── environment/
├── structures/
├── props/
├── ui/
└── effects/
```

---

# PLAYER

## master_character.png

Reference artwork for the main player character.

Appearance:

- Female
- Name: Tanisha
- Jet black layered hair
- Pink fitted t-shirt
- Grey fitted flare leggings
- White sneakers
- Cute retro pixel-art style
- Front facing
- Used as the reference for all animations

---

## idle.png

Idle animation sprite sheet.

- 4 animation frames
- Character breathes slightly
- Occasional blink
- Default animation whenever the player is standing still

---

## walk.png

Walking animation sprite sheet.

- 6 animation frames
- Smooth looping walk cycle
- Used whenever the player moves left or right

---

## jump.png

Jump animation sprite sheet.

- 3 animation frames

Frame order:

1. crouch
2. jump
3. landing

---

## wave.png

Wave animation sprite sheet.

- 3 animation frames

Used when greeting visitors or introducing sections.

---

# ENVIRONMENT

## grass_platform.png

Main ground platform.

Used throughout the world.

Can be repeated seamlessly.

---

## stonepath_tile.png

Modular stone path tiles.

Includes:

- straight paths
- corners
- T-junctions
- crossroads
- end pieces

Use these to create continuous walkable paths connecting different areas of the world.

Never use as standalone decorations.

---

## bridge.png

Wooden bridge.

Use as a transition between major locations.

Can cross rivers or decorative water.

Represents progression between areas.

---

## cozy_cottage.png

Main house.

Represents the About Me section.

Should feel like the player's home.

Dialogue interactions can occur here.

---

## herotree.png

Large centerpiece tree.

Acts as an environmental landmark.

Can be placed near the beginning of the journey or in a central hub.

---

## bushes.png

Bush asset pack.

Contains multiple bush sizes.

Use to:

- fill empty space
- frame paths
- decorate buildings
- create natural boundaries

---

## flowers.png

Flower asset pack.

Scatter naturally throughout the environment.

Avoid repetitive placement.

---

## rocks_mushrooms.png

Decorative environment asset pack.

Contains:

- rocks
- mushroom clusters

Scatter around paths, trees, fences and buildings to make the world feel alive.

---

## fence.png

Wooden fence.

Use to create:

- cottage yard
- gardens
- natural boundaries
- decorative enclosures

Do not use as a full-width section divider.

---

## clouds.png

Background cloud asset.

Used in the sky.

Should slowly move horizontally.

---

## sparkles.png

Decorative sparkle asset.

Should gently twinkle.

Used around:

- player
- UI
- buttons
- important objects
- treasure chest
- mailbox
- magical interactions

---

# STRUCTURES

## mailbox.png

Interactive mailbox.

Represents the Contact section.

Clicking or approaching the mailbox can reveal:

- Email
- LinkedIn
- GitHub
- Contact information

---

## bulletin_board.png

Interactive bulletin board.

Represents Skills.

Technologies can appear as pinned notes.

Should feel like a developer's inspiration board.

---

## bookshelf.png

Interactive bookshelf.

Represents Education.

Books can reveal:

- degree
- certifications
- achievements
- learning journey

---

## treasure_chest.png

Interactive treasure chest.

Represents Resume.

Opening the chest should reveal a glowing resume scroll or download option.

---

## wooden_signpost.png

Navigation signpost.

Used throughout the world.

Can point visitors toward important locations.

Should help navigation naturally rather than acting as webpage navigation.

---

# PROPS

## desk.png

Main desk.

Used in the Projects workspace.

---

## chair.png

Desk chair.

Placed behind the desk.

Can slightly animate when entering the workspace.

---

## macbook.png

Sky Blue MacBook.

Represents my real laptop.

Place on top of the desk.

---

## plant.png

Small decorative house plant.

Used to make the workspace feel cozy.

---

# UI

## retro_window.png

Retro operating system style window.

Use for:

- Project details
- Skills
- Popup windows
- Information panels

Windows should appear as though launched from the project terminal rather than stacked webpage cards.

---

## dialog_box.png

Pixel dialogue box.

Use for:

- About Me
- Character conversations
- NPC style interactions
- Typewriter text

---

## button.png

Primary pixel button.

Use for:

- Start
- Resume
- Projects
- Contact
- Downloads

Hover state should slightly scale.

---

# EFFECTS

## coin.png

Animated spinning coin sprite sheet.

Optional collectible.

Loops forever.

---

## cat.png

Cute orange kitten sprite sheet.

Acts as the player's companion.

Behaviour:

- follows player
- stops when player stops
- occasionally blinks
- occasionally sits
- looks around randomly

The cat should always stay slightly behind the player.

---

# World Design Rules

Treat every asset as part of one continuous world.

Do not place assets as isolated images.

Instead, compose complete scenes.

Examples:

- Fence + Cottage + Flowers = Home
- Desk + Chair + MacBook + Plant = Workspace
- Bookshelf + Dialogue = Education
- Mailbox + Signpost = Contact
- Treasure Chest + Sparkles = Resume

Reuse environmental assets naturally.

Scatter:

- bushes
- flowers
- rocks
- mushrooms

with slight variation to avoid repetition.

Stone paths should guide visitors between locations.

The bridge should connect meaningful areas, not exist as decoration.

Use landmarks like the Hero Tree and Cottage to orient visitors.

---

# General Rules

All assets are pixel art.

Do not resize using normal CSS scaling.

Use pixel-perfect rendering.

Apply:

```css
image-rendering: pixelated;
```

Maintain crisp edges.

Do not blur assets.

Keep proportions consistent.

Use sprite sheets for animations.

Do not crop frames.

Respect the frame order in each sprite sheet.

Reuse assets whenever possible.

Avoid creating duplicate artwork.

The overall experience should feel like a handcrafted indie adventure inspired by Stardew Valley, Animal Crossing, and classic cozy RPGs rather than a traditional scrolling portfolio website.