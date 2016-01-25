
--
-- Structure for table gismap_view
--

DROP TABLE IF EXISTS gismap_view;
CREATE TABLE gismap_view (
id_view int(6) NOT NULL,
servername varchar(50) NOT NULL default '',
PRIMARY KEY (id_view)
);

--
-- Structure for table gismap_lonlat
--

DROP TABLE IF EXISTS gismap_lonlat;
CREATE TABLE gismap_lonlat (
id_lonlat int(6) NOT NULL,
longitude int(11) NOT NULL default '0',
PRIMARY KEY (id_lonlat)
);
