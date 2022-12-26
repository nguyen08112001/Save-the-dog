import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property(CCInteger)
    private level: number = 1

    onLoad() {
        
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    levelUp() {
        this.level++
    }

    getLevel() {
        return this.level
    }
}


