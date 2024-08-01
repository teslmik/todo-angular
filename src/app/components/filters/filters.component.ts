import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgbDropdownModule, NgbTypeaheadModule, FormsModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  constructor(public todoService: TodoService) {}
}
