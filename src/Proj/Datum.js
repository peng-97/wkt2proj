import Ellipsoids from "./Ellipsoids"
class Datum{
    datum_list=[
        {
            proj4: "WGS84",
            ogc_wkt: "WGS_1984",
            esri_wkt : "D_WGS_1984",
        }]
    constructor(datum) {
        let values=Object.values(datum)[0]
        this.name=values[0];
        this.ellipsoid=new Ellipsoids(values[1])
    }
    to_proj4(){
        // let str=''
        //      if (this.datum_list.find(value => value.esri_wk))
        return this.ellipsoid.to_proj4()
    }

}
export default Datum
