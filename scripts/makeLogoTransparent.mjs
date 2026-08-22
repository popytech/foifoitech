import sharp from "sharp";
import path from "node:path";

const inputPath = path.resolve("public/images/logo.png");
const outputPath = path.resolve("public/images/logo.png");
const backupPath = path.resolve("public/images/logo-original.png");

const threshold = 235;

async function main() {
  await sharp(inputPath).toFile(backupPath);

  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(outputPath + ".tmp");

  const fs = await import("node:fs/promises");
  await fs.rename(outputPath + ".tmp", outputPath);

  const finalMeta = await sharp(outputPath).metadata();
  console.log(`Done. Backup at ${backupPath}`);
  console.log(`New logo: ${finalMeta.width}x${finalMeta.height}, channels=${finalMeta.channels}, hasAlpha=${finalMeta.hasAlpha}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
