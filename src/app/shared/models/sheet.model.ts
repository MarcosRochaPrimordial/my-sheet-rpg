import { Characteristics } from "./characteristics.model";
import { GenericList } from "./generic-list.model";

export interface Sheet {
    id?: string;
    charIcon: number;
    playerEmail: string;
    charName: string;
    points: number;
    xp: number;
    health: number;
    magic: number;
    story: string;
    characteristics: Characteristics;
    advantages: GenericList[];
    disadvantages: GenericList[];
    knownMagics: GenericList[];
    items: GenericList[];
}