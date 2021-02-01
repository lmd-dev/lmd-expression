namespace LMD
{
    export enum LexerStep
    {
        WaitingForNumber,
        WaitingForOperator,
        ContinueNumber,
        ContinueDecimalNumber
    }
}

export default LMD.LexerStep;