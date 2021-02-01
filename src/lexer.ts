import LexerStep from "./lexer-step.js";
import TokenFactory from "./token-factory.js";
import Token from "./token.js";

namespace LMD
{
    export class Lexer
    {
        // Regular expressions used to identify characters type
        private readonly _startNumber: RegExp;
        private readonly _continueNumber: RegExp;
        private readonly _operators: RegExp;
                
        // Tokens resulting from expression analyses
        private _tokens: Token[];
        public get tokens(): Token[] { return this._tokens; }

        // State of the lexer
        private _state: LexerStep;
        private get state(): LexerStep { return this._state; }
        private set state(value: LexerStep) { this._state = value; }

        // Current operand the lexer is building
        private _currentOperand: string;
        private get currentOperand(): string { return this._currentOperand; }
        private set currentOperand(value: string) { this._currentOperand = value; }

        // Current operator the lexer is building
        private _currentOperator: string;
        private get currentOperator(): string { return this._currentOperator; }
        private set currentOperator(value: string) { this._currentOperator = value; }

        // decimal separator used by the lexer
        private _decimalSeparator: string;
        public get decimalSeparator(): string { return this._decimalSeparator; }
        public set decimalSeparator(value: string) { this._decimalSeparator = value; }

        /**
         * Constructor
         */
        constructor(decimalSeparator: string = Lexer.getDecimalSeparator())
        {
            this._startNumber = /^[0-9+-]/;
            this._continueNumber = /^[0-9]/;
            this._operators = /^[\+\-*/]/;

            this._state = null;
            this._tokens = [];
            this.decimalSeparator = decimalSeparator;
        }

        /**
         * Analyses an expression and transforms it into an array of tokens
         * @param expression
         */
        Tokenize(expression: string)
        {
            this._tokens.length = 0;
            this.currentOperand = "";
            this.currentOperator = "";

            this.state = +LexerStep.WaitingForNumber;

            //Removes spaces from expression
            expression = expression.replace(/ /g, "");

            //Analysing loop
            for (const character of expression)
            {
                if (this.state === LexerStep.WaitingForNumber)
                {
                    this.processWaitingForNumber(character);
                }
                else if (this.state === LexerStep.ContinueNumber)
                {
                    this.processContinueNumber(character);
                }
                else if (this.state === LexerStep.ContinueDecimalNumber)
                {
                    this.processContinueDecimalNumber(character);
                }
                else if (this.state === LexerStep.WaitingForOperator)
                {
                    this.processWaitingForOperator(character);
                }
            }

            if ((this.state === LexerStep.ContinueNumber || this.state === LexerStep.ContinueDecimalNumber) && this.currentOperand !== "")
                this.createOperand();
        }

        /**
         * Processes a character when the lexer is waiting for a number 
         * @param character
         */
        processWaitingForNumber(character: string)
        {
            if (this._startNumber.test(character))
            {
                if (this.currentOperand !== "")
                    this.createOperand();
                else if (this.currentOperator !== "")
                    this.createOperator();

                this.currentOperand = character;

                this.state = LexerStep.ContinueNumber
            }
            else
                throw `${character} can't start a number`;
        }

        /**
         * Processes a character when the lexer is continuing a number
         * @param character
         */
        processContinueNumber(character: string)
        {
            if (this._continueNumber.test(character))
            {
                this.currentOperand += character;
            }
            else if (character === this.decimalSeparator)
            {
                this.currentOperand += character;

                this.state = LexerStep.ContinueDecimalNumber;
            }
            else if (this._operators.test(character))
            {
                this.createOperand();

                this.currentOperator = character;

                this.state = LexerStep.WaitingForNumber;
            }
            else
                throw `${character} can't continue a number`;
        }

        /**
         * Processes a character when the lexer is continuing a decimal number (after the decimal separator)
         * @param character
         */
        processContinueDecimalNumber(character: string)
        {
            if (this._continueNumber.test(character))
            {
                this.currentOperand += character;
            }
            else if (this._operators.test(character))
            {
                this.createOperand();

                this.currentOperator = character;

                this.state = LexerStep.WaitingForNumber;
            }
            else
                throw `${character} can't continue a decimal number`;
        }

        /**
         * Processes a character when the lexer is waiting for an operator
         * @param character
         */
        processWaitingForOperator(character: string)
        {
            if (this._operators.test(character))
            {
                this.currentOperator = character;

                this.state = LexerStep.WaitingForNumber;
            }
            else
                throw `${character} is not an operator`;
        }

        /**
         * Creates an operand
         */
        createOperand()
        {
            this.tokens.push(TokenFactory.createOperand(this.currentOperand));
            this._currentOperand = "";
        }

        /**
         * Creates an operator
         */
        createOperator()
        {
            this.tokens.push(TokenFactory.createOperator(this.currentOperator));
            this._currentOperator = "";
        }

        /**
         * Returns the decimal separator used by the system
         */
        static getDecimalSeparator()
        {
            const numberWithDecimalSeparator = 1.1;

            return numberWithDecimalSeparator
                .toLocaleString()
                .substring(1, 2);
        }
    }
}

export default LMD.Lexer;