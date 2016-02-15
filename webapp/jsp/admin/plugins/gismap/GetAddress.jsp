<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="fr.paris.lutece.portal.web.LocalVariables" trimDirectiveWhitespaces="true"%>
<jsp:useBean id="gismap" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapJspBean" />
<%
	LocalVariables.setLocal( config, request, response );
%>
<%= gismap.getAddressList( request ) %>