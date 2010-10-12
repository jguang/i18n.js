i18n.js is a minimal library for easy translation of strings with support for replacement tokens 

## Simple translation
    // create a language set
    var daDK = {
        locale : 'da-DK',
        values : {
            'hello world!' : 'hej verden!'
        }
    };

    // load the language set
    i18n.load( daDK );

    // let's do some translation!
    console.log( i18n.t( 'hello world' ) );
    // outputs 'hej verden!'

## Translation with tokens

Mismatched number of tokens and replacements will not generate errors,
but your output might not be what you expected ;-)

    // create a language set
    var daDK = {
        locale : 'da-DK',
        values : {
            'hello {1}' : 'hej {1}',
            'hello {1} {2}', '{2} {1} hej!'
        }
    };

    // load the language set
    i18n.load( daDK );

    // let's do some translation!
    console.log( i18n.t( 'hello {1}', 'Morgan' ) );
    // outputs 'hej Morgan'
    
    // now let's try with multiple tokens, but with output in different order
    console.log( i18n.t( 'hello {1} {2}', 'Morgan', 'Roderick' ) );
    // outputs 'Morgan Roderick hej!'    