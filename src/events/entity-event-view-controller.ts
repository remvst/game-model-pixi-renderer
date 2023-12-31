import { Entity, EntityEvent, EntityEventProcessed } from "@remvst/game-model";
import * as PIXI from "pixi.js";
import { EventViewController } from "./event-view-controller";

export abstract class EntityEventViewController<
    ViewType extends PIXI.DisplayObject,
    EntityEventType extends EntityEvent,
> extends EventViewController<ViewType, EntityEventProcessed> {
    protected entity: Entity;
    protected entityEvent: EntityEventType;

    postBind() {
        super.postBind();
        this.entityEvent = this.event!.event as EntityEventType;
        this.entity = this.event!.entity!;
    }
}
