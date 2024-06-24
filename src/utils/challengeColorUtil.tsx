type BgDictType = {
  [id: number]: string;
};

const bgDict: BgDictType = {
  0: "#FFE0EE",
  1: "#CEF0FF",
  2: "#FFEAA6",
  3: "#DBFCB9",
  4: "#D7CEFF",
};

export function getChallengeBgColor(id: number) {
  return bgDict[(id - 1) % Object.keys(bgDict).length];
}
