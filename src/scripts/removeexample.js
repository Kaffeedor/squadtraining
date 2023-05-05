const fs = require('fs');
const path = require('path');

function removeExampleExtension(filePath) {
	const ext = path.extname(filePath);
	if (ext === '.example') {
		const newFilePath = filePath.slice(0, -ext.length);
		fs.renameSync(filePath, newFilePath);
		console.log(`Renamed file "${filePath}" to "${newFilePath}"`);
	}
}

function walkDirectory(directoryPath) {
	const files = fs.readdirSync(directoryPath);
	files.forEach(file => {
		const filePath = path.join(directoryPath, file);
		if (fs.statSync(filePath).isDirectory()) {
			walkDirectory(filePath);
		}
		else {
			removeExampleExtension(filePath);
		}
	});
}

walkDirectory('..');