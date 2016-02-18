DROP TABLE IF EXISTS gismap_geometry;
CREATE TABLE gismap_geometry (		
id integer,
geom geometry,
thematic varchar,
PRIMARY KEY (id)
);