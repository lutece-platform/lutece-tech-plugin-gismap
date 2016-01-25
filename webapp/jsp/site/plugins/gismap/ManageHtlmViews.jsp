<jsp:useBean id="managegismapHtlmView" scope="session" class="fr.paris.lutece.plugins.gismap.web.HtlmViewJspBean" />
<% String strContent = managegismapHtlmView.processController ( request , response ); %>

<%@ page errorPage="../../ErrorPage.jsp" %>
<jsp:include page="../../AdminHeader.jsp" />

<%= strContent %>

<%@ include file="../../AdminFooter.jsp" %>
