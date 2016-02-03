<jsp:useBean id="gismapAddress" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapAddressJspBean" />

<% gismapAddress.init( request , gismapAddress.RIGHT_MANAGE_GISMAP ); %>
<%= gismapAddress.getGeolocalization(request) %>