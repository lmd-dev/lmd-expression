import TokenAddition from "./token-addition.js";
import TokenDivision from "./token-division.js";
import TokenMultiplication from "./token-multiplication.js";
import TokenOperand from "./token-operand.js";
import TokenOperator from "./token-operator.js";
import TokenSubstraction from "./token-substraction.js";

namespace LMD
{
    export class TokenFactory
    {
        /**
         * Creates an operand token
         * @param value
         */
        static createOperand(value: string): TokenOperand
        {
            return new TokenOperand(value);
        }

        /**
         * Creates an operator token
         * @param value
         */
        static createOperator(value: string): TokenOperator
        {
            let token = null;

            switch (value)
            {
                case "*": token = new TokenMultiplication(); break;
                case "/": token = new TokenDivision(); break;
                case "-": token = new TokenSubstraction(); break;
                case "+": token = new TokenAddition(); break;
                default:
                    throw `TokenFactory::createOperator - Unknown operator '${value}`;
            }

            return token;
        }
    }
}

export default LMD.TokenFactory;