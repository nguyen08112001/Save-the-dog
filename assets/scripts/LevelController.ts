import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelController')
export class LevelController extends Component {
    @property(CCInteger)
    private level: number = 1

    onLoad() {
        
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    setLevel(level: number) {
        this.level = level
    }

    getLevel() {
        return this.level
    }

    getLevelName() {
        return `Level0${this.level}`
    }
}


