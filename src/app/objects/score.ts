
export class Score {
  score: number;
  private scoreText!: Phaser.GameObjects.Text;

  constructor(public scene: Phaser.Scene) {
    this.score = 0;
  }

  create() {
    this.scoreText = this.scene.add.text(16, 40, 'Score: 0', { fontSize: '32px', fill: '#000' });
  }

  updateScore() {
    this.scoreText.setText('Score: ' + this.score);
  }
}