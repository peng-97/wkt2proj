/*!
 * wkt2proj v0.1.0
 * LICENSE : MIT
  AUTHOR  : pengz
* */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).wkt2proj = e()
}(this, (function () {
    "use strict";

    class t {
        ellipsoids_list = [{name: "GRS80", data: [6378137, 298.257222101]}, {
            name: "airy",
            data: [6377563.396, 6356256.91]
        }, {name: "bessel", data: [6377397.155, 299.1528128]}, {
            name: "clrk66",
            data: [6378206.4, 6356583.8]
        }, {name: "intl", data: [6378388, 297]}, {name: "WGS60", data: [6378165, 298.3]}, {
            name: "WGS66",
            data: [6378145, 298.25]
        }, {name: "WGS72", data: [6378135, 298.26]}, {name: "WGS84", data: [6378137, 298.257223563]}, {
            name: "sphere",
            data: [6370997, 6370997]
        }];

        constructor(t) {
            let e = Object.values(t)[0];
            this.name = e[0], this.a = e[1], this.rf = e[2]
        }

        to_proj4() {
            if (this.ellipsoids_list.find((t => t.name.toLowerCase() === this.name.toLowerCase()))) return " +ellps=" + this.name;
            let t = this.ellipsoids_list.find((t => t.data[0] == this.a && t.data[1] == this.rf));
            return t ? " +ellps=" + t.name : " +a=" + this.a + " rf=" + this.rf
        }
    }

    class e {
        datum_list = [{proj4: "WGS84", ogc_wkt: "WGS_1984", esri_wkt: "D_WGS_1984"}];

        constructor(e) {
            let r = Object.values(e)[0];
            this.name = r[0], this.ellipsoid = new t(r[1])
        }

        to_proj4() {
            return this.ellipsoid.to_proj4()
        }
    }

    class r {
        prime_list = ["greenwich", "lisbon", "paris", "bogota", "madrid", "rome", "bern", "jakarta", "ferro", "brussels", "stockholm", "athens", "oslo"];

        constructor(t) {
            let e = Object.values(t)[0];
            this.prime_name = e[0], this.prime_value = e[1]
        }

        to_proj4() {
            let t = " +pm=";
            return this.prime_list.find((t => t.toLowerCase() === this.prime_name.toLowerCase())) ? t += this.prime_name : t += this.prime_value, t
        }
    }

    class i {
        constructor(t, i, a, s, o = null) {
            this.name = t, this.datum = new e(i), this.prime_mer = new r(a), this.angunit = s, this.twin_ax = o
        }

        _get_geo_proj4() {
            return this.datum.to_proj4() + this.prime_mer.to_proj4()
        }

        to_proj4(t = !1) {
            let e = this._get_geo_proj4();
            return t ? e : " +proj=longlat" + e
        }
    }

    class a {
        proj_aliases_list = [{Aitoff: "aitoff"}, {Albers: "aea"}, {Azimuthal_Equidistant: "aeqd"}, {Bonne: "bonne"}, {Cassini: "cass"}, {Chamberlin_Trimetric: "chamb"}, {Craster_Parabolic: "crast"}, {Cylindrical_Equal_Area: "cea"}, {Eckert_I: "eck1"}, {Eckert_II: "eck2"}, {Eckert_III: "eck3"}, {Eckert_IV: "eck4"}, {Eckert_V: "eck5"}, {Eckert_VI: "eck6"}, {Equidistant_Conic: "eqdc"}, {Equidistant_Cylindrical: "eqc"}, {Plate_Carree: "eqc"}, {Gall_Stereographic: "gall"}, {Gauss_Kruger: "tmerc"}, {Gnomonic: "gnom"}, {Goode_Homolosine: "goode"}, {Hammer_Aitoff: "hammer"}, {Hotine_Oblique_Mercator_Azimuth_Center: "merc"}, {Krovak: "krovak"}, {Lambert_Azimuthal_Equal_Area: "laea"}, {Lambert_Conformal_Conic: "lcc"}, {Loximuthal: "loxim"}, {Mercator: "merc"}, {Miller_Cylindrical: "mill"}, {Mollweide: "moll"}, {New_Zealand_Map_Grid: "nzmg"}, {Orthographic: "ortho"}, {Perspectice: "pconic"}, {Polyconic: "poly"}, {Quartic_Authalic: "qua_aut"}, {Robinson: "robin"}, {Sinusoidal: "sinu"}, {Stereographic: "stere"}, {Stereographic_South_Pole: "stere"}, {Double_Stereographic: "sterea"}, {Transverse_Mercator: "tmerc"}, {Two_Point_Equidistant: "tpeqd"}, {Universal_Polar_Stereographic: "ups"}, {Universal_Transverse_Mercator: "utm"}, {Van_der_Grinten_I: "vandg"}, {Winkel_I: "wink1"}, {Winkel_II: "wink2"}, {Winkel_Tripel: "wintri"}, {Hotine_Oblique_Mercator_Azimuth_Natural_Origin: "merc"}, {Hotine_Oblique_Mercator_Two_Point_Natural_Origin: "tpeqd"}, {Mercator_Auxiliary_Sphere: "merc"}, {Stereographic_North_Pole: "stere"}, {Transverse_Mercator_Complex: "tmerc"}];

        constructor(t) {
            this.proj_name = Object.values(t)[0][0]
        }

        _get_proj_name() {
            for (let t = 0; t < this.proj_aliases_list.length; t++) {
                let e = this.proj_aliases_list[t];
                if (Object.keys(e)[0].toLowerCase() === this.proj_name.toLowerCase()) return e[Object.keys(e)[0]]
            }
            return ""
        }

        to_proj4() {
            return this._get_proj_name()
        }
    }

    class s {
        proj_param_list = [{False_Easting: "x_0"}, {False_Northing: "y_0"}, {Central_Meridian: "lon_0"}, {Latitude_Of_Origin: "lat_0"}, {Latitude_Of_Center: "lat_0"}, {Standard_Parallel_1: "lat_ts"}, {Standard_Parallel_2: "lat_2"}, {Latitude_Of_1st_Point: "lat_1"}, {Latitude_Of_2nd_Point: "lat_2"}, {Longitude_Of_1st_Point: "lon_1"}, {Longitude_Of_2nd_Point: "lon_2"}, {Scale_Factor: "k"}, {Azimuth: "alpha"}, {Longitude_Of_Center: "lonc"}];

        constructor(t) {
            let e = Object.values(t)[0];
            this.param_name = e[0], this.param_value = e[1]
        }

        _get_proj_param() {
            for (let t = 0; t < this.proj_param_list.length; t++) {
                let e = this.proj_param_list[t];
                if (Object.keys(e)[0].toLowerCase() === this.param_name.toLowerCase()) return e[Object.keys(e)[0]]
            }
            return ""
        }

        to_proj4() {
            return " +" + this._get_proj_param() + "=" + this.param_value
        }
    }

    class o {
        constructor(t) {
            this.unit_name = Object.values(t)[0][0]
        }

        unit_list = [{Kilometer: "km"}, {Meter: "m"}, {Decimeter: "dm"}, {Centimeter: "cm"}, {Millimeter: "mm"}, {Foot_US: "us-ft"}, {Foot_Gold_Coast: "us-ft"}, {Degree: ""}];

        _get_unit() {
            for (let t = 0; t < this.unit_list.length; t++) {
                let e = this.unit_list[t];
                if (Object.keys(e)[0].toLowerCase() === this.unit_name.toLowerCase()) return e[Object.keys(e)[0]]
            }
            return "Unknown"
        }

        to_proj4() {
            return " +units=" + this._get_unit()
        }
    }

    class n {
        constructor(t, e, r, n, _) {
            this.name = t, this.geogcs = new i(e), this.proj = new a(r), this.params = n.map((t => new s(t))), this.unit = new o(_)
        }

        to_proj4() {
            let t = this.params.map((t => t.to_proj4())).join(" ");
            return " +proj=" + this.proj.to_proj4() + this.geogcs.to_proj4(!0) + t + this.unit.to_proj4()
        }
    }

    class _ {
        constructor(t) {
            this.wkt_json = t, this.init()
        }

        _get_geogcs(t) {
            let e = Object.values(t)[0];
            return new i(e[0], e[1], e[2])
        }

        _get_projcs(t) {
            let e = Object.values(t)[0], r = e[0], i = [], a = "", s = "", o = "";
            for (let t = 0; t < e.length; t++) if (e[t] instanceof Object) {
                switch (Object.keys(e[t])[0].toUpperCase()) {
                    case"GEOGCS":
                        a = e[t];
                        break;
                    case"PARAMETER":
                        i.push(e[t]);
                        break;
                    case"UNIT":
                        s = e[t];
                        break;
                    case"PROJECTION":
                        o = e[t]
                }
            }
            return new n(r, a, o, i, s)
        }

        init() {
            this.type = Object.keys(this.wkt_json)[0].toUpperCase(), "PROJCS" === Object.keys(this.wkt_json)[0].toUpperCase() ? this.cs = this._get_projcs(this.wkt_json) : this.cs = this._get_geogcs(this.wkt_json)
        }

        to_proj4() {
            return this.cs.to_proj4() + " +no_defs +type=crs"
        }
    }

    function l(t, e = 0) {
        let r = [], i = "";
        for (let a = e; a < t.length; a++) {
            let e = t[a];
            if ("[" == e) {
                let e = {}, s = l(t, a + 1);
                e[i] = s[0], r.push(e), a = s[1], i = ""
            } else if ("," == e) i && (r.push(i), i = ""); else {
                if ("]" == e) return i && r.push(i), [r, a];
                '"' != e && "'" != e && " " != e && "\n" != e && (i += e)
            }
        }
        return r[0]
    }

    return {
        to_proj4: function (t) {
            let e = l(t);
            return new _(e).to_proj4()
        }
    }
}));
//# sourceMappingURL=index.js.map
