import { Sheet } from "./sheet.model";

export interface Table {
    name: string;
    dmEmail: string;
    sheets: Sheet[];
    id?: string;
}