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
		return JSON.parse(fs.readFileSync(fileName, 'utf8'));
	},
	getObjWithHighestIndex: function getObjWithHighestIndex(fileName) {
		const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
		return obj[Object.keys(obj)[HighestIndex(obj)]];
	},
	appendRoleListMessage: function appendRoleListMessage(fileName, objectKey, messageID, channelID, guildID, roleNames, author) {
		// Read the existing JSON data from the file
		const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
		const highestIndex = HighestIndex(obj);
		// Create a new object with the next highest index and provided message data
		const newIndex = highestIndex + 1;
		const newObject = {
			index: newIndex,
			messageID: messageID,
			channelID: channelID,
			guildID: guildID,
			role_names: roleNames,
			author: author,
		};
		// Add the new object to the JSON data and write it to the file
		obj[objectKey] = newObject;
		fs.writeFileSync(fileName, JSON.stringify(obj));
	},
};