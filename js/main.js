YUI({
    modules: {
        'home-view': {
            fullpath: "js/view/HomeView.js"
        },
        'cheese-model': {
            fullpath: "js/model/CheeseModel.js"
        },
        'cheese-view': {
            fullpath: "js/view/CheeseView.js"
        },
        'cheese-list': {
            fullpath: "js/model/CheeseList.js"
        },
        'cheese-list-view': {
            fullpath: "js/view/CheeseListView.js"
        }
    }
}).use('app-base', 'app-transitions', 'home-view', 'cheese-model', 'cheese-view', 'cheese-list', 'cheese-list-view', function (Y) {

    'use strict';

    var app,
        myCheeseList;

    myCheeseList = new Y.CheeseList();
    myCheeseList.add([
        {type: 'Gruyere', image: 'gruyere.jpg'},
        {type: 'Emmentaler', image: 'emmentaler.jpg'},
        {type: 'Cheesus', image: 'cheesus.jpg', pieces: 1},
        {type: 'Appenzeller', image: 'appenzeller.jpg'},
        {type: 'Raclette', image: 'raclette.jpg'},
        {type: 'Sbrinz', image: 'sbrinz.jpg'},
        {type: 'Vacherin', image: 'vacherin.jpg'}
    ]);

    app = new Y.App({
        transitions: true,
        viewContainer: '#content',
        views: {
            home: {
                type: 'HomeView'
            },
            cheeseList: {
                type: 'CheeseListView'
            },
            cheese: {
                type: 'CheeseView',
                parent: 'cheeseList'
            }
        },
        routes: [{
            path: '/',
            callback: function () {
                this.showView('home');
            }
        }, {
            path: '/cheese',
            callback: function () {
                this.showView('cheeseList', {
                    model: myCheeseList
                });
            }
        }, {
            path: '/cheese/:type',
            callback: function (request) {
                var cheeseModel = myCheeseList.getByType(request.params.type);
                if (!Y.Lang.isUndefined(cheeseModel)) {
                    this.showView('cheese', {
                        model: cheeseModel
                    });
                }
            }
        }]
    });

    app.navigate('/');

});
