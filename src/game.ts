const grassTexture = new Texture("materials/grass.png");
const grassMaterial = new Material();
grassMaterial.albedoTexture = grassTexture;

const groundRock = new Entity();
groundRock.addComponent(new GLTFShape("models/ground/ground.gltf"));
groundRock.addComponent(new Transform({
  position: new Vector3(16, 0, 16),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(2, 1, 2),
}));
groundRock.addComponent(grassMaterial);

engine.addEntity(groundRock);
