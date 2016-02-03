package fr.paris.lutece.plugins.gismap.business;

/**
 * This class represents a longitude and latitude pair
 *
 */
public class LonLat 
{
	private double longitude	= 0.0;

	private double latitude		= 0.0;
	
	/**
	 * Creates a new LonLat instance.
	 * 
	 * @param longitude
	 * @param latitude
	 */
	public LonLat(double longitude,double latitude)
	{
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	/**
	 * GetLatitude( ).
	 * @return double  The x-axis coordinate
	 */
	public double getLatitude( ) 
	{
		return this.latitude;
	}
	
	/**
	 * GetLongitude( ).
	 * @return double The y-axis coordinate
	 */
	public double getLongitude( ) 
	{	
		return this.longitude;
	}
	
	@Override
	/**
	 * @return String longitude,latitude
	 */
	public String toString( )
	{
		return this.longitude+","+this.latitude;
	}
}
