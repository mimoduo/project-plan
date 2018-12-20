var projectListToolItem = document.querySelector('.projects_tool_item');

bindListUI();

function bindListUI() {
	projectListToolItem.addEventListener('click', createProject, false);
}

function createProject() {
	fetch('/', {
		method: 'POST'
	}).then(function() {
		location.reload();
	}).catch(function(error) {
		console.log(error);
	});
}