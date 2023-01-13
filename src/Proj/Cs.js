const  PKW_PROJCS ="PROJCS";   //投影坐标系
import ProjCs from "./ProjCs";
import GeogCs from "./GeogCs";
class Cs{
    constructor(wkt_json) {
        this.cs=Object.keys(wkt_json)[0].toUpperCase()===PKW_PROJCS?new ProjCs(wkt_json):new GeogCs(wkt_json)
    }
    to_proj4(){
        return this.cs.to_proj4()+" +no_defs +type=crs"
    }
}
export default Cs
