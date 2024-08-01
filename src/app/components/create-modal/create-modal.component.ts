import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { TodoService } from '../../services/todo.service';
import { FocusDirective } from '../../directives/focus.directive';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [FormsModule, FocusDirective],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
  providers: [NgbModalConfig, NgbModal]
})
export class CreateModalComponent {
  public todoText: string = '';
  private modalRef?: NgbModalRef;

  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private todoService: TodoService
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  open(content: TemplateRef<any>) {
		this.modalRef = this.modalService.open(content);
	}

  createTodo() {
    if (this.todoText.trim()) {
      this.todoService.create(this.todoText);
      this.todoText = '';

      if (this.modalRef) {
        this.modalRef.close();
      }
    }
  }
}
