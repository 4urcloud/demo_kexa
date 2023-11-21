import fs from 'fs';
import { updateVersion } from '../../services/updateCapability.service';

const { expect } = require('chai');

describe('updateVersion', () => {
    it('should update the version in package.json correctly', () => {
        // Save the current content of package.json
        const originalPackageJson = fs.readFileSync('./package.json', 'utf8');
        const originalVersion = fs.readFileSync('./VERSION', 'utf8');

        fs.writeFileSync('./VERSION', '1.2.3\n');

        // Run the updateVersion function
        updateVersion();

        // Read the modified package.json
        const modifiedPackageJson = JSON.parse(fs.readFileSync("./package.json", 'utf8'));

        // Assert that the version has been updated correctly
        expect(modifiedPackageJson.version).to.equal('1.2.3');

        // Clean up temporary files
        fs.writeFileSync('./package.json', originalPackageJson);
        fs.writeFileSync('./VERSION', originalVersion);
    });
});