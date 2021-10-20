function getTextQuestion()
{
	return document.getElementsByClassName("questions-text-alignment whiteTextWithShadow question-size-v4")[0].innerText;
}

function formatTextQuestion(textQuestion)
{
	return textQuestion.replace('=', '');
}

function getAnswer(question)
{
	return eval(question);
}

document.onkeydown = function(e)
{
	if (e.keyCode == 69)
	{
		console.log(getAnswer(formatTextQuestion(getTextQuestion)));
	}
};
