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
        let values=Object.values(param)[0]
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
        let para_value=this._get_proj_param()
        return " +"+para_value+"="+this.param_value;
    }
}
export  default  ProjParameter
