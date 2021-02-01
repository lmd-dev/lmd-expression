import Token from "./token.js";
import ExpressionTreeNode from "./expression-tree-node.js";

namespace LMD
{
    export class ExpressionTree
    {
        // Root of the builded expression tree
        private _root: ExpressionTreeNode;
        public get root(): ExpressionTreeNode { return this._root; }
        public set root(value: ExpressionTreeNode) { this._root = value; }

        // Processing tree node
        private _currentNode: ExpressionTreeNode;
        private get currentNode(): ExpressionTreeNode { return this._currentNode; }
        private set currentNode(value: ExpressionTreeNode) { this._currentNode = value; }

        /**
         * Builds an expression tree from tokens
         * @param tokens
         */
        build(tokens: Token[])
        {
            this.root = null;
            this.currentNode = null;

            this.addTokensToNode(tokens);

            console.log(this.root);
        }

        /**
         * Adds tokens to the given tree node
         * @param tokens
         * @param node
         */
        private addTokensToNode(tokens: Token[])
        {
            if (tokens.length === 0)
                return;

            const token = tokens.shift();

            if (token.isOperand())
            {
                const newNode = new ExpressionTreeNode(token);

                if (this.currentNode === null)
                {
                    this.currentNode = newNode;
                    this.root = newNode;
                }
                else if (this.currentNode.leftChild === null)
                    this.currentNode.leftChild = newNode;
                else if (this.currentNode.rightChild === null)
                    this.currentNode.rightChild = newNode;
                else
                    throw "ExpressTree::addTokensToTree - Can't add child to tree";
            }
            else if (token.isOperator())
            {
                if (token.isPriorityOperator())
                {
                    if (this.currentNode.rightChild)
                    {
                        const newTree = new ExpressionTreeNode(token, this.currentNode.rightChild);

                        this.currentNode.rightChild = newTree;
                        this.currentNode = newTree;
                    }
                    else
                    {
                        const newTree = new ExpressionTreeNode(token, this.currentNode);
                        this.currentNode = newTree;
                        this.root = newTree;
                    }
                }
                else
                {
                    const newTree = new ExpressionTreeNode(token, this.root);
                    this.currentNode = newTree;
                    this.root = newTree;
                }
            }

            this.addTokensToNode(tokens);
        }

        /**
         * Returns the value computed from the expression tree
         * @param node
         */
        compute(node: ExpressionTreeNode): number
        {
            let result = 0;

            if (node)
            {
                const { leftChild, rightChild, token } = node;

                if (token.isOperand())
                {
                    result = token.compute();
                }
                else
                {
                    let leftValue = leftChild ? this.compute(leftChild) : 0;
                    let rightValue = rightChild ? this.compute(rightChild) : 0;

                    result = token.compute(leftValue, rightValue);
                }
            }

            return result;
        }
    }
}

export default LMD.ExpressionTree;