import { _decorator, CCInteger, CircleCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, math, Node, Prefab, randomRangeInt, RigidBody2D, Sprite, Vec2, Vec3 } from 'cc';
import BeeState from './constants/BeeState';
import EventsName from './constants/EventsName';
import { LoadMap } from './LoadMap';
const { ccclass, property } = _decorator;



@ccclass('BeeAI')
export class BeeAI extends Component {
    @property(CCInteger)
    speed: number = 200

    map: Node;

    private state: BeeState

    private timeToPatrol: number = 1;

    private closestDog: Node;

    start() {
        this.map = this.node.parent.parent

        const randomDir = new Vec2(randomRangeInt(-100, 100), randomRangeInt(-100, 100))
        this.getComponent(RigidBody2D).applyForceToCenter(randomDir.multiply2f(this.speed, this.speed), true)

        this.state = BeeState.PATROL

        let collider = this.node.getComponent(CircleCollider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.handleContact, this)
    }

    update(deltaTime: number) {
        this.updateClosestDog()
        // * always look at dog
        const angle = (Math.atan2(this.node.worldPosition.y - this.closestDog.worldPosition.y, this.node.worldPosition.x - this.closestDog.worldPosition.x) * 180.0) / Math.PI
        this.node.angle = angle + 90

        switch (this.state) {
            case BeeState.PATROL: {
                this.patrolling(deltaTime)
                break;
            }

            case BeeState.ATTACK: {
                this.gotoDog(deltaTime);
                break;
            }
        }

    }

    private gotoDog(deltaTime: number) {
        const direction = new Vec2(this.closestDog.worldPosition.x - this.node.worldPosition.x, this.closestDog.worldPosition.y - this.node.worldPosition.y).normalize().multiply2f(100, 100)
        this.getComponent(RigidBody2D).applyForceToCenter(direction.multiply2f(this.speed * deltaTime, this.speed * deltaTime), true)
    }

    private patrolling(deltaTime: number) {
        this.timeToPatrol -= deltaTime

        if (this.timeToPatrol < 0) {
            this.state = BeeState.ATTACK
        }
    }

    handleContact = (selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null) => {

        if (otherCollider.group == 2) {
            this.node.scene.emit(EventsName.DOG_ATTACKED)
        }

        if (otherCollider.tag == 4) {

            this.timeToPatrol = 1
            this.addRandomForce()
            this.state = BeeState.PATROL
        }

    }

    private addRandomForce() {
        const randomDir = new Vec2(randomRangeInt(-10, 10), randomRangeInt(-10, 10))
        this.getComponent(RigidBody2D).applyForceToCenter(randomDir.multiply2f(this.speed, this.speed), true)
    }

    private updateClosestDog() {
        const { x: thisX, y: thisY } = this.node.worldPosition

        const dogsArray = this.map.getComponent(LoadMap).listDogs
        let closestDog = dogsArray[0]
        let lengthMin = 9999999
        dogsArray.forEach(dog => {
            const { x: dogX, y: dogY } = dog.worldPosition

            const length = Vec2.distance(new Vec2(thisX, thisY), new Vec2(dogX, dogY))

            if (length < lengthMin) {
                lengthMin = length
                closestDog = dog
            }
        })

        this.closestDog = closestDog
    }
}


