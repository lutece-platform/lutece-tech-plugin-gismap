/*
 * Copyright (c) 2002-2015, Mairie de Paris
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice
 *     and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice
 *     and the following disclaimer in the documentation and/or other materials
 *     provided with the distribution.
 *
 *  3. Neither the name of 'Mairie de Paris' nor 'Lutece' nor the names of its
 *     contributors may be used to endorse or promote products derived from
 *     this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * License 1.0
 */
package fr.paris.lutece.plugins.gismap.business;

import fr.paris.lutece.portal.service.util.AppPropertiesService;


public final class AddressParamHome
{
    public static final String GISMAP_ADDRESS = "address-autocomplete.suggestPOI.";
    public static final String URL = "ws.url";
    public static final String DELAY = "ui.delay";
    public static final String MIN_LENGTH = "param.query.minLength";
    public static final String TYPE = "param.types.default";
    public static final String NB_RESULT = "param.nbResults.default";
    public static final String CLIENT_ID = "param.clientId";

    public static AddressParam getAddressParameters(  )
    {
        AddressParam parameters = new AddressParam(  );

        String strUrlProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + URL );
        parameters.setUrl( strUrlProperty );

        String strDelayProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + DELAY );
        parameters.setDelay( strDelayProperty );

        String strMinLengthProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + MIN_LENGTH );
        parameters.setMinLength( strMinLengthProperty );

        String strTypeProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + TYPE );
        parameters.setListType( strTypeProperty );

        String strNbResultProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + NB_RESULT );
        parameters.setNbResult( strNbResultProperty );

        String strClientIdProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + CLIENT_ID );
        parameters.setClientId( strClientIdProperty );

        return parameters;
    }
}
