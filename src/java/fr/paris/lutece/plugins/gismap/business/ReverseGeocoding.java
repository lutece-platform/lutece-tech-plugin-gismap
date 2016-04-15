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
}
