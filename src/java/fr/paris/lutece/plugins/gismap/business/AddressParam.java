package fr.paris.lutece.plugins.gismap.business;

import java.util.List;

public class AddressParam 
{
	private String _strUrl;
    private String _strDelay;
    private String _strMinLength;
    private String _strListType;
    private String _strNbResult;
    private String _strClientId;
	/**
	 * @return the _strUrl
	 */
	public String getUrl() {
		return _strUrl;
	}
	/**
	 * @param _strUrl the _strUrl to set
	 */
	public void setUrl(String strUrl) {
		this._strUrl = strUrl;
	}
	/**
	 * @return the _strDelay
	 */
	public String getDelay() {
		return _strDelay;
	}
	/**
	 * @param _strDelay the _strDelay to set
	 */
	public void setDelay(String strDelay) {
		this._strDelay = strDelay;
	}
	/**
	 * @return the _strMinLength
	 */
	public String getMinLength() {
		return _strMinLength;
	}
	/**
	 * @param _strMinLength the _strMinLength to set
	 */
	public void setMinLength(String strMinLength) {
		this._strMinLength = strMinLength;
	}
	/**
	 * @return the _listType
	 */
	public String getListType() {
		return _strListType;
	}
	/**
	 * @param _listType the _listType to set
	 */
	public void setListType(String strListType) {
		this._strListType = strListType;
	}
	/**
	 * @return the _strNbResult
	 */
	public String getNbResult() {
		return _strNbResult;
	}
	/**
	 * @param _strNbResult the _strNbResult to set
	 */
	public void setNbResult(String strNbResult) {
		this._strNbResult = strNbResult;
	}
	/**
	 * @return the _strClientId
	 */
	public String getClientId() {
		return _strClientId;
	}
	/**
	 * @param _strClientId the _strClientId to set
	 */
	public void setClientId(String strClientId) {
		this._strClientId = strClientId;
	}

    
}
