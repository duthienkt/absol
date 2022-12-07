import DPParser from "../Pharse/DPParser";
import SCGrammar from "./SCGrammar";


/***
 * @type {DPParser}
 */
var SCParser = new DPParser(SCGrammar);
export default SCParser;