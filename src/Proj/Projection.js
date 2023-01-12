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
        this.proj_name=Object.values(proj)[0][0]
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
export default Projection
