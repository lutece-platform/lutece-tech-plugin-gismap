package fr.paris.lutece.plugins.gismap.business;

public class Geometry 
{
	private int _nId;
	private String _strGeometry;
	private String _strThematic;
	
	/**
	 * @return the _nId
	 */
	public int getId() {
		return _nId;
	}
	/**
	 * @param _nId the _nId to set
	 */
	public void setId(int nId) {
		this._nId = nId;
	}
	/**
	 * @return the _strGeometry
	 */
	public String getGeometry() {
		return _strGeometry;
	}
	/**
	 * @param _strGeometry the _strGeometry to set
	 */
	public void setGeometry(String strGeometry) {
		this._strGeometry = strGeometry;
	}
	/**
	 * @return the _strThematic
	 */
	public String getThematic() {
		return _strThematic;
	}
	/**
	 * @param _strThematic the _strThematic to set
	 */
	public void setThematic(String strThematic) {
		this._strThematic = strThematic;
	}
	
	
}
