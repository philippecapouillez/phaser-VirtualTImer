var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sxjs;
(function (sxjs) {
    var Plugins;
    (function (Plugins) {
        var VisualTimer = (function (_super) {
            __extends(VisualTimer, _super);
            function VisualTimer(game, parent) {
                var _this = _super.call(this, game, parent) || this;
                _this.addVisualTimerFactory();
                return _this;
            }
            /**
             * Extends the GameObjectFactory prototype with the support of adding InputField. this allows us to add InputField methods to the game just like any other object:
             * game.add.InputField();
             */
            VisualTimer.prototype.addVisualTimerFactory = function () {
                Phaser.GameObjectFactory.prototype.visualTimer = function (opts, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    var object = new sxjs.VisualTimer(opts);
                    return group.add(object);
                };
            };
            return VisualTimer;
        }(Phaser.Plugin));
        Plugins.VisualTimer = VisualTimer;
    })(Plugins = sxjs.Plugins || (sxjs.Plugins = {}));
})(sxjs || (sxjs = {}));
var sxjs;
(function (sxjs) {
    var VisualTimerType;
    (function (VisualTimerType) {
        VisualTimerType[VisualTimerType["ClockUp"] = 1] = "ClockUp";
        VisualTimerType[VisualTimerType["ClockDown"] = 2] = "ClockDown";
        VisualTimerType[VisualTimerType["BarUp"] = 3] = "BarUp";
        VisualTimerType[VisualTimerType["BarDown"] = 4] = "BarDown";
    })(VisualTimerType = sxjs.VisualTimerType || (sxjs.VisualTimerType = {}));
    var VisualTimer = (function () {
        function VisualTimer(opts) {
            this.opts = opts;
            this.config = opts;
            this.config.type = opts.type ? opts.type : VisualTimerType.ClockDown;
            this.config.key = opts.key ? opts.key : 'timer';
            console.log('1');
            if (!this.config.game)
                return;
            console.log('2');
            if (this.config.type == VisualTimerType.BarUp || this.config.type == VisualTimerType.BarDown) {
                // Bar
                this.config.game.add.sprite(opts.x, opts.y, this.config.key, 1);
                this.sprite = this.config.game.add.sprite(opts.x, opts.y, this.config.key, 0);
                this.fullWidth = this.sprite.width;
            }
            else {
                //Clock
                var relogio = this.config.game.add.sprite(opts.x, opts.y, 'sDefault', 'relogio.png');
                this.txtTempo = this.config.game.add.text(relogio.x + relogio.width + 10, opts.y, sxjs.Utils.tempoMMSS(opts.seconds), this.config.style);
                this.txtTempo.alignTo(relogio, Phaser.RIGHT_CENTER, 10, 4);
            }
            this.reset();
        }
        VisualTimer.prototype.reset = function () {
            if (this.timer) {
                this.timer.stop();
            }
            var self = this;
            this.hasFinished = false;
            this.timer = this.config.game.time.create(true);
            this.timer.repeat(Phaser.Timer.SECOND, this.config.seconds, this.timerTick, this);
            this.timer.onComplete.add(function () {
                self.hasFinished = true;
                if (self.config.onComplete) {
                    self.config.onComplete();
                }
            });
            if (this.config.type == VisualTimerType.BarUp || this.config.type == VisualTimerType.BarDown) {
                this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height);
                if (this.config.type == VisualTimerType.BarDown) {
                    this.sprite.crop(null, false);
                }
                else {
                    this.sprite.crop(this.rect, false);
                }
            }
            else {
                if (this.config.type == VisualTimerType.ClockDown) {
                    this.txtTempo.text = sxjs.Utils.tempoMMSS(this.config.seconds);
                }
                else {
                    this.txtTempo.text = sxjs.Utils.tempoMMSS(0);
                }
            }
        };
        VisualTimer.prototype.setTime = function (seconds) {
            this.config.seconds = seconds;
            this.reset();
        };
        VisualTimer.prototype.start = function () {
            this.reset();
            this.timer.start();
        };
        VisualTimer.prototype.stop = function () {
            this.timer.stop();
        };
        VisualTimer.prototype.pause = function () {
            this.timer.pause();
        };
        VisualTimer.prototype.resume = function () {
            this.timer.resume();
        };
        VisualTimer.prototype.remainingTime = function () {
            var t = this.config.seconds - this.timer.seconds;
            if (t < 0) {
                t = 0;
            }
            return t;
        };
        VisualTimer.prototype.timerTick = function () {
            var myTime = (this.config.type == VisualTimerType.ClockDown || this.config.type == VisualTimerType.BarDown) ? this.remainingTime() : this.timer.seconds;
            if (this.config.type == VisualTimerType.BarUp || this.config.type == VisualTimerType.BarDown) {
                this.rect.width = Math.max(0, (myTime / this.config.seconds) * this.fullWidth);
                this.sprite.crop(this.rect, false);
            }
            else {
                this.txtTempo.text = sxjs.Utils.tempoMMSS(myTime);
            }
        };
        return VisualTimer;
    }());
    sxjs.VisualTimer = VisualTimer;
})(sxjs || (sxjs = {}));
/// <reference path='../typings/pixi.d.ts'/>
/// <reference path='../typings/phaser.d.ts'/>
/// <reference path="VirtualTimer.ts" />
/// <reference path="Plugin.ts" />
