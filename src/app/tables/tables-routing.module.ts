import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SheetListComponent } from "./components/sheet-list/sheet-list.component";
import { TableListComponent } from "./components/table-list/table-list.component";

const routes: Routes = [
    {
        path: '',
        component: TableListComponent,
    },
    {
        path: 'table/:id',
        component: SheetListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TablesRoutingModule { }