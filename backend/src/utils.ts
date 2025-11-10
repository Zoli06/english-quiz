export function seededShuffle<T>(array: T[], seed: number): T[] {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = array[m];
    array[m] = array[i]!;
    array[i] = t!;
    ++seed;
  }

  return array;
}

export function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}