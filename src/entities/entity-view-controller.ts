import { InterpolationPool } from "@remvst/animate.js";
import { Entity } from "@remvst/game-model";
import * as PIXI from "pixi.js";
import { filter, take } from "rxjs/operators";
import { ViewController } from "../view-controller";
import { WorldViewController } from "../world/world-view-controller";

export abstract class EntityViewController<
    ViewType extends PIXI.DisplayObject,
> extends ViewController<ViewType> {
    protected entity: Entity | null = null;

    bind(
        worldViewController: WorldViewController,
        interpolationPool: InterpolationPool,
        entity: Entity,
    ) {
        this.internalBind(worldViewController, interpolationPool);
        this.entity = entity;
    }

    update() {
        if (!this.entity!.world) {
            return;
        }

        super.update();
    }

    async removeEmitter(): Promise<void> {
        await this.entity!.world!.chunked.entities.removals.pipe(
            filter((entity) => entity === this.entity),
            take(1),
        ).toPromise();
    }

    prepareForReuse() {
        super.prepareForReuse();
        this.entity = null;
        this.lastUpdate = 0;
    }

    protected isEntityRelevant() {
        return this.entity!.world?.isEntityEnabled(this.entity!);
    }
}
