/*
Copyright (c) 2010 Morgan Roderick http://roderick.dk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*jslint evil: false, strict: false, undef: true, white: false, onevar:false, plusplus:false */
/** section: i18n
 *  i18n.js is a minimal library for easy translation of strings with support for replacement tokens 
 * 
 *  ## Simple translation
 *      // create a language set
 *      var daDK = {
 *          locale : 'da-DK',
 *          values : {
 *              'hello world!' : 'hej verden!'
 *          }
 *      };
 * 
 *      // load the language set
 *      i18n.load( daDK );
 * 
 *      // let's do some translation!
 *      console.log( i18n.t( 'hello world' ) );
 *      // outputs 'hej verden!'
 * 
 *  ## Translation with tokens
 * 
 *  Mismatched number of tokens and replacements will (probably) not generate errors,
 *  but your output might not be what you expected ;-)
 * 
 *      // create a language set
 *      var daDK = {
 *          locale : 'da-DK',
 *          values : {
 *              'hello {1}' : 'hej {1}'
 *          }
 *      };
 * 
 *      // load the language set
 *      i18n.load( daDK );
 * 
 *      // let's do some translation!
 *      console.log( i18n.t( 'hello {1}', 'Morgan' ) );
 *      // outputs 'hej Morgan'
 * 
**/
var i18n = (function(){
    "use strict";
    var locale, 
        values = {};
    
    return {
        t : function( key ){
            var string = values.hasOwnProperty( key ) ? values[key] : key;
            var replacements = [];
            if ( arguments.length > 1 ){
                var args = arguments;
                string = string.replace(/\{(\d+)\}/g, function(string, s1) { return args[s1]; });
            }
            return string;
        },

        locale : function(){
            return locale;
        },
        
        load : function( set ){
            if ( typeof set !== 'object' || typeof set.locale !== 'string' || typeof set.values !== 'object' ){
                throw( new TypeError( 'i18n: "set" argument must be an object with a "locale" String property and a "values" Object property' ) );
            }
            locale = set.locale;
            values = set.values;
            return locale;
        }        
    };	            
}());
