import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-datepicker-basic',
  templateUrl: './datepicker-basic.component.html',
  styleUrls: ['./datepicker-basic.component.scss'],

})
export class DatepickerBasicComponent {
  isActive: boolean = false;
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate = new NgbDate(1789, 7, 14) ;
	toDate: NgbDate | null | undefined

	constructor(calendar: NgbCalendar) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
  toggleMenu(){

    this.isActive = !this.isActive;
  }

  getToDate(myDate:any) {

    if (!myDate) {
      return " "
    }
    return myDate?.month + '/' + myDate?.day + '/' + myDate?.year

  }
}
