let url = 'https://github.com/treyzar/git-github.com-treyzar-travel_guide';
let response = await fetch(url);

let commits = await response.json(); // читаем ответ в формате JSON

alert(commits[0].author.login);