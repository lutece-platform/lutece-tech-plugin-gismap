
<%@ page errorPage="../../ErrorPage.jsp" %>

<jsp:useBean id="GismapPortlet" scope="session" class="fr.paris.lutece.plugins.gismap.web.portlet.GismapPortletJspBean" />

<%
    GismapPortlet.init( request, GismapPortlet.RIGHT_MANAGE_ADMIN_SITE );
    response.sendRedirect( GismapPortlet.doCreate( request ) );
%>

