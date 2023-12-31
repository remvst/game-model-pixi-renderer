import * as PIXI from "pixi.js";
import { EntityViewController } from "../entity-view-controller";

export class DebugRectangleViewController extends EntityViewController<PIXI.Sprite> {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    createView(): PIXI.Sprite {
        const view = new PIXI.Sprite(PIXI.Texture.WHITE);
        view.width = this.width;
        view.height = this.height;
        view.anchor.set(0.5);
        view.tint = 0xff0000;
        view.alpha = 0.5;
        return view;
    }

    updateView(view: PIXI.Sprite) {
        view.position.set(this.entity.x, this.entity.y);
    }

    readonly layerId = "debug-foreground";
}
