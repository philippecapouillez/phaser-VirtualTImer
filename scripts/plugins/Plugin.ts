module sxjs {
    export module Plugins {
        export interface VisualTimerObjectFactory extends Phaser.GameObjectFactory {
            visualTimer: ( opts: VisualTimerOptionsI, group?:Phaser.Group) => sxjs.VisualTimer;
        }

        export interface VisualTimerGame extends Phaser.Game {
            add: VisualTimerObjectFactory;
        }

        export class VisualTimer extends Phaser.Plugin {  
                    
            constructor(game:Phaser.Game, parent:Phaser.PluginManager) {
                super(game, parent);

                this.addVisualTimerFactory();
            }

            /**
             * Extends the GameObjectFactory prototype with the support of adding InputField. this allows us to add InputField methods to the game just like any other object:
             * game.add.InputField();
             */
            private addVisualTimerFactory() {
                (<sxjs.Plugins.VisualTimerObjectFactory>Phaser.GameObjectFactory.prototype).visualTimer = function (opts: VisualTimerOptionsI, group?:Phaser.Group):sxjs.VisualTimer {
                    if (group === undefined) {
                        group = this.world;
                    }

                    var object = new sxjs.VisualTimer(opts);

                    return group.add(object);
                };
            }

        }
    }
}