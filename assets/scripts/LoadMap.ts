import { _decorator, Component, Node, TiledMap, instantiate, Prefab, RigidBody2D, BoxCollider2D, ERigidBody2DType, Size, Vec3, UITransform, TiledMapAsset, resources, native, AssetManager, assetManager, AnimationClip } from 'cc';
import { LevelController } from './LevelController';
import { GameFlow } from './GameFlow';
const { ccclass, property } = _decorator;

@ccclass('LoadMap')
export class LoadMap extends Component {
    @property(Prefab)
    dogPrefab: Prefab
    @property(Prefab)
    hivePrefab: Prefab
    @property(Prefab)
    obstaclePrefab: Prefab
    @property(Node)
    gameFlow: Node

    private tileMap: TiledMap

    listObstacles: Node[] = []
    listDogs: Node[] = []
    listHives: Node[] = []

    __preload() {
        this.tileMap = this.node.getComponent(TiledMap)
        this.loadMap()
    }

    private loadMap() {        
        const levelString = this.gameFlow.getComponent(LevelController).getLevelName()
        resources.load(`levels/${levelString}`, TiledMapAsset, (err, tileMap) => {
            console.log("res load");
            
            this.tileMap.tmxAsset = tileMap
            this.renderMap()
            this.gameFlow.getComponent(GameFlow).initGame()
        })
    }

    private renderMap(): void {
        console.log("render");
        
        const dogs = this.tileMap.getObjectGroup('Dog').getObjects()
        for (var i = 0; i < dogs.length; i++) {
            var { x, y } = dogs[i]
            this.generateDog(x, y)
        }

        const hives = this.tileMap.getObjectGroup('Hive').getObjects()
        for (var i = 0; i < hives.length; i++) {
            var { x, y } = hives[i]
            this.generateHive(x, y)
        }

        const obstacles = this.tileMap.getObjectGroup('Obstacles').getObjects()
        for (var i = 0; i < obstacles.length; i++) {
            var { x, y } = obstacles[i]
            this.generateObstacle(x, y)
        }
    }

    private generateDog(x: number, y: number) {
        const sizeParent = this.node.parent.getComponent(UITransform)
        const { width: widthParent, height: heightParent } = sizeParent

        const dog = instantiate(this.dogPrefab)

        dog.setWorldPosition(new Vec3(x - widthParent / 2, y - heightParent / 2))
        this.listDogs.push(dog)

        this.node.getChildByName("Dog").addChild(dog)
    }

    private generateHive(x: number, y: number) {
        const sizeParent = this.node.parent.getComponent(UITransform)
        const { width: widthParent, height: heightParent } = sizeParent

        const hive = instantiate(this.hivePrefab)

        hive.setWorldPosition(new Vec3(x - widthParent / 2, y - heightParent / 2))
        this.listHives.push(hive)

        this.node.getChildByName("Hive").addChild(hive)
    }

    private generateObstacle(x: number, y: number) {
        const sizeParent = this.node.parent.getComponent(UITransform)
        const { width: widthParent, height: heightParent } = sizeParent

        const obstacle = instantiate(this.obstaclePrefab)

        obstacle.setWorldPosition(new Vec3(x - widthParent / 2, y - heightParent / 2))
        this.listObstacles.push(obstacle)

        this.node.getChildByName("Obstacles").addChild(obstacle)

    }
}


