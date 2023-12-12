import { Entity } from '@remvst/game-model';
import { EntityViewController } from '../entities/entity-view-controller';
import { BoundsViewController } from '../entities/debug/bounds-view-controller';
import { EntityViewControllerFactory } from './entity-view-controller-factory'

export class BoundsViewControllerFactory implements EntityViewControllerFactory {
    private readonly wrappedFactory: EntityViewControllerFactory;

    constructor(
        wrappedFactory: EntityViewControllerFactory
    ) {
        this.wrappedFactory = wrappedFactory;
    }

    viewControllersForEntity(entity: Entity): EntityViewController<any>[] {
        const viewControllers = this.wrappedFactory.viewControllersForEntity(entity);

        return viewControllers.map((viewController) => {
            return new BoundsViewController(viewController);
        });
    }
};
