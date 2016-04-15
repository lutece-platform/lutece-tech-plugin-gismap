package fr.paris.lutece.plugins.gismap.business;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
//import javax.ws.rs.client.ClientBuilder;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import fr.paris.lutece.portal.service.util.AppPropertiesService;
import fr.paris.lutece.util.httpaccess.HttpAccess;
import fr.paris.lutece.util.httpaccess.HttpAccessException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Path("/rest/gismap/")
public class ReverseGeocoding 
{
	@GET
	@Path("xy/{xy}")
	@Produces( MediaType.APPLICATION_JSON )
	public String getListRecordField(@PathParam("xy") String strXY) 
	{
		JSONArray jsonObject = null;
		try 
		{
			HttpAccess Client = new HttpAccess();
			String strResponse = Client.doGet("http://xdir-infspub-pr.ressources.paris.mdp:8080/StoreBoss/rest/adrlib/xy/%28"+ strXY +"%29");
			jsonObject = (JSONArray) JSONSerializer.toJSON(strResponse);
		}
		catch (HttpAccessException e)
		{
			
		}
		JSONObject globalResult = (JSONObject)jsonObject.get(0);
		return "callback("+globalResult.toString()+")";
	}
	
	@GET
	@Path("server-proxy")
	@Produces( MediaType.APPLICATION_JSON )
	@HeaderParam("access-control-allow-origin: *")
	public String getServerProxy() 
	{
		String strResponse = null;
		try 
		{
			HttpAccess Client = new HttpAccess();
			strResponse = Client.doGet("http://demo.boundlessgeo.com/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne&styles=&bbox=-179.99978348919961,-89.99982838943765,180.0000000000001,83.63381093402974&width=684&height=330&srs=EPSG:4326&format=image/png");
		} 
		catch (HttpAccessException e)
		{
			
		}
		return strResponse;
   }
	
	
	@GET
	@Path("test")
	public String getProxy(  )
    {
        Client client = Client.create(  );

        WebResource webResource = client.resource( "http://demo.boundlessgeo.com/geoserver/ne/wms" );

        ClientResponse response = webResource.type( MediaType.APPLICATION_JSON )
                                             .header("Access-Control-Allow-Origin", "*")
                                             .get( ClientResponse.class);
        
        if (response.getStatus() != 200) 
        {
 		   return "Failed : HTTP error code : " + response.getStatus();
 		}
        
        return response.getEntity(String.class);
    }

	@GET
	@Path("lutece-proxy")
	public Response getLuteceProxy( @QueryParam("url") final String strURL )
    {
        Client client = Client.create(  );
        WebResource webResource = client.resource( strURL );
        webResource.header( "Content-Type", "application/javascript; charset=utf-8" ).
        			header( "Access-Control-Allow-Origin", "*" ).
        			header( "Access-Control-Allow-Credentials", "true" ).
        	        header( "Access-Control-Allow-Methods", "GET, POST, DELETE, PUT" );
        
        Response response = webResource.get( Response.class);
        
        if (response.getStatus() == 200) 
        {
        	return response;
 		}
        
        return null;
    }
}
