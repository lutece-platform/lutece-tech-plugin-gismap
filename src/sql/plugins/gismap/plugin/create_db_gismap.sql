
--
-- Structure for table gismap_html_view
--

DROP TABLE IF EXISTS gismap_html_view;
CREATE TABLE gismap_html_view (
id_htlmview int(6) NOT NULL,
servername varchar(50) NOT NULL default '',
PRIMARY KEY (id_htlmview)
);
