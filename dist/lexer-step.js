"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LMD;
(function (LMD) {
    let LexerStep;
    (function (LexerStep) {
        LexerStep[LexerStep["WaitingForNumber"] = 0] = "WaitingForNumber";
        LexerStep[LexerStep["ContinueNumber"] = 1] = "ContinueNumber";
        LexerStep[LexerStep["ContinueDecimalNumber"] = 2] = "ContinueDecimalNumber";
        LexerStep[LexerStep["WaitingForOperator"] = 3] = "WaitingForOperator";
    })(LexerStep = LMD.LexerStep || (LMD.LexerStep = {}));
})(LMD || (LMD = {}));
exports.default = LMD.LexerStep;
