const lib = new builder.Library('custom_library');

exports.createLibrary = function () {
    return lib;
}

exports.startSimpleDialog = function (session, options) {
    // Start dialog in libraries namespace
    session.beginDialog('custom_library:simple_dialog', options || {});
}

library.dialog('simple_dialog', function(session) {
        session.send('simple dialog here')
    }
);
