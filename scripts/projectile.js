export const INVASOR = 1;
export const STARSHIP = 2;

export function ProjectileFactory() {
  this.makeProjectile = (type, x, y) => {
    switch (type) {
      case INVASOR:
        return new InvasorProjectile(type, x, y);
      case STARSHIP:
        return new StarshipProjectile(type, x, y);
      default:
        return;
    }
  };
}

function InvasorProjectile(type, x, y) {
  this.x = x;
  this.y = y;
}

function StarshipProjectile(type, x, y) {
  this.x = x;
  this.y = y;
}

