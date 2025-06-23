import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { MyButtonConfig } from '../my-button-component/my-button-component';

@Component({
  selector: 'app-my-table-component',
  imports: [CommonModule, FormsModule, forwardRef(() => PaginationPipe)],
  templateUrl: './my-table-component.html',
  styleUrl: './my-table-component.css',
})
export class MyTableComponent3 implements OnInit {
  @Input() tableConfig: MyTableConfig3 | undefined;
  @Input() data: any[] | undefined;
  @Output() actionEvent = new EventEmitter<{
    action: MyTableActionEnum;
    item: any;
  }>();

  sortedColumn: string | undefined;
  sortAsc = true;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  onItemsPerPageOptions: number[] = [5, 10, 15, 20];

  constructor() {}

  ngOnInit(): void {
    this.sortedColumn = this.tableConfig?.order?.defaultColumn;
    this.sortAsc = this.tableConfig?.order?.orderType === 'asc';
    this.sortData();
    this.itemsPerPage = this.tableConfig?.pagination.itemsPerPage ?? 5;
    this.onItemsPerPageOptions = this.tableConfig?.pagination
      .itemsPerPageOptions ?? [5, 10, 15, 20];
  }

  sortBy(columnKey: string) {
    if (this.sortedColumn === columnKey) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortedColumn = columnKey;
      this.sortAsc = true;
    }
    this.sortData();
  }

  private sortData() {
    const dir = this.sortAsc ? 1 : -1;
    if (this.data && this.sortedColumn) {
      this.data = [...this.data].sort((a, b) => {
        const v1 = a[this.sortedColumn as string];
        const v2 = b[this.sortedColumn as string];
        return v1 > v2 ? dir : v1 < v2 ? -dir : 0;
      });
    }
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    if (this.tableConfig?.pagination) {
      this.tableConfig.pagination.itemsPerPage = newItemsPerPage;
    }
    this.currentPage = 1;
  }

  handleAction(actionType: MyTableActionEnum, row: any) {
    this.actionEvent.emit({
      action: actionType,
      item: row,
    });
  }
}

export interface MyTableConfig3 {
  headers: MyHeaders[];
  order: MyOrder;
  search: MySearch;
  pagination: MyPagination;
  actions: MyAction[];
}

export class MyHeaders {
  key: string | undefined;
  label: string | undefined;
}

export class MyOrder {
  defaultColumn: string | undefined;
  orderType: 'asc' | 'desc' | undefined;
}

export class MySearch {
  columns: string[] | undefined;
}

export class MyPagination {
  itemsPerPage: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 20];
}

export class MyAction {
  type: MyTableActionEnum | undefined;
  buttonConfig: MyButtonConfig | undefined;
}

export enum MyTableActionEnum {
  NEW_ROW,
  EDIT,
  DELETE,
}

@Pipe({ name: 'paginate', pure: false })
export class PaginationPipe implements PipeTransform {
  transform<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    if (!items || items.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }
}
