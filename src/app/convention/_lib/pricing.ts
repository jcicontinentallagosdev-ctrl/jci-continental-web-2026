import { convention } from "./config";

/** What a guest transfers, in kobo. Members always attend free. */
export function guestPriceKobo() {
  return convention.guestPriceNaira * 100;
}
