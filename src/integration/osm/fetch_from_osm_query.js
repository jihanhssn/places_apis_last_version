exports.overpassURL = "https://lz4.overpass-api.de/api/interpreter";

exports.query = `
area["name"="السودان"]->.boundaryarea;
(
node(area.boundaryarea)[amenity];
);
out meta;
`;