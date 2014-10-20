define(function (require, module, exports) {
    var nw = window.require('nw.gui');

    var debugMode, nwWin, uncaughtCallback;

    nwWin = nw.Window.get();
    debugMode = (nw.App.argv.indexOf("--debug")) !== -1;

    if (debugMode) {
        nwWin.on("devtools-closed", function() { nwWin.showDevTools();});
        nwWin.showDevTools();
    }

    uncaughtCallback = function(ex) {
        if (typeof console.groupCollapsed === "function") {
            console.groupCollapsed("%cUncaught exception: " + ex.message, "color:red");
        }

        console.debug("%c" + ex.message, "color:red");
        console.debug("%cStack\n" + ex.stack, "color:red");

        typeof console.groupEnd === "function" ? console.groupEnd() : void 0;
        return false;
    };

    process.on("uncaughtException", uncaughtCallback);

    window.addEventListener("beforeunload", function() {
        process.removeListener("uncaughtException", uncaughtCallback);
        console.log("Exception listener dispose successfully");
    }, false);
}());
