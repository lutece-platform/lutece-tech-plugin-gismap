<jsp:useBean id="managegismapView" scope="session" class="fr.paris.lutece.plugins.gismap.web.ViewJspBean" />
<% String strContent = managegismapView.processController ( request , response ); %>

<%@ page errorPage="../../ErrorPage.jsp" %>
<jsp:include page="../../AdminHeader.jsp" />

<%= strContent %>

<%@ include file="../../AdminFooter.jsp" %>
