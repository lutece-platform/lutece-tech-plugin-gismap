<%@ page errorPage="../../ErrorPage.jsp" %>

<jsp:include page="../../AdminHeader.jsp" />

<jsp:useBean id="managegismap" scope="session" class="fr.paris.lutece.plugins.gismap.web.ManageGismapJspBean" />

<% managegismap.init( request, managegismap.RIGHT_MANAGEGISMAP ); %>
<%= managegismap.getManageGismapHome ( request ) %>

<%@ include file="../../AdminFooter.jsp" %>
