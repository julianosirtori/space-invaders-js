export async function loadAllFonts() {
  await loadFontPressStart2p();
}

async function loadFontPressStart2p() {
  const font = new FontFace(
    "Press_start_2p",
    "url(assets/fonts/PressStart2P-Regular.ttf)"
  );
  const fontLoaded = await font.load();
  document.fonts.add(fontLoaded);
}

