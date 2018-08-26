import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CharPositionOnScreenService } from '../../services/char-position-on-screen/char-position-on-screen.service';

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

  constructor(public sanitizer: DomSanitizer, public elRef: ElementRef, public charPositionOnScreenService: CharPositionOnScreenService) {}

  getIframe = () => {
    this.iframe = "clicked";
  }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ this.youTubeId +"?autoplay=1");
    this.position.x = this.left;
    this.position.y = this.bottom ? this.bottom : 64;
    this.thumbnail = "https://img.youtube.com/vi/" + this.youTubeId + "/sddefault.jpg";

    this.charPositionOnScreenService.charXPosition$
      .subscribe( position => {
          if ((this.left * 1) + (290 * 1) < position - this.elRef.nativeElement.parentElement.offsetLeft) {
            this.getIframe();
          }
        }
      )
  }
}