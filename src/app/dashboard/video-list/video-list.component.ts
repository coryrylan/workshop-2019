import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from './../../common/interfaces';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() videos: Video[];
  @Input() selectedVideo: Video;
  @Output() videoChange = new EventEmitter<Video>();
}
