# Pixel Portfolio Assets

This folder contains all custom pixel-art assets used throughout the portfolio.

## Folder Structure

assets/
├── player/
├── environment/
├── props/
├── ui/
└── effects/


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

Used throughout the entire world.

Can be repeated seamlessly.

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

---

# PROPS

## desk.png

Main desk.

Used in:

Projects

Workspace

Coding area

---

## chair.png

Desk chair.

Placed behind the desk.

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

Projects

Skills

Experience

Popup windows

Should be reusable.

---

## dialog_box.png

Pixel dialogue box.

Use for:

About Me

Character conversations

NPC style interactions

Typewriter text

---

## button.png

Primary pixel button.

Use for:

Start

Resume

Projects

Contact

Downloads

Hover state should slightly scale.

---

# EFFECTS

## coin.png

Animated spinning coin sprite sheet.

Can be placed throughout the world.

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

# General Rules

All assets are pixel art.

Do not resize using normal CSS scaling.

Use pixel-perfect rendering.

Apply:

image-rendering: pixelated;

Maintain crisp edges.

Do not blur assets.

Keep proportions consistent.

Use sprite sheets for animations.

Do not crop frames.

Respect the frame order in each sprite sheet.

Reuse assets whenever possible.

Avoid creating duplicate artwork.

The overall experience should feel like a cozy indie game inspired by Stardew Valley and Animal Crossing rather than an arcade platformer.