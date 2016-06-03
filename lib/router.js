Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'basicChart'
});

/* Additional routes/charts could be set up as such, as long as matching
   templates have been created on the client: */
// Router.route('/', {
//     name: 'avgSessionDurationChart'
// });
