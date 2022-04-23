export function linspace(a: number, b: number, n: number) {
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  const ret = Array(n);
  n--;
  for (let i = n; i >= 0; i--) {
    ret[i] = (i * b + (n - i) * a) / n;
  }
  return ret;
}
