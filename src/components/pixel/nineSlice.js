/**
 * Builds the CSS for a `border-image` 9-slice from a manifest UI entry
 * (see scripts/build-sprites.mjs / src/world/spriteManifest.js).
 *
 * `border-image-slice` values are always in the *source* image's pixels;
 * `border-width` is in CSS px on screen. Deriving border-width from the same
 * inset values times one `scale` keeps every corner proportional to the
 * original art — scaling any one side independently would stretch it.
 */
export function nineSliceStyle(sheet, scale) {
  const { top, right, bottom, left } = sheet.inset;
  return {
    borderImageSource: `url(${sheet.src})`,
    borderImageSlice: `${top} ${right} ${bottom} ${left} fill`,
    borderImageRepeat: "stretch",
    borderStyle: "solid",
    borderWidth: `${top * scale}px ${right * scale}px ${bottom * scale}px ${left * scale}px`,
  };
}
