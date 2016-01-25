<jsp:useBean id="managegismapLonLat" scope="session" class="fr.paris.lutece.plugins.gismap.web.LonLatJspBean" />
<% String strContent = managegismapLonLat.processController ( request , response ); %>

<%@ page errorPage="../../ErrorPage.jsp" %>
<jsp:include page="../../AdminHeader.jsp" />

<%= strContent %>

<%@ include file="../../AdminFooter.jsp" %>
