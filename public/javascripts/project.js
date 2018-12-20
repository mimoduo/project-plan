var projectTitle = document.querySelector(".project_title");
var projectTargetScore = document.querySelector(".project_score_input");
var projectToolBoard = document.querySelector(".project_tool_board");
var projectBoardTitle = document.querySelectorAll(".project_board_title");
var projectColumnTitle = document.querySelectorAll(".project_column_title");
var projectToolColumn = document.querySelectorAll(".project_board_tool_column");
var projectToolCard = document.querySelectorAll(".project_board_tool_card");
var projectCardToolDelete = document.querySelectorAll(".project_card_tool_delete");
var projectCardToolLink = document.querySelectorAll(".project_card_tool_link");
var projectCardType = document.querySelectorAll(".project_card_type");
var projectCardTitle = document.querySelectorAll(".project_card_title");

bindProjectUI();
bindCardUI();

function bindProjectUI() {
	projectTitle.addEventListener("keyup", changeProjectTitle, false);
	projectToolBoard.addEventListener("click", createBoard, false);
	projectTargetScore.addEventListener("keyup", changeTargetHours, false);

	for (var x = 0; x < projectBoardTitle.length; x++) {
		projectBoardTitle[x].addEventListener("keyup", changeBoardTitle, false);
	}

	for (var x = 0; x < projectColumnTitle.length; x++) {
		projectColumnTitle[x].addEventListener("keyup", changeColumnTitle, false);
	}

	for (var x = 0; x < projectToolColumn.length; x++) {
		projectToolColumn[x].addEventListener("click", createColumn, false);
	}

	for (var x = 0; x < projectToolCard.length; x++) {
		projectToolCard[x].addEventListener("click", createCard, false);
	}
}

function bindCardUI() {
	for (var x = 0; x < projectCardToolDelete.length; x++) {
		projectCardToolDelete[x].addEventListener("click", deleteCard, false);
	}

	for (var x = 0; x < projectCardToolLink.length; x++) {
		projectCardToolLink[x].addEventListener("click", flipLinked, false);
	}

	for (var x = 0; x < projectCardType.length; x++) {
		projectCardType[x].addEventListener("click", flipType, false);
	}

	for (var x = 0; x < projectCardTitle.length; x++) {
		projectCardTitle[x].addEventListener("keyup", changeCardTitle, false);
	}
}

function postProject(data, callback) {
	fetch(window.location.pathname, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		if (callback) {
			callback(data);
		}
	}).catch(function(error) {
		console.log(error);
	});
}

function changeProjectTitle(e) {
	var projectTitle = e.currentTarget;
	var project = projectTitle.closest('.project');

	postProject({
		action: 'change-project-title',
		project: project.dataset.id,
		title: projectTitle.value
	}, function(data) {});
}

function changeTargetHours(e) {
	var targetHours = e.currentTarget;
	var project = targetHours.closest('.project');

	postProject({
		action: 'change-target-hours',
		project: project.dataset.id,
		targetHours: targetHours.value
	}, function(data) {});
}

function createBoard(e) {
	var project = e.currentTarget.closest('.project');

	postProject({
		action: 'create-board',
		project: project.dataset.id
	}, function(data) {
		var board = document.createElement('div');
		board.classList.add('project_board');
		board.dataset.id = data.board;
		board.innerHTML = 
			`<div class="project_board_header">
				<input class="project_board_title" type="text" value="Casino Royale" />
			</div>
			<button class="project_board_tool project_board_tool_column">
				<span class="project_board_tool_icon">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path d="M19 11h-6v-6c0-0.6-0.4-1-1-1s-1 0.4-1 1v6h-6c-0.6 0-1 0.4-1 1s0.4 1 1 1h6v6c0 0.6 0.4 1 1 1s1-0.4 1-1v-6h6c0.6 0 1-0.4 1-1s-0.4-1-1-1z"></path>
					</svg>
				</span>
				<span class="project_board_tool_label">New Column</span>
			</button>`;
		board.querySelector('.project_board_title').addEventListener('keyup', changeBoardTitle, false);
		board.querySelector('.project_board_tool').addEventListener('click', createColumn, false);

		project.querySelector('.project_boards').appendChild(board);

		window.scrollBy({ 
			top: document.body.scrollHeight,
			left: 0, 
			behavior: 'smooth'
		});
	});
}

function changeBoardTitle(e) {
	var boardTitle = e.currentTarget;
	var board = boardTitle.closest('.project_board');

	postProject({
		action: 'change-board-title',
		board: board.dataset.id,
		title: boardTitle.value
	}, function(data) {});
}

