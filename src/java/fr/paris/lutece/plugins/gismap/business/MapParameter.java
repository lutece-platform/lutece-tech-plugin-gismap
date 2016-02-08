package fr.paris.lutece.plugins.gismap.business;

import java.util.HashMap;
import java.util.Map;

public class MapParameter 
{
	private int _nId;
    private Map<String, String> _mapParameters = new HashMap<String, String>(  );
	
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
	 * @return the _mapParameters
	 */
	public Map<String, String> getParameters() {
		return _mapParameters;
	}
	/**
	 * @param _mapParameters the _mapParameters to set
	 */
	public void setParameters(Map<String, String> mapParameters) {
		this._mapParameters = mapParameters;
	}
    
	/**
	 * @return the _mapParameters
	 * @param strKey
	 */
	public String getParameters(String strKey) {
		return _mapParameters.get(strKey);
	}
	/**
	 * @param strKey the strKey to set
	 * @param strValue the strValue to set
	 */
	public void setParameters(String strKey, String strValue) {
		this._mapParameters.put(strKey, strValue);
	}
}
