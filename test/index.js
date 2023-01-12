// import to_proj4 from "../dist";
const {to_proj4}=require("../dist")
let wkt='GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",\n' +
    '    DATUM["D_China_2000",\n' +
    '        SPHEROID["CGCS2000",6378137.0,298.257222101]],\n' +
    '    PRIMEM["Greenwich",0.0],\n' +
    '    UNIT["Degree",0.0174532925199433]]'
console.log(to_proj4(wkt))
