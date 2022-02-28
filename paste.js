const QType = {
	L1: 1,
	L2: 2,
	L3: 3,
	L4: 4,
	L5: 5,
	L6: 6,
	L7: 7,
	L8: 8,
	L9: 9,
	L10: 10
};

document.onkeydown = function(e)
{
	if (e.key == 'e')
	{
		answerQuestion();
	}
};

function answerQuestion()
{
	let question = getQuestion();
	let formattedQuestion = format(question);
	let questionType = getQuestionType(formattedQuestion);
	console.log(questionType);
	let answer = getAnswer(questionType, formattedQuestion);
	inputAnswer(answer);
}

function getQuestionType(question)
{
	if (question.length == 5 && isNumber(question[0]) && isOperator(question[1]) && isNumber(question[2]) && question[3] == '=' && question[4] == '')
		return QType.L1;
	
	
	if (question.length == 5 && isNumber(question[0]) && isOperator(question[1]) && question[2] == '' && question[3] == '=' && isNumber(question[4]))
		return QType.L3;
	
	
	if (question.length == 7 && isNumber(question[0]) && isOperator(question[1]) && isNumber(question[2]) && isOperator(question[3]) && isNumber(question[4]) && question[5] == '=' && question[6] == '')
		return QType.L4;
	if (question.length == 5 && question[0] == 'Half' && question[1] == 'of' && isNumber(question[2]) && question[3] == '=' && question[4] == '')
		return QType.L4;
	
	if (question.length == 7 && question[0] == 'How' && question[1] == 'many' && (question[3] == 'in' || question[3] == 'is'))
		return QType.L5;
	if (question.length == 4 && (question[1] == '=' || question[2] == '='))
		return QType.L5;
	
	console.log('unknown question type: ' + question);
}

function getAnswer(questionType, question)
{
	switch (questionType)
	{
		case QType.L1:
			question[3] = '';
			question = question.join('');
			return eval(question);
			
		case QType.L2:
			return;
			
		case QType.L3:
			if (question[1] == '-' || question[1] == '/')
			{
				question[2] = question[4];
				question[4] = '';
			}
			else if (question[1] == '+' || question[1] == '*')
			{
				if (question[1] == '+')
					question[1] = '-';
				else if (question[1] == '*')
					question[1] = '/';
				
				question[2] = question[0];
				question[0] = question[4];
				question[4] = '';
			}
			
			question[3] = '';
			question = question.join('');
			return eval(question);
			
		case QType.L4:
			if (question[0] == 'Half')
			{
				question[0] = '0.5';
				question[1] = '*';
				question[3] = '';
			}
			else
			{
				question[5] = '';
			}
			
			question = question.join('');
			return eval(question);
			
		case QType.L5:
			if (question.length == 7) {
				let qstr = '(';
				qstr += question[4];
				qstr += '*';
				switch (question[5]) {
					case 'hours':
						qstr += 3600;
						break;
					case 'minutes':
						qstr += 60;
						break;
					case 'seconds':
						qstr += 1;
						break;
				}
				qstr += ')/';
				switch (question[2]) {
					case 'hours':
						qstr += 3600;
						break;
					case 'minutes':
						qstr += 60;
						break;
					case 'seconds':
						qstr += 1;
						break;
				}
				return eval(qstr).toFixed(5);
			}
			else if (question[1] == '=' || question[2] == '=') {
				if (question[2] == '=') {
					question.reverse();
					[question[2], question[3]] = [question[3], question[2]];
				}
				let qstr = '(';
				if (question[0].includes('mm')) {
					qstr += question[0].substring(0, question[0].length-2);
					qstr += '*0.001)';
				} else if (question[0].includes('cm')) {
					qstr += question[0].substring(0, question[0].length-2);
					qstr += '*0.01)';
				} else if (question[0].includes('km')) {
					qstr += question[0].substring(0, question[0].length-2);
					qstr += '*1000)';
				} else if (question[0].includes('m')) {
					qstr += question[0].substring(0, question[0].length-1);
					qstr += '*1)';
				}
				switch (question[3]) {
					case 'mm':
						qstr += '*1000';
						break;
					case 'cm':
						qstr += '*100';
						break;
					case 'm':
						qstr += '*1';
						break;
					case 'km':
						qstr += '*0.001';
						break;
				}
				return eval(qstr).toFixed(5);	
			}
			
		case QType.L6:
			question[1] = '*'
			question[3] = '';
			question.join('');
			return eval(question);
			
		case QType.L7:
			return;
			
		case QType.L8:
			return;
			
		case QType.L9:
			return;
			
		case QType.L10:
			return;
	}
}

















function format(question)
{
	question = question.replaceAll('×', '*');
	question = question.replaceAll('÷', '/');
	
	return question.split(' ');
}

function inputAnswer(answer)
{
	document.getElementsByClassName('questions-input-adjustment')[0].value = answer;
}

function getQuestion()
{
	return document.getElementsByClassName('questions-text-alignment')[0].innerText;
}

function isOperator(part)
{
	switch (part)
	{
		case '+': return true;
		case '-': return true;
		case '*': return true;
		case '/': return true;
		default: return false;
	}
}
function isNumber(part)
{
	return !isNaN(part);
}

/*
Level 1:
[a] [operator] [b] = [ans]

Level 2:

Level 3:
[a] [operator] [b] [operator] [c] = [ans]
[a] [operator] [ans] = [b]

Level 4:
Half of [a] = [ans]

Level 5:
How many [hours/minutes/seconds] [is/in] [a] [hours/minutes/seconds] [ans]
[ans] [unit] = [a] [unit]
[a] [unit] = [ans] [unit]

Level 6:


Level 7:


Level 8:


Level 9:


Level 10:




*/
