import TokenOperator from "./token-operator.js";

namespace LMD
{
    export class TokenMultiplication extends TokenOperator
    {
        /**
         * Constructor
         */
        constructor()
        {
            super("*");
        }

        /**
         * Is the token a priority operator ? YES !
         */
        isPriorityOperator(): boolean
        {
            return true;
        }

        /**
         * Compute the value of the token
         * @param firstOperand
         * @param secondOperand
         */
        compute(firstOperand: number, secondOperand: number): number
        {
            return firstOperand * secondOperand;
        }
    }
}

export default LMD.TokenMultiplication;