import Token from "./token.js";

namespace LMD
{
    export abstract class TokenOperator extends Token
    {
        //Symbol of the operator
        private _symbol: string;
        public get symbol(): string { return this._symbol; }
        public set symbol(value: string) { this._symbol = value; }

        /**
         * Constructor
         * @param symbol
         */
        constructor(symbol: string)
        {
            super();

            this._symbol = symbol;
        }

        /**
         * Is the token an operator ? YES !
         */
        isOperator(): boolean
        {
            return true;
        }
    }
}

export default LMD.TokenOperator;