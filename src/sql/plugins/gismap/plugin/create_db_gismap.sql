
--
-- Structure for table gismap_html_view
--

DROP TABLE IF EXISTS gismap_html_view;
CREATE TABLE gismap_html_view (
id_htlmview int(6) NOT NULL,
servername varchar(50) NOT NULL default '',
PRIMARY KEY (id_htlmview)
);

--
-- Structure for table gismap_lonlat
--

DROP TABLE IF EXISTS gismap_lonlat;
CREATE TABLE gismap_lonlat (
id_lonlat int(6) NOT NULL,
longitude varchar(50) NOT NULL default '',
PRIMARY KEY (id_lonlat)
);
