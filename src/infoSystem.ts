export class InfoSystem implements ISystem {
  public infoEntity: Entity;

  constructor(infoComponent) {
    this.infoEntity = infoComponent;
  }

  public update() {
    const t = this.infoEntity.getComponent(Transform);
    t.lookAt(Camera.instance.position);
    t.rotation = Quaternion.Euler(1, 180, 1).multiply(t.rotation);
  }
}
