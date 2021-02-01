namespace LMD
{
    export abstract class Token 
    {
        /**
         * Is the token an operand ?
         */
        isOperand(): boolean { return false }

        /**
         * Is the token an operator ?
         */
        isOperator(): boolean { return false }

        /**
         * Is the token a priority operator ?
         */
        isPriorityOperator(): boolean { return false }

        /**
         * Compute the value of the token
         * @param firstOperand
         * @param secondOperand
         */
        abstract compute(firstOperand?: number, secondOperand?: number): number;
    }
}

export default LMD.Token;