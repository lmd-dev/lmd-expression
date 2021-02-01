import Token from "./token.js";

namespace LMD
{
    export class ExpressionTreeNode
    {
        // Token associated to the note
        private readonly _token: Token;
        public get token(): Token { return this._token; }

        //Left child of the tree node
        private _leftChild: ExpressionTreeNode;
        public get leftChild(): ExpressionTreeNode { return this._leftChild; }
        public set leftChild(value: ExpressionTreeNode) { this._leftChild = value; }

        //Right child of the tree node
        private _rightChild: ExpressionTreeNode;
        public get rightChild(): ExpressionTreeNode { return this._rightChild; }
        public set rightChild(value: ExpressionTreeNode) { this._rightChild = value; }

        /**
         * Constructor
         * @param token
         * @param leftChild
         * @param rightChild
         */
        constructor(token: Token, leftChild: ExpressionTreeNode = null, rightChild: ExpressionTreeNode = null)
        {
            this._token = token;
            this._leftChild = leftChild;
            this._rightChild = rightChild;
        }
    }
}

export default LMD.ExpressionTreeNode