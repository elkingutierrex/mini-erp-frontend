import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {

  @Input({ required: true }) totalItems!: number;
  @Input() pageSize = 12;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  totalPages = computed(() =>
    Math.ceil(this.totalItems / this.pageSize)
  );

  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
