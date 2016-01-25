<%@ page errorPage="../../ErrorPage.jsp" %>

<jsp:include page="../../PortletAdminHeader.jsp" />

<jsp:useBean id="GismapPortlet" scope="session" class="fr.paris.lutece.plugins.gismap.web.portlet.GismapPortletJspBean" />

<% GismapPortlet.init( request, GismapPortlet.RIGHT_MANAGE_ADMIN_SITE ); %>
<%= GismapPortlet.getModify ( request ) %>

<%@ include file="../../AdminFooter.jsp" %>


