import type { YinYang } from "./types";

export const Yin : YinYang = {
    yin: true,
    yang: false,
    other() { return Yang; }
}

export const Yang : YinYang = {
    yin: false,
    yang: true,
    other() { return Yin; }
}
