import {DebugEnum} from "../enum/debug.enum";
import * as dotenv from 'dotenv';
import { Logger } from "tslog";

dotenv.config();
const process = require('process');

export function getNewLogger(name: string) {
    let debug_mode;
    if (!process.env.DEBUG_MODE) {
        debug_mode = DebugEnum.INFO;
    } else {
        let debug_var = process.env.DEBUG_MODE;
        if (!isNaN(parseInt(debug_var)))
            debug_mode = Number(debug_var);
        else
            debug_mode = Number(DebugEnum[debug_var]);
    }
    return new Logger({minLevel: debug_mode, name: name});
}