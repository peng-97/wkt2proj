/*!
 * wkt2proj v0.1.3
 * LICENSE : MIT
  AUTHOR  : pengz 
* */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.wkt2proj = {}));
})(this, (function (exports) { 'use strict';

    class Ellipsoids{
        ellipsoids_list=[
            {
                name:"GRS80",
                data:[6378137.0,298.257222101],
            },
            {
                name:"airy",
                data:[6377563.396,6356256.910],
            },
            {
                name:"bessel",
                data:[6377397.155,299.1528128]
            },
            {
                name:"clrk66",
                data:[6378206.4,6356583.8]
            },
            {
                name:"intl",
                data:[6378388.0,297.0]
            },
            {
                name:"WGS60",
                data:[6378165.0,298.3]
            },
            {
                name:"WGS66",
                data:[6378145.0,298.25]
            },
            {
                name:"WGS72",
                data:[6378135.0,298.26]
            },
            {
                name:"WGS84",
                data:[6378137.0,298.257223563]
            },
            {
                name:"sphere",
                data:[6370997.0,6370997.0]
            }
        ]
        constructor(ellip) {
            let values=Object.values(ellip)[0];
            this.name=values[0];
            this.a=values[1];
            this.rf=values[2];
        }
        to_proj4(){
            if(this.ellipsoids_list.find(value => value.name.toLowerCase()===this.name.toLowerCase())){
                return  " +ellps="+this.name
            }
            let ell=this.ellipsoids_list.find(value => (value.data[0]==this.a) && value.data[1]==this.rf);
            if (ell){
                return " +ellps="+ell.name
            }else {
                return  " +a="+this.a+" +rf="+this.rf
            }
        }
    }

    class Datum{
        datum_list=[
            {
                proj4: "WGS84",
                ogc_wkt: "WGS_1984",
                esri_wkt : "D_WGS_1984",
            }]
        constructor(datum) {
            let values=Object.values(datum)[0];
            this.name=values[0];
            this.ellipsoid=new Ellipsoids(values[1]);
        }
        to_proj4(){
            // let str=''
            //      if (this.datum_list.find(value => value.esri_wk))
            return this.ellipsoid.to_proj4()
        }

    }

    class Prime{
        prime_list=["greenwich", "lisbon", "paris", "bogota", "madrid","rome","bern","jakarta","ferro","brussels","stockholm","athens","oslo"]
        constructor(prime) {
            let values=Object.values(prime)[0];
            this.prime_name=values[0];
            this.prime_value=values[1];
        };
        to_proj4(){
            let  str=" +pm=";
            if (this.prime_list.find(value => value.toLowerCase()===this.prime_name.toLowerCase())){
                str+=this.prime_name;
            }else {
                str+=this.prime_value;
            }
            return str;
        }
    }

    class GeogCs{
        constructor(geogcs) {
            let values=Object.values(geogcs)[0];
            this.name=values[0];
            this.datum=new Datum(values[1]);
            this.prime_mer=new Prime(values[2]);
            // this.angunit=angunit;
            // this.twin_ax=twin_ax;
        }
        _get_geo_proj4(){
            return this.datum.to_proj4()+this.prime_mer.to_proj4()
        }
        to_proj4(isPro=false){
            let str_proj=this._get_geo_proj4();
            if (isPro){
                return str_proj
            }else {
                return  "+proj=longlat"+str_proj
            }

        }
    }

    class ProjParameter {
        proj_param_list=[
            { "False_Easting":          "x_0"   },
            { "False_Northing" :        "y_0"   },
            { "Central_Meridian":       "lon_0"  },
            { "Latitude_Of_Origin":     "lat_0"  },
            { "Latitude_Of_Center" :    "lat_0"  },
            { "Standard_Parallel_1" :   "lat_ts" },
            { "Standard_Parallel_2" :   "lat_2"  },
            { "Latitude_Of_1st_Point":  "lat_1"  },
            { "Latitude_Of_2nd_Point":  "lat_2"  },
            { "Longitude_Of_1st_Point" : "lon_1"  },
            { "Longitude_Of_2nd_Point" : "lon_2"  },
            { "Scale_Factor" :           "k"},
            { "Azimuth" :                "alpha"  },
            { "Longitude_Of_Center" :    "lonc"}
        ];
        constructor(param) {
            let values=Object.values(param)[0];
            this.param_name=values[0];
            this.param_value=values[1];
        };
        _get_proj_param(){
            for (let i = 0; i < this.proj_param_list.length; i++) {
                let obj=this.proj_param_list[i];
                if (Object.keys(obj)[0].toLowerCase()===this.param_name.toLowerCase()){
                    return obj[Object.keys(obj)[0]]
                }
            }
            return  ""
        };
        to_proj4(){
            let para_value=this._get_proj_param();
            return " +"+para_value+"="+this.param_value;
        }
    }

    class Uint{
        constructor(unit) {
            this.unit_name=Object.values(unit)[0][0];
            // this.unit_value=Object.values(unit)[1]
        };
        unit_list=[
            { "Kilometer" :      "km"    },
            { "Meter" :          "m"     },
            { "Decimeter" :      "dm"    },
            { "Centimeter" :     "cm"    },
            { "Millimeter" :     "mm"    },
            { "Foot_US" :        "us-ft" },
            { "Foot_Gold_Coast" :"us-ft" },
            { "Degree" :         ""      },
        ];
        _get_unit(){
            for (let i = 0; i < this.unit_list.length; i++) {
                let obj=this.unit_list[i];
                if (Object.keys(obj)[0].toLowerCase()===this.unit_name.toLowerCase()){
                    return obj[Object.keys(obj)[0]]
                }
            }
            return "Unknown"
        };
        to_proj4(){
            let unit_value=this._get_unit();
            return " +units="+unit_value;
        }
    }

    class Projection{
        proj_aliases_list=[
            {"Aitoff":                              "aitoff"  },
            {"Albers":                              "aea"     },
            {"Azimuthal_Equidistant":               "aeqd"    },
            {"Bonne":                               "bonne"   },
            {"Cassini":                             "cass"    },
            {"Chamberlin_Trimetric":                "chamb"   },
            {"Craster_Parabolic":                   "crast"   },
            {"Cylindrical_Equal_Area":              "cea"     },
            {"Eckert_I":                            "eck1"    },
            {"Eckert_II":                           "eck2"    },
            {"Eckert_III":                          "eck3"    },
            {"Eckert_IV":                           "eck4"    },
            {"Eckert_V":                            "eck5"    },
            {"Eckert_VI":                           "eck6"    },
            {"Equidistant_Conic":                   "eqdc"    },
            {"Equidistant_Cylindrical":             "eqc"     },
            {"Plate_Carree":                        "eqc"     },
            {"Gall_Stereographic":                  "gall"    },
            {"Gauss_Kruger":                        "tmerc"   },
            {"Gnomonic":                            "gnom"    },
            {"Goode_Homolosine":                    "goode"   },
            {"Hammer_Aitoff":                       "hammer"  },
            {"Hotine_Oblique_Mercator_Azimuth_Center" :"merc"    },
            {"Krovak":                              "krovak"  },
            {"Lambert_Azimuthal_Equal_Area":        "laea"    },
            {"Lambert_Conformal_Conic":             "lcc"     },
            {"Loximuthal":                          "loxim"   },
            {"Mercator":                            "merc"    },
            {"Miller_Cylindrical":                  "mill"    },
            {"Mollweide":                           "moll"    },
            {"New_Zealand_Map_Grid":                "nzmg"    },
            {"Orthographic":                        "ortho"   },
            {"Perspectice":                         "pconic"  },
            {"Polyconic":                           "poly"    },
            {"Quartic_Authalic":                    "qua_aut" },
            {"Robinson":                            "robin"   },
            {"Sinusoidal":                          "sinu"    },
            {"Stereographic":                       "stere"   },
            {"Stereographic_South_Pole":            "stere"   },
            {"Double_Stereographic":                "sterea"  },
            {"Transverse_Mercator":                 "tmerc"   },
            {"Two_Point_Equidistant":               "tpeqd"   },
            {"Universal_Polar_Stereographic":       "ups"     },
            {"Universal_Transverse_Mercator":       "utm"     },
            {"Van_der_Grinten_I":                   "vandg"   },
            {"Winkel_I":                            "wink1"   },
            {"Winkel_II":                           "wink2"   },
            {"Winkel_Tripel":                       "wintri"  },
            {"Hotine_Oblique_Mercator_Azimuth_Natural_Origin":  "merc"    },
            {"Hotine_Oblique_Mercator_Two_Point_Natural_Origin": "tpeqd"   },
            {"Mercator_Auxiliary_Sphere":           "merc"    },
            {"Stereographic_North_Pole":            "stere"   },
            {"Transverse_Mercator_Complex":         "tmerc"   },
        ];
        constructor(proj) {
            this.proj_name=Object.values(proj)[0][0];
        };
        _get_proj_name(){
            for (let i = 0; i < this.proj_aliases_list.length; i++) {
                let obj=this.proj_aliases_list[i];
                if (Object.keys(obj)[0].toLowerCase()===this.proj_name.toLowerCase()){
                    return obj[Object.keys(obj)[0]]
                }
            }
            return  ""
        };
        to_proj4(){
            return this._get_proj_name()
        }
    }

    const  PKW_GEOGCS="GEOGCS";    //???????????????
     const  PKW_UNIT = "UNIT"; //??????
     const  PKW_PROJECTION ="PROJECTION"; //????????????
     const  PKW_PARAMETER = "PARAMETER";  //????????????
    class ProjCs{
        constructor(projcs) {
            let values=Object.values(projcs)[0];
            this.name=values[0];
            this.params=[];
            for (let i=0;i<values.length;i++){
                if (values[i] instanceof  Object){
                    let key=Object.keys(values[i])[0].toUpperCase();
                    switch (key){
                        case PKW_GEOGCS:
                            this.geogcs=new GeogCs(values[i]);
                            break;
                        case PKW_PARAMETER:
                            this.params.push(new ProjParameter(values[i]));
                            break
                        case PKW_UNIT:
                            this.unit=new Uint(values[i]);
                            break
                        case PKW_PROJECTION:
                            this.proj=new Projection(values[i]);
                            break;
                    }

                }
            }
            // this.name=name;
            // this.geogcs=new GeogCs(geogcs);
            // this.proj=new Projection(proj);
            // this.params=params.map(value => {
            //     return new ProjParameter(value)
            // })
            // this.unit=new Uint(unit);
        }
        to_proj4(){
            let params=this.params.map(value => {
                return value.to_proj4()
            }).join(" ");
            return "+proj="+this.proj.to_proj4()+this.geogcs.to_proj4(true)+params+this.unit.to_proj4()
        }
    }

    const  PKW_PROJCS ="PROJCS";   //???????????????
    class Cs{
        constructor(wkt_json) {
            this.cs=Object.keys(wkt_json)[0].toUpperCase()===PKW_PROJCS?new ProjCs(wkt_json):new GeogCs(wkt_json);
        }
        to_proj4(){
            return this.cs.to_proj4()+" +no_defs +type=crs"
        }
    }

    //


    //wkt ?????????json??????
    function bracket_to_json(wkt,index=0){
        let bracket_list=[];
        let  key='';
        for (let i = index; i < wkt.length; i++) {
            let char=wkt[i];
            if (char=="["){
                let obj={};
                let result=bracket_to_json(wkt,i+1);
                obj[key]=result[0];
                bracket_list.push(obj);
                i = result[1];
                key='';
            }else if (char == "\,"){
                if (key) {
                    bracket_list.push(key);
                    key = '';
                }
            }else if (char == "]"){
                if (key){
                    bracket_list.push(key);
                }
                return [bracket_list,i];
            }else {
                if (char!="\"" &&  char!="\'" && char!=' ' && char!="\n"){
                    key+=char;
                }
            }
        }
        return  bracket_list[0];
    }

    function  to_proj4(str){
        let wkt_json=bracket_to_json(str);
        let cs=new Cs(wkt_json);
        return cs.to_proj4()
    }

    // export  default {to_proj4}

    // module.exports= {to_proj4}

    exports.to_proj4 = to_proj4;

}));
