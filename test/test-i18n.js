(function(){

    var enUs = {
        locale : 'en-US', 
        values : {}
    };

    var deDe = {
        locale : 'de-DE',
        values : {}
    };

    var noTokens = {
        locale : 'da-DK',
        values : {
            'hello world' : 'hej verden'
        }
    };

    var withTokens = {
        locale : 'da-DK',
        values : {
            'hello {1}' : 'hej {1}',
            'firstname {1}, lastname {2}' : 'efternavn {2}, fornavn {1}'
        }
    };

    TestCase( "i18n", {

        "test load method should set new locale" : function(){
            // since we're testing a "Singleton", we can't actually reset it by re-instantiating it for each test
            // so, we'll simple call load twice and observe that the locale changes
            i18n.load( enUs );
            assertEquals( enUs.locale, i18n.locale() );

            i18n.load( deDe );
            assertEquals( deDe.locale, i18n.locale() );
        },

        "test load method should return locale when loading language set" : function(){
            assertEquals( enUs.locale, i18n.load( enUs ) );
        },

        "test t method should translate strings" : function(){
            var locale = noTokens;
            i18n.load( locale );
            assertEquals( locale.values['hello world'], i18n.t('hello world') );        
        },

        "test t method should translate tokens" : function(){
            var locale = withTokens;
            i18n.load( locale );
            assertEquals( 'efternavn Roderick, fornavn Morgan', i18n.t( 'firstname {1}, lastname {2}', 'Morgan', 'Roderick' ) );
        },

        "test t method should not generate errors" : function(){

            // too many replacement values
            assertNoException( function(){
                i18n.load( withTokens );
                i18n.t( 'firstname {1}, lastname {2}', 'Morgan', 'Roderick', 'even', 'more', 'replacement', 'values' );
            });

            // no replacement values
            assertNoException( function(){
                i18n.load( withTokens );
                i18n.t( 'firstname {1}, lastname {2}' );
            });

            // no tokens, but replacement values
            assertNoException( function(){
                i18n.load( noTokens );
                i18n.t( 'hello world', 'Morgan', 'Roderick' );
            });
        }

    });    
}());
