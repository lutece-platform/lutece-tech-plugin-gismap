<%@ page errorPage="../../ErrorPage.jsp" %>
<jsp:include page="../../AdminHeader.jsp" />

<jsp:useBean id="gismap" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapJspBean" />

<% gismap.init( request , gismap.RIGHT_MANAGE_GISMAP ); %>
<%= gismap.getManageGismap(request) %>

<%@ include file="../../AdminFooter.jsp" %>