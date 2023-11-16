export function getNewSeed(): number {
  return Math.floor(Math.random() * 10000) % 10000;
}
