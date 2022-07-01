import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Table } from 'src/app/shared/models/table.model';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() table!: Table;

  noteForm!: FormControl;

  constructor(
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.noteForm = new FormControl(this.table.notes);
    this.noteForm
      .valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe(value => {
        if (!!value) {
          this.table.notes = value;
        }
        this.tableService.updateTable(this.table);
      });
  }

}
