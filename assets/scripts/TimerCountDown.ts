import { _decorator, CCInteger, Component, Node, RichText } from 'cc';
import EventsName from './constants/EventsName';
const { ccclass, property } = _decorator;

@ccclass('TimerCountDown')
export class TimerCountDown extends Component {
    @property(CCInteger)
    private playTime: number = 5

    start() {

    }

    update(deltaTime: number) {

    }

    startCountDown() {
        this.getComponent(RichText).string = this.playTime.toString()
        this.schedule(this.callBackSchedule, 1)
    }

    callBackSchedule = () => {
        this.playTime--

        this.getComponent(RichText).string = this.playTime.toString()

        if (this.playTime == 0) {
            this.setWinString()

            this.node.scene.emit(EventsName.TIMER_END)
            this.unschedule(this.callBackSchedule)
        }
    }

    setWinString() {
        this.getComponent(RichText).string = "<color=#00ff00>WIN</color>"
    }

    setGameOverString() {
        this.getComponent(RichText).string = "<color=#ff0000>GAME OVER</color>"
        this.unschedule(this.callBackSchedule)
    }
}


