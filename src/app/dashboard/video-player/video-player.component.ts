import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Video } from './../../common/interfaces';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() video?: Video;
  videoUrl?: SafeUrl;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnChanges({video}: SimpleChanges) {
    if (video && video.currentValue) {
      const currentVideo = video.currentValue;
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + currentVideo.id);
    }
  }
}
