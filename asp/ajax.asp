<%
dim method
dim a, b, c
dim iSuccess
dim sResponse: sResponse = ""
Const Quote = """"

method = Request.Form("method")
a = Request.Form("a")
b = Request.Form("b")
c = Request.Form("c")

Select Case method
	Case "AjaxTest"
		iSuccess = 1
		Call AjaxTest(a,b,c)
	Case "AnotherFunction"
		iSuccess = 1
	Case Else
		iSuccess = 0
		sResponse = "The requested method does not exist"
End Select

Call AjaxResponse(iSuccess,sResponse)

Function AjaxTest(ByVal a,ByVal b, ByVal c)
	sResponse = "The post data contains: "&a&","&b&","&c&"."
End Function
Function AjaxResponse(ByVal Success, ByVal Message)
	Response.Write("{"&Quote&"success"&Quote&":"&Success&","&Quote&"message"&Quote&":"&Quote&""&Message&""&Quote&"}")
End Function
%>