import { _decorator, assetManager, CCInteger, Component, director, ERigidBody2DType, Game, Node, Prefab, resources, RichText, RigidBody2D, Sprite, TiledMap } from 'cc';
import EventsName from './constants/EventsName';
import GameState from './constants/gameState';
import { Hive } from './Hive';
import { TimerCountDown } from './TimerCountDown';
const { ccclass, property } = _decorator;

@ccclass('GameFlow')
export class GameFlow extends Component {

    @property(Node)
    private line: Node

    @property(RichText)
    private Timer: RichText

    private map: Node

    private state: GameState

    start() {
        this.map = this.node.parent.getChildByName("level")

        this.setState(GameState.READY)
        this.listenEvents()
    }

    update(deltaTime: number) {
    }

    private setState(state: GameState) {
        switch (state) {
            case GameState.READY: {
                this.ready()
                break
            }

            case GameState.PLAYING: {
                this.play()
                break
            }
        }
    }

    private listenEvents() {
        this.node.scene.once(EventsName.DRAW_COMPLETE, this.play, this)

        this.node.scene.once(EventsName.DOG_ATTACKED, this.handleGameOver, this)
        this.node.scene.once(EventsName.TIMER_END, this.handleGameWin, this)
    }

    ready() {
        console.log("state: Ready");
        this.state = GameState.READY

        const dogsArray = this.map.getChildByName("Dog").children
        dogsArray.forEach(dog => {
            dog.getComponent(RigidBody2D).type = ERigidBody2DType.Static
        })

        this.line.getComponent(RigidBody2D).type = ERigidBody2DType.Static
    }

    play() {
        console.log("state: Play");

        this.state = GameState.PLAYING

        const dogsArray = this.map.getChildByName("Dog").children
        dogsArray.forEach(dog => {
            dog.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic
        })

        this.line.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic


        const hiveArray = this.map.getChildByName("Hive").children
        hiveArray.forEach(hive => {
            hive.getComponent(Hive).spawnBee()
        })

        this.Timer.getComponent(TimerCountDown).startCountDown()
    }

    handleGameOver() {
        console.log("gameOver");

        if (this.state != GameState.PLAYING) return

        this.state = GameState.GAMEOVER

        this.Timer.getComponent(TimerCountDown).setGameOverString()

        setTimeout(() => {
            director.loadScene("scene")
        }, 3000)
    }

    handleGameWin() {
        console.log("win")

        setTimeout(() => {
            console.log("loadscene");
            
            director.loadScene("scene")
        }, 3000)
    }
}


