TestCase( "i18n", {
    
    setUp : function(){
        this.enUsLocale = {
            locale : 'en-US', 
            values : {}
        };
        
        this.deDeLocale = {
            locale : 'de-DE',
            values : {}
        };
        
        this.noTokens = {
            locale : 'da-DK',
            values : {
                'hello world' : 'hej verden'
            }
        };
        
        this.withTokens = {
            locale : 'da-DK',
            values : {
                'hello {1}' : 'hej {1}',
                'firstname {1}, lastname {2}' : 'efternavn {2}, fornavn {1}'
            }
        };
    },
    
    "test load method should set new locale" : function(){
        // since we're testing a "Singleton", we can't actually reset it by re-instantiating it for each test
        // so, we'll simple call load twice and observe that the locale changes
        i18n.load( this.enUsLocale );
        assertEquals( this.enUsLocale.locale, i18n.locale() );

        i18n.load( this.deDeLocale );
        assertEquals( this.deDeLocale.locale, i18n.locale() );
    },
    
    "test load method should return locale when loading language set" : function(){
        assertEquals( this.enUsLocale.locale, i18n.load( this.enUsLocale ) );
    },
    
    "test t method should translate strings" : function(){
        var locale = this.noTokens;
        i18n.load( locale );
        assertEquals( locale.values['hello world'], i18n.t('hello world') );        
    },
    
    "test t method should translate tokens" : function(){
        var locale = this.withTokens;
        i18n.load( locale );
        assertEquals( 'efternavn Roderick, fornavn Morgan', i18n.t( 'firstname {1}, lastname {2}', 'Morgan', 'Roderick' ) );
    }
});
