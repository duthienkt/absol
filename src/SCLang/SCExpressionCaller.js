import SCParser from "./SCParser";
import SCProgramInstance from "./SCProgramInstance";

var SCExpressionCaller = SCProgramInstance;
export default SCExpressionCaller;

export function evalSCExpression(code, env) {
    var parsed = SCParser.parse(code, 'exp');
    var caller;
    if (parsed.ast) {
        caller = new SCProgramInstance(parsed.ast, env);
        return caller.exec();
    }
    else {
        throw parsed.error;
    }
}


