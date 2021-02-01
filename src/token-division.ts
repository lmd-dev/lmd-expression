import TokenOperator from "./token-operator.js";

namespace LMD
{
    export class TokenDivision extends TokenOperator
    {
        /**
         * Constructor
         */
        constructor()
        {
            super("/");
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
            if (secondOperand === 0)
                throw "TokenDivision::compute - Division by zero";

            return firstOperand / secondOperand;
        }
    }
}

export default LMD.TokenDivision;