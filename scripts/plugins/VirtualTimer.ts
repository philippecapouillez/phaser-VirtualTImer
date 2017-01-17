module sxjs{
    export enum VisualTimerType {
        ClockUp = 1,
        ClockDown,
        BarUp,
        BarDown,    
    }

    export interface VisualTimerOptionsI{
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


    export class VisualTimer  {
        config:VisualTimerOptionsI

        timer;   

        sprite: Phaser.Sprite;
        fullWidth: number;
        txtTempo: Phaser.Text;
        rect: Phaser.Rectangle;

        hasFinished: boolean;
        
        constructor(public opts: VisualTimerOptionsI){
            this.config = opts;
            this.config.type = opts.type ?  opts.type : VisualTimerType.ClockDown;
            this.config.key = opts.key ?  opts.key : 'timer';

            console.log('1');

            if (!this.config.game) return;

            console.log('2');

            if(this.config.type == VisualTimerType.BarUp || this.config.type == VisualTimerType.BarDown){
                // Bar
                this.config.game.add.sprite(opts.x, opts.y, this.config.key, 1);
                this.sprite = this.config.game.add.sprite(opts.x, opts.y, this.config.key, 0);
                this.fullWidth = this.sprite.width;
            } else {
                //Clock
                var relogio = this.config.game.add.sprite(opts.x, opts.y, 'sDefault','relogio.png');
                this.txtTempo = this.config.game.add.text(relogio.x + relogio.width + 10, opts.y, sxjs.Utils.tempoMMSS(opts.seconds) , this.config.style);
                this.txtTempo.alignTo(relogio, Phaser.RIGHT_CENTER , 10 , 4);
            }

            this.reset();
        } 

        reset () {
            if (this.timer) {
                this.timer.stop();
            }
            var self = this;
            this.hasFinished = false;
            this.timer = this.config.game.time.create(true);
            this.timer.repeat(Phaser.Timer.SECOND, this.config.seconds, this.timerTick, this);
            this.timer.onComplete.add(function() {
                self.hasFinished = true;
                if (self.config.onComplete) {
                    self.config.onComplete();
                }
            });

            if( this.config.type == VisualTimerType.BarUp ||  this.config.type == VisualTimerType.BarDown){
                this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height);
                if ( this.config.type == VisualTimerType.BarDown) {
                    this.sprite.crop(null, false);
                } else {
                    this.sprite.crop(this.rect, false);
                }
            } else{
                if ( this.config.type == VisualTimerType.ClockDown) {
                    this.txtTempo.text = sxjs.Utils.tempoMMSS( this.config.seconds);
                } else{
                    this.txtTempo.text = sxjs.Utils.tempoMMSS(0);
                }
            }
        }

        setTime (seconds) {
            this.config.seconds = seconds;
            this.reset();
        }

        start() {
            this.reset();
            this.timer.start();
        }

        stop() {
            this.timer.stop();
        }

        pause() {
            this.timer.pause();
        }

        resume() {
            this.timer.resume();
        }

        remainingTime() {
            var t =  this.config.seconds - this.timer.seconds;
            if (t<0) {
                t = 0;
            }
            return t;
        }     

        protected timerTick() {
            var myTime = ( this.config.type == VisualTimerType.ClockDown ||  this.config.type == VisualTimerType.BarDown ) ?  this.remainingTime() :  this.timer.seconds;

            if( this.config.type == VisualTimerType.BarUp ||  this.config.type == VisualTimerType.BarDown){
                this.rect.width = Math.max(0, (myTime /  this.config.seconds) * this.fullWidth);
                this.sprite.crop(this.rect,false);
            } else {
                this.txtTempo.text = sxjs.Utils.tempoMMSS(myTime);
            }
        }         
    }
}
