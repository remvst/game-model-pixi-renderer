import { InterpolationPool } from "@remvst/animate.js";
import { Entity } from "@remvst/game-model";
import * as PIXI from "pixi.js";
import { WorldViewController } from "../../world/world-view-controller";
import { EntityViewController } from "../entity-view-controller";

const COLORS = [0xff0000, 0xffff00, 0x0000ff, 0xff00ff, 0x00ffff, 0x00ff00];

export class BoundsViewController extends EntityViewController<PIXI.Sprite> {
    private wrappedViewController: EntityViewController<PIXI.DisplayObject>;

    private readonly color = COLORS[Math.floor(Math.random() * COLORS.length)];

    constructor(
        wrappedViewController: EntityViewController<PIXI.DisplayObject>,
    ) {
        super();
        this.wrappedViewController = wrappedViewController;
    }

    createView(): PIXI.Sprite {
        const view = new PIXI.Sprite(PIXI.Texture.WHITE);
        view.alpha = 0.2;
        return view;
    }

    bind(
        worldViewController: WorldViewController,
        interpolationPool: InterpolationPool,
        entity: Entity,
    ) {
        super.bind(worldViewController, interpolationPool, entity);
        this.wrappedViewController.bind(
            worldViewController,
            interpolationPool,
            entity,
        );
    }

    postBind() {
        super.postBind();
        this.wrappedViewController.postBind();
    }

    update() {
        this.wrappedViewController.update();
        super.update();
    }

    updateView(view: PIXI.Sprite) {
        const rectangle = this.wrappedViewController.visibilityRectangle;
        view.position.set(rectangle.x, rectangle.y);
        view.width = rectangle.width;
        view.height = rectangle.height;
        view.tint = this.wrappedViewController.isVisible()
            ? this.color
            : 0xff0000;
    }

    readonly layerId = "debug-foreground";
}
