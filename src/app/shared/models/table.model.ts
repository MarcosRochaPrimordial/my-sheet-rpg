import { Sheet } from "./sheet.model";

export interface Table {
    id?: string;
    name: string;
    dmEmail: string;
    playerSheets: Sheet[];
    masterSheets: Sheet[];
    notes: string;
}