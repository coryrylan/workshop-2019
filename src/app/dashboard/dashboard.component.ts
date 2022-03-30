import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VideoService } from './video.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, startWith, tap } from 'rxjs/operators';

import { Video } from '../common/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  search = new FormControl('');
  filteredVideos: Observable<Video[]>;
  selectedVideo?: Video;

  constructor(private videoService: VideoService) {
    const loadedVideos = this.videoService.loadVideos().pipe(tap(videos => this.selectedVideo = videos[0]));
    const searchChanges = this.search.valueChanges.pipe(startWith(this.search.value));

    this.filteredVideos = combineLatest([loadedVideos, searchChanges]).pipe(
      map(([videos, query]) => filterVideos(videos, query)),
    );
  }
}

function filterVideos(videos: Video[], query: string) {
  return videos.filter(v => v.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
}
