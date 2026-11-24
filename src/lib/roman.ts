const ROMAN: [number, string][] = [
  [10, 'x'],
  [9, 'ix'],
  [5, 'v'],
  [4, 'iv'],
  [1, 'i'],
]

/** Chapter numerals: 1 → i, 4 → iv, 12 → xii */
export function roman(n: number) {
  let out = ''
  for (const [value, digits] of ROMAN) {
    while (n >= value) {
      out += digits
      n -= value
    }
  }
  return out
}
