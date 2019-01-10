<%
' A simple Ajax bootstrapper that can respond using JSON
' @author Jeremy Heminger <contact@jeremyheminger.com>
' @version 1.0.2
' @bindings: jQuery, tstBase (  located in: templateProject/EDItemplates/js/script.js  )

' initialize
dim Method
dim iSuccess
dim sResponse: sResponse = ""
dim Json: Json = ""
Const Quote = """"

' Get the methid from POST
Method = Request.Form("method")

Select Case Method
	Case "AjaxTest"
		Call AjaxTest()
	Case "AjaxTestDict"
		Call AjaxTestDict()
	Case Else
		iSuccess = 0
		sResponse = "The requested method does not exist"
End Select

Call AjaxResponse(iSuccess,sResponse)

' creates a JSON object to nest in message
' this is only necessary if returning a dictionary
' @param Dictionary
' @return String
Function BuildMessage(ByVal objDict)
	Json = Json & "{"
	dim objKey
	For Each objKey In objDict
		Json = Json & Quote & Cstr(objKey) & Quote & ":" & Quote & CStr(objDict(objKey)) & Quote & ","
	Next
	Json = Left(Json,Len(Json)-1)
	Json = Json & "}"
End Function
' build a JSON response 
' @param Int Success ( success = 1 , fail = 0 )
' @param String Message
' @return Void
Function AjaxResponse(ByVal Success, ByVal Message)
	Response.Write("{"&Quote&"success"&Quote&":"&Success&","&Quote&"message"&Quote&":"&Quote&""&Message&""&Quote&"}")
End Function




' simple example
' @return String
Function AjaxTest()
	dim a,b,c
	a = Request.Form("a")
	b = Request.Form("b")
	c = Request.Form("c")
	sResponse = "The post data contains: "&a&","&b&","&c&"."
	iSuccess = 1
End Function
' simple example
' @return String
Function AjaxTestDict()
	dim a,b,c
	a = Request.Form("a")
	b = Request.Form("b")
	c = Request.Form("c")
	Dim objDictionary
	Set objDictionary = CreateObject("Scripting.Dictionary")
	objDictionary.CompareMode = vbTextCompare
	objDictionary.Add "a", a
	objDictionary.Add "b", b
	objDictionary.Add "c", c
	BuildMessage(objDictionary)
	sResponse = Json
	iSuccess = 1
End Function
%>