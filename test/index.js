// import to_proj4 from "../dist";
const {to_proj4}=require("../dist/wkt2proj")
let wkt="PROJCS[\"CGCS2000_3_Degree_GK_CM_113E\",GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Gauss_Kruger\"],PARAMETER[\"False_Easting\",700000.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",113.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",0.0],UNIT[\"Meter\",1.0]]"
console.log(to_proj4(wkt))
