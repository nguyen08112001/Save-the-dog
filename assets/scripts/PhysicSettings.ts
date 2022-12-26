import { _decorator, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PhysicSettings')
export class PhysicSettings extends Component {
    onLoad() {}

    start() {
        PhysicsSystem2D.instance.enable = true

        PhysicsSystem2D.instance.debugDrawFlags = 
            // EPhysics2DDrawFlags.Aabb |
            // EPhysics2DDrawFlags.Pair |
            // EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape

        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None
    }

    update(deltaTime: number) {

    }
}


