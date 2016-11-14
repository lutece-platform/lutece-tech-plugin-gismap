<%@ page errorPage="../../ErrorPage.jsp" %>

<jsp:useBean id="gismapPortlet" scope="session" class="fr.paris.lutece.plugins.gismap.web.portlet.GismapPortletJspBean" />
<% 
	gismapPortlet.init( request, fr.paris.lutece.plugins.gismap.web.GismapJspBean.RIGHT_MANAGE_GISMAP);
    response.sendRedirect( gismapPortlet.doCreate( request ) );
%>
