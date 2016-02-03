<%@ page errorPage="../../ErrorPage.jsp" %>

<jsp:useBean id="gismap" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapJspBean" />

<% gismap.init( request, gismap.RIGHT_DISPLAY_MAP ); %>
<%= gismap.getMap ( request ) %>

