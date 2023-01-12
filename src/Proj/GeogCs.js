import Datum from "./Datum";
import Prime from "./Prime";
class GeogCs{
    constructor(name, datum, prime_mer, angunit, twin_ax=null) {
        this.name=name;
        this.datum=new Datum(datum);
        this.prime_mer=new Prime(prime_mer);
        this.angunit=angunit;
        this.twin_ax=twin_ax;
    }
    _get_geo_proj4(){
        return this.datum.to_proj4()+this.prime_mer.to_proj4()
    }
    to_proj4(isPro=false){
        let str_proj=this._get_geo_proj4()
        if (isPro){
            return str_proj
        }else {
            return  " +proj=longlat"+str_proj
        }

    }
}
export default GeogCs
