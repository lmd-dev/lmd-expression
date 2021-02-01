import TokenOperator from "./token-operator.js";

namespace LMD
{
    export class TokenAddition extends TokenOperator
    {
        /**
         * Constructor
         */
        constructor()
        {
            super("+");
        }

        /**
         * Compute the value of the token
         * @param firstOperand
         * @param secondOperand
         */
        compute(firstOperand: number, secondOperand: number): number
        {
            return firstOperand + secondOperand;
        }
    }
}

export default LMD.TokenAddition;