namespace LMD
{
    export enum LexerStep
    {
        WaitingForNumber,
        ContinueNumber,
        ContinueDecimalNumber,
        WaitingForOperator
    }
}

export default LMD.LexerStep;