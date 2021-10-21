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
	if (e.keyCode == 69)
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
			return;
			
		case QType.L6:
			return;
			
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
	document.getElementsByClassName('questions-input-adjustment questions-input-width-v3')[0].value = answer;
}

function getQuestion()
{
	return document.getElementsByClassName('questions-text-alignment whiteTextWithShadow question-size-v4')[0].innerText;
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
How many [minutes/hours] is [a] [seconds/minutes] [ans]
How many [minutes/seconds] in [a] [hours/minutes] [ans]
How many minutes in [a] hours [ans]
[ans] [unit] = [a] [unit]
[a] [unit] = [ans] [unit]

Level 6:


Level 7:


Level 8:


Level 9:


Level 10:




*/
