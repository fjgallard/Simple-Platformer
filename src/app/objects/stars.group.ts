export class Stars {
  sprite!: Phaser.Physics.Arcade.Sprite;
  group: any;

  constructor(public scene: Phaser.Scene) {
  }

  preload() {
    this.scene.load.image('star', 'star.png');
  }

  create() {
    this.group = this.scene.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.group.children.iterate((child) => {
      child.setBounceX(Phaser.Math.FloatBetween(0.1, 0.2));
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  
    this.group.children.iterate((child) => {
      child.setCollideWorldBounds(true);
    });
  }

  update() {}
}