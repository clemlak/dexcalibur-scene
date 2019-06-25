import { getUserAccount } from "@decentraland/EthereumController";
import { getUserPublicKey } from "@decentraland/Identity";
import { getProvider } from "@decentraland/web3-provider";
import * as EthConnect from "../node_modules/eth-connect/esm";

import { abi } from "../contracts/Dexcalibur";
import { InfoSystem } from "./InfoSystem";

class LoopSystem implements ISystem {
  public timer: number;

  public update(dt) {
    if (this.timer > 0) {
      this.timer -= dt;
    } else {
        this.timer = 10;
        checkState();
    }
  }
}

function amITheKing() {
  executeTask(async () => {
    try {
      const provider = await getProvider();
      const requestManager = new EthConnect.RequestManager(provider);
      const factory = new EthConnect.ContractFactory(requestManager, abi);
      const contract = (await factory.at("0x40Ea07042efE7373feA883C9075967811b3Ef9A2")) as any;
      const address = await getUserAccount();

      const res = await contract.amITheKing({
        from: address,
        value: EthConnect.toWei(0.01, "ether"),
      });

      // const receipt = await requestManager.getTransactionAndReceipt(res);
    } catch (err) {
      log(err.toString());
    }
  });
}

function kingHasBeenFound() {
  executeTask(async () => {
    try {
      const provider = await getProvider();
      const requestManager = new EthConnect.RequestManager(provider);
      const factory = new EthConnect.ContractFactory(requestManager, abi);
      const contract = (await factory.at("0x40Ea07042efE7373feA883C9075967811b3Ef9A2")) as any;
      const address = await getUserAccount();

      const res = await contract.kingHasBeenFound({
        from: address,
      });

      log(res);
    } catch (err) {
      log(err.toString());
    }
  });
}

function checkState() {
  executeTask(async () => {
    try {
      const provider = await getProvider();
      const requestManager = new EthConnect.RequestManager(provider);
      const factory = new EthConnect.ContractFactory(requestManager, abi);
      const contract = (await factory.at("0x19E2F142b6E2Fb355D80E0ba88D2AF6942647a96")) as any;
      const address = await getUserAccount();

      const res = await contract.states(address, {
        from: address,
      });

      log(res);
    } catch (err) {
      log(err.toString());
    }
  });
}

const sword = new Entity();
sword.addComponent(new GLTFShape("models/sword/scene.gltf"));
sword.addComponent(new Transform({
  position: new Vector3(16, 8.5, 17),
  rotation: Quaternion.Euler(180, 16, 8),
  scale: new Vector3(0.25, 0.25, 0.25),
}));
sword.addComponent(
  new OnClick(() => {
    amITheKing();
  }),
);
engine.addEntity(sword);

const scene = new Entity();
scene.addComponent(new GLTFShape("scenes/finalscene/source/Unity2Skfb/Unity2Skfb.gltf"));
scene.addComponent(new Transform({
  position: new Vector3(16, 0, 16),
}));
engine.addEntity(scene);

const info = new Entity();
const infoText = new TextShape("Are you the King?");
info.addComponent(infoText);
info.getComponent(TextShape).shadowColor = Color3.Blue();
info.getComponent(TextShape).shadowOffsetY = 1;
info.getComponent(TextShape).shadowOffsetX = -1;
info.getComponent(TextShape).shadowBlur = 1;
info.addComponent(new Transform({
  position: new Vector3(16, 10, 17),
}));
engine.addEntity(info);

engine.addSystem(new InfoSystem(info));
engine.addSystem(new LoopSystem());
