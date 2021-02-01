import ExpressionTree from "./expression-tree.js";
import Lexer from "./lexer.js";

namespace LMD
{
    export class ExpressionComputer
    {
        //Lexer used by computer
        private readonly _lexer: Lexer;
        private get lexer(): Lexer { return this._lexer; }

        //Expression tree used by computer
        private readonly _expressionTree: ExpressionTree;
        private get expressionTree(): ExpressionTree { return this._expressionTree; }

        /**
         * Constructor
         */
        constructor()
        {
            this._lexer = new Lexer();
            this._expressionTree = new ExpressionTree();
        }

        /**
         * Returns the value of the calculated given expression
         * @param expression
         */
        compute(expression: string): number
        {
            this.lexer.Tokenize(expression);
            this.expressionTree.build(this.lexer.tokens);
            return this.expressionTree.compute(this.expressionTree.root);
        }
    }
}

export default LMD.ExpressionComputer;