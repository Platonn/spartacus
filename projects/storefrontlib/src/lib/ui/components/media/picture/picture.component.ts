import { Component, Input, OnInit, OnChanges } from '@angular/core';

const DEFAULT_FORMAT = 'product';

@Component({
  selector: 'y-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() imageContainer;
  @Input() imageFormat;
  @Input() imagePosition;

  mainImage;
  // imageTypes = {
  //     xs: 'xs',
  //     sm: 'thumbnail',
  //     md: 'md',
  //     lg: 'lg'
  // };

  // xsImage;
  // smImage;
  // mdImage;
  // lgImage;

  constructor() {}

  ngOnInit() {
    this.changeImage();
  }

  ngOnChanges() {
    this.changeImage();
  }

  changeImage() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        this.mainImage = image.url;
      }
    }
  }
}
