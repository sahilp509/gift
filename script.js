
let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const moveEvent = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    };

    document.addEventListener("mousemove", (e) => moveEvent(e.clientX, e.clientY));
    document.addEventListener("touchmove", (e) => moveEvent(e.touches[0].clientX, e.touches[0].clientY));

    const startEvent = (x, y) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = this.mouseX = x;
      this.mouseTouchY = this.mouseY = y;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    };

    paper.addEventListener("mousedown", (e) => startEvent(e.clientX, e.clientY));
    paper.addEventListener("touchstart", (e) => startEvent(e.touches[0].clientX, e.touches[0].clientY));
    
    window.addEventListener("mouseup", () => (this.holdingPaper = false));
    window.addEventListener("touchend", () => (this.holdingPaper = false));
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => new Paper().init(paper));
