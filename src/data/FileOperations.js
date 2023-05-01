const fs = require('fs');

module.exports = {
	read0: function Read0(fileName) {
		return JSON.parse(fs.readFileSync(fileName));
	},
	appendRoleListMessage: function appendRoleListMessage(fileName, objectKey, messageID, roleNames, author) {
		// Read the existing JSON data from the file
		const jsonData = fs.readFileSync(fileName, 'utf8');
		const obj = JSON.parse(jsonData);

		// Find the highest index in the object
		let highestIndex = -1;
		for (const key in obj) {
			const index = obj[key].index;
			if (index > highestIndex) {
				highestIndex = index;
			}
		}

		// Create a new object with the next highest index and provided message data
		const newIndex = highestIndex + 1;
		const newObject = {
			index: newIndex,
			messageID: messageID,
			role_names: roleNames,
			author: author,
		};

		// Add the new object to the JSON data and write it to the file
		obj[objectKey] = newObject;
		fs.writeFileSync(fileName, JSON.stringify(obj));
	},
};