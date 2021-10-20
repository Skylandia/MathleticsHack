document.onkeydown = function(e)
{
	if (e.keyCode == 69)
	{
		document.getElementsByClassName("questions-input-adjustment questions-input-width-v3")[0].value = eval(document.getElementsByClassName("questions-text-alignment whiteTextWithShadow question-size-v4")[0]
														       .innerText
														       .replace('=', '')
														       .replace('×', '*')
														      );
	}
};
