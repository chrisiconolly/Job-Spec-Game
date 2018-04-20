import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'video-box',
  templateUrl: './video-box.component.html',
  styleUrls: ['./video-box.component.css']
})
export class VideoBoxComponent implements OnInit {

  position = { x: 0, y: 64 }
  thumbnail;
  iframe = "";
  safeURL;

  @Input() public left: number;
  @Input() public bottom: number;
  @Input() public youTubeId: string;

  constructor(public sanitizer: DomSanitizer) {}

  getIframe = () => {
    this.iframe = "clicked";
  }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ this.youTubeId +"?autoplay=1");
    this.position.x = this.left;
    this.position.y = this.bottom ? this.bottom : 64;
    this.thumbnail = "https://img.youtube.com/vi/" + this.youTubeId + "/sddefault.jpg";
  }
}