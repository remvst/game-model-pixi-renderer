import { InterpolationPool } from "@remvst/animate.js";
import { WorldViewController } from "@remvst/game-model-pixi-renderer";
import { Container, autoDetectRenderer } from "pixi.js";
import "pixi.js-legacy";
import { EmptyEventViewControllerFactory } from "../../lib/factory/empty-event-view-controller-factory";
import { TestEntityViewControllerFactory } from "./test-entity-view-controller-factory";
import { testWorld } from "./test-world";

const world = testWorld();

const renderer = autoDetectRenderer({
    width: 400,
    height: 400,
});

const stage = new Container();

const interpolationPool = new InterpolationPool();
const eventViewControllerFactory = new EmptyEventViewControllerFactory();
const entityViewControllerFactory = new TestEntityViewControllerFactory();
const worldViewController = new WorldViewController({
    world,
    renderer,
    interpolationPool,
    entityViewControllerFactory,
    eventViewControllerFactory,
    layers: ["characters", "debug-foreground"],
});
stage.addChild(worldViewController.view);
worldViewController.start();

let lastFrame = performance.now();
let age = 0;

function frame() {
    const now = performance.now();
    const elapsed = (now - lastFrame) / 1000;
    lastFrame = now;
    age += elapsed;

    world.cycle(elapsed);
    worldViewController.update(elapsed);
    renderer.render(stage);

    requestAnimationFrame(frame);
}

window.addEventListener("load", async () => {
    document.body.appendChild(renderer.view as HTMLCanvasElement);
    frame();
});
