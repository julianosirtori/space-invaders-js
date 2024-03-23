export const INVASOR = 1;
export const STARSHIP = 2;

export class ProjectileFactory {
  makeProjectile(type, x, y) {
    switch (type) {
      case INVASOR:
        return new InvasorProjectile(type, x, y);
      case STARSHIP:
        return new StarshipProjectile(type, x, y);
      default:
        return;
    }
  }
}

class InvasorProjectile {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;
  }
}

class StarshipProjectile {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;
  }
}

