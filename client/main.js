import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import config from "../config";

import './main.html';

gapi.analytics.ready(function(){
    gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: config
    });
});


Template.viewSelector.created = function(){
    gapi.analytics.ready(function(){
        var viewSelector = new gapi.analytics.ViewSelector({
            container: 'view-selector'
        });

        viewSelector.execute();

        viewSelector.on('change', function(ids){
            Session.set('currentView', ids);
        });
    });
};

Template.basicChart.created = function(){
    gapi.analytics.ready(function(){
        dataChart = new gapi.analytics.googleCharts.DataChart({
            query: {
                metrics: 'ga:users',
                dimensions: 'ga:date',
                'start-date': '30daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                container: 'data-container',
                type: 'LINE',
                options: {
                    width: '100%'
                }
            }
        });

        Tracker.autorun(function(){
            if(Session.get('currentView')){
                dataChart.set({query: {ids: Session.get('currentView')}}).execute();
            }
        });
    });
};
