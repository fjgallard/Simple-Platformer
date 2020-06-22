export class Sky {
  image?: Phaser.GameObjects.Image;

  constructor(public scene: Phaser.Scene) {}

  preload() {
    this.scene.load.image('sky', 'sky.png');
  }

  create() {
    this.scene.add.image(400, 300, 'sky');
  }
}