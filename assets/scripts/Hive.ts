import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hive')
export class Hive extends Component {
    @property(Prefab)
    BeePrefab: Prefab 

    @property(CCInteger)
    NumberOfBee: number = 5

    start() {

    }

    update(deltaTime: number) {
        
        
    }

    spawnBee() {
        const map = this.node.parent.parent
        const bees = map.getChildByName("Bee")
        
        for (let i = 0; i < this.NumberOfBee; i ++) {
            const bee = instantiate(this.BeePrefab)
            bees.addChild(bee)
            bee.setWorldPosition(this.node.getWorldPosition())
        }
    }
}


