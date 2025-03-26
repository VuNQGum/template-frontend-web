import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading-component.services';

@Component({
  selector: 'e-loading',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean;

  constructor(private loaderService: LoadingService) {

    this.loaderService.isLoading.subscribe((v) => {
      document.body.style.cursor = v ? 'wait' : 'default';
      document.body.style.opacity = v ? '0.5' : '1';
      document.body.style.pointerEvents = v ? 'none' : 'all';
      this.loading = v;
    });

  }

  ngOnInit() {

  }
}
