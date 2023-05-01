const fs = require('fs');

function HighestIndex(obj) {
	// Find the highest index in the object
	let highestIndex = -1;
	for (const key in obj) {
		const index = obj[key].index;
		if (index > highestIndex) {
			highestIndex = index;
		}
	}
	return highestIndex;
}

module.exports = {
	read: function read(fileName) {
		// Returns Array with HIGHEST_INDEX_AS_INT, FILE_AS_OBJECT;
		const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
		return { highestindex: HighestIndex(obj), fileasobject: obj };
	},
	appendRoleListMessage: function appendRoleListMessage(fileName, objectKey, messageID, roleNames, author) {
		// Read the existing JSON data from the file
		const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));

		const highestIndex = HighestIndex(obj);

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