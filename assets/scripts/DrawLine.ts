import { _decorator, Component, ERaycast2DType, EventMouse, Graphics, Input, PhysicsSystem2D, PolygonCollider2D, RaycastResult2D, Vec2, Vec3, Node, RigidBody2D, Mask, PHYSICS_2D_PTM_RATIO, BoxCollider2D, math, CircleCollider2D, UITransform, ERigidBody2DType } from 'cc';
const { ccclass, property } = _decorator;

// http://www.emanueleferonato.com/2011/08/05/slicing-splitting-and-cutting-objects-with-box2d-part-4-using-real-graphics/
import { game, Game, EPhysics2DDrawFlags } from "cc";
import EventsName from './constants/EventsName';

@ccclass('DrawLine')
export class CuttingObjects extends Component {

    physicLine: Graphics;

    touching = false;

    preTouchPoint = new Vec2;
    touchPoint = new Vec2;

    onLoad() {
        this.physicLine = this.node.getComponent(Graphics)
    }

    start() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchStart(event: EventMouse) {
        this.touching = true;

        this.preTouchPoint.set(event.getUILocation());
        this.touchPoint.set(event.getUILocation());
    }

    onTouchMove(event: EventMouse) {
        this.touchPoint.set(event.getUILocation());

        if (this.touching) {
            this.updatePointArray()
        }
    }

    onTouchEnd(event: EventMouse) {
        this.touchPoint.set(event.getUILocation());
        this.touching = false

        this.node.scene.emit(EventsName.DRAW_COMPLETE)
    }

    update(dt: number) {
        
    }

    private updatePointArray() {
        const point = this.touchPoint
        const pre = this.preTouchPoint

        const vec = new Vec2(point.x - pre.x, point.y - pre.y)
        if (vec.length() > 20 ) {
            this.physicLine.moveTo(pre.x, pre.y)
            this.physicLine.lineTo(point.x, point.y)
            this.physicLine.stroke()
            this.physicLine.fill()

            this.createPolygon()

            this.preTouchPoint = new Vec2(point.x, point.y)
        }
    }

    private createPolygon() {
        const line = this.physicLine
        const p = this.touchPoint
        const pre = this.preTouchPoint
        const vec = new Vec2(p.x - pre.x, p.y - pre.y).normalize()
        vec.rotate(Math.PI / 2)

        const offset = 5
        const listPoint = [ new Vec2(pre.x - vec.x * offset, pre.y  - vec.y *offset),
                                new Vec2(p.x  - vec.x *offset, p.y  - vec.y *offset),
                                new Vec2(p.x  + vec.x *offset, p.y  + vec.y *offset),
                                new Vec2(pre.x + vec.x *offset, pre.y  + vec.y *offset)]

        const polygon = line.addComponent(PolygonCollider2D)
        polygon.points = listPoint
        polygon.tag = 4
        polygon.apply()
    }

}
