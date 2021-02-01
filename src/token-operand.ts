import Token from "./token.js";

namespace LMD
{
    export class TokenOperand extends Token
    {
        //Value of the operand
        private _value: number;
        public get value(): number { return this._value; }
        public set value(value: number) { this._value = value; }

        /**
         * Constructor
         * @param value
         */
        constructor(value: string)
        {
            super();

            if (value.indexOf('.') !== -1)
                this._value = parseFloat(value);
            else
                this._value = parseInt(value);
        }

        /**
         * Is the token an operand ? YES !
         */
        isOperand(): boolean
        {
            return true;
        }

        /**
         * Compute the value of the token : returns the value of the operand
         */
        compute(firstOperand: number = null, secondOperand: number = null): number
        {
            return this.value;
        }
    }
}

export default LMD.TokenOperand;