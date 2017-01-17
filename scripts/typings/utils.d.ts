declare module sxjs{
    // Game Utilities
    class Utils {

        /**
         * randomInt
         * Return a random integer between a minimum and maximum value
         * Parameters: 
         * min. An integer.
         * max. An integer.
         * Here's how you can use it to get a random number between, 1 and 10:
         *      var number = gu.randomInt(1, 10);
         */
        static randomInt (min: number, max: number) : number;

        /**
         * randomFloat
         * Return a random floating point number between a minimum and maximum value
         * Parameters:
         * min. Any number.
         * max. Any number.
         * Here's how you can use it to get a random floating point number between, 1 and 10:
         *      var number = gu.randomFloat(1, 10);
         */
        static randomFloat(min: number, max: number):number;

        /**
         * tempoMMSS
         * Return o tempo passado em segundos formatado MM:SS
         * Parameters:
         * segundos. Any number.
         *      var texto = tempoMMSS(90); // Texto será 01:30
         */
        static tempoMMSS(segundos:number):string;
    }
}