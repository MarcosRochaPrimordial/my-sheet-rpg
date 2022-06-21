import { Sheet } from "./sheet.model";

export interface Table {
    name: string;
    dmEmail: string;
    playerSheets: Sheet[];
    masterSheets: Sheet[];
    id?: string;
}