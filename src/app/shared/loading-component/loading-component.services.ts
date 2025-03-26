import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
    public isLoading = new BehaviorSubject(false);
    public noLoading = new BehaviorSubject(false); // true là không loading
    constructor() { }
}