function createColumn(e) {
	var columnTool = e.currentTarget;
	var board = columnTool.closest('.project_board');

	postProject({
		action: 'create-column',
		board: board.dataset.id
	}, function(data) {
		var column = document.createElement('div');
		column.classList.add('project_column');
		column.dataset.id = data.column;
		column.innerHTML =
			`<div class="project_column_header">
				<input class="project_column_title" type="text" value="" placeholder="Enter in a Column Title" />
			</div>
			<div class="project_board_cards"></div>
			<button class="project_board_tool project_board_tool_card">
				<span class="project_board_tool_icon">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path d="M19 11h-6v-6c0-0.6-0.4-1-1-1s-1 0.4-1 1v6h-6c-0.6 0-1 0.4-1 1s0.4 1 1 1h6v6c0 0.6 0.4 1 1 1s1-0.4 1-1v-6h6c0.6 0 1-0.4 1-1s-0.4-1-1-1z"></path>
					</svg>
				</span>
				<span class="project_board_tool_label">New Card</span>
			</button>`;
		column.querySelector('.project_column_title').addEventListener('keyup', changeColumnTitle, false);
		column.querySelector('.project_board_tool').addEventListener('click', createCard, false);

		columnTool.parentNode.insertBefore(column, columnTool);
	});
}

function changeColumnTitle(e) {
	var columnTitle = e.currentTarget;
	var column = columnTitle.closest('.project_column');

	postProject({
		action: 'change-column-title',
		column: column.dataset.id,
		title: columnTitle.value
	}, function(data) {});
}

function createCard(e) {
	var cardTool = e.currentTarget;
	var column = cardTool.closest('.project_column');

	postProject({
		action: 'create-card',
		column: column.dataset.id
	}, function(data) {
		var card = document.createElement('div');
		card.classList.add('project_card');
		card.dataset.id = data.card;
		card.innerHTML = 
			`<div class="project_card_tools">
				<button class="project_card_tool project_card_tool_delete">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 22 28">
						<path d="M8 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM12 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM16 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM18 22.813v-14.812h-14v14.812c0 0.75 0.422 1.188 0.5 1.188h13c0.078 0 0.5-0.438 0.5-1.188zM7.5 6h7l-0.75-1.828c-0.047-0.063-0.187-0.156-0.266-0.172h-4.953c-0.094 0.016-0.219 0.109-0.266 0.172zM22 6.5v1c0 0.281-0.219 0.5-0.5 0.5h-1.5v14.812c0 1.719-1.125 3.187-2.5 3.187h-13c-1.375 0-2.5-1.406-2.5-3.125v-14.875h-1.5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h4.828l1.094-2.609c0.313-0.766 1.25-1.391 2.078-1.391h5c0.828 0 1.766 0.625 2.078 1.391l1.094 2.609h4.828c0.281 0 0.5 0.219 0.5 0.5z"></path>
					</svg>
				</button>
			</div>
			<div class="project_card_body">
				<button class="project_card_type project_card_type_none" data-type="none">none</button>
				<input class="project_card_title" type="text" value="" placeholder="Enter in a Title" />
			</div>
			<input class="project_card_points" type="number" placeholder="#" min="0" max="9" />`;
		card.querySelector('.project_card_tool_delete').addEventListener('click', deleteCard, false);
		card.querySelector('.project_card_title').addEventListener('keyup', changeCardTitle, false);
		card.querySelector('.project_card_type').addEventListener('click', flipType, false);

		cardTool.previousElementSibling.appendChild(card);
	});
}

function deleteCard(e) {
	var card = e.currentTarget.closest('.project_card');

	postProject({
		action: 'delete-card',
		card: card.dataset.id
	}, function(data) {
		card.remove();
	});
}

function flipType(e) {
	var flipTool = e.currentTarget;
	var card = flipTool.closest('.project_card')

	postProject({
		action: 'flip-type',
		card: card.dataset.id,
		type: flipTool.dataset.type
	}, function(data) {
		if (data.type == 'none') {
			flipTool.dataset.type = 'none';
			flipTool.classList.remove('project_card_type_approved');
			flipTool.classList.add('project_card_type_none');
		} else {
			flipTool.dataset.type = 'approved';
			flipTool.classList.remove('project_card_type_none');
			flipTool.classList.add('project_card_type_approved');
		}
	});
}

function changeCardTitle(e) {
	var cardTitle = e.currentTarget;
	var card = cardTitle.closest('.project_card');

	postProject({
		action: 'change-card-title',
		card: card.dataset.id,
		title: cardTitle.value
	}, function(data) {});
}

function flipLinked(e) {
	var linkedTool = e.currentTarget;
	var card = linkedTool.closest('.project_card');
	
	postProject({
		action: 'flip-linked',
		card: card.dataset.id,
		linked: linkedTool.dataset.linked
	}, function(data) {
		if (data.linked) {
			linkedTool.dataset.linked = true;
			card.classList.add('project_card_linked');
		} else {
			linkedTool.dataset.linked = false;
			card.classList.remove('project_card_linked');
		}
	});
}