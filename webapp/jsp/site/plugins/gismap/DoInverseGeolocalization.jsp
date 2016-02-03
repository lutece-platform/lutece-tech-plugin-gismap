<jsp:useBean id="gismapAddress" scope="session" class="fr.paris.lutece.plugins.gismap.web.GismapAddressJspBean" />

<%= gismapAddress.getInverseGeolocatization(request) %>