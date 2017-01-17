declare module sxjs {
   
    enum VisualTimerType {
        ClockUp = 1,
        ClockDown,
        BarUp,
        BarDown,    
    }

    interface VisualTimerOptionsI {
        game: Phaser.Game; // (required) a reference to the phaser.game object
        x:number; // (required) the x coordinate for the indicator
        y:number; // (required) the y coordinate for the indicator    
        type?: number; // (optional, default 'down') this is either 'up' or 'down' to have the indicator start from 0 up to seconds or from seconds down to 0
        seconds: number; // (required) the time to count       
        onComplete: Function; // (required) a function to call when the time is up
        style?: Phaser.PhaserTextStyle; // Style do Texto
        key?: string; // (optional, default 'timer') the cache key from the preload step.
        context? :any; //(optional) you might want to pass this for the context to have the onComplete callback run in that context. If not specified, it'll run in the context of the indicator
     }

    class VisualTimer {

       constructor(opts: VisualTimerOptionsI);

        reset ();

        setTime (seconds);

        start() ;

        stop();

        pause();

        resume();

        remainingTime();
    
    }

    module Plugins {
        interface VisualTimerObjectFactory extends Phaser.GameObjectFactory {
            visualTimer: ( opts: VisualTimerOptionsI, group?:Phaser.Group) => sxjs.VisualTimer;
        }

        interface VisualTimerGame extends Phaser.Game {
            add: VisualTimerObjectFactory;
        }

        class VisualTimer extends Phaser.Plugin {  
                    
            constructor(game:Phaser.Game, parent:Phaser.PluginManager);

            /**
             * Extends the GameObjectFactory prototype with the support of adding InputField. this allows us to add InputField methods to the game just like any other object:
             * game.add.InputField();
             */
            private addVisualTimerFactory();

        }
    }
}