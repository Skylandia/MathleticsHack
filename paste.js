document.onkeydown = function(e)
{
	if (e.keyCode == 69)
	{
		answerQuestion();
	}
};

function answerQuestion()
{
	let answer = eval(getFormattedQuestion());
	inputAnswer(answer);
}

function getFormattedQuestion()
{
	let question = getQuestion();
	
	question = question.replaceAll('×', '*');
	question = question.replaceAll('÷', '/');
	question = question.replaceAll('Half of', '0.5 *');
	
	let parts = question.split(' ');
	
	console.log(parts);
	
	if (parts[parts.length-1] != '')
	{
		parts[2] = parts[0];
		parts[0] = parts[4];
		parts[4] = '';
		parts[1] = oppositeSign(parts[1]);
	}
	
	question = parts.join('');
	question = question.replaceAll('=', '');
	
	return question;
}

function oppositeSign(sign)
{
	switch(sign)
	{
		case '+': return '-';
		case '-': return '+';
		case '*': return '/';
		case '/': return '*';
	}
}
	
function inputAnswer(answer)
{
	document.getElementsByClassName('questions-input-adjustment questions-input-width-v3')[0].value = answer;
}

function getQuestion()
{
	return document.getElementsByClassName('questions-text-alignment whiteTextWithShadow question-size-v4')[0].innerText;
}

function arrange1(args)
{
	del args[3];
	return args.join('');
}
function arrange2(args)
{
	del args[5];
	return args.join('');
}
function arrange3(args)
{
	if (args[1] == '/' || args[1] == '-')
	{
		args[2] = args[4];
		args[4] = '';
	}
	else
	{
		args[2] = args[0];
		args[0] = args[4];
		args[4] = '';
		
		if (args[1] == '+')
			args[1] = '-';
		else
			args[1] = '*';
	}
	
	del args[3];
	return args.join('');
}
function arrange4(args)
{
	
}

/*
Question formats

[a] [operator] [b] = [ans]
[a] [operator] [b] [operator] [c] = [ans]
[a] [operator] [ans] = [b]
Half of [a] = [ans]
How many minutes is [a] seconds [ans]
How many hours in [a] minutes [ans]
How many minutes in [a] hours [ans]
[ans] [unit] = [a] [unit]
[a] [unit] = [ans] [unit]

Operators:

+
-
*
/

Units:

mm
cm
m

*/
