const fs = require('fs');

module.exports = {
	read0: function Read0(fileName) {
		return JSON.parse(fs.readFileSync(fileName).toString());
	},
	write0: function Write0(fileName, messageID0, role_names0, author0) {
		const obj = JSON.parse(fs.readFileSync(fileName).toString());
		console.log(parseInt(obj.length));
		const new_obj = new {};
		new_obj.index = parseInt(parseInt(obj.slice(-1).index) + 1);
		new_obj.messageID = messageID0.toString();
		new_obj.role_names = role_names0;
		new_obj.author = author0.toString();
		obj['message' + (parseInt(obj.slice(-1).index) + 1).toString()] = new_obj;
		fs.writeFileSync(fileName, JSON.stringify(obj));
	},
};