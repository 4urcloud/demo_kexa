import * as fs from 'fs';
import { Logger } from "tslog";
import { getNewLogger } from '../services/logger.service';
const logger = getNewLogger("files");

export function deleteFile(filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            fs.unlinkSync(filePath);
        }
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export function getFile(filePath: string){
    try{
        const fileExists = fs.existsSync(filePath);
        if(fileExists){
            return fs.readFileSync(filePath, 'utf8');
        }
        return null;
    }catch(error){
        return null;
    }
}

export function createFileSync(data:string, filePath:string, jsonData:boolean=false): boolean{
    try{
        let pathFolder = filePath.split("/").slice(0, -1).join("/");
        createFolderIfNotExists(pathFolder);
        logger.debug("Writing data to file in "+ (jsonData)?'JSON':'RAW' +": " + filePath);
        fs.writeFileSync(filePath, (jsonData)?JSON.stringify(JSON.parse(data), null, 4):data);
        return true;
    }catch(error){
        logger.debug(error);
        return false;
    }
}

function createFolderIfNotExists(filePath:string): boolean{
    try{
        fs.mkdirSync(filePath, { recursive: true });
        logger.debug("Folder created: " + filePath);
        return true;
    }catch(error){
        logger.debug(error);
        return false;
    }

}