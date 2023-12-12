import { EntityViewController } from "@remvst/game-model-pixi-renderer";
import { Sprite, Texture } from "pixi.js";
import { CharacterTrait } from "./character-trait";

export class CharacterViewController extends EntityViewController<Sprite> {
    readonly layerId = 'characters';

    private characterTrait: CharacterTrait;

    postBind(): void {
        super.postBind();
        this.characterTrait = this.entity.traitOfType(CharacterTrait);
    }

    protected createView(): Sprite {
        const view = new Sprite(Texture.WHITE);
        view.width = view.height = 50;
        return view;
    }

    protected updateView(view: Sprite, elapsed: number): void {
        view.position.set(this.entity.position.x, this.entity.position.y);
        view.tint = this.characterTrait.color;
    }
}
