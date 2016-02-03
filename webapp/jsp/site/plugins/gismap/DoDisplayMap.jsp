<%@ page errorPage="../../ErrorPagePortal.jsp" %>

<jsp:useBean id="gismap" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapJspBean" />

<%= gismap.getMap ( request ) %>

