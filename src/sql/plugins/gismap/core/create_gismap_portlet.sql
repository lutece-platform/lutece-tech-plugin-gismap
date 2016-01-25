  
--
-- Structure for table gismap_portlet
--
DROP TABLE IF EXISTS gismap_portlet;
CREATE TABLE gismap_portlet (
  id_portlet int default '0' NOT NULL,
  gismap_feed_id varchar(100) default NULL,
  PRIMARY KEY  (id_portlet)
);
